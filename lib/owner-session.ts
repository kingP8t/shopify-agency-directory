import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { getAdminClient } from "@/lib/supabase";

const ADMIN_SECRET = process.env.ADMIN_SECRET!;
const COOKIE_NAME = "owner_session";
export const OWNER_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function signOwnerToken(sessionId: string): string {
  const hmac = createHmac("sha256", ADMIN_SECRET);
  hmac.update(sessionId);
  return `${sessionId}.${hmac.digest("hex")}`;
}

export function verifyOwnerToken(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;
  const sessionId = signed.slice(0, lastDot);
  const expected = signOwnerToken(sessionId);
  // Constant-time compare to prevent timing attacks
  if (signed.length !== expected.length) return null;
  let mismatch = 0;
  for (let i = 0; i < signed.length; i++) {
    mismatch |= signed.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0 ? sessionId : null;
}

export interface OwnerSession {
  sessionId: string;
  agencyId: string;
  email: string;
}

// Call at the top of any owner-protected Server Component or Action.
// Returns null if the cookie is missing, forged, expired, or revoked.
// Pass slug to also verify the session belongs to that specific agency.
export async function getOwnerSession(
  slug?: string
): Promise<OwnerSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const sessionId = verifyOwnerToken(raw);
  if (!sessionId) return null;

  const db = getAdminClient();
  const { data } = await db
    .from("agency_owner_sessions")
    .select("agency_id, email, expires_at, agencies(slug)")
    .eq("id", sessionId)
    .single();

  if (!data) return null;

  // Check expiry
  if (new Date(data.expires_at) < new Date()) return null;

  // If a slug is provided, ensure this session belongs to that agency
  const agencyData = data.agencies as unknown;
  const agencySlug = Array.isArray(agencyData)
    ? (agencyData[0] as { slug: string } | undefined)?.slug
    : (agencyData as { slug: string } | null)?.slug;
  if (slug && agencySlug !== slug) return null;

  return { sessionId, agencyId: data.agency_id, email: data.email };
}
