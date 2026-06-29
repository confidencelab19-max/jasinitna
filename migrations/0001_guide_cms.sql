CREATE TABLE IF NOT EXISTS guide_categories (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 99,
  icon TEXT NOT NULL DEFAULT 'file'
);

CREATE TABLE IF NOT EXISTS guide_documents (
  path TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category_slug TEXT NOT NULL,
  position INTEGER NOT NULL DEFAULT 99,
  status TEXT NOT NULL DEFAULT 'published',
  owner TEXT NOT NULL DEFAULT '자신있나 파트너스',
  body TEXT NOT NULL DEFAULT '',
  blocks_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  published_at TEXT,
  FOREIGN KEY (category_slug) REFERENCES guide_categories(slug)
);

CREATE INDEX IF NOT EXISTS idx_guide_documents_category_position
ON guide_documents(category_slug, position, title);

CREATE INDEX IF NOT EXISTS idx_guide_documents_status
ON guide_documents(status);

CREATE TABLE IF NOT EXISTS guide_settings (
  key TEXT PRIMARY KEY,
  value_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guide_images (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  data_url TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
