-- ─── Database-backed rate limiting ──────────────────────────────────────────
-- Run this in: Supabase Dashboard → SQL Editor → Run
--
-- Replaces the in-memory Map in leads.ts and reviews.ts with a persistent
-- table that survives serverless cold starts.

CREATE TABLE IF NOT EXISTS rate_limits (
  id        bigserial    PRIMARY KEY,
  key       text         NOT NULL,          -- e.g. "lead:1.2.3.4"
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookups: find all rows for a key in a time window
CREATE INDEX IF NOT EXISTS idx_rate_limits_key_created
  ON rate_limits (key, created_at);

-- No RLS needed — this table is only written via service role (Server Actions)
-- Public users cannot access it directly

-- Optional: auto-clean rows older than 1 hour to keep table small
CREATE OR REPLACE FUNCTION prune_rate_limits() RETURNS void
  LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM rate_limits WHERE created_at < NOW() - INTERVAL '1 hour';
$$;
