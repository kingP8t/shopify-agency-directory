// ─── Google Analytics 4 event tracking helper ─────────────────────────────────
// Wraps window.gtag() so client components can fire custom conversion events.
// Safe to call server-side (no-ops when window is undefined).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number>
) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}
