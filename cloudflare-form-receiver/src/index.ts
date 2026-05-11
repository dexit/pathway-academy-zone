import type { Env, SubmissionFields, SubmissionMetadata, TaskRecord, RateLimitRecord } from './types';
export { FormProcessingWorkflow } from './workflow';

// ── Constants ────────────────────────────────────────────────────────────────
const RATE_LIMIT_MAX = 10;       // max submissions per window per IP
const RATE_LIMIT_WINDOW = 60;    // seconds
const MAX_FIELDS = 50;
const MAX_FIELD_LENGTH = 10_000; // chars per field value

// ── Helpers ──────────────────────────────────────────────────────────────────

function nanoid(size = 21): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Form-Id',
    'Access-Control-Max-Age': '86400',
  };
}

async function checkRateLimit(env: Env, ip: string): Promise<boolean> {
  const key = `rate:ip:${ip}`;
  const now = Math.floor(Date.now() / 1000);
  const record = await env.RATE_KV.get<RateLimitRecord>(key, 'json');

  if (!record || now - record.windowStart >= RATE_LIMIT_WINDOW) {
    await env.RATE_KV.put(key, JSON.stringify({ count: 1, windowStart: now }), {
      expirationTtl: RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  await env.RATE_KV.put(key, JSON.stringify({ count: record.count + 1, windowStart: record.windowStart }), {
    expirationTtl: RATE_LIMIT_WINDOW,
  });
  return true;
}

async function parseFields(request: Request): Promise<SubmissionFields> {
  const ct = request.headers.get('content-type') ?? '';
  const fields: SubmissionFields = {};

  if (ct.includes('application/json')) {
    const body = await request.json<Record<string, unknown>>();
    for (const [k, v] of Object.entries(body)) {
      if (Array.isArray(v)) {
        fields[k] = v.map(String).map((s) => s.slice(0, MAX_FIELD_LENGTH));
      } else {
        fields[k] = String(v ?? '').slice(0, MAX_FIELD_LENGTH);
      }
    }
  } else {
    // multipart/form-data or application/x-www-form-urlencoded
    const fd = await request.formData();
    for (const [k, v] of fd.entries()) {
      if (typeof v === 'string') {
        const prev = fields[k];
        if (prev === undefined) {
          fields[k] = v.slice(0, MAX_FIELD_LENGTH);
        } else if (Array.isArray(prev)) {
          prev.push(v.slice(0, MAX_FIELD_LENGTH));
        } else {
          fields[k] = [prev, v.slice(0, MAX_FIELD_LENGTH)];
        }
      }
      // file uploads are intentionally ignored — use R2 for that
    }
  }

  if (Object.keys(fields).length > MAX_FIELDS) {
    throw new Error(`Too many fields (max ${MAX_FIELDS})`);
  }

  return fields;
}

// ── Route handlers ───────────────────────────────────────────────────────────

async function handleSubmit(request: Request, env: Env, formId: string): Promise<Response> {
  const origin = request.headers.get('origin') ?? 'unknown';
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? '0.0.0.0';

  // Rate limit
  const allowed = await checkRateLimit(env, ip);
  if (!allowed) {
    return json({ error: 'Too many requests. Please slow down.' }, 429);
  }

  // Parse form fields
  let fields: SubmissionFields;
  try {
    fields = await parseFields(request);
  } catch (err) {
    return json({ error: (err as Error).message }, 400);
  }

  if (Object.keys(fields).length === 0) {
    return json({ error: 'No fields found in submission.' }, 400);
  }

  // Build submission record
  const id = nanoid();
  const metadata: SubmissionMetadata = {
    ip,
    userAgent: request.headers.get('user-agent') ?? '',
    referrer: request.headers.get('referer') ?? '',
    timestamp: Date.now(),
    origin,
  };

  // Persist to D1
  await env.DB.prepare(
    `INSERT INTO form_submissions (id, form_id, origin, fields, metadata, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`
  ).bind(id, formId, origin, JSON.stringify(fields), JSON.stringify(metadata)).run();

  // Queue task in KV so admin/monitoring can see pending work
  const taskRecord: TaskRecord = {
    submissionId: id,
    formId,
    status: 'queued',
    workflowId: null,
    attempts: 0,
    lastAttemptAt: null,
    error: null,
  };
  await env.TASKS_KV.put(`task:${id}`, JSON.stringify(taskRecord), { expirationTtl: 86400 });

  // Look up notify URL from registered forms
  const form = await env.DB.prepare(
    'SELECT notify_url FROM registered_forms WHERE form_id = ? AND active = 1'
  ).bind(formId).first<{ notify_url: string | null }>();

  // Trigger Workflow for background processing
  const instance = await env.FORM_WORKFLOW.create({
    id: `sub-${id}`,
    params: {
      submissionId: id,
      formId,
      notifyUrl: form?.notify_url ?? null,
    },
  });

  return json({
    success: true,
    submissionId: id,
    workflowId: instance.id,
    message: 'Form submission received.',
  }, 202);
}

async function handleStatus(request: Request, env: Env, submissionId: string): Promise<Response> {
  // Check KV first (fast path)
  const task = await env.TASKS_KV.get<TaskRecord>(`task:${submissionId}`, 'json');

  if (task) {
    return json({ submissionId, ...task });
  }

  // Fall back to D1 for older records not in KV
  const row = await env.DB.prepare(
    'SELECT id, form_id, status, workflow_id, error_message, created_at, updated_at FROM form_submissions WHERE id = ?'
  ).bind(submissionId).first();

  if (!row) return json({ error: 'Submission not found.' }, 404);
  return json(row);
}

async function handleAdminList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const formId = url.searchParams.get('form_id');
  const status = url.searchParams.get('status');
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50', 10), 200);
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10);

  let query = 'SELECT id, form_id, origin, status, created_at, updated_at FROM form_submissions WHERE 1=1';
  const bindings: (string | number)[] = [];

  if (formId) { query += ' AND form_id = ?'; bindings.push(formId); }
  if (status)  { query += ' AND status = ?';  bindings.push(status); }
  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  bindings.push(limit, offset);

  const { results } = await env.DB.prepare(query).bind(...bindings).all();
  const total = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM form_submissions WHERE 1=1' +
    (formId ? ' AND form_id = ?' : '') +
    (status  ? ' AND status = ?'  : '')
  ).bind(...bindings.slice(0, -2)).first<{ count: number }>();

  return json({ submissions: results, total: total?.count ?? 0, limit, offset });
}

