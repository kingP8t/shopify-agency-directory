-- =============================================================================
-- Migration: Agency Claim Flow
-- =============================================================================
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Safe to re-run — all statements use IF (NOT) EXISTS guards.
-- =============================================================================


-- ── 1. agencies: add claim columns ────────────────────────────────────────────
ALTER TABLE agencies
  ADD COLUMN IF NOT EXISTS claim_token            TEXT,
  ADD COLUMN IF NOT EXISTS claim_token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS claimed_email          TEXT,
  ADD COLUMN IF NOT EXISTS claimed_at             TIMESTAMPTZ;


-- ── 2. reviews: rename legacy columns to match the codebase ──────────────────
--   reviewer  → reviewer_name
--   verified  → approved
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'reviewer'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'reviewer_name'
  ) THEN
    ALTER TABLE reviews RENAME COLUMN reviewer TO reviewer_name;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'verified'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'approved'
  ) THEN
    ALTER TABLE reviews RENAME COLUMN verified TO approved;
  END IF;
END $$;

-- Add owner-reply columns (safe if already exist)
ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS owner_reply      TEXT,
  ADD COLUMN IF NOT EXISTS owner_replied_at TIMESTAMPTZ;

-- Re-create the public-read policy using the renamed column
DROP POLICY IF EXISTS "Public read verified reviews"  ON reviews;
DROP POLICY IF EXISTS "Public read approved reviews"  ON reviews;
CREATE POLICY "Public read approved reviews"
  ON reviews FOR SELECT
  USING (approved = TRUE);


-- ── 3. agency_owner_sessions table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agency_owner_sessions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id  UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  email      TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS owner_sessions_agency_idx  ON agency_owner_sessions (agency_id);
CREATE INDEX IF NOT EXISTS owner_sessions_expires_idx ON agency_owner_sessions (expires_at);

-- RLS: no public access — all writes go through the service-role admin client
ALTER TABLE agency_owner_sessions ENABLE ROW LEVEL SECURITY;
