export interface Env {
  DB: D1Database;
  TASKS_KV: KVNamespace;  // OAuth2 token cache + dedup keys
  RATE_KV: KVNamespace;   // per-IP rate limit counters
  FORM_WORKFLOW: Workflow;
  ADMIN_API_KEY: string;
}

// ── Submission ───────────────────────────────────────────────────────────────

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

export type SubmissionStatus = 'pending' | 'processing' | 'done' | 'failed' | 'flagged' | 'blocked';

export interface FormSubmissionRow {
  id: string;
  form_id: string;
  origin: string;
  fields: string;        // JSON
  metadata: string;      // JSON
  status: SubmissionStatus;
  workflow_id: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

// ── Filter rules ─────────────────────────────────────────────────────────────

export type FilterSource = 'query_param' | 'body_key' | 'body_value' | 'header' | 'origin' | 'ip';
export type FilterAction = 'block' | 'allow' | 'flag';

export interface FilterRuleRow {
  id: number;
  form_id: string;
  name: string;
  source: FilterSource;
  pattern: string;
  value_pattern: string | null;
  action: FilterAction;
  active: number;
  priority: number;
  created_at: string;
}

export interface FilterResult {
  action: FilterAction;
  rule: FilterRuleRow;
}

// ── Notify configs ───────────────────────────────────────────────────────────

export type OutboundAuthType =
  | 'none'
  | 'bearer'
  | 'basic'
  | 'header'
  | 'hmac_sha256'
  | 'hmac_sha1'
  | 'oauth2_cc';

export interface BearerAuth      { type: 'bearer'; token: string }
export interface BasicAuth       { type: 'basic'; username: string; password: string }
export interface HeaderAuth      { type: 'header'; name: string; value: string }
export interface HmacOutAuth     { type: 'hmac_sha256' | 'hmac_sha1'; secret: string; header_name: string }
export interface OAuth2CcAuth    {
  type: 'oauth2_cc';
  token_url: string;
  client_id: string;
  client_secret: string;
  scope?: string;
}
export type OutboundAuthConfig =
  | { type: 'none' }
  | BearerAuth
  | BasicAuth
  | HeaderAuth
  | HmacOutAuth
  | OAuth2CcAuth;

export interface NotifyConfigRow {
  id: number;
  form_id: string;
  name: string;
  notify_url_template: string;
  http_method: string;
  extra_headers: string | null;   // JSON
  body_template: string | null;   // string template or null
  auth_type: OutboundAuthType;
  auth_config: string | null;     // JSON
  active: number;
  created_at: string;
}

// ── Incoming auth verification ───────────────────────────────────────────────

export type IncomingAuthType =
  | 'none'
  | 'hmac_github'
  | 'hmac_stripe'
  | 'hmac_hubspot_v2'
  | 'hmac_hubspot_v3'
  | 'hmac_twilio'
  | 'hmac_custom'
  | 'bearer'
  | 'basic'
  | 'header';

export interface HmacCustomVerify {
  type: 'hmac_custom';
  secret: string;
  algorithm: 'SHA-256' | 'SHA-1';
  header_name: string;
  prefix?: string;             // e.g. 'sha256=' — stripped before comparison
  message_format: 'body' | 'timestamp.body' | 'method+uri+body';
  timestamp_header?: string;   // used with 'timestamp.body'
  max_age_seconds?: number;    // replay protection window
}

export interface HmacPresetVerify {
  type: 'hmac_github' | 'hmac_stripe' | 'hmac_hubspot_v2' | 'hmac_hubspot_v3';
  secret: string;
  max_age_seconds?: number;
}

export interface TwilioVerify {
  type: 'hmac_twilio';
  auth_token: string;
}

export interface BearerVerify  { type: 'bearer'; token: string }
export interface BasicVerify   { type: 'basic'; username: string; password: string }
export interface HeaderVerify  { type: 'header'; name: string; value: string }

export type IncomingAuthConfig =
  | { type: 'none' }
  | HmacPresetVerify
  | HmacCustomVerify
  | TwilioVerify
  | BearerVerify
  | BasicVerify
  | HeaderVerify;

// ── Registered form row ──────────────────────────────────────────────────────

export interface RegisteredFormRow {
  form_id: string;
  name: string;
  allowed_origins: string;  // JSON array
  notify_url: string | null;
  verify_auth: string | null;  // JSON IncomingAuthConfig
  active: number;
  created_at: string;
}

// ── Delivery log ─────────────────────────────────────────────────────────────

export interface DeliveryLogRow {
  id: number;
  submission_id: string;
  form_id: string;
  notify_config_id: number;
  notify_url: string;
  attempt: number;
  status_code: number | null;
  response_snippet: string | null;
  error: string | null;
  duration_ms: number | null;
  created_at: string;
}

// ── Workflow params ──────────────────────────────────────────────────────────

export interface WorkflowParams {
  submissionId: string;
  formId: string;
}

// ── KV rate limit ────────────────────────────────────────────────────────────

export interface RateLimitRecord {
  count: number;
  windowStart: number;
}

// ── Template context ─────────────────────────────────────────────────────────

export interface TemplateContext {
  submission: { id: string; form_id: string; origin: string; created_at: string; status: string };
  fields: SubmissionFields;
  metadata: SubmissionMetadata;
}
