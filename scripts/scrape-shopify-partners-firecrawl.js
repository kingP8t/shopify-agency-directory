/**
 * Scrape Shopify Partners Directory via Firecrawl → Import to Supabase
 * ─────────────────────────────────────────────────────────────────────
 * Phase 1: Scrape listing pages 1–65 (name, slug, logo, location, services)
 * Phase 2: Scrape each profile page for description + website URL
 * Phase 3: Import to Supabase as `status = 'draft'`, skipping duplicates
 *
 * Checkpointing: progress saved to scripts/scrape-checkpoint.json so the
 * script can be safely interrupted and resumed.
 *
 * Usage:
 *   node scripts/scrape-shopify-partners-firecrawl.js
 *   node scripts/scrape-shopify-partners-firecrawl.js --start=1 --end=10
 *   node scripts/scrape-shopify-partners-firecrawl.js --skip-profiles
 *   node scripts/scrape-shopify-partners-firecrawl.js --skip-import
 *
 * Env vars (in .env.local):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────
const FIRECRAWL_KEY = "fc-e44313065e914740b3fb2f411e758e97";
const FIRECRAWL_BASE = "https://api.firecrawl.dev/v1";
const DEFAULT_TOTAL_PAGES = 65;
const LISTING_DELAY_MS = 2000; // 2 s between listing page scrapes
const PROFILE_DELAY_MS = 1200; // 1.2 s between profile page scrapes
const CHECKPOINT_FILE = path.join(__dirname, "scrape-checkpoint.json");
const OUTPUT_FILE = path.join(__dirname, "scraped-partners.json");
const BATCH_SIZE = 50; // Supabase insert batch size

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const startPage = parseInt(
  (args.find((a) => a.startsWith("--start=")) || "--start=1").split("=")[1]
);
const endPage = parseInt(
  (
    args.find((a) => a.startsWith("--end=")) ||
    `--end=${DEFAULT_TOTAL_PAGES}`
  ).split("=")[1]
);
const skipProfiles = args.includes("--skip-profiles");
const skipImport = args.includes("--skip-import");

// ── Supabase admin client ─────────────────────────────────────────────────────
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ── Country code map ──────────────────────────────────────────────────────────
const COUNTRY_MAP = {
  "United States": "US",
  "United Kingdom": "GB",
  Canada: "CA",
  Australia: "AU",
  India: "IN",
  Germany: "DE",
  France: "FR",
  Netherlands: "NL",
  Spain: "ES",
  Italy: "IT",
  Brazil: "BR",
  Mexico: "MX",
  Singapore: "SG",
  Philippines: "PH",
  Pakistan: "PK",
  Ukraine: "UA",
  Poland: "PL",
  "Czech Republic": "CZ",
  Sweden: "SE",
  Denmark: "DK",
  Norway: "NO",
  Finland: "FI",
  Portugal: "PT",
  "South Africa": "ZA",
  "New Zealand": "NZ",
  Ireland: "IE",
  Israel: "IL",
  Japan: "JP",
  "South Korea": "KR",
  China: "CN",
  Taiwan: "TW",
  "Hong Kong": "HK",
  Thailand: "TH",
  Vietnam: "VN",
  Indonesia: "ID",
  Malaysia: "MY",
  Bangladesh: "BD",
  "Sri Lanka": "LK",
  Romania: "RO",
  Hungary: "HU",
  Bulgaria: "BG",
  Croatia: "HR",
  Serbia: "RS",
  Greece: "GR",
  Turkey: "TR",
  Argentina: "AR",
  Colombia: "CO",
  Chile: "CL",
  Peru: "PE",
  Egypt: "EG",
  Nigeria: "NG",
  Kenya: "KE",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Belgium: "BE",
  Switzerland: "CH",
  Austria: "AT",
  "Slovak Republic": "SK",
  Lithuania: "LT",
  Latvia: "LV",
  Estonia: "EE",
};

// ── Service label normalisation ───────────────────────────────────────────────
const SERVICE_MAP = [
  ["store build", "Store Build"],
  ["build or redesign", "Store Build"],
  ["theme customiz", "Theme Development"],
  ["theme develop", "Theme Development"],
  ["custom develop", "Custom Development"],
  ["app develop", "App Development"],
  ["app integrat", "App Development"],
  ["migrat", "Migrations"],
  ["shopify plus", "Shopify Plus"],
  ["headless", "Headless"],
  ["hydrogen", "Headless"],
  ["conversion rate", "CRO"],
  ["seo", "SEO"],
  ["search engine", "SEO"],
  ["email market", "Marketing"],
  ["paid ads", "Marketing"],
  ["social media", "Marketing"],
  ["digital market", "Marketing"],
  ["market", "Marketing"],
  ["speed", "Performance"],
  ["performance", "Performance"],
  ["branding", "Branding"],
  ["internation", "Internationalization"],
  ["b2b", "B2B Commerce"],
  ["wholesale", "B2B Commerce"],
  ["subscript", "Subscriptions"],
  ["loyalty", "Loyalty & Retention"],
  ["analytics", "Analytics"],
];

function mapServices(rawServices = []) {
  const mapped = new Set();
  for (const service of rawServices) {
    const lower = service.toLowerCase().trim();
    if (!lower) continue;
    let matched = false;
    for (const [key, label] of SERVICE_MAP) {
      if (lower.includes(key)) {
        mapped.add(label);
        matched = true;
        break;
      }
    }
    // Keep unmapped services if they're short enough
    if (!matched && service.trim().length > 2 && service.trim().length <= 50) {
      // Title-case it
      mapped.add(
        service
          .trim()
          .replace(/\b\w/g, (c) => c.toUpperCase())
          .slice(0, 40)
      );
    }
  }
  return [...mapped].slice(0, 8);
}

function normalizeCountry(nameRaw = "") {
  const name = nameRaw.trim();
  return COUNTRY_MAP[name] || null;
}

// ── Firecrawl ─────────────────────────────────────────────────────────────────
async function firecrawlScrape(url, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FIRECRAWL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          formats: ["markdown"],
          onlyMainContent: true,
        }),
      });

      if (res.status === 429) {
        // Rate limited — wait longer and retry
        await sleep(5000 * (attempt + 1));
        continue;
      }

      if (res.status === 402) {
        // Out of Firecrawl credits — no point retrying
        throw new Error("HTTP 402: Insufficient credits. Top up at firecrawl.dev");
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 150)}`);
      }

      const data = await res.json();
      if (!data.success) {
        throw new Error(`API error: ${JSON.stringify(data).slice(0, 150)}`);
      }

      return data.data?.markdown || "";
    } catch (err) {
      // Don't retry credit errors — fail immediately
      if (err.message.includes("402")) throw err;
      if (attempt === retries) throw err;
      await sleep(2000 * (attempt + 1));
    }
  }
  return "";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Parse listing page ────────────────────────────────────────────────────────
// Each agency card in the markdown is a link block:
// [![Alt](logo-url)\n**Name**\n4.9(1610)\n|Location\nServices...](partner-url)
function parseListingPage(markdown) {
  const agencies = [];
  const PARTNER_PREFIX =
    "](https://www.shopify.com/partners/directory/partner/";

  const segments = markdown.split(PARTNER_PREFIX);

  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    const prevContent = segments[i - 1];

    // Slug = content up to first ')'
    const slugEnd = segment.indexOf(")");
    if (slugEnd === -1) continue;
    const slug = segment.substring(0, slugEnd).trim();

    // Validate slug (should be lowercase-hyphenated)
    if (!slug || slug.includes(" ") || slug.includes("/")) continue;

    // Card content starts at the last [![ in prevContent
    const cardStart = prevContent.lastIndexOf("[![");
    if (cardStart === -1) continue;
    const card = prevContent.substring(cardStart);

    // Logo URL
    const logoMatch = card.match(/\[!\[[^\]]*\]\(([^)]+)\)/);
    const logoUrl = logoMatch ? logoMatch[1] : null;

    // Name — prefer **bolded** text, fall back to slug
    const nameMatch = card.match(/\*\*([^*\n]+)\*\*/);
    const name = nameMatch
      ? nameMatch[1]
          .trim()
          .replace(/^[\\#\s]+/, "") // strip leading \, #, spaces
          .replace(/[""]/g, '"')
          .trim()
      : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // Rating & review count — e.g. "4.9(1610)"
    const ratingMatch = card.match(/(\d+\.\d+)\((\d+)\)/);
    const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
    const reviewCount = ratingMatch ? parseInt(ratingMatch[2], 10) : 0;

    // Location — line prefixed with '|'
    const locationMatch = card.match(/\|([^|\\\n\r]+)/);
    const location = locationMatch ? locationMatch[1].trim() : null;

    // Country — last comma-separated segment of location
    let country = null;
    if (location) {
      const parts = location.split(",");
      const countryName = parts[parts.length - 1].trim();
      country = normalizeCountry(countryName);
    }

    // Price range — "Starting from $85"
    const priceMatch = card.match(/Starting from \$[\d,]+/i);
    const price = priceMatch ? priceMatch[0] : null;

    // Services — text after "Services" keyword, before "+ N more"
    const servicesMatch = card.match(
      /Services([\s\S]+?)(?:\+\s*\d+\s*more|$)/
    );
    let rawServices = [];
    if (servicesMatch) {
      rawServices = servicesMatch[1]
        .replace(/\\/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 2 && s.length < 60);
    }

    agencies.push({
      name,
      slug,
      logo_url: logoUrl,
      location,
      country,
      specializations: mapServices(rawServices),
      rating,
      review_count: reviewCount,
      price,
      profile_url: `https://www.shopify.com/partners/directory/partner/${slug}`,
    });
  }

  return agencies;
}

