/**
 * Structured logger
 * ──────────────────────────────────────────────────────────────────────────────
 * In production, logs a single-line JSON object to stderr so Vercel / your log
 * drain can index it. Internal details (stack traces, Supabase error objects)
 * are serialised safely — no raw .toString() leakage.
 *
 * In development, behaves like console.error for easy debugging.
 */

const isDev = process.env.NODE_ENV !== "production";

export function logError(label: string, ...args: unknown[]): void {
  if (isDev) {
    console.error(`[${label}]`, ...args);
  } else {
    // Structured JSON line — safe for Vercel / Datadog / any log drain
    const message =
      args.length === 1 && args[0] instanceof Error
        ? args[0].message
        : args
            .map((a) =>
              typeof a === "string" ? a : JSON.stringify(a) ?? String(a)
            )
            .join(" ");
    console.error(JSON.stringify({ level: "error", label, message }));
  }
}

/** Drop-in replacement for `.catch(console.error)` on fire-and-forget promises */
export function silentCatch(err: unknown): void {
  logError("silent-catch", err);
}
