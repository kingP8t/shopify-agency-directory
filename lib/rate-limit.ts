/**
 * Database-backed rate limiter
 * ─────────────────────────────────────────────────────────────────────────────
 * Uses Supabase (service role) to count requests per key in a rolling window.
 * Works correctly in serverless / edge environments — no in-memory state.
 *
 * Requires the `rate_limits` table — run scripts/migration-rate-limits.sql first.
 */

import { getAdminClient } from "@/lib/supabase";

/**
 * Check if a key has exceeded its rate limit.
 * Records the current request if allowed.
 *
 * @param key       Unique identifier, e.g. "lead:1.2.3.4" or "review:1.2.3.4"
 * @param maxCount  Maximum allowed requests in the window
 * @param windowMs  Rolling window duration in milliseconds
 * @returns         true = rate limited (reject), false = allowed (proceed)
 */
export async function isRateLimited(
  key: string,
  maxCount: number,
  windowMs: number
): Promise<boolean> {
  try {
    const db = getAdminClient();
    const windowStart = new Date(Date.now() - windowMs).toISOString();

    // Count how many requests this key has made in the current window
    const { count, error: countError } = await db
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("key", key)
      .gte("created_at", windowStart);

    if (countError) {
      // Fail open — don't block users if the rate limit table is unavailable
      console.error("[rate-limit] count error:", countError.message);
      return false;
    }

    if ((count ?? 0) >= maxCount) {
      return true; // Rate limited
    }

    // Record this request (fire-and-forget — don't slow down the response)
    void db
      .from("rate_limits")
      .insert({ key })
      .then(() => {
        // Opportunistically prune old rows ~1 in 20 inserts
        if (Math.random() < 0.05) {
          void db.rpc("prune_rate_limits");
        }
      });

    return false; // Not rate limited
  } catch (err) {
    // Never block a request due to rate-limit infrastructure failure
    console.error("[rate-limit] unexpected error:", err);
    return false;
  }
}
