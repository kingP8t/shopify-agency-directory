"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { sendNewAgencySubmissionEmail } from "@/lib/email";

export interface SubmitAgencyState {
  success: boolean;
  error?: string;
}

// ─── Simple in-process rate limiter ──────────────────────────────────────────
const agencyRateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3; // stricter — max 3 agency submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = agencyRateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    agencyRateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function submitAgencyAction(
  _prev: SubmitAgencyState,
  formData: FormData
): Promise<SubmitAgencyState> {
  // ── Honeypot check ──────────────────────────────────────────────────────
  const honeypot = formData.get("website_url")?.toString();
  if (honeypot) return { success: true }; // silently block bots

  // ── Rate limiting ───────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Too many submissions. Please wait a moment and try again.",
    };
  }

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const website = formData.get("website")?.toString().trim() || null;
  const email = formData.get("email")?.toString().trim();
  const location = formData.get("location")?.toString().trim() || null;
  const budget_range = formData.get("budget_range")?.toString().trim() || null;
  const team_size = formData.get("team_size")?.toString().trim() || null;

  const specializations = formData
    .get("specializations")
    ?.toString()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

  // Validation
  if (!name || !description || !email) {
    return {
      success: false,
      error: "Agency name, description, and contact email are required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (description.length < 50) {
    return {
      success: false,
      error: "Description must be at least 50 characters.",
    };
  }

  const slug = slugify(name);

  const { error } = await supabase.from("agencies").insert([
    {
      name,
      slug,
      description,
      website,
      email,
      location,
      budget_range,
      team_size,
      specializations,
      status: "pending", // Requires admin review before going live
      featured: false,
    },
  ]);

  if (error) {
    // Slug already exists
    if (error.code === "23505") {
      return {
        success: false,
        error:
          "An agency with this name already exists in our directory. Please contact us if you believe this is an error.",
      };
    }
    return {
      success: false,
      error: "Something went wrong submitting your agency. Please try again.",
    };
  }

  // Send admin notification email (fire-and-forget)
  await sendNewAgencySubmissionEmail({
    name: name!,
    email: email!,
    website,
    location,
    description: description!,
  });

  return { success: true };
}
