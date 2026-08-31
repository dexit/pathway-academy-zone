-- ── ETL-specific tables ───────────────────────────────────────────────────────

-- Field mapping rules: raw submission → DTO
-- Applied in priority order during the Transform step.
CREATE TABLE IF NOT EXISTS mapping_rules (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id          TEXT    NOT NULL,
  name             TEXT    NOT NULL,
  -- Source: a raw field name OR a {{template}} expression
  source_expr      TEXT    NOT NULL,
  -- Destination field name in the DTO
  target_field     TEXT    NOT NULL,
  -- Transform operation applied to the resolved source value
  transform        TEXT    NOT NULL DEFAULT 'passthrough'
    CHECK(transform IN (
      'passthrough',       -- copy as-is
      'trim',              -- String.trim()
      'lowercase',         -- .toLowerCase()
      'uppercase',         -- .toUpperCase()
      'regex_extract',     -- extract capture group 1 from regex
      'regex_replace',     -- replace pattern with replacement
      'template',          -- full {{tag}} template string as output
      'number',            -- parseFloat
      'boolean',           -- '1'/'true'/'yes' → true, else false
      'date_iso',          -- parse common date formats → ISO 8601
      'json_parse',        -- JSON.parse the value
      'truncate'           -- slice(0, max_length)
    )),
  -- JSON config per transform type:
  --   regex_extract: { "pattern": "...", "flags": "i" }
  --   regex_replace: { "pattern": "...", "replacement": "...", "flags": "g" }
  --   template:      { "template": "{{field.first}} {{field.last}}" }
  --   truncate:      { "max_length": 255 }
  transform_config TEXT,
  default_value    TEXT,   -- used when source resolves to empty/null
  required         INTEGER NOT NULL DEFAULT 0,
  active           INTEGER NOT NULL DEFAULT 1,
  priority         INTEGER NOT NULL DEFAULT 100,
  created_at       TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_map_form ON mapping_rules(form_id, active, priority);

-- Load targets: where to INSERT/UPSERT DTO data in D1
CREATE TABLE IF NOT EXISTS load_targets (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id              TEXT    NOT NULL,
  name                 TEXT    NOT NULL,
  -- Name of a D1 binding available in the ETL worker
  -- Multiple databases can be bound and targeted independently
  db_binding           TEXT    NOT NULL DEFAULT 'DB',
  target_table         TEXT    NOT NULL,
  -- Column to use for ON CONFLICT (upsert); null = plain INSERT
  upsert_key           TEXT,
  -- JSON array of DTO field names to include; null = all fields
  field_allowlist      TEXT,
  active               INTEGER NOT NULL DEFAULT 1,
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_lt_form ON load_targets(form_id, active);

-- Ingress log: every HTTP request received by the gateway
CREATE TABLE IF NOT EXISTS ingress_log (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  form_id      TEXT,
  method       TEXT    NOT NULL,
  path         TEXT    NOT NULL,
  origin       TEXT,
  ip           TEXT,
  status_code  INTEGER NOT NULL,
  -- accepted | rate_limited | auth_failed | filter_blocked | bad_request | no_form | parse_error
  reason       TEXT    NOT NULL DEFAULT 'accepted',
  duration_ms  INTEGER,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_il_form_ts ON ingress_log(form_id, created_at DESC);
CREATE INDEX idx_il_ts      ON ingress_log(created_at DESC);

-- ETL step log: per-step execution record inside the workflow
CREATE TABLE IF NOT EXISTS etl_log (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  submission_id        TEXT    NOT NULL,
  form_id              TEXT    NOT NULL,
  workflow_instance_id TEXT,
  -- extract | transform | validate | load | deliver | complete
  step                 TEXT    NOT NULL,
  -- ok | error | skip | partial
  status               TEXT    NOT NULL,
  -- First 2 KB snapshots for observability
  input_snapshot       TEXT,
  output_snapshot      TEXT,
  error                TEXT,
  duration_ms          INTEGER,
  created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX idx_etl_sub     ON etl_log(submission_id, step);
CREATE INDEX idx_etl_form_ts ON etl_log(form_id, created_at DESC);
