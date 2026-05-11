import { WorkflowEntrypoint, WorkflowStep, WorkflowEvent } from 'cloudflare:workers';
import type { Env, WorkflowParams, TaskRecord } from './types';

export class FormProcessingWorkflow extends WorkflowEntrypoint<Env, WorkflowParams> {
  async run(event: WorkflowEvent<WorkflowParams>, step: WorkflowStep) {
    const { submissionId, formId, notifyUrl } = event.params;

    // ── Step 1: Mark submission as processing in D1 + KV ────────────────────
    await step.do('mark-processing', {
      retries: { limit: 3, delay: '2 seconds', backoff: 'exponential' },
    }, async () => {
      await this.env.DB.prepare(
        `UPDATE form_submissions
         SET status = 'processing', workflow_id = ?, updated_at = datetime('now')
         WHERE id = ?`
      ).bind(event.instanceId, submissionId).run();

      const task = await this.env.TASKS_KV.get<TaskRecord>(`task:${submissionId}`, 'json');
      if (task) {
        await this.env.TASKS_KV.put(`task:${submissionId}`, JSON.stringify({
          ...task,
          status: 'processing',
          workflowId: event.instanceId,
          lastAttemptAt: Date.now(),
        } satisfies TaskRecord), { expirationTtl: 86400 });
      }
    });

    // ── Step 2: Load and validate submission data ────────────────────────────
    const submission = await step.do('load-submission', {
      retries: { limit: 3, delay: '2 seconds', backoff: 'exponential' },
    }, async () => {
      const row = await this.env.DB.prepare(
        'SELECT id, form_id, fields, metadata, origin FROM form_submissions WHERE id = ?'
      ).bind(submissionId).first();

      if (!row) throw new Error(`Submission ${submissionId} not found in D1`);
      return row;
    });

    // ── Step 3: Validate registered form exists and origin is allowed ────────
    await step.do('validate-form-registration', {
      retries: { limit: 3, delay: '5 seconds', backoff: 'exponential' },
    }, async () => {
      const form = await this.env.DB.prepare(
        'SELECT form_id, allowed_origins, active FROM registered_forms WHERE form_id = ?'
      ).bind(formId).first<{ form_id: string; allowed_origins: string; active: number }>();

      if (!form) {
        // Unknown form — still accepted but flagged
        await this.env.DB.prepare(
          `UPDATE form_submissions SET status = 'done', updated_at = datetime('now') WHERE id = ?`
        ).bind(submissionId).run();
        return;
      }

      if (!form.active) throw new Error(`Form ${formId} is disabled`);

      const allowedOrigins: string[] = JSON.parse(form.allowed_origins);
      const origin = (submission as { origin: string }).origin;
      if (allowedOrigins.length > 0 && !allowedOrigins.includes(origin) && !allowedOrigins.includes('*')) {
        throw new Error(`Origin ${origin} not allowed for form ${formId}`);
      }
    });

    // ── Step 4: Send webhook notification (if configured) ───────────────────
    if (notifyUrl) {
      await step.do('send-notification', {
        retries: { limit: 5, delay: '10 seconds', backoff: 'exponential' },
        timeout: '30 seconds',
      }, async () => {
        const payload = {
          event: 'form.submission',
          submissionId,
          formId,
          data: submission,
          timestamp: Date.now(),
        };

        const res = await fetch(notifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Form-Receiver': 'cloudflare-worker' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`Webhook returned ${res.status}: ${await res.text()}`);
        }
      });
    }

    // ── Step 5: Mark submission done in D1 + KV ──────────────────────────────
    await step.do('mark-done', {
      retries: { limit: 3, delay: '2 seconds', backoff: 'exponential' },
    }, async () => {
      await this.env.DB.prepare(
        `UPDATE form_submissions SET status = 'done', updated_at = datetime('now') WHERE id = ?`
      ).bind(submissionId).run();

      const task = await this.env.TASKS_KV.get<TaskRecord>(`task:${submissionId}`, 'json');
      if (task) {
        await this.env.TASKS_KV.put(`task:${submissionId}`, JSON.stringify({
          ...task,
          status: 'done',
        } satisfies TaskRecord), { expirationTtl: 3600 }); // expire from KV after 1h once done
      }
    });
  }
}
