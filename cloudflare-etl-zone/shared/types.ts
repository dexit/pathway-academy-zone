// ── Env ───────────────────────────────────────────────────────────────────────
// Each worker declares only what it needs, but all workers share these names.

export interface BaseEnv {
  DB: D1Database;
  TASKS_KV: KVNamespace;   // OAuth2 token cache
  RATE_KV: KVNamespace;    // per-IP rate limit
  ADMIN_API_KEY: string;
}

export interface GatewayEnv extends BaseEnv {
  ETL_WORKFLOW: Workflow;  // cross-script binding → etl worker
}

export interface EtlEnv extends BaseEnv {
  ETL_WORKFLOW: Workflow;
  // Additional D1 databases that load_targets may reference
  // Add e.g. TARGET_DB: D1Database if binding a second database
}

export interface AdminEnv extends BaseEnv {
  ETL_WORKFLOW: Workflow;
}

export interface SchedulerEnv extends BaseEnv {
  ETL_WORKFLOW: Workflow;
}

// ── Submission ────────────────────────────────────────────────────────────────

export interface SubmissionFields { [k: string]: string | string[] | undefined }
export interface SubmissionMetadata {
  ip: string; userAgent: string; referrer: string; timestamp: number; origin: string;
}
export type SubmissionStatus = 'pending'|'processing'|'done'|'failed'|'flagged'|'blocked';

export interface FormSubmissionRow {
  id: string; form_id: string; origin: string;
  raw_fields: string; dto_fields: string | null; metadata: string;
  status: SubmissionStatus; workflow_id: string | null; error_message: string | null;
  created_at: string; updated_at: string;
}

// ── Mapping rules ─────────────────────────────────────────────────────────────

export type TransformOp =
  | 'passthrough' | 'trim' | 'lowercase' | 'uppercase'
  | 'regex_extract' | 'regex_replace' | 'template'
  | 'number' | 'boolean' | 'date_iso' | 'json_parse' | 'truncate';

export interface MappingRuleRow {
  id: number; form_id: string; name: string;
  source_expr: string; target_field: string;
  transform: TransformOp; transform_config: string | null;
  default_value: string | null; required: number;
  active: number; priority: number; created_at: string;
}

// ── Load targets ──────────────────────────────────────────────────────────────

export interface LoadTargetRow {
  id: number; form_id: string; name: string;
  db_binding: string; target_table: string; upsert_key: string | null;
  field_allowlist: string | null; active: number; created_at: string;
}

// ── Ingress log ───────────────────────────────────────────────────────────────

export type IngressReason =
  | 'accepted' | 'rate_limited' | 'auth_failed'
  | 'filter_blocked' | 'bad_request' | 'no_form' | 'parse_error';

export interface IngressLogRow {
  id: number; form_id: string | null; method: string; path: string;
  origin: string | null; ip: string | null; status_code: number;
  reason: IngressReason; duration_ms: number | null; created_at: string;
}

// ── ETL log ───────────────────────────────────────────────────────────────────

export type EtlStep = 'extract'|'transform'|'validate'|'load'|'deliver'|'complete';
export type EtlStepStatus = 'ok'|'error'|'skip'|'partial';

export interface EtlLogRow {
  id: number; submission_id: string; form_id: string;
  workflow_instance_id: string | null; step: EtlStep; status: EtlStepStatus;
  input_snapshot: string | null; output_snapshot: string | null;
  error: string | null; duration_ms: number | null; created_at: string;
}

// ── Filter rules ──────────────────────────────────────────────────────────────

export type FilterSource = 'query_param'|'body_key'|'body_value'|'header'|'origin'|'ip';
export type FilterAction = 'block'|'allow'|'flag';

export interface FilterRuleRow {
  id: number; form_id: string; name: string; source: FilterSource;
  pattern: string; value_pattern: string | null;
  action: FilterAction; active: number; priority: number; created_at: string;
}
export interface FilterResult { action: FilterAction; rule: FilterRuleRow }
export interface FilterInput {
  queryParams: URLSearchParams; fields: SubmissionFields;
  headers: Headers; origin: string; ip: string;
}

// ── Notify configs ────────────────────────────────────────────────────────────

export type OutboundAuthType = 'none'|'bearer'|'basic'|'header'|'hmac_sha256'|'hmac_sha1'|'oauth2_cc';
export type OutboundAuthConfig =
  | { type: 'none' }
  | { type: 'bearer'; token: string }
  | { type: 'basic'; username: string; password: string }
  | { type: 'header'; name: string; value: string }
  | { type: 'hmac_sha256'|'hmac_sha1'; secret: string; header_name: string }
  | { type: 'oauth2_cc'; token_url: string; client_id: string; client_secret: string; scope?: string };

export interface NotifyConfigRow {
  id: number; form_id: string; name: string;
  notify_url_template: string; http_method: string;
  extra_headers: string | null; body_template: string | null;
  auth_type: OutboundAuthType; auth_config: string | null;
  active: number; created_at: string;
}

// ── Registered form ───────────────────────────────────────────────────────────

export type IncomingAuthType =
  | 'none'|'hmac_github'|'hmac_stripe'|'hmac_hubspot_v2'|'hmac_hubspot_v3'
  | 'hmac_twilio'|'hmac_custom'|'bearer'|'basic'|'header';

export interface IncomingAuthConfig { type: IncomingAuthType; [k: string]: unknown }

export interface RegisteredFormRow {
  form_id: string; name: string; allowed_origins: string;
  verify_auth: string | null; active: number; created_at: string;
}

// ── Delivery log ──────────────────────────────────────────────────────────────

export interface DeliveryLogRow {
  id: number; submission_id: string; form_id: string;
  notify_config_id: number; notify_url: string; attempt: number;
  status_code: number | null; response_snippet: string | null;
  error: string | null; duration_ms: number | null; created_at: string;
}

// ── Workflow params ───────────────────────────────────────────────────────────

export interface EtlWorkflowParams {
  submissionId: string;
  formId: string;
}

// ── Template context ──────────────────────────────────────────────────────────

export interface TemplateContext {
  submission: { id: string; form_id: string; origin: string; created_at: string; status: string };
  fields: SubmissionFields;
  metadata: SubmissionMetadata;
}

// ── Rate limit ────────────────────────────────────────────────────────────────

export interface RateLimitRecord { count: number; windowStart: number }

// ── DTO (post-transform) ──────────────────────────────────────────────────────

export type DtoValue = string | number | boolean | null;
export type Dto = Record<string, DtoValue>;
