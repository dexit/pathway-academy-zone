import { render } from './template';
import { applyOutboundAuth } from './auth';
import type { NotifyConfigRow, TemplateContext, OutboundAuthConfig } from '../types';

export interface DeliveryResult {
  configId: number;
  notifyUrl: string;
  statusCode: number | null;
  responseSnippet: string | null;
  error: string | null;
  durationMs: number;
}

/**
 * Delivers a submission to all active notify_configs for this form.
 * Logs each attempt to the delivery_log D1 table.
 * Returns results for all configs (caller decides on retry).
 */
export async function deliverAll(
  configs: NotifyConfigRow[],
  ctx: TemplateContext,
  db: D1Database,
  kv: KVNamespace,
): Promise<DeliveryResult[]> {
  const results: DeliveryResult[] = [];

  for (const cfg of configs) {
    const result = await deliverOne(cfg, ctx, kv);
    results.push(result);

    // Log to D1 — best effort, don't throw on failure
    try {
      await db.prepare(
        `INSERT INTO delivery_log
         (submission_id, form_id, notify_config_id, notify_url, attempt, status_code, response_snippet, error, duration_ms)
         VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?)`
      ).bind(
        ctx.submission.id,
        ctx.submission.form_id,
        cfg.id,
        result.notifyUrl,
        result.statusCode,
        result.responseSnippet,
        result.error,
        result.durationMs,
      ).run();
    } catch (_) { /* log write failure is non-fatal */ }
  }

  return results;
}

async function deliverOne(
  cfg: NotifyConfigRow,
  ctx: TemplateContext,
  kv: KVNamespace,
): Promise<DeliveryResult> {
  const notifyUrl = render(cfg.notify_url_template, ctx);
  const start = Date.now();

  try {
    const body = buildBody(cfg, ctx);
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Form-Receiver': '1' });

    // Extra static headers from config
    if (cfg.extra_headers) {
      const extra: Record<string, string> = JSON.parse(cfg.extra_headers);
      for (const [k, v] of Object.entries(extra)) headers.set(k, v);
    }

    // Apply outbound auth
    const authCfg: OutboundAuthConfig = cfg.auth_config
      ? JSON.parse(cfg.auth_config)
      : { type: 'none' };

    await applyOutboundAuth(authCfg, headers, body, kv, `oauth2_token:${cfg.form_id}:${cfg.id}`);

    const res = await fetch(notifyUrl, {
      method: cfg.http_method,
      headers,
      body: ['GET', 'HEAD'].includes(cfg.http_method) ? undefined : body,
    });

    const responseSnippet = (await res.text()).slice(0, 512);

    return {
      configId: cfg.id,
      notifyUrl,
      statusCode: res.status,
      responseSnippet,
      error: res.ok ? null : `HTTP ${res.status}`,
      durationMs: Date.now() - start,
    };
  } catch (err) {
    return {
      configId: cfg.id,
      notifyUrl,
      statusCode: null,
      responseSnippet: null,
      error: (err as Error).message,
      durationMs: Date.now() - start,
    };
  }
}

function buildBody(cfg: NotifyConfigRow, ctx: TemplateContext): string {
  if (!cfg.body_template) {
    // Default: full submission payload
    return JSON.stringify({
      event: 'form.submission',
      submissionId: ctx.submission.id,
      formId: ctx.submission.form_id,
      fields: ctx.fields,
      metadata: ctx.metadata,
      timestamp: ctx.metadata.timestamp,
    });
  }
  // User-defined body template (rendered as string, expected to be valid JSON)
  return render(cfg.body_template, ctx);
}
