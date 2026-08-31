import { checkRateLimit } from './lib/rate-limit';
import { evaluateFilters } from './lib/filters';
import { verifyIncoming } from './lib/auth';
import { adminHtml } from './admin/ui';
import type {
  Env,
  SubmissionFields,
  SubmissionMetadata,
  FilterRuleRow,
  IncomingAuthConfig,
  RegisteredFormRow,
} from './types';

export { FormProcessingWorkflow } from './workflow';

// ── Constants ────────────────────────────────────────────────────────────────
const MAX_FIELDS = 50;
const MAX_FIELD_LEN = 10_000;

// ── Utilities ────────────────────────────────────────────────────────────────

function nanoid(n = 21): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), b => chars[b % chars.length]!).join('');
}

function json(data: unknown, status = 200, extraHeaders?: HeadersInit): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  });
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Form-Id',
    'Access-Control-Max-Age': '86400',
  };
}

async function parseFields(request: Request): Promise<[SubmissionFields, string]> {
  const rawBody = await request.text();
  const ct = request.headers.get('content-type') ?? '';
  const fields: SubmissionFields = {};

  const addField = (k: string, v: string) => {
    const truncated = v.slice(0, MAX_FIELD_LEN);
    const prev = fields[k];
    if (prev === undefined) fields[k] = truncated;
    else if (Array.isArray(prev)) prev.push(truncated);
    else fields[k] = [prev, truncated];
  };

  if (ct.includes('application/json')) {
    const body = JSON.parse(rawBody) as Record<string, unknown>;
    for (const [k, v] of Object.entries(body)) {
      if (Array.isArray(v)) v.map(String).forEach(s => addField(k, s));
      else addField(k, String(v ?? ''));
    }
  } else {
    const fd = ct.includes('multipart/form-data')
      ? await new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: rawBody,
        }).formData().catch(() => new FormData())
      : (() => { const p = new URLSearchParams(rawBody); const fd = new FormData(); p.forEach((v, k) => fd.append(k, v)); return fd; })();

    for (const [k, v] of (fd as FormData).entries()) {
      if (typeof v === 'string') addField(k, v);
    }
  }

  if (Object.keys(fields).length > MAX_FIELDS) throw new Error(`Too many fields (max ${MAX_FIELDS})`);
  return [fields, rawBody];
}

// ── Public routes ─────────────────────────────────────────────────────────────

async function handleSubmit(request: Request, env: Env, formId: string): Promise<Response> {
  const origin = request.headers.get('origin') ?? 'unknown';
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? '0.0.0.0';
  const url = new URL(request.url);

  // Rate limit (KV — fast, eventually consistent; fine for this use)
  if (!(await checkRateLimit(env.RATE_KV, ip))) {
    return json({ error: 'Too many requests.' }, 429);
  }

  // Parse body — we need the raw string for HMAC verification
  let fields: SubmissionFields, rawBody: string;
  try {
    [fields, rawBody] = await parseFields(request.clone());
  } catch (err) {
    return json({ error: (err as Error).message }, 400);
  }

  if (Object.keys(fields).length === 0) {
    return json({ error: 'No fields in submission.' }, 400);
  }

  // Load registered form
  const form = await env.DB.prepare(
    'SELECT * FROM registered_forms WHERE form_id=? AND active=1'
  ).bind(formId).first<RegisteredFormRow>();

  // Verify incoming auth signature (if configured)
  if (form?.verify_auth) {
    const cfg: IncomingAuthConfig = JSON.parse(form.verify_auth);
    try {
      await verifyIncoming(cfg, { rawBody, request, url });
    } catch (err) {
      return json({ error: `Auth verification failed: ${(err as Error).message}` }, 401);
    }
  }

  // Evaluate pre-ingestion filter rules (fast-path block before writing to D1)
  if (form) {
    const { results: rules } = await env.DB.prepare(
      'SELECT * FROM filter_rules WHERE form_id=? AND active=1 ORDER BY priority ASC'
    ).bind(formId).all<FilterRuleRow>();

    if (rules.length > 0) {
      const result = evaluateFilters(rules, {
        queryParams: url.searchParams,
        fields,
        headers: request.headers,
        origin,
        ip,
      });

      if (result?.action === 'block') {
        return json({ error: `Submission blocked by filter rule: ${result.rule.name}` }, 422);
      }
    }
  }

  // Persist to D1
  const id = nanoid();
  const metadata: SubmissionMetadata = {
    ip, userAgent: request.headers.get('user-agent') ?? '',
    referrer: request.headers.get('referer') ?? '',
    timestamp: Date.now(), origin,
  };

  await env.DB.prepare(
    `INSERT INTO form_submissions (id, form_id, origin, fields, metadata, status)
     VALUES (?, ?, ?, ?, ?, 'pending')`
  ).bind(id, formId, origin, JSON.stringify(fields), JSON.stringify(metadata)).run();

  // Trigger Workflow for background processing (filter re-eval + delivery)
  const instance = await env.FORM_WORKFLOW.create({
    id: `sub-${id}`,
    params: { submissionId: id, formId },
  });

  return json({ success: true, submissionId: id, workflowId: instance.id }, 202);
}

