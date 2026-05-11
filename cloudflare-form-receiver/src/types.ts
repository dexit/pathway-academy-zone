import { WorkflowEntrypoint } from 'cloudflare:workers';

export interface Env {
  // D1 — persistent relational storage for submissions
  DB: D1Database;

  // KV namespaces
  TASKS_KV: KVNamespace;   // pending tasks / workflow status cache
  RATE_KV: KVNamespace;    // per-IP rate limiting counters

  // Workflow binding
  FORM_WORKFLOW: Workflow;

  // Secrets (set via wrangler secret / dashboard)
  ADMIN_API_KEY: string;   // required header for /admin/* routes
}

export interface SubmissionFields {
  [key: string]: string | string[] | undefined;
}

export interface SubmissionMetadata {
  ip: string;
  userAgent: string;
  referrer: string;
  timestamp: number;
  origin: string;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  origin: string;
  fields: SubmissionFields;
  metadata: SubmissionMetadata;
  status: 'pending' | 'processing' | 'done' | 'failed';
  workflow_id: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

// Params passed into the Workflow when triggered
export interface WorkflowParams {
  submissionId: string;
  formId: string;
  notifyUrl: string | null;
}

// KV task record stored under task:{submissionId}
export interface TaskRecord {
  submissionId: string;
  formId: string;
  status: 'queued' | 'processing' | 'done' | 'failed';
  workflowId: string | null;
  attempts: number;
  lastAttemptAt: number | null;
  error: string | null;
}

// KV rate limit record stored under rate:{ip}
export interface RateLimitRecord {
  count: number;
  windowStart: number;
}
