#!/usr/bin/env node
/**
 * Scrape contact emails from agency websites using Firecrawl.
 *
 * Fetches published agencies that have a website but no email,
 * scrapes their site (homepage + /contact) for email addresses,
 * and updates the `email` field in Supabase.
 *
 * Usage:
 *   node scripts/scrape-agency-emails.js --dry-run          # Preview list, no scraping
 *   node scripts/scrape-agency-emails.js --start=1 --end=10 # Scrape agencies 1-10
 *   node scripts/scrape-agency-emails.js                    # Scrape all
 *   node scripts/scrape-agency-emails.js --resume           # Resume from checkpoint
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, FIRECRAWL_API_KEY
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const FIRECRAWL_API = "https://api.firecrawl.dev/v1/scrape";
const FIRECRAWL_KEY = "fc-e44313065e914740b3fb2f411e758e97";
const DELAY_MS = 1500; // 1.5s between requests to respect rate limits
const CHECKPOINT_FILE = "scripts/email-scrape-checkpoint.json";

// Common noreply / generic emails to skip
const IGNORE_PATTERNS = [
  /noreply@/i, /no-reply@/i, /donotreply@/i,
  /support@shopify/i, /example\.com/i, /test@/i,
  /wix\.com/i, /squarespace/i, /wordpress/i,
  /sentry\.io/i, /github\.com/i, /google\.com/i,
  /cloudflare/i, /amazonaws/i,
];

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const flags = {};
for (const arg of args) {
  const [key, val] = arg.replace(/^--/, "").split("=");
  flags[key] = val ?? true;
}

const DRY_RUN = flags["dry-run"] === true;
const RESUME = flags["resume"] === true;
const START = flags["start"] ? parseInt(flags["start"], 10) - 1 : 0;
const END = flags["end"] ? parseInt(flags["end"], 10) : null;

// ---------------------------------------------------------------------------
// Checkpoint (safe to interrupt and resume)
// ---------------------------------------------------------------------------
let checkpoint = { lastIndex: 0, found: 0, scraped: 0, errors: 0 };
if (RESUME && existsSync(CHECKPOINT_FILE)) {
  try {
    checkpoint = JSON.parse(readFileSync(CHECKPOINT_FILE, "utf-8"));
    console.log(`📂 Resuming from index ${checkpoint.lastIndex}`);
  } catch { /* start fresh */ }
}

function saveCheckpoint() {
  writeFileSync(CHECKPOINT_FILE, JSON.stringify(checkpoint, null, 2));
}

// ---------------------------------------------------------------------------
// Email extraction
// ---------------------------------------------------------------------------
const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

function extractEmails(text) {
  const matches = text.match(EMAIL_REGEX) || [];
  // Dedupe, lowercase, filter junk
  const unique = [...new Set(matches.map((e) => e.toLowerCase()))];
  return unique.filter((email) => {
    if (email.length > 80) return false;
    if (IGNORE_PATTERNS.some((p) => p.test(email))) return false;
    // Skip image file extensions mistaken for emails
    if (/\.(png|jpg|jpeg|gif|svg|webp|css|js)$/i.test(email)) return false;
    return true;
  });
}

function pickBestEmail(emails, agencyWebsite) {
  if (emails.length === 0) return null;

  // Prefer emails on the agency's own domain
  let domain = null;
  try {
    domain = new URL(agencyWebsite).hostname.replace(/^www\./, "");
  } catch { /* skip */ }

  if (domain) {
    const onDomain = emails.filter((e) => e.endsWith(`@${domain}`));
    if (onDomain.length > 0) {
      // Prefer hello@ > info@ > contact@ > anything else
      const preferred = ["hello@", "info@", "contact@", "hi@", "enquiries@", "team@"];
      for (const prefix of preferred) {
        const match = onDomain.find((e) => e.startsWith(prefix));
        if (match) return match;
      }
      return onDomain[0];
    }
  }

  // Fallback: prefer common prefixes from any domain
  const preferred = ["hello@", "info@", "contact@", "hi@", "enquiries@", "team@"];
  for (const prefix of preferred) {
    const match = emails.find((e) => e.startsWith(prefix));
    if (match) return match;
  }

  return emails[0];
}

