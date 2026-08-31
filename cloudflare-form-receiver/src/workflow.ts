import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import { deliverAll } from './lib/notify';
import { evaluateFilters } from './lib/filters';
import type {
  Env,
  WorkflowParams,
  FilterRuleRow,
  NotifyConfigRow,
  SubmissionFields,
  SubmissionMetadata,
  TemplateContext,
} from './types';

export class FormProcessingWorkflow extends WorkflowEntrypoint<Env, WorkflowParams> {
  async run(event: WorkflowEvent<WorkflowParams>, step: WorkflowStep) {
    const { submissionId, formId } = event.params;

    // ── Step 1: Mark processing ──────────────────────────────────────────────
    await step.do('mark-processing', retry(3), async () => {
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status='processing', workflow_id=?, updated_at=datetime('now') WHERE id=?`
      ).bind(event.instanceId, submissionId).run();
    });

    // ── Step 2: Load submission row ──────────────────────────────────────────
    const row = await step.do('load-submission', retry(3), async () => {
      const r = await this.env.DB.prepare(
        'SELECT id, form_id, origin, fields, metadata, status FROM form_submissions WHERE id=?'
      ).bind(submissionId).first<{
        id: string; form_id: string; origin: string;
        fields: string; metadata: string; status: string;
      }>();
      if (!r) throw new Error(`Submission ${submissionId} not found`);
      return r;
    });

    const fields: SubmissionFields = JSON.parse(row.fields);
    const metadata: SubmissionMetadata = JSON.parse(row.metadata);
    const ctx: TemplateContext = {
      submission: {
        id: row.id, form_id: row.form_id, origin: row.origin,
        created_at: new Date().toISOString(), status: row.status,
      },
      fields,
      metadata,
    };

    // ── Step 3: Load registered form, verify origin + filter rules ───────────
    const filterResult = await step.do('evaluate-filters', retry(3), async () => {
      const form = await this.env.DB.prepare(
        'SELECT allowed_origins, active FROM registered_forms WHERE form_id=?'
      ).bind(formId).first<{ allowed_origins: string; active: number }>();

      if (!form || !form.active) return 'blocked';

      const allowedOrigins: string[] = JSON.parse(form.allowed_origins);
      if (allowedOrigins.length > 0 && !allowedOrigins.includes('*')) {
        if (!allowedOrigins.includes(row.origin)) return 'blocked';
      }

      // Load and evaluate filter rules from D1
      const { results: rules } = await this.env.DB.prepare(
        'SELECT * FROM filter_rules WHERE form_id=? AND active=1 ORDER BY priority ASC'
      ).bind(formId).all<FilterRuleRow>();

      const url = new URL(`https://placeholder/?origin=${encodeURIComponent(row.origin)}`);
      const match = evaluateFilters(rules, {
        queryParams: url.searchParams,
        fields,
        headers: new Headers(),
        origin: row.origin,
        ip: metadata.ip,
      });

      return match?.action ?? 'allow';
    });

    if (filterResult === 'blocked') {
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status='blocked', updated_at=datetime('now') WHERE id=?`
      ).bind(submissionId).run();
      return;
    }

    if (filterResult === 'flag') {
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status='flagged', updated_at=datetime('now') WHERE id=?`
      ).bind(submissionId).run();
      // Continue processing flagged submissions — they still get delivered
    }

    // ── Step 4: Deliver to all active notify_configs ─────────────────────────
    const configs = await step.do('load-notify-configs', retry(3), async () => {
      const { results } = await this.env.DB.prepare(
        'SELECT * FROM notify_configs WHERE form_id=? AND active=1'
      ).bind(formId).all<NotifyConfigRow>();
      return results;
    });

    if (configs.length > 0) {
      await step.do('deliver-notifications', {
        retries: { limit: 5, delay: '15 seconds', backoff: 'exponential' },
        timeout: '2 minutes',
      }, async () => {
        const results = await deliverAll(configs, ctx, this.env.DB, this.env.TASKS_KV);

        // If any delivery failed with a non-4xx code, throw to trigger retry
        const retriable = results.filter(r => r.statusCode === null || r.statusCode >= 500);
        if (retriable.length > 0) {
          throw new Error(`${retriable.length} delivery/deliveries failed: ${retriable.map(r => r.error).join('; ')}`);
        }
      });
    }

    // ── Step 5: Mark done ────────────────────────────────────────────────────
    await step.do('mark-done', retry(3), async () => {
      const finalStatus = filterResult === 'flag' ? 'flagged' : 'done';
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status=?, updated_at=datetime('now') WHERE id=?`
      ).bind(finalStatus, submissionId).run();
    });
  }
}

function retry(limit: number) {
  return { retries: { limit, delay: '2 seconds', backoff: 'exponential' as const } };
}
