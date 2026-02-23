"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export interface ReviewState {
  success: boolean;
  error?: string;
}

// Simple rate limiter
const reviewRateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = reviewRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    reviewRateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 3; // max 3 reviews per IP per minute
}

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

  if (isRateLimited(ip)) {
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
    console.error("Review insert error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  return { success: true };
}
