import { render } from './template';
import { applyOutboundAuth } from './auth';
import type { NotifyConfigRow, TemplateContext, OutboundAuthConfig } from '../types';

export interface DeliveryResult {
  configId: number; notifyUrl: string;
  statusCode: number | null; responseSnippet: string | null;
  error: string | null; durationMs: number;
}

export async function deliverAll(
  configs: NotifyConfigRow[], ctx: TemplateContext,
  db: D1Database, kv: KVNamespace,
): Promise<DeliveryResult[]> {
  const results: DeliveryResult[] = [];
  for (const cfg of configs) {
    const r = await deliverOne(cfg, ctx, kv);
    results.push(r);
    try {
      await db.prepare(
        `INSERT INTO delivery_log (submission_id,form_id,notify_config_id,notify_url,attempt,status_code,response_snippet,error,duration_ms)
         VALUES (?,?,?,?,1,?,?,?,?)`
      ).bind(ctx.submission.id, ctx.submission.form_id, cfg.id, r.notifyUrl, r.statusCode, r.responseSnippet, r.error, r.durationMs).run();
    } catch (_) { /* non-fatal */ }
  }
  return results;
}

async function deliverOne(cfg: NotifyConfigRow, ctx: TemplateContext, kv: KVNamespace): Promise<DeliveryResult> {
  const notifyUrl = render(cfg.notify_url_template, ctx);
  const start = Date.now();
  try {
    const body = cfg.body_template
      ? render(cfg.body_template, ctx)
      : JSON.stringify({ event: 'form.submission', submissionId: ctx.submission.id, formId: ctx.submission.form_id, fields: ctx.fields, metadata: ctx.metadata, timestamp: ctx.metadata.timestamp });
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Form-ETL': '1' });
    if (cfg.extra_headers) Object.entries(JSON.parse(cfg.extra_headers) as Record<string,string>).forEach(([k, v]) => headers.set(k, v));
    const authCfg: OutboundAuthConfig = cfg.auth_config ? JSON.parse(cfg.auth_config) : { type: 'none' };
    await applyOutboundAuth(authCfg, headers, body, kv, `oauth2:${cfg.form_id}:${cfg.id}`);
    const res = await fetch(notifyUrl, { method: cfg.http_method, headers, body: ['GET','HEAD'].includes(cfg.http_method) ? undefined : body });
    const snippet = (await res.text()).slice(0, 512);
    return { configId: cfg.id, notifyUrl, statusCode: res.status, responseSnippet: snippet, error: res.ok ? null : `HTTP ${res.status}`, durationMs: Date.now() - start };
  } catch (e) {
    return { configId: cfg.id, notifyUrl, statusCode: null, responseSnippet: null, error: (e as Error).message, durationMs: Date.now() - start };
  }
}
