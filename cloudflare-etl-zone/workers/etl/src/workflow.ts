import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent, NonRetryableError } from 'cloudflare:workers';
import { applyMappings, buildInsertStatement } from './transform';
import { deliverAll } from '../../../shared/lib/notify';
import { evaluateFilters } from '../../../shared/lib/filters';
import type {
  EtlEnv, EtlWorkflowParams, FormSubmissionRow, MappingRuleRow,
  LoadTargetRow, FilterRuleRow, NotifyConfigRow, SubmissionFields, SubmissionMetadata,
  TemplateContext, EtlStep, EtlStepStatus, Dto,
} from '../../../shared/types';

export class FormETLWorkflow extends WorkflowEntrypoint<EtlEnv, EtlWorkflowParams> {
  async run(event: WorkflowEvent<EtlWorkflowParams>, step: WorkflowStep) {
    const { submissionId, formId } = event.params;
    const wfId = event.instanceId;

    const log = (s: EtlStep, st: EtlStepStatus, inp?: unknown, out?: unknown, err?: string, ms?: number) =>
      this.env.DB.prepare(
        `INSERT INTO etl_log (submission_id,form_id,workflow_instance_id,step,status,input_snapshot,output_snapshot,error,duration_ms)
         VALUES (?,?,?,?,?,?,?,?,?)`
      ).bind(
        submissionId, formId, wfId, s, st,
        inp !== undefined ? JSON.stringify(inp).slice(0, 2048) : null,
        out !== undefined ? JSON.stringify(out).slice(0, 2048) : null,
        err ?? null, ms ?? null,
      ).run().catch(() => {});

    // ── Mark processing ────────────────────────────────────────────────────────
    await step.do('mark-processing', r(3), async () => {
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status='processing',workflow_id=?,updated_at=datetime('now') WHERE id=?`
      ).bind(wfId, submissionId).run();
    });

    // ── Extract ───────────────────────────────────────────────────────────────
    const row = await step.do('extract', r(3), async () => {
      const t = Date.now();
      const r = await this.env.DB.prepare('SELECT * FROM form_submissions WHERE id=?').bind(submissionId).first<FormSubmissionRow>();
      if (!r) { await log('extract', 'error', null, null, 'Row not found'); throw new NonRetryableError('Submission not found'); }
      await log('extract', 'ok', { id: r.id }, { status: r.status }, undefined, Date.now() - t);
      return r;
    });

    const fields: SubmissionFields = JSON.parse(row.raw_fields);
    const metadata: SubmissionMetadata = JSON.parse(row.metadata);
    const subMeta = { id: row.id, form_id: row.form_id, origin: row.origin, created_at: row.created_at, status: row.status };

    // ── Filter re-evaluation (with full metadata, not just fast-path) ──────────
    const filterAction = await step.do('evaluate-filters', r(3), async () => {
      const t = Date.now();
      const form = await this.env.DB.prepare(
        'SELECT allowed_origins, active FROM registered_forms WHERE form_id=?'
      ).bind(formId).first<{ allowed_origins: string; active: number }>();

      if (!form || !form.active) return 'blocked';
      const origins: string[] = JSON.parse(form.allowed_origins);
      if (origins.length && !origins.includes('*') && !origins.includes(row.origin)) return 'blocked';

      const { results: rules } = await this.env.DB.prepare(
        'SELECT * FROM filter_rules WHERE form_id=? AND active=1 ORDER BY priority'
      ).bind(formId).all<FilterRuleRow>();

      const url = new URL(`https://x/?origin=${encodeURIComponent(row.origin)}`);
      const match = evaluateFilters(rules, { queryParams: url.searchParams, fields, headers: new Headers(), origin: row.origin, ip: metadata.ip });
      await log('extract', 'ok', { rules: rules.length }, { action: match?.action ?? 'allow' }, undefined, Date.now() - t);
      return match?.action ?? 'allow';
    });

    if (filterAction === 'blocked') {
      await this.env.DB.prepare(`UPDATE form_submissions SET status='blocked',updated_at=datetime('now') WHERE id=?`).bind(submissionId).run();
      await log('complete', 'skip', null, { reason: 'blocked' });
      return;
    }

    // ── Transform ─────────────────────────────────────────────────────────────
    const dto = await step.do('transform', r(3), async () => {
      const t = Date.now();
      const { results: rules } = await this.env.DB.prepare(
        'SELECT * FROM mapping_rules WHERE form_id=? AND active=1 ORDER BY priority'
      ).bind(formId).all<MappingRuleRow>();

      if (rules.length === 0) {
        // No mapping rules: pass all raw fields as DTO (string values)
        const passthrough: Dto = {};
        for (const [k, v] of Object.entries(fields)) passthrough[k] = Array.isArray(v) ? v.join(', ') : (v ?? null);
        await log('transform', 'skip', { reason: 'no rules' }, passthrough, undefined, Date.now() - t);
        return passthrough;
      }

      const result = applyMappings(rules, fields, metadata, subMeta);
      const st: EtlStepStatus = result.errors.length > 0 ? 'error' : result.warnings.length > 0 ? 'partial' : 'ok';
      await log('transform', st, { rules: rules.length, fields: Object.keys(fields) }, result, result.errors[0], Date.now() - t);

      if (result.errors.length > 0) {
        // Required field validation failure → NonRetryableError
        throw new NonRetryableError(`Validation failed: ${result.errors.join('; ')}`);
      }
      return result.dto;
    });

    // Persist DTO back to submission row
    await step.do('persist-dto', r(3), async () => {
      await this.env.DB.prepare(`UPDATE form_submissions SET dto_fields=?,updated_at=datetime('now') WHERE id=?`)
        .bind(JSON.stringify(dto), submissionId).run();
    });

    // ── Load ──────────────────────────────────────────────────────────────────
    const loadResults = await step.do('load', r(3), async () => {
      const t = Date.now();
      // 1 D1 select + N D1 inserts + 1 etl_log insert; cap at 24 targets (≤ 26 ≤ 50 subreqs).
      const { results: targets } = await this.env.DB.prepare(
        'SELECT * FROM load_targets WHERE form_id=? AND active=1 LIMIT 24'
      ).bind(formId).all<LoadTargetRow>();

      if (targets.length === 0) {
        await log('load', 'skip', null, { reason: 'no load targets' }, undefined, Date.now() - t);
        return [];
      }

      const results: { target: string; status: 'ok' | 'error'; error?: string }[] = [];

      for (const target of targets) {
        try {
          const allowlist: string[] | null = target.field_allowlist ? JSON.parse(target.field_allowlist) as string[] : null;
          // Note: target.db_binding must be a key in this.env; default is 'DB'
          const targetDb = (this.env as unknown as Record<string, D1Database>)[target.db_binding] ?? this.env.DB;
          const stmt = buildInsertStatement(targetDb, target.target_table, dto, target.upsert_key, allowlist);
          if (stmt) await stmt.run();
          results.push({ target: target.name, status: 'ok' });
        } catch (e) {
          results.push({ target: target.name, status: 'error', error: (e as Error).message });
        }
      }

      const anyErr = results.some(r => r.status === 'error');
      await log('load', anyErr ? 'partial' : 'ok', { targets: targets.map(t => t.name) }, results, undefined, Date.now() - t);
      return results;
    });

    // ── Deliver ───────────────────────────────────────────────────────────────
    await step.do('deliver', {
      retries: { limit: 5, delay: '15 seconds', backoff: 'exponential' },
      timeout: '2 minutes',
    }, async () => {
      const t = Date.now();
      // Free tier: 50 subrequests per workflow step.
      // Cost per config = 1 fetch + 1 D1 log insert → cap at 20 configs (1+40=41 ≤ 50).
      const { results: configs } = await this.env.DB.prepare(
        'SELECT * FROM notify_configs WHERE form_id=? AND active=1 LIMIT 20'
      ).bind(formId).all<NotifyConfigRow>();

      if (configs.length === 0) { await log('deliver', 'skip', null, { reason: 'no configs' }); return; }

      const ctx: TemplateContext = {
        submission: { ...subMeta, status: filterAction === 'flag' ? 'flagged' : 'done' },
        fields, metadata,
      };
      const results = await deliverAll(configs, ctx, this.env.DB, this.env.TASKS_KV);
      const retriable = results.filter(r => r.statusCode === null || r.statusCode >= 500);
      await log('deliver', retriable.length ? 'partial' : 'ok', { configs: configs.length }, results, undefined, Date.now() - t);
      if (retriable.length) throw new Error(`${retriable.length} delivery failures`);
    });

    // ── Complete ──────────────────────────────────────────────────────────────
    await step.do('complete', r(3), async () => {
      const finalStatus = filterAction === 'flag' ? 'flagged' : 'done';
      await this.env.DB.prepare(`UPDATE form_submissions SET status=?,updated_at=datetime('now') WHERE id=?`)
        .bind(finalStatus, submissionId).run();
      await log('complete', 'ok', null, { status: finalStatus, loadResults });
    });
  }
}

function r(limit: number) {
  return { retries: { limit, delay: '2 seconds', backoff: 'exponential' as const } };
}