// ── Parse individual profile page ─────────────────────────────────────────────
// Review text patterns — lines starting with these are likely customer reviews
const REVIEW_STARTERS = [
  "working with ",
  "i worked with",
  "we worked with",
  "after meeting",
  "i would highly",
  "we would highly",
  "i would recommend",
  "we would recommend",
  "they helped us",
  "they helped me",
  "they were very",
  "they were extremely",
  "they did a great",
  "they did an excellent",
  "highly recommend",
  "i was impressed",
  "we were impressed",
  "great job",
  "excellent work",
  "amazing work",
  "outstanding work",
  "i hired ",
  "we hired ",
  "5 stars",
  "five stars",
  "would not hesitate",
  "could not be happier",
  "couldn't be happier",
  "couldn't ask for",
];

function isReviewText(text) {
  const lower = text.toLowerCase().trim();
  return REVIEW_STARTERS.some((s) => lower.startsWith(s));
}

function cleanDescription(text) {
  return text
    .replace(/^```+\s*/g, "") // strip leading ```
    .replace(/```+\s*$/g, "") // strip trailing ```
    .replace(/^`+/g, "") // strip leading backticks
    .replace(/`+$/g, "") // strip trailing backticks
    .replace(/\\\s*/g, " ") // replace backslash line breaks with space
    .replace(/\s{2,}/g, " ") // collapse multiple spaces
    .trim();
}

function parseProfilePage(markdown) {
  let description = null;
  let website = null;

  // ── Website ──────────────────────────────────────────────────────────────
  // First external link that isn't shopify.com
  const linkRegex =
    /\[([^\]]{1,80})\]\((https?:\/\/(?!(?:www\.)?shopify\.com|partners\.shopify\.com)[^\s)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(markdown)) !== null) {
    const linkText = match[1].toLowerCase();
    const url = match[2];
    if (
      linkText.includes("website") ||
      linkText.includes("visit") ||
      linkText.includes("learn more") ||
      linkText.includes("www")
    ) {
      website = url;
      break;
    }
    if (!website) website = url;
  }

  // ── Description ───────────────────────────────────────────────────────────
  // Strategy 1: text immediately after an "About" heading
  const aboutMatch = markdown.match(
    /##?\s*About\s*\n+([\s\S]{80,800}?)(?:\n##|\n\*\*Services|\n\*\*Reviews|$)/i
  );
  if (aboutMatch) {
    const raw = aboutMatch[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(
        (l) =>
          l.length > 0 &&
          !l.startsWith("#") &&
          !l.startsWith("*") &&
          !l.startsWith("```") &&
          !isReviewText(l)
      )
      .join(" ")
      .trim();
    const cleaned = cleanDescription(raw);
    if (cleaned.length >= 80) {
      description = cleaned.slice(0, 600);
    }
  }

  // Strategy 2: longest non-review paragraph on the page
  if (!description) {
    const lines = markdown.split("\n");
    const candidates = [];
    for (const line of lines) {
      const t = cleanDescription(line.trim());
      if (
        t.length >= 100 &&
        !t.startsWith("#") &&
        !t.startsWith("*") &&
        !t.startsWith("-") &&
        !t.startsWith("|") &&
        !t.startsWith("[") &&
        !t.startsWith("!") &&
        !t.startsWith("```") &&
        !t.match(/^\d+[\.\)]/) &&
        !t.match(/^\$([\d,]+)/) &&
        !t.match(
          /^(Starting from|Contact for|Price range|Services|Rating|Filter|Sort|Browse|Search|View|See all)/i
        ) &&
        !isReviewText(t)
      ) {
        candidates.push(t);
      }
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => b.length - a.length);
      description = candidates[0].slice(0, 600);
    }
  }

  return { description, website };
}

