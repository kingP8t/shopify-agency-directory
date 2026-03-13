-- =============================================================================
-- Shopify Agency Directory — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Agencies table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agencies (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    TEXT NOT NULL,
  slug                    TEXT NOT NULL UNIQUE,
  description             TEXT NOT NULL,
  long_description        TEXT,
  location                TEXT,
  country                 TEXT,
  website                 TEXT,
  email                   TEXT,
  phone                   TEXT,
  logo_url                TEXT,
  founded                 INT,
  team_size               TEXT,               -- e.g. "1-10", "11-50", "50-200", "200+"
  budget_range            TEXT,               -- e.g. "$5k-$25k", "$25k-$100k", "$100k+"
  specializations         TEXT[],             -- e.g. ARRAY['Shopify Plus', 'Theme Dev', 'CRO']
  tags                    TEXT[],             -- general tags for search
  rating                  NUMERIC(2,1),       -- 1.0 – 5.0
  review_count            INT DEFAULT 0,
  featured                BOOLEAN DEFAULT FALSE,
  status                  TEXT DEFAULT 'draft' CHECK (status IN ('published','draft','pending')),
  -- Claim flow
  claim_token             TEXT,
  claim_token_expires_at  TIMESTAMPTZ,
  claimed_email           TEXT,
  claimed_at              TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common lookups
CREATE INDEX IF NOT EXISTS agencies_slug_idx    ON agencies (slug);
CREATE INDEX IF NOT EXISTS agencies_status_idx  ON agencies (status);
CREATE INDEX IF NOT EXISTS agencies_featured_idx ON agencies (featured);
CREATE INDEX IF NOT EXISTS agencies_location_idx ON agencies (location);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER agencies_updated_at
  BEFORE UPDATE ON agencies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- 2. Leads table (contact / "Get Matched" form submissions)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  company       TEXT,
  budget        TEXT,
  project_type  TEXT,
  timeline      TEXT,
  store_url     TEXT,
  message       TEXT NOT NULL,
  agency_id     UUID REFERENCES agencies(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_agency_idx ON leads (agency_id);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- ---------------------------------------------------------------------------
-- 3. Reviews table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id         UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  reviewer_name     TEXT NOT NULL,
  company           TEXT,
  rating            INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title             TEXT,
  body              TEXT,
  approved          BOOLEAN DEFAULT FALSE,
  owner_reply       TEXT,
  owner_replied_at  TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS reviews_agency_idx ON reviews (agency_id);

-- ---------------------------------------------------------------------------
-- 4. Agency owner sessions (claim flow)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS agency_owner_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id  UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  email      TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS owner_sessions_agency_idx  ON agency_owner_sessions (agency_id);
CREATE INDEX IF NOT EXISTS owner_sessions_expires_idx ON agency_owner_sessions (expires_at);

-- ---------------------------------------------------------------------------
-- 5. Row Level Security (RLS)
-- ---------------------------------------------------------------------------
ALTER TABLE agencies              ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews               ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_owner_sessions ENABLE ROW LEVEL SECURITY;

-- Public can read published agencies
CREATE POLICY "Public read published agencies"
  ON agencies FOR SELECT
  USING (status = 'published');

-- Public can insert leads (contact form)
CREATE POLICY "Public insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Public can read approved reviews
CREATE POLICY "Public read approved reviews"
  ON reviews FOR SELECT
  USING (approved = TRUE);

-- agency_owner_sessions: no public access (all access via service-role admin client)

-- ---------------------------------------------------------------------------
-- 6. Blog posts table
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT NOT NULL,
  content      JSONB NOT NULL DEFAULT '[]',
  category     TEXT NOT NULL DEFAULT 'Guide',
  tags         TEXT[] DEFAULT '{}',
  author       TEXT NOT NULL DEFAULT 'Shopify Agency Directory',
  reading_time INT NOT NULL DEFAULT 5,
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  featured     BOOLEAN DEFAULT FALSE,
  date         DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_date DATE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date   ON blog_posts(date DESC);

-- Reuse the set_updated_at trigger function (already created for agencies)
CREATE OR REPLACE TRIGGER set_updated_at_blog_posts
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- ---------------------------------------------------------------------------
-- 7. Seed data
-- ---------------------------------------------------------------------------
-- Use scripts/seed-agencies.sql or scripts/scrape-shopify-partners-firecrawl.js
-- to populate agencies. No test data is included in the schema to prevent
-- fake listings from appearing in production.
