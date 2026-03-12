"use server";

import { supabase, getAdminClient } from "@/lib/supabase";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { logError } from "@/lib/logger";
import { isRateLimited } from "@/lib/rate-limit";

export interface ReviewState {
  success: boolean;
  error?: string;
}

// Rate limit config — 3 review submissions per IP per minute
const REVIEW_MAX = 3;
const REVIEW_WINDOW_MS = 60_000;

export async function submitReviewAction(
  _prev: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  // Rate limiting
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (await isRateLimited(`review:${ip}`, REVIEW_MAX, REVIEW_WINDOW_MS)) {
    return { success: false, error: "Too many submissions. Please wait a moment." };
  }

  const agency_id = formData.get("agency_id")?.toString();
  const reviewer_name = formData.get("reviewer_name")?.toString().trim();
  const body = formData.get("body")?.toString().trim();
  const ratingRaw = formData.get("rating")?.toString();
  const rating = ratingRaw ? parseInt(ratingRaw, 10) : 0;

  if (!agency_id || !reviewer_name || !body) {
    return { success: false, error: "Name and review are required." };
  }

  if (!rating || rating < 1 || rating > 5) {
    return { success: false, error: "Please select a star rating." };
  }

  if (body.length < 20) {
    return { success: false, error: "Review must be at least 20 characters." };
  }

  const { error } = await supabase.from("reviews").insert([
    {
      agency_id,
      reviewer_name,
      body,
      rating,
      approved: false, // Requires admin approval before showing
    },
  ]);

  if (error) {
    logError("review-insert", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}

// ── Shared helpers ───────────────────────────────────────────────────────────

/** Extract slug from Supabase joined `agencies(slug)` — handles both array and object form */
function extractAgencySlug(agencies: unknown): string | undefined {
  const data = agencies as { slug: string } | { slug: string }[] | null;
  if (!data) return undefined;
  if (Array.isArray(data)) return data[0]?.slug;
  return data.slug;
}

/** Recalculate agency rating + review_count from all approved reviews */
async function recalcAgencyRating(agencyId: string) {
  const db = getAdminClient();
  const { data: approved } = await db
    .from("reviews")
    .select("rating")
    .eq("agency_id", agencyId)
    .eq("approved", true);

  const count = approved?.length ?? 0;
  const avg =
    count > 0
      ? (approved as { rating: number }[]).reduce((sum, r) => sum + r.rating, 0) / count
      : null;

  await db
    .from("agencies")
    .update({
      rating: avg !== null ? Math.round(avg * 10) / 10 : null,
      review_count: count,
    })
    .eq("id", agencyId);
}

// ── Admin: approve a pending review ──────────────────────────────────────────
export async function approveReviewAction(
  reviewId: string
): Promise<ReviewState> {
  const db = getAdminClient();

  const { data: review } = await db
    .from("reviews")
    .select("agency_id, agencies(slug)")
    .eq("id", reviewId)
    .single();

  if (!review) return { success: false, error: "Review not found." };

  const { error } = await db
    .from("reviews")
    .update({ approved: true })
    .eq("id", reviewId);

  if (error) return { success: false, error: error.message };

  await recalcAgencyRating(review.agency_id);

  const slug = extractAgencySlug(review.agencies);
  revalidatePath("/admin");
  if (slug) {
    revalidatePath(`/agencies/${slug}`);
    revalidatePath("/agencies");
  }

  return { success: true };
}

// ── Admin: delete a review (reject / spam) ───────────────────────────────────
export async function deleteReviewAction(
  reviewId: string
): Promise<ReviewState> {
  const db = getAdminClient();

  const { data: review } = await db
    .from("reviews")
    .select("agency_id, approved, agencies(slug)")
    .eq("id", reviewId)
    .single();

  const { error } = await db.from("reviews").delete().eq("id", reviewId);
  if (error) return { success: false, error: error.message };

  if (review?.approved) {
    await recalcAgencyRating(review.agency_id);

    const slug = extractAgencySlug(review.agencies);
    if (slug) {
      revalidatePath(`/agencies/${slug}`);
      revalidatePath("/agencies");
    }
  }

  revalidatePath("/admin");
  return { success: true };
}