// ── Checkpoint helpers ────────────────────────────────────────────────────────
function loadCheckpoint() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, "utf8"));
    } catch {
      console.warn("  ⚠ Checkpoint file corrupt, starting fresh");
    }
  }
  return {
    agencies: {},
    completedListingPages: [],
    completedProfiles: [],
  };
}

function saveCheckpoint(cp) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(cp, null, 2));
}

// ── DB row builder ────────────────────────────────────────────────────────────
function toDbRow(agency) {
  // Always generate a description so NOT NULL is satisfied
  const rawDesc =
    agency.description ||
    [
      `${agency.name} is a Shopify agency`,
      agency.location ? `based in ${agency.location}` : null,
      agency.specializations?.length
        ? `specializing in ${agency.specializations.slice(0, 3).join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join(" ") + ".";

  // Final cleanup pass (strip any remaining backticks/code fences)
  const desc = rawDesc
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return {
    name: agency.name,
    slug: agency.slug,
    description: desc.slice(0, 600),
    location: agency.location || null,
    country: agency.country || null,
    website: agency.website || null,
    logo_url: agency.logo_url || null,
    specializations:
      agency.specializations?.length > 0 ? agency.specializations : null,
    tags: agency.specializations?.length > 0
      ? agency.specializations.map((s) => s.toLowerCase().replace(/\s+/g, "-"))
      : null,
    rating: agency.rating || null,
    review_count: agency.review_count || 0,
    budget_range: agency.price || null,
    featured: false,
    status: "draft",
    claimed_at: null,
    claimed_email: null,
    claim_token: null,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🕷️  Shopify Partners Directory Scraper (Firecrawl)\n");
  console.log(`  Pages:         ${startPage}–${endPage}`);
  console.log(`  Profile pages: ${skipProfiles ? "SKIP" : "YES (description + website)"}`);
  console.log(`  DB import:     ${skipImport ? "SKIP" : "YES (draft, skip duplicates)"}`);
  console.log();

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error(
      "❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const cp = loadCheckpoint();
  const previouslyCached = Object.keys(cp.agencies).length;
  if (previouslyCached > 0) {
    console.log(
      `  ♻️  Resuming from checkpoint: ${previouslyCached} agencies cached, ` +
        `${cp.completedListingPages.length} listing pages done, ` +
        `${cp.completedProfiles.length} profiles done\n`
    );
  }

  // ── Phase 1: Listing pages ─────────────────────────────────────────────────
  console.log("📄 Phase 1: Scraping listing pages...\n");
  let phase1New = 0;

  for (let page = startPage; page <= endPage; page++) {
    if (cp.completedListingPages.includes(page)) {
      // Already done in a previous run
      continue;
    }

    const url = `https://www.shopify.com/partners/directory/services?page=${page}`;
    process.stdout.write(`  Page ${String(page).padStart(2)}/${endPage}: `);

    try {
      const markdown = await firecrawlScrape(url);

      if (!markdown || markdown.length < 100) {
        process.stdout.write("⚠ Empty response — skipping\n");
        cp.completedListingPages.push(page);
        saveCheckpoint(cp);
        await sleep(LISTING_DELAY_MS);
        continue;
      }

      const found = parseListingPage(markdown);

      let newOnPage = 0;
      for (const agency of found) {
        if (!cp.agencies[agency.slug]) {
          cp.agencies[agency.slug] = agency;
          newOnPage++;
        }
      }

      cp.completedListingPages.push(page);
      saveCheckpoint(cp);
      phase1New += newOnPage;

      process.stdout.write(
        `✓ ${found.length} agencies (${newOnPage} new | total: ${Object.keys(cp.agencies).length})\n`
      );
    } catch (err) {
      process.stdout.write(`✗ ${err.message.slice(0, 80)}\n`);
      // Don't mark as complete so it'll retry on next run
    }

    await sleep(LISTING_DELAY_MS);
  }

  const allSlugs = Object.keys(cp.agencies);
  console.log(
    `\n  ✅ Phase 1 complete: ${allSlugs.length} agencies found (${phase1New} new this run)\n`
  );

  // ── Phase 2: Profile pages ────────────────────────────────────────────────
  if (!skipProfiles) {
    const toScrape = allSlugs.filter(
      (slug) => !cp.completedProfiles.includes(slug)
    );

    console.log(
      `🔍 Phase 2: Scraping ${toScrape.length} profile pages (${cp.completedProfiles.length} cached)...\n`
    );

    let gotDescription = 0;
    let gotWebsite = 0;

    for (let i = 0; i < toScrape.length; i++) {
      const slug = toScrape[i];
      const url = `https://www.shopify.com/partners/directory/partner/${slug}`;

      const progress = `[${String(i + 1).padStart(4)}/${toScrape.length}]`;
      process.stdout.write(`  ${progress} ${slug.slice(0, 40).padEnd(40)} `);

      try {
        const markdown = await firecrawlScrape(url);
        const { description, website } = parseProfilePage(markdown);

        cp.agencies[slug] = {
          ...cp.agencies[slug],
          description: description || cp.agencies[slug].description || null,
          website: website || cp.agencies[slug].website || null,
        };

        if (description) gotDescription++;
        if (website) gotWebsite++;

        const flags = [description ? "📝" : "  ", website ? "🌐" : "  "].join("");
        process.stdout.write(`${flags} ✓\n`);
      } catch (err) {
        process.stdout.write(`✗ ${err.message.slice(0, 50)}\n`);
      }

      // Always mark as done (even on error) to avoid infinite retries
      cp.completedProfiles.push(slug);

      // Save checkpoint every 10 profiles
      if ((i + 1) % 10 === 0) saveCheckpoint(cp);

      await sleep(PROFILE_DELAY_MS);
    }

    saveCheckpoint(cp);
    console.log(
      `\n  ✅ Phase 2 complete: ${gotDescription}/${toScrape.length} descriptions, ` +
        `${gotWebsite}/${toScrape.length} websites found\n`
    );
  }

  // ── Save JSON output ──────────────────────────────────────────────────────
  const allAgencies = Object.values(cp.agencies);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allAgencies, null, 2));
  console.log(`💾 Saved ${allAgencies.length} agencies → scripts/scraped-partners.json\n`);

  // ── Phase 3: Supabase import ──────────────────────────────────────────────
  if (skipImport) {
    console.log("⏭️  Skipping import (--skip-import). Run import-scraped-agencies.js when ready.");
    return;
  }

  console.log("📦 Phase 3: Importing to Supabase...\n");

  // Fetch existing slugs to compute new vs duplicate counts
  const { data: existing } = await supabase.from("agencies").select("slug");
  const existingSlugs = new Set((existing || []).map((r) => r.slug));
  const toInsert = allAgencies.filter((a) => !existingSlugs.has(a.slug));
  const skipped = allAgencies.length - toInsert.length;

  console.log(`  Already in DB:  ${existingSlugs.size} agencies`);
  console.log(`  New to import:  ${toInsert.length}`);
  console.log(`  Skipped (dups): ${skipped}\n`);

  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < toInsert.length; i += BATCH_SIZE) {
    const batch = toInsert.slice(i, i + BATCH_SIZE);
    const rows = batch.map(toDbRow);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(toInsert.length / BATCH_SIZE);

    const { error } = await supabase
      .from("agencies")
      .upsert(rows, { onConflict: "slug", ignoreDuplicates: true });

    if (error) {
      console.error(`\n  ✗ Batch ${batchNum}/${totalBatches}: ${error.message}`);
      errors++;
    } else {
      inserted += batch.length;
      process.stdout.write(
        `\r  ✓ ${inserted}/${toInsert.length} imported  (batch ${batchNum}/${totalBatches})`
      );
    }
  }

  // Final total
  const { count: totalCount } = await supabase
    .from("agencies")
    .select("*", { count: "exact", head: true });

  console.log(`\n\n✅ Import complete!`);
  console.log(`   Imported:    ${inserted} new agencies`);
  console.log(`   Errors:      ${errors}`);
  console.log(`   Total in DB: ${totalCount} agencies (all statuses)`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Open Supabase → Table Editor → agencies`);
  console.log(`   2. Filter by status = 'draft' to review imports`);
  console.log(`   3. Change status to 'published' for agencies you want live\n`);

  // Clean up checkpoint only on full success
  if (errors === 0 && !skipImport) {
    try {
      fs.unlinkSync(CHECKPOINT_FILE);
      console.log("🗑️  Checkpoint cleaned up\n");
    } catch {
      // ignore
    }
  }
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err.message);
  process.exit(1);
});
