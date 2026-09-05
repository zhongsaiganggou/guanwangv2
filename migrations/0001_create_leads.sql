-- V2-09: Create leads table for project inquiry persistence
-- Cloudflare D1 migration

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  language TEXT NOT NULL DEFAULT 'en',
  source_page TEXT,
  form_path TEXT,
  has_drawings INTEGER NOT NULL DEFAULT 0,
  name TEXT NOT NULL,
  project_country TEXT NOT NULL,
  calling_code TEXT NOT NULL,
  phone_whatsapp TEXT NOT NULL,
  wechat TEXT NOT NULL,
  email TEXT,
  project_type TEXT,
  intended_use TEXT,
  dimensions TEXT,
  crane_requirement TEXT,
  message TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referrer TEXT,
  landing_page TEXT,
  turnstile_verified INTEGER NOT NULL DEFAULT 0,
  submission_status TEXT NOT NULL DEFAULT 'received',
  test_record INTEGER NOT NULL DEFAULT 0,
  webhook_status TEXT DEFAULT 'not_configured',
  webhook_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_language ON leads(language);
CREATE INDEX IF NOT EXISTS idx_leads_test_record ON leads(test_record);

-- Lead files table (metadata only, files stored in R2)
CREATE TABLE IF NOT EXISTS lead_files (
  id TEXT PRIMARY KEY,
  lead_id TEXT NOT NULL,
  file_key TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  content_type TEXT,
  size INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (lead_id) REFERENCES leads(id)
);

CREATE INDEX IF NOT EXISTS idx_lead_files_lead_id ON lead_files(lead_id);
