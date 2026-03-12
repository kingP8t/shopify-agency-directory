/**
 * Smoke tests for admin middleware HMAC verification
 * ──────────────────────────────────────────────────────────────────────────────
 * We extract and test the `verifyToken` logic directly since the middleware
 * depends on Next.js runtime APIs (NextRequest/NextResponse) which can't be
 * instantiated easily outside of the framework.
 */
import { describe, it, expect } from "vitest";

// ── Re-implement the same HMAC verification from middleware.ts ──────────────
// (The middleware exports `middleware` + `config`, but not verifyToken.
//  We replicate the exact algorithm here so tests validate the crypto logic.)

async function signToken(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(value)
  );
  const sig = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${value}.${sig}`;
}

async function verifyToken(token: string, secret: string): Promise<boolean> {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const value = token.slice(0, lastDot);
  const sig = token.slice(lastDot + 1);

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(value)
  );
  const expected = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

// ── Tests ───────────────────────────────────────────────────────────────────
describe("Admin middleware HMAC verification", () => {
  const secret = "test-secret-key-32-bytes-long!!";

  it("accepts a correctly signed token", async () => {
    const token = await signToken("admin", secret);
    expect(await verifyToken(token, secret)).toBe(true);
  });

  it("rejects a token signed with a different secret", async () => {
    const token = await signToken("admin", "wrong-secret");
    expect(await verifyToken(token, secret)).toBe(false);
  });

  it("rejects a tampered value", async () => {
    const token = await signToken("admin", secret);
    const tampered = token.replace("admin", "hacker");
    expect(await verifyToken(tampered, secret)).toBe(false);
  });

  it("rejects a token with no dot separator", async () => {
    expect(await verifyToken("no-dot-here", secret)).toBe(false);
  });

  it("rejects an empty string", async () => {
    expect(await verifyToken("", secret)).toBe(false);
  });

  it("rejects a token with an appended character", async () => {
    const token = await signToken("admin", secret);
    expect(await verifyToken(token + "x", secret)).toBe(false);
  });

  it("produces consistent signatures", async () => {
    const t1 = await signToken("session-123", secret);
    const t2 = await signToken("session-123", secret);
    expect(t1).toBe(t2);
  });

  it("produces different signatures for different values", async () => {
    const t1 = await signToken("session-1", secret);
    const t2 = await signToken("session-2", secret);
    expect(t1).not.toBe(t2);
  });
});