// ---------------------------------------------------------------------------
// Firecrawl scrape
// ---------------------------------------------------------------------------
async function scrapeUrl(url) {
  const res = await fetch(FIRECRAWL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${FIRECRAWL_KEY}`,
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"],
      onlyMainContent: false,
      timeout: 15000,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firecrawl ${res.status}: ${text.substring(0, 200)}`);
  }

  const json = await res.json();
  return json.data?.markdown || "";
}

async function findEmailForAgency(agency) {
  const website = agency.website.replace(/\/$/, "");
  const urls = [website];

  // Also try /contact and /about pages
  const contactVariants = [
    "/contact", "/contact-us", "/about", "/about-us", "/get-in-touch",
  ];
  for (const path of contactVariants) {
    urls.push(`${website}${path}`);
  }

  const allEmails = [];

  // Scrape homepage first
  try {
    const markdown = await scrapeUrl(urls[0]);
    allEmails.push(...extractEmails(markdown));
  } catch (err) {
    // Homepage failed — still try contact pages
  }

  // If no email found on homepage, try contact/about pages
  if (allEmails.length === 0) {
    for (let i = 1; i < urls.length; i++) {
      try {
        const markdown = await scrapeUrl(urls[i]);
        const emails = extractEmails(markdown);
        allEmails.push(...emails);
        if (emails.length > 0) break; // Found one, stop trying
      } catch {
        // Page doesn't exist, move on
      }
      await sleep(500);
    }
  }

  return pickBestEmail(allEmails, website);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("\n📧 Agency Email Scraper\n");

  // Fetch agencies with website but no email
  const { data: agencies, error } = await supabase
    .from("agencies")
    .select("id, name, slug, website, email")
    .eq("status", "published")
    .not("website", "is", null)
    .is("email", null)
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (error) throw new Error(`Supabase: ${error.message}`);

  const startIdx = RESUME ? checkpoint.lastIndex : START;
  const endIdx = END ?? agencies.length;
  const batch = agencies.slice(startIdx, endIdx);

  console.log(`Total agencies without email: ${agencies.length}`);
  console.log(`Processing: ${startIdx + 1} to ${Math.min(endIdx, agencies.length)}`);
  console.log(`Batch size: ${batch.length}\n`);

  if (DRY_RUN) {
    console.log("📋 DRY RUN — First 20 agencies:\n");
    for (const a of batch.slice(0, 20)) {
      console.log(`  ${a.name.padEnd(35)} ${a.website}`);
    }
    if (batch.length > 20) console.log(`  ... and ${batch.length - 20} more`);
    console.log("\nRun without --dry-run to start scraping.");
    return;
  }

  let found = checkpoint.found || 0;
  let scraped = checkpoint.scraped || 0;
  let errors = checkpoint.errors || 0;

  for (let i = 0; i < batch.length; i++) {
    const agency = batch[i];
    const idx = startIdx + i + 1;
    process.stdout.write(`[${idx}/${agencies.length}] ${agency.name.padEnd(35)} `);

    try {
      const email = await findEmailForAgency(agency);
      scraped++;

      if (email) {
        // Update Supabase
        const { error: updateErr } = await supabase
          .from("agencies")
          .update({ email })
          .eq("id", agency.id);

        if (updateErr) {
          console.log(`⚠️  Found ${email} but DB update failed: ${updateErr.message}`);
        } else {
          console.log(`✅ ${email}`);
          found++;
        }
      } else {
        console.log(`—  no email found`);
      }
    } catch (err) {
      console.log(`❌ ${err.message.substring(0, 80)}`);
      errors++;
    }

    // Save checkpoint
    checkpoint = { lastIndex: startIdx + i + 1, found, scraped, errors };
    saveCheckpoint();

    // Rate limit
    await sleep(DELAY_MS);
  }

  console.log(`\n📊 Done!`);
  console.log(`   Scraped: ${scraped}`);
  console.log(`   Emails found: ${found}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Hit rate: ${scraped > 0 ? ((found / scraped) * 100).toFixed(1) : 0}%`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  saveCheckpoint();
  process.exit(1);
});
