// ─── Email helper using Resend ────────────────────────────────────────────────
// Sign up free at https://resend.com — 3,000 emails/month on free tier
// Add RESEND_API_KEY and ADMIN_EMAIL to your .env.local and Vercel env vars

import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null; // Silently skip if not configured
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
const SITE_NAME = "Shopify Agency Directory";

// ─── Notify admin of a new lead enquiry ──────────────────────────────────────
export async function sendNewLeadEmail(lead: {
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  agencyName?: string;
}) {
  const client = getResend();
  if (!client || !ADMIN_EMAIL) return; // Not configured — skip silently

  await client.emails.send({
    from: `${SITE_NAME} <onboarding@resend.dev>`,
    to: ADMIN_EMAIL,
    subject: `New lead enquiry${lead.agencyName ? ` for ${lead.agencyName}` : ""} — ${lead.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New Lead Enquiry 🎯</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${lead.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
          ${lead.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company</td><td>${lead.company}</td></tr>` : ""}
          ${lead.budget ? `<tr><td style="padding: 8px 0; font-weight: bold;">Budget</td><td>${lead.budget}</td></tr>` : ""}
          ${lead.agencyName ? `<tr><td style="padding: 8px 0; font-weight: bold;">Agency</td><td>${lead.agencyName}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold;">Message:</p>
          <p style="margin: 8px 0 0; white-space: pre-wrap;">${lead.message}</p>
        </div>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          Sent from ${SITE_NAME}
        </p>
      </div>
    `,
  }).catch(console.error); // Never let email failure break the form
}

// ─── Notify admin of a new agency self-submission ─────────────────────────────
export async function sendNewAgencySubmissionEmail(agency: {
  name: string;
  email: string;
  website: string | null;
  location: string | null;
  description: string;
}) {
  const client = getResend();
  if (!client || !ADMIN_EMAIL) return;

  await client.emails.send({
    from: `${SITE_NAME} <onboarding@resend.dev>`,
    to: ADMIN_EMAIL,
    subject: `New agency submission — ${agency.name} (pending review)`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New Agency Submission ⏳</h2>
        <p style="color: #6b7280;">A new agency has submitted themselves and is waiting for your review.</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Agency</td><td>${agency.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${agency.email}">${agency.email}</a></td></tr>
          ${agency.website ? `<tr><td style="padding: 8px 0; font-weight: bold;">Website</td><td><a href="${agency.website}">${agency.website}</a></td></tr>` : ""}
          ${agency.location ? `<tr><td style="padding: 8px 0; font-weight: bold;">Location</td><td>${agency.location}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold;">Description:</p>
          <p style="margin: 8px 0 0;">${agency.description}</p>
        </div>
        <p style="margin-top: 24px;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin"
             style="background: #16a34a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Review in Admin →
          </a>
        </p>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          Sent from ${SITE_NAME}
        </p>
      </div>
    `,
  }).catch(console.error);
}
