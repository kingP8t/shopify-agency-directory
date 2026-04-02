#!/usr/bin/env node
/**
 * Badge Programme Outreach — Sends personalised emails to published agencies
 * via Resend, notifying them about the embeddable verified badge.
 *
 * Usage:
 *   node scripts/send-badge-outreach.js --dry-run          # Preview without sending
 *   node scripts/send-badge-outreach.js --test=you@mail.com # Send one test email
 *   node scripts/send-badge-outreach.js --send              # Send to all agencies
 *   node scripts/send-badge-outreach.js --send --limit=10   # Send to first 10
 *   node scripts/send-badge-outreach.js --send --claimed     # Only claimed agencies
 *
 * Requires .env.local:
 *   RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { readFileSync, writeFileSync, existsSync } from "fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const SITE_URL = "https://shopifyagencydirectory.com";
const FROM_EMAIL = "Shopify Agency Directory <hello@shopifyagencydirectory.com>";
const DELAY_MS = 500; // 500ms between emails (stay well under rate limits)
const SENT_LOG = "scripts/badge-outreach-sent.json";

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Parse CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const flags = {};
for (const arg of args) {
  const [key, val] = arg.replace(/^--/, "").split("=");
  flags[key] = val ?? true;
}

const DRY_RUN = flags["dry-run"] === true;
const TEST_EMAIL = flags["test"] || null;
const SEND = flags["send"] === true;
const LIMIT = flags["limit"] ? parseInt(flags["limit"], 10) : null;
const CLAIMED_ONLY = flags["claimed"] === true;

if (!DRY_RUN && !TEST_EMAIL && !SEND) {
  console.log(`
Badge Programme Outreach Emailer
=================================
Usage:
  --dry-run              Preview recipient list (no emails sent)
  --test=you@email.com   Send a single test email to yourself
  --send                 Send to all eligible agencies
  --send --limit=10      Send to first N agencies only
  --send --claimed       Send only to claimed agencies
  `);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Load sent log (avoid double-sending)
// ---------------------------------------------------------------------------
let sentSlugs = new Set();
if (existsSync(SENT_LOG)) {
  try {
    sentSlugs = new Set(JSON.parse(readFileSync(SENT_LOG, "utf-8")));
  } catch {
    sentSlugs = new Set();
  }
}

function saveSentLog() {
  writeFileSync(SENT_LOG, JSON.stringify([...sentSlugs], null, 2));
}

// ---------------------------------------------------------------------------
// Email HTML template
// ---------------------------------------------------------------------------
function buildEmail(agency) {
  const name = agency.name;
  const slug = agency.slug;
  const profileUrl = `${SITE_URL}/agencies/${slug}`;
  const blogUrl = `${SITE_URL}/blog/embed-verified-badge-shopify-agency-website`;
  const unsubUrl = `${SITE_URL}/agencies/${slug}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f9fafb;color:#111827;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:#f0fdf4;border-radius:20px;padding:6px 16px;">
        <span style="color:#16a34a;font-size:16px;">&#10003;</span>
        <span style="color:#16a34a;font-weight:600;font-size:14px;">Shopify Agency Directory</span>
      </div>
    </div>

    <!-- Body card -->
    <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e5e7eb;">

      <p style="font-size:15px;line-height:1.6;margin-top:0;">Hi ${name} team,</p>

      <p style="font-size:15px;line-height:1.6;">
        Your agency is listed and verified on the Shopify Agency Directory &mdash; and we&rsquo;ve just launched something new for you.
      </p>

      <p style="font-size:15px;line-height:1.6;">
        We&rsquo;ve created a branded <strong>&ldquo;Verified on Shopify Agency Directory&rdquo;</strong> badge you can embed on your website. It takes about 60 seconds to set up.
      </p>

      <p style="font-size:15px;line-height:1.6;font-weight:600;">Here&rsquo;s what you get:</p>

      <ul style="font-size:15px;line-height:1.8;padding-left:20px;color:#374151;">
        <li>A professional SVG badge with your agency name and a verification checkmark</li>
        <li>Three styles (Light, Dark, Minimal) to match your website</li>
        <li>A direct link back to your directory profile where clients can see your ratings and specialisations</li>
      </ul>

      <p style="font-size:15px;line-height:1.6;font-weight:600;">How to get your badge:</p>

      <ol style="font-size:15px;line-height:1.8;padding-left:20px;color:#374151;">
        <li>Visit your profile page (link below)</li>
        <li>Scroll to &ldquo;Get Your Badge&rdquo;</li>
        <li>Pick a style, copy the embed code, paste it on your site</li>
      </ol>

      <p style="font-size:14px;line-height:1.6;color:#6b7280;">
        Most agencies add it to their footer or About page. The whole thing takes under a minute.
      </p>

      <!-- CTA button -->
      <div style="text-align:center;margin:28px 0;">
        <a href="${profileUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:15px;">
          View Your Profile &amp; Get Badge
        </a>
      </div>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

      <p style="font-size:13px;line-height:1.6;color:#9ca3af;margin-bottom:0;">
        Need help? Reply to this email or read our
        <a href="${blogUrl}" style="color:#16a34a;text-decoration:none;">step-by-step guide</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="font-size:12px;color:#9ca3af;line-height:1.5;">
        Shopify Agency Directory &bull;
        <a href="${SITE_URL}" style="color:#9ca3af;">shopifyagencydirectory.com</a><br />
        You received this because ${name} is listed on our directory.<br />
        <a href="mailto:hello@shopifyagencydirectory.com?subject=Unsubscribe%20${encodeURIComponent(slug)}" style="color:#9ca3af;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `Hi ${name} team,

Your agency is listed and verified on the Shopify Agency Directory — and we've just launched something new for you.

We've created a branded "Verified on Shopify Agency Directory" badge you can embed on your website. It takes about 60 seconds to set up.

Here's what you get:

- A professional SVG badge with your agency name and a verification checkmark
- Three styles (Light, Dark, Minimal) to match your website
- A direct link back to your directory profile

How to get your badge:

1. Visit your profile: ${profileUrl}
2. Scroll to "Get Your Badge"
3. Pick a style, copy the embed code, paste it on your site

Most agencies add it to their footer or About page.

Need help? Read our step-by-step guide: ${blogUrl}

--
Shopify Agency Directory
shopifyagencydirectory.com

You received this because ${name} is listed on our directory.
To unsubscribe, reply with "unsubscribe" in the subject line.`;

  return { subject: `Your verified badge is ready to embed`, html, text };
}

// ---------------------------------------------------------------------------
// Fetch agencies
// ---------------------------------------------------------------------------
async function getAgencies() {
  let query = supabase
    .from("agencies")
    .select("name, slug, email, claimed_email, claimed_at, featured")
    .eq("status", "published")
    .order("claimed_at", { ascending: false, nullsFirst: false })
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (CLAIMED_ONLY) {
    query = query.not("claimed_at", "is", null);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Supabase error: ${error.message}`);

  // Filter to agencies with an email, skip already-sent
  return (data || [])
    .filter((a) => {
      const email = a.claimed_email || a.email;
      if (!email) return false;
      if (sentSlugs.has(a.slug)) return false;
      return true;
    })
    .map((a) => ({
      ...a,
      to_email: a.claimed_email || a.email,
    }));
}

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("\n🏷️  Badge Programme Outreach\n");

  if (TEST_EMAIL) {
    console.log(`📧 Sending TEST email to: ${TEST_EMAIL}\n`);
    const testAgency = {
      name: "Your Agency",
      slug: "your-agency",
      claimed_at: null,
    };
    const { subject, html, text } = buildEmail(testAgency);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TEST_EMAIL,
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<mailto:hello@shopifyagencydirectory.com?subject=Unsubscribe>`,
      },
    });
    if (error) {
      console.error("❌ Failed:", error.message);
      process.exit(1);
    }
    console.log(`✅ Test email sent! ID: ${data.id}`);
    return;
  }

  const agencies = await getAgencies();
  const toSend = LIMIT ? agencies.slice(0, LIMIT) : agencies;

  console.log(`Found ${agencies.length} eligible agencies`);
  if (LIMIT) console.log(`Limiting to first ${LIMIT}`);
  if (CLAIMED_ONLY) console.log(`Claimed agencies only`);
  console.log(`Already sent (skipped): ${sentSlugs.size}`);
  console.log(`Will send: ${toSend.length}\n`);

  if (DRY_RUN) {
    console.log("📋 DRY RUN — Recipients:\n");
    for (const a of toSend) {
      const tag = a.claimed_at ? "✓ claimed" : "  listed";
      console.log(`  ${tag}  ${a.name.padEnd(35)} → ${a.to_email}`);
    }
    console.log(`\nTotal: ${toSend.length} emails`);
    console.log("Run with --send to send for real.");
    return;
  }

  // Confirm before bulk send
  if (toSend.length > 1) {
    console.log(`⚠️  About to send ${toSend.length} emails. Starting in 3 seconds...`);
    console.log("   (Press Ctrl+C to cancel)\n");
    await sleep(3000);
  }

  let sent = 0;
  let failed = 0;

  for (const agency of toSend) {
    const { subject, html, text } = buildEmail(agency);

    try {
      const { data, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: agency.to_email,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<mailto:hello@shopifyagencydirectory.com?subject=Unsubscribe%20${agency.slug}>`,
        },
      });

      if (error) {
        console.error(`  ❌ ${agency.name} (${agency.to_email}): ${error.message}`);
        failed++;
      } else {
        console.log(`  ✅ ${agency.name} → ${agency.to_email} (${data.id})`);
        sentSlugs.add(agency.slug);
        sent++;
      }
    } catch (err) {
      console.error(`  ❌ ${agency.name}: ${err.message}`);
      failed++;
    }

    // Save progress after each email
    saveSentLog();

    // Rate limit delay
    await sleep(DELAY_MS);
  }

  console.log(`\n📊 Results: ${sent} sent, ${failed} failed, ${sentSlugs.size} total in log`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
