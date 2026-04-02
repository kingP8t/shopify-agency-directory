"use server";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { sendNewLeadEmail, sendLeadToOwnerEmail } from "@/lib/email";
import { logError } from "@/lib/logger";
import { isRateLimited } from "@/lib/rate-limit";

export interface LeadFormState {
  success: boolean;
  error?: string;
}

// Rate limit config — 5 lead submissions per IP per minute
const LEAD_MAX = 5;
const LEAD_WINDOW_MS = 60_000;

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

  if (await isRateLimited(`lead:${ip}`, LEAD_MAX, LEAD_WINDOW_MS)) {
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
  const project_type = formData.get("project_type")?.toString().trim() || null;
  const timeline = formData.get("timeline")?.toString().trim() || null;
  const store_url = formData.get("store_url")?.toString().trim() || null;
  const message = formData.get("message")?.toString().trim();
  const agency_id = formData.get("agency_id")?.toString() || null;

  if (!name || !email || !company || !project_type || !budget || !timeline || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Look up agency name + claimed_email if agency_id was provided
  let agencyName: string | undefined;
  let agencySlug: string | undefined;
  let agencyClaimedEmail: string | null = null;
  if (agency_id) {
    const { data } = await supabase
      .from("agencies")
      .select("name, slug, claimed_email")
      .eq("id", agency_id)
      .single();
    agencyName = data?.name;
    agencySlug = data?.slug;
    agencyClaimedEmail = data?.claimed_email ?? null;
  }

  const { error } = await supabase.from("leads").insert([
    { name, email, company, budget, project_type, timeline, store_url, message, agency_id },
  ]);

  if (error) {
    logError("lead-insert", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Notify admin (fire-and-forget)
  await sendNewLeadEmail({ name, email, company, budget, project_type, timeline, store_url, message, agencyName });

  // Notify the agency owner directly if their listing is claimed (fire-and-forget)
  if (agencyClaimedEmail && agencyName && agencySlug) {
    await sendLeadToOwnerEmail({
      ownerEmail: agencyClaimedEmail,
      agencyName,
      agencySlug,
      lead: { name, email, company: company ?? null, budget: budget ?? null, message },
    });
  }

  return { success: true };
}

// ---------------------------------------------------------------------------
// Brief Generator lead capture
// ---------------------------------------------------------------------------

export interface BriefLeadPayload {
  contactName: string;
  contactEmail: string;
  companyName: string;
  projectType: string;
  budgetRange: string;
  launchDate: string;
  goals: string[];
  integrations: string[];
  designStyle: string;
  catalogSize: string;
  mustHaveFeatures: string;
  niceToHaveFeatures: string;
}

export async function submitBriefLeadAction(
  payload: BriefLeadPayload
): Promise<LeadFormState> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (await isRateLimited(`brief-lead:${ip}`, LEAD_MAX, LEAD_WINDOW_MS)) {
    return {
      success: false,
      error: "Too many submissions. Please wait a moment and try again.",
    };
  }

  const {
    contactName,
    contactEmail,
    companyName,
    projectType,
    budgetRange,
    launchDate,
    goals,
    integrations,
    designStyle,
    catalogSize,
    mustHaveFeatures,
    niceToHaveFeatures,
  } = payload;

  if (!contactName || !contactEmail || !companyName) {
    return { success: false, error: "Name, email, and company are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Compose a summary message from the brief data
  const parts: string[] = [
    `[Brief Generator Lead]`,
    goals.length > 0 ? `Goals: ${goals.join(", ")}` : "",
    designStyle ? `Design style: ${designStyle}` : "",
    catalogSize ? `Catalog: ${catalogSize}` : "",
    integrations.length > 0 ? `Integrations: ${integrations.join(", ")}` : "",
    mustHaveFeatures ? `Must-have: ${mustHaveFeatures}` : "",
    niceToHaveFeatures ? `Nice-to-have: ${niceToHaveFeatures}` : "",
  ].filter(Boolean);

  const message = parts.join("\n");

  const { error } = await supabase.from("leads").insert([
    {
      name: contactName,
      email: contactEmail,
      company: companyName,
      budget: budgetRange || null,
      project_type: projectType || null,
      timeline: launchDate || null,
      message,
    },
  ]);

  if (error) {
    logError("brief-lead-insert", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Notify admin
  await sendNewLeadEmail({
    name: contactName,
    email: contactEmail,
    company: companyName,
    budget: budgetRange || null,
    project_type: projectType || null,
    timeline: launchDate || null,
    store_url: null,
    message,
    agencyName: undefined,
  });

  return { success: true };
}