async function handleStatus(env: Env, submissionId: string): Promise<Response> {
  const row = await env.DB.prepare(
    'SELECT id, form_id, status, workflow_id, error_message, created_at, updated_at FROM form_submissions WHERE id=?'
  ).bind(submissionId).first();
  if (!row) return json({ error: 'Not found.' }, 404);
  return json(row);
}

// ── Admin API routes ──────────────────────────────────────────────────────────

async function handleAdmin(request: Request, env: Env, pathname: string): Promise<Response> {
  const method = request.method.toUpperCase();
  const url = new URL(request.url);

  // ── /admin/api/stats ────────────────────────────────────────────────────────
  if (pathname === '/stats' && method === 'GET') {
    const [total, today, pending, done, failed, recent] = await env.DB.batch([
      env.DB.prepare('SELECT COUNT(*) as c FROM form_submissions'),
      env.DB.prepare("SELECT COUNT(*) as c FROM form_submissions WHERE created_at >= date('now')"),
      env.DB.prepare("SELECT COUNT(*) as c FROM form_submissions WHERE status='pending'"),
      env.DB.prepare("SELECT COUNT(*) as c FROM form_submissions WHERE status='done'"),
      env.DB.prepare("SELECT COUNT(*) as c FROM form_submissions WHERE status='failed'"),
      env.DB.prepare('SELECT id, form_id, status, origin, created_at FROM form_submissions ORDER BY created_at DESC LIMIT 10'),
    ]);
    return json({
      total: (total.results[0] as { c: number }).c,
      today: (today.results[0] as { c: number }).c,
      pending: (pending.results[0] as { c: number }).c,
      done: (done.results[0] as { c: number }).c,
      failed: (failed.results[0] as { c: number }).c,
      recent: recent.results,
    });
  }

  // ── /admin/api/submissions ───────────────────────────────────────────────────
  if (pathname === '/submissions' && method === 'GET') {
    const formId = url.searchParams.get('form_id');
    const status = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20'), 200);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');

    let q = 'SELECT id, form_id, origin, status, created_at, updated_at FROM form_submissions WHERE 1=1';
    const b: (string | number)[] = [];
    if (formId) { q += ' AND form_id=?'; b.push(formId); }
    if (status)  { q += ' AND status=?';  b.push(status); }
    q += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const { results } = await env.DB.prepare(q).bind(...b, limit, offset).all();
    const tot = await env.DB.prepare(
      'SELECT COUNT(*) as c FROM form_submissions WHERE 1=1' +
      (formId ? ' AND form_id=?' : '') + (status ? ' AND status=?' : '')
    ).bind(...b).first<{ c: number }>();

    return json({ submissions: results, total: tot?.c ?? 0, limit, offset });
  }

  // ── /admin/api/submissions/:id ───────────────────────────────────────────────
  const subMatch = pathname.match(/^\/submissions\/([^/]+)$/);
  if (subMatch) {
    const id = decodeURIComponent(subMatch[1]!);
    if (method === 'GET') {
      const row = await env.DB.prepare('SELECT * FROM form_submissions WHERE id=?').bind(id).first();
      return row ? json(row) : json({ error: 'Not found.' }, 404);
    }
  }

  // ── /admin/api/forms ─────────────────────────────────────────────────────────
  if (pathname === '/forms') {
    if (method === 'GET') {
      const { results } = await env.DB.prepare('SELECT * FROM registered_forms ORDER BY created_at DESC').all();
      return json({ forms: results });
    }
    if (method === 'POST') {
      const body = await request.json<{
        form_id: string; name: string;
        allowed_origins?: string[];
        verify_auth?: object;
      }>();
      if (!body.form_id || !body.name) return json({ error: 'form_id and name required.' }, 400);

      await env.DB.prepare(
        `INSERT INTO registered_forms (form_id, name, allowed_origins, verify_auth)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(form_id) DO UPDATE SET
           name=excluded.name, allowed_origins=excluded.allowed_origins, verify_auth=excluded.verify_auth`
      ).bind(
        body.form_id, body.name,
        JSON.stringify(body.allowed_origins ?? ['*']),
        body.verify_auth ? JSON.stringify(body.verify_auth) : null,
      ).run();
      return json({ success: true });
    }
  }

  // ── /admin/api/forms/:formId/filters ─────────────────────────────────────────
  const filterBase = pathname.match(/^\/forms\/([^/]+)\/filters$/);
  if (filterBase) {
    const formId = decodeURIComponent(filterBase[1]!);
    if (method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM filter_rules WHERE form_id=? ORDER BY priority ASC'
      ).bind(formId).all();
      return json({ rules: results });
    }
    if (method === 'POST') {
      const b = await request.json<{
        name: string; source: string; pattern: string;
        value_pattern?: string | null; action: string; priority?: number;
      }>();
      await env.DB.prepare(
        `INSERT INTO filter_rules (form_id, name, source, pattern, value_pattern, action, priority)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(formId, b.name, b.source, b.pattern, b.value_pattern ?? null, b.action, b.priority ?? 100).run();
      return json({ success: true });
    }
  }

  const filterItem = pathname.match(/^\/forms\/([^/]+)\/filters\/(\d+)$/);
  if (filterItem && method === 'DELETE') {
    const [, formId, id] = filterItem;
    await env.DB.prepare('DELETE FROM filter_rules WHERE id=? AND form_id=?').bind(Number(id), formId).run();
    return json({ success: true });
  }

  // ── /admin/api/forms/:formId/notify-configs ───────────────────────────────────
  const notifyBase = pathname.match(/^\/forms\/([^/]+)\/notify-configs$/);
  if (notifyBase) {
    const formId = decodeURIComponent(notifyBase[1]!);
    if (method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM notify_configs WHERE form_id=? ORDER BY created_at DESC'
      ).bind(formId).all();
      return json({ configs: results });
    }
    if (method === 'POST') {
      const b = await request.json<{
        name: string; notify_url_template: string; http_method?: string;
        extra_headers?: string | null; body_template?: string | null;
        auth_type: string; auth_config?: object | null;
      }>();
      await env.DB.prepare(
        `INSERT INTO notify_configs
         (form_id, name, notify_url_template, http_method, extra_headers, body_template, auth_type, auth_config)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        formId, b.name, b.notify_url_template, b.http_method ?? 'POST',
        b.extra_headers ?? null, b.body_template ?? null,
        b.auth_type, b.auth_config ? JSON.stringify(b.auth_config) : null,
      ).run();
      return json({ success: true });
    }
  }

  const notifyItem = pathname.match(/^\/forms\/([^/]+)\/notify-configs\/(\d+)$/);
  if (notifyItem && method === 'DELETE') {
    const [, formId, id] = notifyItem;
    await env.DB.prepare('DELETE FROM notify_configs WHERE id=? AND form_id=?').bind(Number(id), formId).run();
    return json({ success: true });
  }

  // ── /admin/api/delivery-log ───────────────────────────────────────────────────
  if (pathname === '/delivery-log' && method === 'GET') {
    const formId = url.searchParams.get('form_id');
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20'), 200);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');

    let q = 'SELECT * FROM delivery_log WHERE 1=1';
    const b: (string | number)[] = [];
    if (formId) { q += ' AND form_id=?'; b.push(formId); }
    q += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const [{ results }, tot] = await Promise.all([
      env.DB.prepare(q).bind(...b, limit, offset).all(),
      env.DB.prepare('SELECT COUNT(*) as c FROM delivery_log WHERE 1=1' + (formId ? ' AND form_id=?' : '')).bind(...b).first<{ c: number }>(),
    ]);
    return json({ logs: results, total: tot?.c ?? 0, limit, offset });
  }

  return json({ error: 'Admin route not found.' }, 404);
}

