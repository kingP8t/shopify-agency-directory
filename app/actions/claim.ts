"use server";

import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAdminClient } from "@/lib/supabase";
import { getOwnerSession } from "@/lib/owner-session";
import { sendClaimVerificationEmail } from "@/lib/email";

export interface ClaimState {
  success: boolean;
  error?: string;
}

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ── In-process rate limiter (mirrors leads.ts pattern) ──────────────────────
const claimRateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = claimRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    claimRateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

// ---------------------------------------------------------------------------
// Step 1: Owner enters email → /agencies/[slug]/claim
// ---------------------------------------------------------------------------
export async function requestClaimAction(
  _prev: ClaimState,
  formData: FormData
): Promise<ClaimState> {
  const { headers } = await import("next/headers");
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  const email = formData.get("email")?.toString().trim();
  const slug = formData.get("slug")?.toString().trim();

  if (!email || !slug) {
    return { success: false, error: "Email and agency slug are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const db = getAdminClient();

  const { data: agency } = await db
    .from("agencies")
    .select("id, name, slug")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!agency) {
    return { success: false, error: "Agency not found." };
  }

  // Generate a secure one-time token
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS).toISOString();

  const { error: updateError } = await db
    .from("agencies")
    .update({
      claim_token: token,
      claim_token_expires_at: expiresAt,
    })
    .eq("id", agency.id);

  if (updateError) {
    console.error("Claim token save error:", updateError);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const verifyUrl = `${siteUrl}/agencies/${slug}/claim/verify?token=${token}&email=${encodeURIComponent(email)}`;

  try {
    await sendClaimVerificationEmail({
      to: email,
      agencyName: agency.name,
      verifyUrl,
    });
  } catch (emailError) {
    console.error("Claim email send error:", emailError);
    return {
      success: false,
      error: "Failed to send verification email. Please try again or contact support.",
    };
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

  const long_description =
    formData.get("long_description")?.toString().trim() || null;
  const location = formData.get("location")?.toString().trim() || null;
  const country = formData.get("country")?.toString().trim() || null;
  const website = formData.get("website")?.toString().trim() || null;
  const phone = formData.get("phone")?.toString().trim() || null;
  const logo_url = formData.get("logo_url")?.toString().trim() || null;
  const foundedRaw = formData.get("founded")?.toString().trim();
  const founded = foundedRaw ? Number(foundedRaw) : null;
  const team_size = formData.get("team_size")?.toString().trim() || null;
  const budget_range = formData.get("budget_range")?.toString().trim() || null;
  const specializations =
    formData
      .get("specializations")
      ?.toString()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const tags =
    formData
      .get("tags")
      ?.toString()
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

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
    console.error("Owner update error:", error);
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
    console.error("Review reply error:", error);
    return { success: false, error: "Failed to save reply." };
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
    await db
      .from("agency_owner_sessions")
      .delete()
      .eq("id", session.sessionId);
  }

  const cookieStore = await cookies();
  cookieStore.delete("owner_session");
  redirect(`/agencies/${slug}`);
}
