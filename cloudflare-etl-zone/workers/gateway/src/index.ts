import { checkRateLimit } from '../../../shared/lib/rate-limit';
import { evaluateFilters } from '../../../shared/lib/filters';
import { verifyIncoming } from '../../../shared/lib/auth';
import type {
  GatewayEnv, SubmissionFields, SubmissionMetadata,
  FilterRuleRow, IncomingAuthConfig, RegisteredFormRow, IngressReason,
} from '../../../shared/types';

const MAX_FIELDS = 50, MAX_LEN = 10_000;

function nanoid(n = 21) {
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(crypto.getRandomValues(new Uint8Array(n)), b => c[b % c.length]!).join('');
}
function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}
function cors(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Form-Id',
    'Access-Control-Max-Age': '86400',
  };
}

async function parseFields(request: Request): Promise<[SubmissionFields, string]> {
  const raw = await request.text();
  const ct = request.headers.get('content-type') ?? '';
  const fields: SubmissionFields = {};

  const add = (k: string, v: string) => {
    const val = v.slice(0, MAX_LEN);
    const prev = fields[k];
    if (prev === undefined) fields[k] = val;
    else if (Array.isArray(prev)) prev.push(val);
    else fields[k] = [prev, val];
  };

  if (ct.includes('application/json')) {
    const body = JSON.parse(raw) as Record<string, unknown>;
    for (const [k, v] of Object.entries(body))
      Array.isArray(v) ? v.map(String).forEach(s => add(k, s)) : add(k, String(v ?? ''));
  } else {
    const params = new URLSearchParams(raw);
    params.forEach((v, k) => add(k, v));
  }

  if (Object.keys(fields).length > MAX_FIELDS) throw new Error(`Too many fields (max ${MAX_FIELDS})`);
  return [fields, raw];
}

async function logIngress(
  env: GatewayEnv, formId: string | null, method: string, path: string,
  origin: string, ip: string, statusCode: number, reason: IngressReason, durationMs: number,
) {
  try {
    await env.DB.prepare(
      `INSERT INTO ingress_log (form_id,method,path,origin,ip,status_code,reason,duration_ms) VALUES (?,?,?,?,?,?,?,?)`
    ).bind(formId, method, path, origin, ip, statusCode, reason, durationMs).run();
  } catch (_) { /* non-fatal */ }
}

async function handleSubmit(request: Request, env: GatewayEnv, formId: string): Promise<Response> {
  const start = Date.now();
  const origin = request.headers.get('origin') ?? 'unknown';
  const ip = request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? '0.0.0.0';
  const url = new URL(request.url);

  const done = (res: Response, reason: IngressReason) => {
    logIngress(env, formId, request.method, url.pathname, origin, ip, res.status, reason, Date.now() - start);
    const h = new Headers(res.headers);
    Object.entries(cors(origin)).forEach(([k, v]) => h.set(k, v));
    return new Response(res.body, { status: res.status, headers: h });
  };

  if (!(await checkRateLimit(env.RATE_KV, ip)))
    return done(json({ error: 'Too many requests.' }, 429), 'rate_limited');

  const form = await env.DB.prepare(
    'SELECT * FROM registered_forms WHERE form_id=? AND active=1'
  ).bind(formId).first<RegisteredFormRow>();

  // Parse body (need raw for HMAC verification)
  let fields: SubmissionFields, rawBody: string;
  try {
    [fields, rawBody] = await parseFields(request.clone());
  } catch (e) {
    return done(json({ error: (e as Error).message }, 400), 'parse_error');
  }

  if (Object.keys(fields).length === 0)
    return done(json({ error: 'No fields submitted.' }, 400), 'bad_request');

  // Incoming auth verification
  if (form?.verify_auth) {
    try {
      await verifyIncoming(JSON.parse(form.verify_auth) as IncomingAuthConfig, { rawBody, request, url });
    } catch (e) {
      return done(json({ error: `Auth failed: ${(e as Error).message}` }, 401), 'auth_failed');
    }
  }

  // Fast-path filter evaluation (before writing to D1)
  if (form) {
    const { results: rules } = await env.DB.prepare(
      'SELECT * FROM filter_rules WHERE form_id=? AND active=1 ORDER BY priority ASC'
    ).bind(formId).all<FilterRuleRow>();

    if (rules.length > 0) {
      const match = evaluateFilters(rules, { queryParams: url.searchParams, fields, headers: request.headers, origin, ip });
      if (match?.action === 'block')
        return done(json({ error: `Blocked by rule: ${match.rule.name}` }, 422), 'filter_blocked');
    }
  }

  // Write raw submission to D1
  const id = nanoid();
  const metadata: SubmissionMetadata = {
    ip, userAgent: request.headers.get('user-agent') ?? '',
    referrer: request.headers.get('referer') ?? '',
    timestamp: Date.now(), origin,
  };

  await env.DB.prepare(
    `INSERT INTO form_submissions (id,form_id,origin,raw_fields,metadata,status) VALUES (?,?,?,?,?,'pending')`
  ).bind(id, formId, origin, JSON.stringify(fields), JSON.stringify(metadata)).run();

  // Trigger ETL workflow (cross-script binding to etl worker)
  const instance = await env.ETL_WORKFLOW.create({
    id: `etl-${id}`,
    params: { submissionId: id, formId },
  });

  return done(json({ success: true, submissionId: id, workflowId: instance.id }, 202), 'accepted');
}

export default {
  async fetch(request: Request, env: GatewayEnv): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();
    const origin = request.headers.get('origin') ?? '*';

    if (method === 'OPTIONS')
      return new Response(null, { status: 204, headers: cors(origin) });

    if (pathname === '/health' && method === 'GET')
      return json({ status: 'ok', ts: Date.now() });

    if (method === 'POST') {
      const m = pathname.match(/^\/submit\/([^/]+)$/);
      const formId = m ? decodeURIComponent(m[1]!) : url.searchParams.get('form_id');
      if (formId) return handleSubmit(request, env, formId);
    }

    if (pathname.match(/^\/status\/([^/]+)$/)?.[1]) {
      const id = decodeURIComponent(pathname.split('/')[2]!);
      const row = await env.DB.prepare(
        'SELECT id,form_id,status,workflow_id,error_message,created_at,updated_at FROM form_submissions WHERE id=?'
      ).bind(id).first();
      return row ? json(row) : json({ error: 'Not found.' }, 404);
    }

    return json({ error: 'Not found.' }, 404);
  },
};
