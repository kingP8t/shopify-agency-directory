"use server";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logError } from "@/lib/logger";
import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase";
import { getOwnerSession, ownerCookieName } from "@/lib/owner-session";
import { sendClaimVerificationEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export interface ClaimState {
  success: boolean;
  error?: string;
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Rate limit config — 3 claim attempts per IP per 10 minutes (database-backed)
const CLAIM_MAX = 3;
const CLAIM_WINDOW_MS = 10 * 60 * 1000;

// ── Domain matching helper ──────────────────────────────────────────────────
// Extracts root domain from a URL or email for comparison.
// e.g. "hello@acme.co" → "acme.co", "https://www.acme.co/page" → "acme.co"
function extractDomain(input: string): string | null {
  try {
    if (input.includes("@")) {
      // Email address
      const domain = input.split("@")[1]?.toLowerCase();
      return domain ? stripWww(domain) : null;
    }
    // URL — ensure it has a protocol for URL parsing
    const url = input.startsWith("http") ? input : `https://${input}`;
    const hostname = new URL(url).hostname.toLowerCase();
    return stripWww(hostname);
  } catch {
    return null;
  }
}

function stripWww(domain: string): string {
  return domain.replace(/^www\./, "");
}

// Free email providers — claims from these are flagged for admin review
const FREE_EMAIL_PROVIDERS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk",
  "hotmail.com", "outlook.com", "live.com", "msn.com",
  "aol.com", "icloud.com", "me.com", "mail.com",
  "protonmail.com", "proton.me", "zoho.com", "yandex.com",
  "gmx.com", "gmx.net", "tutanota.com", "fastmail.com",
]);

// ── Shared helpers for claim & re-login ─────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getClientIp(): Promise<string> {
  const { headers } = await import("next/headers");
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
}

function parseEmailSlug(formData: FormData): ClaimState | { email: string; slug: string } {
  const email = formData.get("email")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim();
  if (!email || !slug) return { success: false, error: "Email and agency slug are required." };
  if (!EMAIL_RE.test(email)) return { success: false, error: "Please enter a valid email address." };
  return { email, slug };
}

