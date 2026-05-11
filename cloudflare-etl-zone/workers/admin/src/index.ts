import { adminHtml } from './ui';
import type { AdminEnv } from '../../../shared/types';

function json(d: unknown, s = 200) {
  return new Response(JSON.stringify(d), { status: s, headers: { 'Content-Type': 'application/json' } });
}

async function route(request: Request, env: AdminEnv, path: string): Promise<Response> {
  const url = new URL(request.url);
  const method = request.method.toUpperCase();

  // ── Stats / Dashboard ──────────────────────────────────────────────────────
  if (path === '/stats' && method === 'GET') {
    const [total, today, pending, done, failed, blocked, ingressToday, deliveryOk, deliveryFail] = await env.DB.batch([
      env.DB.prepare('SELECT COUNT(*) c FROM form_submissions'),
      env.DB.prepare("SELECT COUNT(*) c FROM form_submissions WHERE created_at>=date('now')"),
      env.DB.prepare("SELECT COUNT(*) c FROM form_submissions WHERE status='pending'"),
      env.DB.prepare("SELECT COUNT(*) c FROM form_submissions WHERE status='done'"),
      env.DB.prepare("SELECT COUNT(*) c FROM form_submissions WHERE status='failed'"),
      env.DB.prepare("SELECT COUNT(*) c FROM form_submissions WHERE status='blocked'"),
      env.DB.prepare("SELECT COUNT(*) c FROM ingress_log WHERE created_at>=date('now')"),
      env.DB.prepare("SELECT COUNT(*) c FROM delivery_log WHERE status_code<300"),
      env.DB.prepare("SELECT COUNT(*) c FROM delivery_log WHERE status_code>=300 OR status_code IS NULL"),
    ]);
    const n = (r: D1Result) => (r.results[0] as { c: number }).c;
    const recent = await env.DB.prepare(
      'SELECT id,form_id,status,origin,created_at FROM form_submissions ORDER BY created_at DESC LIMIT 10'
    ).all();
    return json({
      submissions: { total: n(total), today: n(today), pending: n(pending), done: n(done), failed: n(failed), blocked: n(blocked) },
      ingress: { today: n(ingressToday) },
      delivery: { ok: n(deliveryOk), fail: n(deliveryFail) },
      recent: recent.results,
    });
  }

  // ── Submissions ───────────────────────────────────────────────────────────
  if (path === '/submissions' && method === 'GET') {
    const formId = url.searchParams.get('form_id'), status = url.searchParams.get('status');
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '20'), 200);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');
    let q = 'SELECT id,form_id,origin,status,created_at,updated_at FROM form_submissions WHERE 1=1';
    const b: (string | number)[] = [];
    if (formId) { q += ' AND form_id=?'; b.push(formId); }
    if (status)  { q += ' AND status=?';  b.push(status); }
    q += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const { results } = await env.DB.prepare(q).bind(...b, limit, offset).all();
    const tot = await env.DB.prepare('SELECT COUNT(*) c FROM form_submissions WHERE 1=1' + (formId?' AND form_id=?':'') + (status?' AND status=?':'')).bind(...b).first<{c:number}>();
    return json({ submissions: results, total: tot?.c ?? 0, limit, offset });
  }

  const subId = path.match(/^\/submissions\/([^/]+)$/)?.[1];
  if (subId && method === 'GET') {
    const row = await env.DB.prepare('SELECT * FROM form_submissions WHERE id=?').bind(subId).first();
    if (!row) return json({ error: 'Not found.' }, 404);
    const logs = await env.DB.prepare('SELECT * FROM etl_log WHERE submission_id=? ORDER BY id').bind(subId).all();
    const deliveries = await env.DB.prepare('SELECT * FROM delivery_log WHERE submission_id=? ORDER BY id').bind(subId).all();
    return json({ submission: row, etlLog: logs.results, deliveries: deliveries.results });
  }

  // ── Forms CRUD ─────────────────────────────────────────────────────────────
  if (path === '/forms') {
    if (method === 'GET') { const { results } = await env.DB.prepare('SELECT * FROM registered_forms ORDER BY created_at DESC').all(); return json({ forms: results }); }
    if (method === 'POST') {
      const b = await request.json<{ form_id: string; name: string; allowed_origins?: string[]; verify_auth?: object }>();
      if (!b.form_id || !b.name) return json({ error: 'form_id and name required.' }, 400);
      await env.DB.prepare(`INSERT INTO registered_forms (form_id,name,allowed_origins,verify_auth) VALUES (?,?,?,?) ON CONFLICT(form_id) DO UPDATE SET name=excluded.name,allowed_origins=excluded.allowed_origins,verify_auth=excluded.verify_auth`)
        .bind(b.form_id, b.name, JSON.stringify(b.allowed_origins ?? ['*']), b.verify_auth ? JSON.stringify(b.verify_auth) : null).run();
      return json({ success: true });
    }
  }

  // ── Mapping rules ──────────────────────────────────────────────────────────
  const mapBase = path.match(/^\/forms\/([^/]+)\/mapping-rules$/);
  if (mapBase) {
    const fid = decodeURIComponent(mapBase[1]!);
    if (method === 'GET') { const { results } = await env.DB.prepare('SELECT * FROM mapping_rules WHERE form_id=? ORDER BY priority').bind(fid).all(); return json({ rules: results }); }
    if (method === 'POST') {
      const b = await request.json<Record<string, unknown>>();
      await env.DB.prepare('INSERT INTO mapping_rules (form_id,name,source_expr,target_field,transform,transform_config,default_value,required,priority) VALUES (?,?,?,?,?,?,?,?,?)')
        .bind(fid, b['name'], b['source_expr'], b['target_field'], b['transform'] ?? 'passthrough', b['transform_config'] ? JSON.stringify(b['transform_config']) : null, b['default_value'] ?? null, b['required'] ? 1 : 0, b['priority'] ?? 100).run();
      return json({ success: true });
    }
  }
  const mapItem = path.match(/^\/forms\/([^/]+)\/mapping-rules\/(\d+)$/);
  if (mapItem) {
    const [, fid, id] = mapItem;
    if (method === 'PUT') { const b = await request.json<Record<string, unknown>>(); await env.DB.prepare('UPDATE mapping_rules SET name=?,source_expr=?,target_field=?,transform=?,transform_config=?,default_value=?,required=?,priority=? WHERE id=? AND form_id=?').bind(b['name'], b['source_expr'], b['target_field'], b['transform'], b['transform_config'] ? JSON.stringify(b['transform_config']) : null, b['default_value'] ?? null, b['required'] ? 1 : 0, b['priority'] ?? 100, Number(id), fid).run(); return json({ success: true }); }
    if (method === 'DELETE') { await env.DB.prepare('DELETE FROM mapping_rules WHERE id=? AND form_id=?').bind(Number(id), fid).run(); return json({ success: true }); }
  }

  // ── Load targets ───────────────────────────────────────────────────────────
  const ltBase = path.match(/^\/forms\/([^/]+)\/load-targets$/);
  if (ltBase) {
    const fid = decodeURIComponent(ltBase[1]!);
    if (method === 'GET') { const { results } = await env.DB.prepare('SELECT * FROM load_targets WHERE form_id=? ORDER BY id').bind(fid).all(); return json({ targets: results }); }
    if (method === 'POST') {
      const b = await request.json<Record<string, unknown>>();
      await env.DB.prepare('INSERT INTO load_targets (form_id,name,db_binding,target_table,upsert_key,field_allowlist) VALUES (?,?,?,?,?,?)')
        .bind(fid, b['name'], b['db_binding'] ?? 'DB', b['target_table'], b['upsert_key'] ?? null, b['field_allowlist'] ? JSON.stringify(b['field_allowlist']) : null).run();
      return json({ success: true });
    }
  }
  const ltItem = path.match(/^\/forms\/([^/]+)\/load-targets\/(\d+)$/);
  if (ltItem && method === 'DELETE') { await env.DB.prepare('DELETE FROM load_targets WHERE id=? AND form_id=?').bind(Number(ltItem[2]), ltItem[1]).run(); return json({ success: true }); }

  // ── Filter rules ───────────────────────────────────────────────────────────
  const flBase = path.match(/^\/forms\/([^/]+)\/filters$/);
  if (flBase) {
    const fid = decodeURIComponent(flBase[1]!);
    if (method === 'GET') { const { results } = await env.DB.prepare('SELECT * FROM filter_rules WHERE form_id=? ORDER BY priority').bind(fid).all(); return json({ rules: results }); }
    if (method === 'POST') {
      const b = await request.json<Record<string, unknown>>();
      await env.DB.prepare('INSERT INTO filter_rules (form_id,name,source,pattern,value_pattern,action,priority) VALUES (?,?,?,?,?,?,?)')
        .bind(fid, b['name'], b['source'], b['pattern'], b['value_pattern'] ?? null, b['action'] ?? 'block', b['priority'] ?? 100).run();
      return json({ success: true });
    }
  }
  const flItem = path.match(/^\/forms\/([^/]+)\/filters\/(\d+)$/);
  if (flItem && method === 'DELETE') { await env.DB.prepare('DELETE FROM filter_rules WHERE id=? AND form_id=?').bind(Number(flItem[2]), flItem[1]).run(); return json({ success: true }); }

  // ── Notify configs ─────────────────────────────────────────────────────────
  const ncBase = path.match(/^\/forms\/([^/]+)\/notify-configs$/);
  if (ncBase) {
    const fid = decodeURIComponent(ncBase[1]!);
    if (method === 'GET') { const { results } = await env.DB.prepare('SELECT * FROM notify_configs WHERE form_id=? ORDER BY id').bind(fid).all(); return json({ configs: results }); }
    if (method === 'POST') {
      const b = await request.json<Record<string, unknown>>();
      await env.DB.prepare('INSERT INTO notify_configs (form_id,name,notify_url_template,http_method,extra_headers,body_template,auth_type,auth_config) VALUES (?,?,?,?,?,?,?,?)')
        .bind(fid, b['name'], b['notify_url_template'], b['http_method'] ?? 'POST', b['extra_headers'] ?? null, b['body_template'] ?? null, b['auth_type'] ?? 'none', b['auth_config'] ? JSON.stringify(b['auth_config']) : null).run();
      return json({ success: true });
    }
  }
  const ncItem = path.match(/^\/forms\/([^/]+)\/notify-configs\/(\d+)$/);
  if (ncItem && method === 'DELETE') { await env.DB.prepare('DELETE FROM notify_configs WHERE id=? AND form_id=?').bind(Number(ncItem[2]), ncItem[1]).run(); return json({ success: true }); }

  // ── Observability logs ─────────────────────────────────────────────────────
  if (path === '/ingress-log' && method === 'GET') {
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 500);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');
    const fid = url.searchParams.get('form_id'), reason = url.searchParams.get('reason');
    let q = 'SELECT * FROM ingress_log WHERE 1=1'; const b: (string|number)[] = [];
    if (fid) { q += ' AND form_id=?'; b.push(fid); }
    if (reason) { q += ' AND reason=?'; b.push(reason); }
    q += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    const { results } = await env.DB.prepare(q).bind(...b, limit, offset).all();
    const tot = await env.DB.prepare('SELECT COUNT(*) c FROM ingress_log WHERE 1=1' + (fid?' AND form_id=?':'') + (reason?' AND reason=?':'')).bind(...b).first<{c:number}>();
    return json({ logs: results, total: tot?.c ?? 0, limit, offset });
  }

  if (path === '/etl-log' && method === 'GET') {
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 500);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');
    const fid = url.searchParams.get('form_id'), step = url.searchParams.get('step');
    let q = 'SELECT * FROM etl_log WHERE 1=1'; const b: (string|number)[] = [];
    if (fid) { q += ' AND form_id=?'; b.push(fid); }
    if (step) { q += ' AND step=?'; b.push(step); }
    q += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    const { results } = await env.DB.prepare(q).bind(...b, limit, offset).all();
    const tot = await env.DB.prepare('SELECT COUNT(*) c FROM etl_log WHERE 1=1' + (fid?' AND form_id=?':'') + (step?' AND step=?':'')).bind(...b).first<{c:number}>();
    return json({ logs: results, total: tot?.c ?? 0, limit, offset });
  }

  if (path === '/delivery-log' && method === 'GET') {
    const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '50'), 500);
    const offset = parseInt(url.searchParams.get('offset') ?? '0');
    const fid = url.searchParams.get('form_id');
    let q = 'SELECT * FROM delivery_log WHERE 1=1'; const b: (string|number)[] = [];
    if (fid) { q += ' AND form_id=?'; b.push(fid); }
    q += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    const { results } = await env.DB.prepare(q).bind(...b, limit, offset).all();
    const tot = await env.DB.prepare('SELECT COUNT(*) c FROM delivery_log' + (fid?' WHERE form_id=?':'')).bind(...b).first<{c:number}>();
    return json({ logs: results, total: tot?.c ?? 0, limit, offset });
  }

  // ── D1 Browser ─────────────────────────────────────────────────────────────
  if (path === '/d1/tables' && method === 'GET') {
    const { results } = await env.DB.prepare("SELECT name,type FROM sqlite_master WHERE type IN ('table','view') ORDER BY name").all();
    return json({ tables: results });
  }
  if (path === '/d1/schema' && method === 'GET') {
    const table = url.searchParams.get('table');
    if (!table) return json({ error: 'table required' }, 400);
    const { results } = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
    const idxRes = await env.DB.prepare(`PRAGMA index_list(${table})`).all();
    return json({ columns: results, indexes: idxRes.results });
  }
  if (path === '/d1/query' && method === 'POST') {
    const { sql, params: p } = await request.json<{ sql: string; params?: (string|number|null)[] }>();
    if (!sql) return json({ error: 'sql required' }, 400);
    // Block mutations for safety (admin reads only via this endpoint)
    const upper = sql.trim().toUpperCase();
    if (['DROP ','DELETE ','TRUNCATE ','ALTER ','UPDATE '].some(k => upper.startsWith(k))) {
      return json({ error: 'Mutations blocked via D1 browser. Use the /d1/exec endpoint.' }, 403);
    }
    try {
      const { results, meta } = await env.DB.prepare(sql).bind(...(p ?? [])).all();
      return json({ results, meta });
    } catch (e) { return json({ error: (e as Error).message }, 400); }
  }
  if (path === '/d1/exec' && method === 'POST') {
    // Full exec with confirmation for mutations
    const { sql, params: p, confirm } = await request.json<{ sql: string; params?: (string|number|null)[]; confirm?: boolean }>();
    if (!sql) return json({ error: 'sql required' }, 400);
    const upper = sql.trim().toUpperCase();
    const isMutation = ['DROP ','DELETE ','TRUNCATE ','ALTER ','UPDATE '].some(k => upper.startsWith(k));
    if (isMutation && !confirm) return json({ error: 'Set confirm:true to execute mutations.' }, 400);
    try {
      const result = await env.DB.prepare(sql).bind(...(p ?? [])).run();
      return json({ success: result.success, meta: result.meta });
    } catch (e) { return json({ error: (e as Error).message }, 400); }
  }

  // ── KV Browser ────────────────────────────────────────────────────────────
  if (path === '/kv/list' && method === 'GET') {
    const ns = url.searchParams.get('ns') ?? 'TASKS';
    const prefix = url.searchParams.get('prefix') ?? '';
    const kv = ns === 'RATE' ? env.RATE_KV : env.TASKS_KV;
    const { keys, list_complete } = await kv.list({ prefix, limit: 100 });
    return json({ keys: keys.map(k => ({ name: k.name, expiration: k.expiration, metadata: k.metadata })), list_complete });
  }
  if (path === '/kv/get' && method === 'GET') {
    const ns = url.searchParams.get('ns') ?? 'TASKS', key = url.searchParams.get('key') ?? '';
    const kv = ns === 'RATE' ? env.RATE_KV : env.TASKS_KV;
    const { value, metadata } = await kv.getWithMetadata(key);
    return json({ key, value, metadata });
  }
  if (path === '/kv/delete' && method === 'DELETE') {
    const ns = url.searchParams.get('ns') ?? 'TASKS', key = url.searchParams.get('key') ?? '';
    const kv = ns === 'RATE' ? env.RATE_KV : env.TASKS_KV;
    await kv.delete(key);
    return json({ success: true });
  }

  return json({ error: 'Not found.' }, 404);
}

export default {
  async fetch(request: Request, env: AdminEnv): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // Serve admin UI
    if (pathname === '/' || pathname === '/admin') {
      return new Response(adminHtml(), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    // Admin API — require X-Admin-Key
    if (pathname.startsWith('/api/')) {
      if (request.headers.get('x-admin-key') !== env.ADMIN_API_KEY) {
        return new Response(JSON.stringify({ error: 'Unauthorized.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
      }
      return route(request, env, pathname.slice(4)); // strip /api
    }

    return new Response('Not found', { status: 404 });
  },
};
