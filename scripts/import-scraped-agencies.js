/**
 * Import Scraped Shopify Partners into Supabase
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads scripts/scraped-partners.json and upserts into the `agencies` table.
 * Uses the service role key to bypass RLS.
 *
 * Usage:
 *   node scripts/import-scraped-agencies.js
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Get it from: Supabase Dashboard → Settings → API → service_role (secret)
 */

require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// ─── Validate env ─────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(`
❌ Missing environment variables!

Make sure your .env.local contains:
  NEXT_PUBLIC_SUPABASE_URL=...
  SUPABASE_SERVICE_ROLE_KEY=...        ← Get from Supabase → Settings → API

The service role key is needed to bypass RLS for bulk inserts.
`);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Map Shopify service names → our specializations ─────────────────────────
const SERVICE_MAP = {
  "store build": "Theme Development",
  "store design": "Theme Development",
  "theme customiz": "Theme Development",
  "theme develop": "Theme Development",
  "custom develop": "App Development",
  "app develop": "App Development",
  "app integrat": "App Development",
  "migration": "Migrations",
  "migrat": "Migrations",
  "shopify plus": "Shopify Plus",
  "plus merchant": "Shopify Plus",
  "headless": "Headless",
  "hydrogen": "Headless",
  "conversion": "CRO",
  "cro": "CRO",
  "seo": "SEO",
  "search engine": "SEO",
  "marketing": "Marketing",
  "paid ads": "Marketing",
  "email marketing": "Marketing",
  "social media": "Marketing",
};

function mapServices(services = []) {
  const mapped = new Set();
  for (const service of services) {
    const lower = service.toLowerCase();
    for (const [key, value] of Object.entries(SERVICE_MAP)) {
      if (lower.includes(key)) {
        mapped.add(value);
        break;
      }
    }
    // If no mapping found, keep the original (trimmed to 40 chars)
    if (mapped.size === 0) {
      mapped.add(service.slice(0, 40));
    }
  }
  return [...mapped].slice(0, 6);
}

// ─── Map price text → budget_range ───────────────────────────────────────────
function mapBudget(priceText) {
  if (!priceText) return null;
  const cleaned = priceText.replace(/[^0-9]/g, "");
  if (!cleaned) return null;
  const num = parseInt(cleaned, 10);
  if (num < 500) return "Under $500";
  if (num < 1000) return "$500–$1k";
  if (num < 5000) return "$1k–$5k";
  if (num < 10000) return "$5k–$10k";
  return "$10k+";
}

// ─── Make slug unique if it conflicts ────────────────────────────────────────
function makeSlug(name, shopifySlug) {
  // Prefer the Shopify slug as it's already URL-safe
  if (shopifySlug) return shopifySlug;
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

// ─── Transform raw scraped data → DB row ─────────────────────────────────────
function toDbRow(agency) {
  const slug = makeSlug(agency.name, agency.slug);
  const specializations = mapServices(agency.services || []);

  return {
    name: agency.name,
    slug,
    description:
      agency.description ||
      `${agency.name} is a Shopify agency${agency.location ? ` based in ${agency.location}` : ""}.`,
    location: agency.location || null,
    website: agency.website || null,
    email: agency.email || null,
    budget_range: mapBudget(agency.price),
    specializations: specializations.length > 0 ? specializations : null,
    rating: agency.rating || null,
    review_count: agency.reviewCount || 0,
    featured: false,
    status: "published",
    // Leave claim columns null — agencies can claim via the claim flow
    claimed_at: null,
    claimed_email: null,
    claim_token: null,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const inputFile = path.join(__dirname, "scraped-partners.json");

  if (!fs.existsSync(inputFile)) {
    console.error(`
❌ scraped-partners.json not found!

Run the scraper first:
  npm install playwright
  npx playwright install chromium
  node scripts/scrape-shopify-partners.js
`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  console.log(`\n📦 Importing ${raw.length} agencies into Supabase...\n`);

  // Check existing slugs to avoid duplicate logging
  const { data: existing } = await supabase
    .from("agencies")
    .select("slug");
  const existingSlugs = new Set((existing || []).map((r) => r.slug));
  const newCount = raw.filter((a) => !existingSlugs.has(a.slug)).length;
  console.log(
    `  Already in DB: ${existingSlugs.size} agencies`
  );
  console.log(`  New agencies:  ${newCount}`);
  console.log(`  Duplicates:    ${raw.length - newCount} (will be skipped)\n`);

  const BATCH_SIZE = 50;
  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < raw.length; i += BATCH_SIZE) {
    const batch = raw.slice(i, i + BATCH_SIZE);
    const rows = batch.map(toDbRow);

    const { error } = await supabase
      .from("agencies")
      .upsert(rows, {
        onConflict: "slug",
        ignoreDuplicates: true, // skip if slug already exists
      });

    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(raw.length / BATCH_SIZE);

    if (error) {
      console.error(`  ✗ Batch ${batchNum}/${totalBatches}: ${error.message}`);
      errors++;
    } else {
      inserted += batch.length;
      process.stdout.write(
        `\r  ✓ Progress: ${inserted}/${raw.length} (batch ${batchNum}/${totalBatches})`
      );
    }
  }

  console.log(`\n\n✅ Import complete!`);
  console.log(`   Processed: ${inserted}`);
  console.log(`   Errors:    ${errors}`);

  // ── Final count ─────────────────────────────────────────────────────────────
  const { count } = await supabase
    .from("agencies")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");
  console.log(`   Total in DB: ${count} agencies`);

  // ── Export outreach list ────────────────────────────────────────────────────
  console.log(`\n📧 Generating outreach list...`);
  const { data: unclaimed } = await supabase
    .from("agencies")
    .select("name, slug, website, email, location, specializations, rating")
    .is("claimed_at", null)
    .eq("status", "published")
    .order("rating", { ascending: false });

  if (unclaimed && unclaimed.length > 0) {
    // CSV export
    const csv = [
      "name,slug,website,email,location,specializations,rating",
      ...unclaimed.map((a) =>
        [
          `"${(a.name || "").replace(/"/g, '""')}"`,
          a.slug,
          a.website || "",
          a.email || "",
          `"${(a.location || "").replace(/"/g, '""')}"`,
          `"${(a.specializations || []).join(", ")}"`,
          a.rating || "",
        ].join(",")
      ),
    ].join("\n");

    const csvFile = path.join(__dirname, "outreach-list.csv");
    fs.writeFileSync(csvFile, csv);
    console.log(
      `   ✓ ${unclaimed.length} unclaimed agencies → scripts/outreach-list.csv`
    );
    console.log(`   Upload this CSV to your email platform (Lemlist, Instantly, etc.)`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
