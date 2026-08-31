-- Form submissions: primary storage for all incoming form data
CREATE TABLE IF NOT EXISTS form_submissions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL,
  origin TEXT NOT NULL,
  fields TEXT NOT NULL,        -- JSON blob of submitted field values
  metadata TEXT NOT NULL,      -- JSON: ip, user_agent, referrer, timestamp
  status TEXT NOT NULL DEFAULT 'pending',  -- pending | processing | done | failed
  workflow_id TEXT,
  error_message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_submissions_form_id   ON form_submissions(form_id);
CREATE INDEX idx_submissions_status    ON form_submissions(status);
CREATE INDEX idx_submissions_created   ON form_submissions(created_at);

-- Allowed form origins/IDs registered to accept submissions
CREATE TABLE IF NOT EXISTS registered_forms (
  form_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  allowed_origins TEXT NOT NULL,   -- JSON array of allowed Origin headers
  notify_url TEXT,                 -- optional webhook URL for notifications
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Audit log for admin actions (status changes, deletions, exports)
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL,
  submission_id TEXT,
  details TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
