-- ── Base tables shared by all workers ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS registered_forms (
  form_id        TEXT    PRIMARY KEY,
  name           TEXT    NOT NULL,
  allowed_origins TEXT   NOT NULL DEFAULT '["*"]',  -- JSON array
  verify_auth    TEXT,   -- JSON IncomingAuthConfig
  active         INTEGER NOT NULL DEFAULT 1,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS form_submissions (
  id             TEXT    PRIMARY KEY,
  form_id        TEXT    NOT NULL,
  origin         TEXT    NOT NULL,
  raw_fields     TEXT    NOT NULL,    -- JSON: original submitted fields
  dto_fields     TEXT,               -- JSON: post-transform DTO (set by ETL)
  metadata       TEXT    NOT NULL,   -- JSON: ip, ua, referrer, ts
  status         TEXT    NOT NULL DEFAULT 'pending',
  -- pending | processing | done | failed | flagged | blocked
  workflow_id    TEXT,
  error_message  TEXT,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_sub_form    ON form_submissions(form_id, created_at DESC);
CREATE INDEX idx_sub_status  ON form_submissions(status);

CREATE TABLE IF NOT EXISTS filter_rules (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id        TEXT    NOT NULL,
  name           TEXT    NOT NULL,
  source         TEXT    NOT NULL CHECK(source IN ('query_param','body_key','body_value','header','origin','ip')),
  pattern        TEXT    NOT NULL,
  value_pattern  TEXT,
  action         TEXT    NOT NULL DEFAULT 'block' CHECK(action IN ('block','allow','flag')),
  active         INTEGER NOT NULL DEFAULT 1,
  priority       INTEGER NOT NULL DEFAULT 100,
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_filter_form ON filter_rules(form_id, active, priority);

CREATE TABLE IF NOT EXISTS notify_configs (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id              TEXT    NOT NULL,
  name                 TEXT    NOT NULL,
  notify_url_template  TEXT    NOT NULL,
  http_method          TEXT    NOT NULL DEFAULT 'POST',
  extra_headers        TEXT,   -- JSON
  body_template        TEXT,   -- string template (null = full submission JSON)
  auth_type            TEXT    NOT NULL DEFAULT 'none',
  auth_config          TEXT,   -- JSON
  active               INTEGER NOT NULL DEFAULT 1,
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_notify_form ON notify_configs(form_id, active);

CREATE TABLE IF NOT EXISTS delivery_log (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id    TEXT    NOT NULL,
  form_id          TEXT    NOT NULL,
  notify_config_id INTEGER NOT NULL,
  notify_url       TEXT    NOT NULL,
  attempt          INTEGER NOT NULL DEFAULT 1,
  status_code      INTEGER,
  response_snippet TEXT,
  error            TEXT,
  duration_ms      INTEGER,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_dl_sub     ON delivery_log(submission_id);
CREATE INDEX idx_dl_form_ts ON delivery_log(form_id, created_at DESC);
