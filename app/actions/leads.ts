"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { sendNewLeadEmail } from "@/lib/email";

export interface LeadFormState {
  success: boolean;
  error?: string;
}

// ─── Simple in-process rate limiter ──────────────────────────────────────────
// Tracks submission counts per IP using a Map. Resets every WINDOW_MS.
// Good enough for a low-traffic directory; swap for Redis/Upstash for scale.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute window
const MAX_REQUESTS = 5;   // max 5 submissions per IP per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) return true;
  return false;
}

export async function submitLeadAction(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  // ── Honeypot check — bots fill hidden fields, humans leave them blank ──
  const honeypot = formData.get("website_url")?.toString();
  if (honeypot) {
    // Silently succeed so bots don't know they were blocked
    return { success: true };
  }

  // ── Rate limiting ──────────────────────────────────────────────────────
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

  // ── Field extraction ───────────────────────────────────────────────────
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const company = formData.get("company")?.toString().trim() || null;
  const budget = formData.get("budget")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();
  const agency_id = formData.get("agency_id")?.toString() || null;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Look up agency name if agency_id was provided (for email subject line)
  let agencyName: string | undefined;
  if (agency_id) {
    const { data } = await supabase
      .from("agencies")
      .select("name")
      .eq("id", agency_id)
      .single();
    agencyName = data?.name;
  }

  const { error } = await supabase.from("leads").insert([
    { name, email, company, budget, message, agency_id },
  ]);

  if (error) {
    console.error("Lead insert error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Send admin notification email (fire-and-forget — never blocks the response)
  await sendNewLeadEmail({ name, email, company, budget, message, agencyName });

  return { success: true };
}