async function handleAdminDetail(request: Request, env: Env, submissionId: string): Promise<Response> {
  const row = await env.DB.prepare(
    'SELECT * FROM form_submissions WHERE id = ?'
  ).bind(submissionId).first();

  if (!row) return json({ error: 'Submission not found.' }, 404);

  return json({
    ...row,
    fields: JSON.parse(row.fields as string),
    metadata: JSON.parse(row.metadata as string),
  });
}

async function handleRegisterForm(request: Request, env: Env): Promise<Response> {
  const body = await request.json<{
    form_id: string;
    name: string;
    allowed_origins?: string[];
    notify_url?: string;
  }>();

  if (!body.form_id || !body.name) {
    return json({ error: 'form_id and name are required.' }, 400);
  }

  await env.DB.prepare(
    `INSERT INTO registered_forms (form_id, name, allowed_origins, notify_url)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(form_id) DO UPDATE SET
       name = excluded.name,
       allowed_origins = excluded.allowed_origins,
       notify_url = excluded.notify_url`
  ).bind(
    body.form_id,
    body.name,
    JSON.stringify(body.allowed_origins ?? ['*']),
    body.notify_url ?? null,
  ).run();

  return json({ success: true, form_id: body.form_id });
}

// ── Main fetch handler ───────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();
    const origin = request.headers.get('origin') ?? '*';

    // CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // ── /health ──────────────────────────────────────────────────────────────
    if (pathname === '/health' && method === 'GET') {
      return json({ status: 'ok', timestamp: Date.now() });
    }

    // ── POST /submit/:formId  or  POST /submit?form_id=xxx ───────────────────
    if (method === 'POST') {
      const submitMatch = pathname.match(/^\/submit\/([^/]+)$/);
      const formId = submitMatch
        ? decodeURIComponent(submitMatch[1])
        : url.searchParams.get('form_id');

      if (formId) {
        const res = await handleSubmit(request, env, formId);
        // Attach CORS headers to submission response
        const headers = new Headers(res.headers);
        for (const [k, v] of Object.entries(corsHeaders(origin))) headers.set(k, v);
        return new Response(res.body, { status: res.status, headers });
      }
    }

    // ── GET /status/:submissionId ────────────────────────────────────────────
    const statusMatch = pathname.match(/^\/status\/([^/]+)$/);
    if (statusMatch && method === 'GET') {
      return handleStatus(request, env, decodeURIComponent(statusMatch[1]));
    }

    // ── Admin routes — require X-Admin-Key header ────────────────────────────
    const adminKey = request.headers.get('x-admin-key');
    if (pathname.startsWith('/admin')) {
      if (!env.ADMIN_API_KEY || adminKey !== env.ADMIN_API_KEY) {
        return json({ error: 'Unauthorized.' }, 401);
      }

      // GET /admin/submissions
      if (pathname === '/admin/submissions' && method === 'GET') {
        return handleAdminList(request, env);
      }

      // GET /admin/submissions/:id
      const detailMatch = pathname.match(/^\/admin\/submissions\/([^/]+)$/);
      if (detailMatch && method === 'GET') {
        return handleAdminDetail(request, env, decodeURIComponent(detailMatch[1]));
      }

      // POST /admin/forms  — register a form
      if (pathname === '/admin/forms' && method === 'POST') {
        return handleRegisterForm(request, env);
      }

      // GET /admin/tasks  — list KV pending tasks
      if (pathname === '/admin/tasks' && method === 'GET') {
        const { keys } = await env.TASKS_KV.list({ prefix: 'task:' });
        const tasks = await Promise.all(
          keys.map((k) => env.TASKS_KV.get<TaskRecord>(k.name, 'json'))
        );
        return json({ tasks: tasks.filter(Boolean) });
      }

      return json({ error: 'Admin route not found.' }, 404);
    }

    return json({ error: 'Not found.' }, 404);
  },
};
