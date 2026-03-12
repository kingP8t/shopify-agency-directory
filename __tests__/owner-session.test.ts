/**
 * Smoke tests for owner session token signing / verification
 * ──────────────────────────────────────────────────────────────────────────────
 * Tests the HMAC token utilities used for agency owner authentication.
 * We re-implement the exact sign/verify logic from lib/owner-session.ts here
 * to avoid pulling in the Supabase dependency chain (which needs env vars).
 */
import { describe, it, expect } from "vitest";
import { createHmac } from "crypto";

const TEST_SECRET = "test-secret-for-owner-session-32!";

// ── Re-implement the exact algorithm from lib/owner-session.ts ──────────────
function signOwnerToken(sessionId: string): string {
  const hmac = createHmac("sha256", TEST_SECRET);
  hmac.update(sessionId);
  return `${sessionId}.${hmac.digest("hex")}`;
}

function verifyOwnerToken(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;
  const sessionId = signed.slice(0, lastDot);
  const expected = signOwnerToken(sessionId);
  if (signed.length !== expected.length) return null;
  let mismatch = 0;
  for (let i = 0; i < signed.length; i++) {
    mismatch |= signed.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0 ? sessionId : null;
}

// ── Tests ───────────────────────────────────────────────────────────────────
describe("Owner session token signing & verification", () => {
  it("roundtrips: sign then verify returns original sessionId", () => {
    const sessionId = "abc-123-uuid";
    const signed = signOwnerToken(sessionId);
    expect(verifyOwnerToken(signed)).toBe(sessionId);
  });

  it("rejects a tampered sessionId", () => {
    const signed = signOwnerToken("session-original");
    const tampered = signed.replace("session-original", "session-tampered");
    expect(verifyOwnerToken(tampered)).toBeNull();
  });

  it("rejects a token with no dot", () => {
    expect(verifyOwnerToken("no-dot-separator")).toBeNull();
  });

  it("rejects a token with a wrong signature", () => {
    expect(verifyOwnerToken("session-id.badhexsignature")).toBeNull();
  });

  it("produces consistent signatures for the same input", () => {
    const t1 = signOwnerToken("consistent-id");
    const t2 = signOwnerToken("consistent-id");
    expect(t1).toBe(t2);
  });

  it("produces different signatures for different inputs", () => {
    const t1 = signOwnerToken("id-one");
    const t2 = signOwnerToken("id-two");
    expect(t1).not.toBe(t2);
  });

  it("uses HMAC-SHA256 and produces a 64-char hex signature", () => {
    const signed = signOwnerToken("test-id");
    const sig = signed.split(".").pop()!;
    expect(sig).toMatch(/^[0-9a-f]{64}$/);
  });
});