// ---------------------------------------------------------------------------
// Step 1: Owner enters email → /agencies/[slug]/claim
// ---------------------------------------------------------------------------
export async function requestClaimAction(
  _prev: ClaimState,
  formData: FormData
): Promise<ClaimState> {
  const ip = await getClientIp();
  if (await isRateLimited(`claim:${ip}`, CLAIM_MAX, CLAIM_WINDOW_MS)) {
    return { success: false, error: "Too many requests. Please wait a few minutes and try again." };
  }

  const parsed = parseEmailSlug(formData);
  if ("success" in parsed) return parsed;
  const { email, slug } = parsed;

  const db = getAdminClient();

  const { data: agency } = await db
    .from("agencies")
    .select("id, name, slug, website, claimed_at")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!agency) return { success: false, error: "Agency not found." };

  if (agency.claimed_at) {
    return { success: false, error: "This agency has already been claimed. Contact support if you believe this is an error." };
  }

  // ── Domain verification ───────────────────────────────────────────────
  const emailDomain = extractDomain(email);
  const agencyDomain = agency.website ? extractDomain(agency.website) : null;

  if (emailDomain && FREE_EMAIL_PROVIDERS.has(emailDomain) && agencyDomain) {
    return { success: false, error: `Please use your business email address (e.g. you@${agencyDomain}). Free email providers cannot be used to claim a listing.` };
  }
  if (agencyDomain && emailDomain && emailDomain !== agencyDomain) {
    return { success: false, error: `Your email domain doesn't match the agency website (${agencyDomain}). Please use an email address from your agency's domain.` };
  }

  // Generate token, save to DB, send email
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const { error: updateError } = await db
    .from("agencies")
    .update({ claim_token: token, claim_token_expires_at: expiresAt })
    .eq("id", agency.id);

  if (updateError) {
    logError("claim-token-save", updateError);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopifyagencydirectory.com";
  const verifyUrl = `${siteUrl}/agencies/${encodeURIComponent(slug)}/claim/verify?token=${token}&email=${encodeURIComponent(email)}`;

  try {
    await sendClaimVerificationEmail({ to: email, agencyName: agency.name, verifyUrl });
  } catch (emailError) {
    logError("claim-email-send", emailError);
    return { success: false, error: "Failed to send verification email. Please try again or contact support." };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Step 1b: Returning owner requests a re-login link (already claimed)
// ---------------------------------------------------------------------------
export async function requestReLoginAction(
  _prev: ClaimState,
  formData: FormData
): Promise<ClaimState> {
  const ip = await getClientIp();
  if (await isRateLimited(`relogin:${ip}`, CLAIM_MAX, CLAIM_WINDOW_MS)) {
    return { success: false, error: "Too many requests. Please wait a few minutes and try again." };
  }

  const parsed = parseEmailSlug(formData);
  if ("success" in parsed) return parsed;
  const { email, slug } = parsed;

  const db = getAdminClient();

  const { data: agency } = await db
    .from("agencies")
    .select("id, name, slug, claimed_email, claimed_at")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!agency) return { success: false, error: "Agency not found." };

  if (!agency.claimed_at) {
    return { success: false, error: "This agency has not been claimed yet." };
  }
  if (agency.claimed_email?.toLowerCase() !== email.toLowerCase()) {
    return { success: false, error: "This email doesn't match the account on file. Please use the email you originally claimed with." };
  }

  // Generate token, save to DB, send email
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const { error: updateError } = await db
    .from("agencies")
    .update({ claim_token: token, claim_token_expires_at: expiresAt })
    .eq("id", agency.id);

  if (updateError) {
    logError("relogin-token-save", updateError);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shopifyagencydirectory.com";
  const verifyUrl = `${siteUrl}/agencies/${encodeURIComponent(slug)}/claim/verify?token=${token}&email=${encodeURIComponent(email)}`;

  try {
    await sendClaimVerificationEmail({ to: email, agencyName: agency.name, verifyUrl });
  } catch (emailError) {
    logError("relogin-email-send", emailError);
    return { success: false, error: "Failed to send verification email. Please try again or contact support." };
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Step 2: Owner clicks magic link → handled by Route Handler
// app/agencies/[slug]/claim/verify/route.ts
// (Route Handlers can call cookies().set(); Server Component renders cannot)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Step 3a: Owner updates their listing (restricted fields only)
// ---------------------------------------------------------------------------
export interface OwnerUpdateState {
  success: boolean;
  error?: string;
}

export async function updateAgencyOwnerAction(
  _prev: OwnerUpdateState,
  formData: FormData
): Promise<OwnerUpdateState> {
  const slug = formData.get("slug")?.toString();
  if (!slug) return { success: false, error: "Missing agency slug." };

  const session = await getOwnerSession(slug);
  if (!session) {
    return {
      success: false,
      error: "Not authenticated. Please re-verify your email.",
    };
  }

  const description = formData.get("description")?.toString().trim();
  if (!description) {
    return { success: false, error: "Description is required." };
  }
  if (description.length > 500) {
    return { success: false, error: "Short description must be 500 characters or fewer." };
  }

  const long_description =
    formData.get("long_description")?.toString().trim() || null;
  if (long_description && long_description.length > 5000) {
    return { success: false, error: "Full description must be 5,000 characters or fewer." };
  }

  const location = formData.get("location")?.toString().trim().slice(0, 200) || null;
  const country = formData.get("country")?.toString().trim().slice(0, 2) || null;
  const phone = formData.get("phone")?.toString().trim().slice(0, 30) || null;

  // Validate URLs — only allow http(s) to prevent javascript: or data: URIs
  const website = formData.get("website")?.toString().trim() || null;
  if (website && !/^https?:\/\/.+/i.test(website)) {
    return { success: false, error: "Website must be a valid URL starting with http:// or https://." };
  }

  const logo_url = formData.get("logo_url")?.toString().trim() || null;
  if (logo_url && !/^https?:\/\/.+/i.test(logo_url)) {
    return { success: false, error: "Logo URL must be a valid URL starting with http:// or https://." };
  }

  const foundedRaw = formData.get("founded")?.toString().trim();
  const founded = foundedRaw ? Number(foundedRaw) : null;
  if (founded !== null && (founded < 1900 || founded > new Date().getFullYear())) {
    return { success: false, error: "Please enter a valid founding year." };
  }

  const team_size = formData.get("team_size")?.toString().trim() || null;
  const budget_range = formData.get("budget_range")?.toString().trim() || null;
  const specializations =
    formData
      .get("specializations")
      ?.toString()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20) ?? [];
  const tags =
    formData
      .get("tags")
      ?.toString()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20) ?? [];

  const db = getAdminClient();
  const { error } = await db
    .from("agencies")
    .update({
      description,
      long_description,
      location,
      country,
      website,
      phone,
      logo_url,
      founded,
      team_size,
      budget_range,
      specializations,
      tags,
    })
    .eq("id", session.agencyId);

  if (error) {
    logError("owner-update", error);
    return { success: false, error: "Failed to save changes." };
  }

  revalidatePath(`/agencies/${slug}`);
  revalidatePath("/agencies");

  return { success: true };
}

// ---------------------------------------------------------------------------
// Step 3b: Owner replies to a review
// ---------------------------------------------------------------------------
export interface OwnerReplyState {
  success: boolean;
  error?: string;
}

export async function respondToReviewAction(
  _prev: OwnerReplyState,
  formData: FormData
): Promise<OwnerReplyState> {
  const slug = formData.get("slug")?.toString();
  const reviewId = formData.get("review_id")?.toString();
  const reply = formData.get("reply")?.toString().trim();

  if (!slug || !reviewId || !reply) {
    return { success: false, error: "All fields are required." };
  }

  if (reply.length < 10) {
    return { success: false, error: "Reply must be at least 10 characters." };
  }

  const session = await getOwnerSession(slug);
  if (!session) {
    return { success: false, error: "Not authenticated." };
  }

  const db = getAdminClient();

  // Verify the review belongs to this agency
  const { data: review } = await db
    .from("reviews")
    .select("id, agency_id")
    .eq("id", reviewId)
    .eq("agency_id", session.agencyId)
    .single();

  if (!review) {
    return { success: false, error: "Review not found." };
  }

  const { error } = await db
    .from("reviews")
    .update({
      owner_reply: reply,
      owner_replied_at: new Date().toISOString(),
    })
    .eq("id", reviewId);

  if (error) {
    logError("review-reply", error);
    return { success: false, error: "Failed to save reply." };
  }

  revalidatePath(`/agencies/${slug}`);

  return { success: true };
}

// ---------------------------------------------------------------------------
// Step 3c: Owner deletes a review reply
// ---------------------------------------------------------------------------
export async function deleteReplyAction(
  _prev: OwnerReplyState,
  formData: FormData
): Promise<OwnerReplyState> {
  const slug = formData.get("slug")?.toString();
  const reviewId = formData.get("review_id")?.toString();

  if (!slug || !reviewId) {
    return { success: false, error: "Missing required fields." };
  }

  const session = await getOwnerSession(slug);
  if (!session) {
    return { success: false, error: "Not authenticated." };
  }

  const db = getAdminClient();

  // Verify the review belongs to this agency
  const { data: review } = await db
    .from("reviews")
    .select("id, agency_id")
    .eq("id", reviewId)
    .eq("agency_id", session.agencyId)
    .single();

  if (!review) {
    return { success: false, error: "Review not found." };
  }

  const { error } = await db
    .from("reviews")
    .update({
      owner_reply: null,
      owner_replied_at: null,
    })
    .eq("id", reviewId);

  if (error) {
    logError("review-reply-delete", error);
    return { success: false, error: "Failed to delete reply." };
  }

  revalidatePath(`/agencies/${slug}`);

  return { success: true };
}

// ---------------------------------------------------------------------------
// Owner logout
// ---------------------------------------------------------------------------
export async function ownerLogoutAction(slug: string) {
  const session = await getOwnerSession(slug);

  if (session) {
    const db = getAdminClient();

    // Delete the current session
    await db
      .from("agency_owner_sessions")
      .delete()
      .eq("id", session.sessionId);

    // Clean up any expired sessions for the same agency (housekeeping)
    await db
      .from("agency_owner_sessions")
      .delete()
      .eq("agency_id", session.agencyId)
      .lt("expires_at", new Date().toISOString());
  }

  const cookieStore = await cookies();
  cookieStore.delete(ownerCookieName(slug));
  redirect(`/agencies/${slug}`);
}
