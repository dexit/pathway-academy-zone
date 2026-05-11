import type { SchedulerEnv } from '../../../shared/types';

export default {
  async scheduled(event: ScheduledEvent, env: SchedulerEnv): Promise<void> {
    const cron = event.cron;

    // Every 5 minutes: retry stalled submissions (pending > 10 min with no workflow)
    if (cron === '*/5 * * * *') {
      await retryStalled(env);
    }

    // Every hour: retry failed deliveries (delivery_log entries with error that are < 24h old)
    if (cron === '0 * * * *') {
      await retryFailedDeliveries(env);
    }

    // Daily at 03:00 UTC: clean up old logs
    if (cron === '0 3 * * *') {
      await cleanupOldLogs(env);
    }
  },
};

async function retryStalled(env: SchedulerEnv): Promise<void> {
  // Find submissions stuck in 'pending' or 'processing' for > 10 minutes
  const { results } = await env.DB.prepare(
    `SELECT id, form_id FROM form_submissions
     WHERE status IN ('pending','processing')
       AND created_at < datetime('now','-10 minutes')
     LIMIT 20`
  ).all<{ id: string; form_id: string }>();

  for (const row of results) {
    try {
      // Re-trigger ETL workflow (Workflow is idempotent by instance ID)
      await env.ETL_WORKFLOW.create({
        id: `retry-${row.id}-${Date.now()}`,
        params: { submissionId: row.id, formId: row.form_id },
      });
    } catch (_) { /* skip already-running instances */ }
  }
}

async function retryFailedDeliveries(env: SchedulerEnv): Promise<void> {
  // Find submissions with failed deliveries in the last 24h that are now 'done'
  const { results } = await env.DB.prepare(
    `SELECT DISTINCT submission_id, form_id FROM delivery_log
     WHERE (status_code >= 500 OR status_code IS NULL)
       AND created_at > datetime('now','-24 hours')
     LIMIT 10`
  ).all<{ submission_id: string; form_id: string }>();

  for (const row of results) {
    try {
      await env.ETL_WORKFLOW.create({
        id: `redeliver-${row.submission_id}-${Date.now()}`,
        params: { submissionId: row.submission_id, formId: row.form_id },
      });
    } catch (_) { /* ignore */ }
  }
}

async function cleanupOldLogs(env: SchedulerEnv): Promise<void> {
  // Retain 30 days of logs in D1 (generous on free tier 500MB)
  await env.DB.batch([
    env.DB.prepare("DELETE FROM ingress_log WHERE created_at < datetime('now','-30 days')"),
    env.DB.prepare("DELETE FROM etl_log WHERE created_at < datetime('now','-30 days')"),
    env.DB.prepare("DELETE FROM delivery_log WHERE created_at < datetime('now','-30 days')"),
    // Keep completed submissions longer (90 days)
    env.DB.prepare("DELETE FROM form_submissions WHERE status IN ('done','blocked') AND created_at < datetime('now','-90 days')"),
  ]);
}
