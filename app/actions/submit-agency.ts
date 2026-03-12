"use server";

import { getAdminClient } from "@/lib/supabase";
import { headers } from "next/headers";
import { sendNewAgencySubmissionEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export interface SubmitAgencyState {
  success: boolean;
  error?: string;
}

const SUBMIT_MAX = 3;
const SUBMIT_WINDOW_MS = 60_000;

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

  if (await isRateLimited(`submit-agency:${ip}`, SUBMIT_MAX, SUBMIT_WINDOW_MS)) {
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

  const adminClient = getAdminClient();
  const { error } = await adminClient.from("agencies").insert([
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
  // name, email, description are guaranteed non-null by the validation above
  await sendNewAgencySubmissionEmail({
    name,
    email,
    website,
    location,
    description,
  });

  return { success: true };
}
