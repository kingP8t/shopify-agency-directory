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
const FROM_ADDRESS = "Shopify Agency Directory <support@shopifyagencydirectory.com>";

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
    from: FROM_ADDRESS,
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

// ─── Send claim verification email to agency owner ───────────────────────────
export async function sendClaimVerificationEmail(params: {
  to: string;
  agencyName: string;
  verifyUrl: string;
}) {
  const client = getResend();
  if (!client) return;

  const { error } = await client.emails.send({
    from: FROM_ADDRESS,
    to: params.to,
    subject: `Verify your ownership of ${params.agencyName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Claim Your Agency Listing</h2>
        <p>You requested to claim <strong>${params.agencyName}</strong> on the ${SITE_NAME}.</p>
        <p>Click the button below to verify your email and access your owner dashboard.
           This link expires in <strong>24 hours</strong>.</p>
        <p style="margin-top: 24px;">
          <a href="${params.verifyUrl}"
             style="background: #16a34a; color: white; padding: 12px 24px;
                    border-radius: 6px; text-decoration: none; font-weight: bold;
                    display: inline-block;">
            Verify &amp; Claim Listing →
          </a>
        </p>
        <p style="margin-top: 16px; font-size: 13px; color: #6b7280;">
          If you didn't request this, ignore this email — no action is needed.
        </p>
        <p style="margin-top: 8px; font-size: 12px; color: #9ca3af; word-break: break-all;">
          Link: ${params.verifyUrl}
        </p>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          Sent from ${SITE_NAME}
        </p>
      </div>
    `,
  });
  if (error) throw new Error(error.message);
}

// ─── Notify admin when an agency is successfully claimed ──────────────────────
export async function sendClaimNotificationEmail(params: {
  agencyName: string;
  agencySlug: string;
  claimedEmail: string;
}) {
  const client = getResend();
  if (!client || !ADMIN_EMAIL) return;

  const ownerDashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/agencies/${params.agencySlug}/owner`;

  await client.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `Agency claimed: ${params.agencyName} — ${params.claimedEmail}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Agency Claim Verified ✅</h2>
        <p><strong>${params.agencyName}</strong> has been claimed by
           <a href="mailto:${params.claimedEmail}">${params.claimedEmail}</a>.</p>
        <p>They now have access to the owner dashboard to edit their listing,
           view leads, and respond to reviews.</p>
        <p style="margin-top: 16px;">
          <a href="${ownerDashboardUrl}"
             style="background: #16a34a; color: white; padding: 10px 20px;
                    border-radius: 6px; text-decoration: none; font-weight: bold;">
            View Owner Dashboard →
          </a>
        </p>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          Sent from ${SITE_NAME}
        </p>
      </div>
    `,
  }).catch(console.error);
}

// ─── Notify agency owner of a new lead enquiry ───────────────────────────────
export async function sendLeadToOwnerEmail(params: {
  ownerEmail: string;
  agencyName: string;
  lead: {
    name: string;
    email: string;
    company: string | null;
    budget: string | null;
    message: string;
  };
}) {
  const client = getResend();
  if (!client) return; // Not configured — skip silently

  await client.emails.send({
    from: FROM_ADDRESS,
    to: params.ownerEmail,
    subject: `New enquiry for ${params.agencyName} — ${params.lead.name}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #16a34a;">New Lead Enquiry 🎯</h2>
        <p>Someone has enquired about <strong>${params.agencyName}</strong> via the ${SITE_NAME}.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name</td><td>${params.lead.name}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td><a href="mailto:${params.lead.email}">${params.lead.email}</a></td></tr>
          ${params.lead.company ? `<tr><td style="padding: 8px 0; font-weight: bold;">Company</td><td>${params.lead.company}</td></tr>` : ""}
          ${params.lead.budget ? `<tr><td style="padding: 8px 0; font-weight: bold;">Budget</td><td>${params.lead.budget}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; font-weight: bold;">Message:</p>
          <p style="margin: 8px 0 0; white-space: pre-wrap;">${params.lead.message}</p>
        </div>
        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
          Reply directly to <a href="mailto:${params.lead.email}">${params.lead.email}</a> to follow up.
        </p>
        <p style="margin-top: 8px; color: #6b7280; font-size: 14px;">
          Sent from ${SITE_NAME}
        </p>
      </div>
    `,
  }).catch(console.error); // Fire-and-forget — never block the user response
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
    from: FROM_ADDRESS,
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
