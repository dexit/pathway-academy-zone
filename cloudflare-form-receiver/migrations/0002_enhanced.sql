-- Migration 0002: filter rules, notify configs, delivery log, incoming auth

-- Extend registered_forms with incoming HMAC verification support
ALTER TABLE registered_forms ADD COLUMN verify_auth TEXT;
-- JSON: { type: 'none'|'hmac_github'|'hmac_stripe'|'hmac_hubspot_v2'|'hmac_hubspot_v3'|'hmac_twilio'|'hmac_custom'|'bearer'|'basic'|'header', ...fields }

-- Per-form wildcard conditional filter rules
-- Rules are evaluated in priority ASC order; first match wins.
-- action: 'block' = reject 422, 'allow' = bypass remaining rules, 'flag' = accept but mark flagged
CREATE TABLE IF NOT EXISTS filter_rules (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id  TEXT    NOT NULL,
  name     TEXT    NOT NULL,
  -- where to look
  source   TEXT    NOT NULL CHECK(source IN ('query_param','body_key','body_value','header','origin','ip')),
  -- wildcard pattern for the key/name (supports * and ?)
  pattern  TEXT    NOT NULL,
  -- optional wildcard pattern for the value; NULL = match any value
  value_pattern TEXT,
  action   TEXT    NOT NULL DEFAULT 'block' CHECK(action IN ('block','allow','flag')),
  active   INTEGER NOT NULL DEFAULT 1,
  priority INTEGER NOT NULL DEFAULT 100,
  created_at TEXT  NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_filter_rules_form ON filter_rules(form_id, active, priority);

-- Per-form notification endpoints (replaces single notify_url in registered_forms)
-- notify_url_template supports {{submission.id}}, {{field.email}}, {{metadata.ip}}, etc.
CREATE TABLE IF NOT EXISTS notify_configs (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id            TEXT    NOT NULL,
  name               TEXT    NOT NULL,
  notify_url_template TEXT   NOT NULL,
  http_method        TEXT    NOT NULL DEFAULT 'POST',
  extra_headers      TEXT,   -- JSON object of static headers to add
  body_template      TEXT,   -- JSON string template; NULL = full submission JSON
  auth_type          TEXT    NOT NULL DEFAULT 'none',
  -- auth_type: none | bearer | basic | header | hmac_sha256 | hmac_sha1 | oauth2_cc
  auth_config        TEXT,   -- JSON, auth-type-specific fields
  active             INTEGER NOT NULL DEFAULT 1,
  created_at         TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_notify_configs_form ON notify_configs(form_id, active);

-- Delivery attempt log for each notify_config × submission
CREATE TABLE IF NOT EXISTS delivery_log (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id    TEXT    NOT NULL,
  form_id          TEXT    NOT NULL,
  notify_config_id INTEGER NOT NULL,
  notify_url       TEXT    NOT NULL,
  attempt          INTEGER NOT NULL DEFAULT 1,
  status_code      INTEGER,
  response_snippet TEXT,   -- first 512 chars of response body
  error            TEXT,
  duration_ms      INTEGER,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_delivery_log_submission ON delivery_log(submission_id);
CREATE INDEX idx_delivery_log_form_created ON delivery_log(form_id, created_at);