// ── Main fetch handler ────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();
    const origin = request.headers.get('origin') ?? '*';

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    // ── Health ──────────────────────────────────────────────────────────────
    if (pathname === '/health' && method === 'GET') {
      return json({ status: 'ok', ts: Date.now() });
    }

    // ── Submit: POST /submit/:formId  or  /submit?form_id=x ─────────────────
    if (method === 'POST') {
      const m = pathname.match(/^\/submit\/([^/]+)$/);
      const formId = m ? decodeURIComponent(m[1]!) : url.searchParams.get('form_id');
      if (formId) {
        const res = await handleSubmit(request, env, formId);
        const h = new Headers(res.headers);
        Object.entries(corsHeaders(origin)).forEach(([k, v]) => h.set(k, v));
        return new Response(res.body, { status: res.status, headers: h });
      }
    }

    // ── Status: GET /status/:id ─────────────────────────────────────────────
    const sm = pathname.match(/^\/status\/([^/]+)$/);
    if (sm && method === 'GET') {
      return handleStatus(env, decodeURIComponent(sm[1]!));
    }

    // ── Admin panel UI ───────────────────────────────────────────────────────
    if (pathname === '/admin' || pathname === '/admin/') {
      return new Response(adminHtml(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    // ── Admin API: /admin/api/* ──────────────────────────────────────────────
    if (pathname.startsWith('/admin/api')) {
      const adminKey = request.headers.get('x-admin-key');
      if (!env.ADMIN_API_KEY || adminKey !== env.ADMIN_API_KEY) {
        return json({ error: 'Unauthorized.' }, 401);
      }
      const apiPath = pathname.replace('/admin/api', '') || '/';
      return handleAdmin(request, env, apiPath);
    }

    return json({ error: 'Not found.' }, 404);
  },
};
