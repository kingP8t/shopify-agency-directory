/**
 * Generate unique long_description for agencies that don't have one.
 * Uses each agency's existing data (name, location, specializations, budget,
 * rating, description) to craft a unique 150-250 word profile.
 *
 * No AI API needed — descriptions are generated from templates + agency data.
 *
 * Usage:
 *   node scripts/generate-long-descriptions.js              # dry run (preview)
 *   node scripts/generate-long-descriptions.js --write       # write to Supabase
 *   node scripts/generate-long-descriptions.js --limit=50    # process 50 agencies
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const WRITE = process.argv.includes("--write");
const LIMIT_ARG = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split("=")[1]) : 9999;

// ── Template fragments ───────────────────────────────────────────────────────

const SPEC_DESCRIPTIONS = {
  "Store Build":
    "full-service Shopify store design and development, from initial concept through to launch",
  "Theme Development":
    "custom Shopify theme creation and modification, building bespoke storefronts tailored to brand identity",
  Migrations:
    "platform migrations to Shopify, helping merchants transition from WooCommerce, Magento, BigCommerce, and other platforms",
  "Shopify Plus":
    "enterprise-level Shopify Plus implementations, including checkout extensibility, Shopify Functions, and B2B features",
  CRO: "conversion rate optimization, running A/B tests and improving checkout flows to maximize revenue",
  "UX Design":
    "user experience design for ecommerce, creating intuitive shopping experiences that convert visitors into customers",
  "App Development":
    "custom Shopify app development, building tailored solutions that extend store functionality",
  SEO: "ecommerce SEO strategy, helping stores rank higher in search results and drive organic traffic",
  Marketing:
    "digital marketing for Shopify stores, including paid advertising, email marketing, and growth strategy",
  Headless:
    "headless commerce architecture using Shopify's Storefront API and Hydrogen framework",
  "ERP Integration":
    "ERP and systems integration, connecting Shopify with back-office platforms for seamless operations",
  "D2C Growth":
    "direct-to-consumer growth strategy, helping DTC brands scale through data-driven ecommerce",
  "Email Marketing":
    "email marketing automation for ecommerce, building flows and campaigns that drive repeat purchases",
  "Social Commerce":
    "social commerce integration, connecting Shopify stores with Instagram, TikTok, and Facebook selling",
  "B2B Commerce":
    "B2B ecommerce solutions on Shopify, including wholesale pricing, custom catalogs, and trade accounts",
  Internationalization:
    "international ecommerce expansion, including multi-currency, multi-language, and cross-border selling",
  Analytics:
    "ecommerce analytics and data strategy, helping merchants make informed decisions from store data",
  Branding:
    "brand strategy and identity design for ecommerce businesses",
  "Inventory Management":
    "inventory management solutions, connecting Shopify with warehousing and fulfillment systems",
  // Scraped Shopify Partners format
  "Store Build": "full-service Shopify store design and development, from initial concept through to launch",
  "New Store Development": "new Shopify store development, building online stores from the ground up",
  "Custom Design": "custom ecommerce design, creating unique visual identities for Shopify stores",
  "Custom Development": "custom Shopify development, building bespoke functionality beyond standard themes",
  "Custom Apps": "custom Shopify app development, extending store capabilities with tailored solutions",
  "Customisation": "Shopify store customisation, tailoring themes and functionality to specific business needs",
  "Shopify Themes": "Shopify theme development and customisation",
  "Ongoing Website Management": "ongoing Shopify store management, maintenance, and optimization",
  "Product And Collection Setup": "product catalog setup and organization, structuring collections for optimal browsing",
  "Store Settings Configuration": "Shopify store configuration and setup, ensuring all settings are optimized for performance",
  "Checkout Upgrade": "checkout optimization and upgrade, improving the purchase experience to reduce cart abandonment",
  "Systems Integration": "systems integration, connecting Shopify with third-party tools, ERPs, and business software",
  "Integrations": "third-party integrations, connecting Shopify with payment providers, shipping, and business tools",
  "Redesign": "Shopify store redesign, refreshing outdated stores with modern design and improved performance",
  "Redeisgn": "Shopify store redesign, refreshing outdated stores with modern design and improved performance",
  "Brand Design": "brand design for ecommerce, creating cohesive visual identities across all touchpoints",
  "Branded Website": "branded website development, building Shopify stores that reflect strong brand identity",
  "Performance": "Shopify performance optimization, improving page speed and Core Web Vitals",
  "Website Audit And Optimization Strategy": "website auditing and optimization, identifying and fixing issues that impact conversions and SEO",
  "Business Strategy Guidance": "ecommerce strategy consulting, helping merchants plan and grow their Shopify business",
  Strategy: "ecommerce strategy and consulting for Shopify merchants",
  Growth: "growth strategy for ecommerce brands, driving acquisition and retention",
  DTC: "direct-to-consumer ecommerce strategy and execution",
  Enterprise: "enterprise-level Shopify implementations for large-scale businesses",
  Fashion: "Shopify development for fashion and apparel brands",
  "Luxury Brands": "Shopify solutions for luxury and premium brands",
  Design: "ecommerce design, creating visually compelling Shopify storefronts",
  "Dropshipping Solutions": "dropshipping store setup and optimization on Shopify",
  "\u2B50Dropshipping Solutions": "dropshipping store setup and optimization on Shopify",
  "\u2B50New Store Development": "new Shopify store development from the ground up",
  "Sales Channel Setup": "sales channel integration, connecting Shopify with marketplaces and social platforms",
  Troubleshooting: "Shopify troubleshooting and technical support",
  "Quick Tasks": "quick Shopify fixes and small development tasks",
  Freelance: "freelance Shopify development services",
  Shopify: "Shopify store development and customization",
  "3D Modelling": "3D product modelling and visualization for ecommerce",
  "Video And Illustrations": "video production and illustration for ecommerce marketing",
  "Product Photography": "product photography for ecommerce, creating images that sell",
  "Product Descriptions": "product copywriting, creating compelling descriptions that convert",
  "Product Development": "product development consulting for ecommerce brands",
  "Product Sourcing Guidance": "product sourcing guidance for ecommerce entrepreneurs",
  "Banner Ads": "banner ad design and digital advertising creative",
  "Print On Demand Website": "print-on-demand Shopify store setup and fulfillment integration",
  "Premade Dropshipping Stores": "pre-built dropshipping store solutions on Shopify",
  "Sales Tax Guidance": "sales tax compliance guidance for Shopify merchants",
  "Custom Domain Setup": "custom domain configuration and DNS setup for Shopify stores",
};

const BUDGET_CONTEXT = {
  "Under $5,000":
    "They work with smaller budgets, making professional Shopify development accessible to startups and small businesses.",
  "$5,000 - $25,000":
    "Their mid-range pricing makes them suitable for growing businesses that need professional-grade Shopify development without enterprise-level costs.",
  "$25,000 - $100,000":
    "With project budgets in the $25k-$100k range, they typically serve established mid-market brands looking for comprehensive Shopify solutions.",
  "$100,000+":
    "As an enterprise-focused agency, they take on large-scale projects for established brands requiring complex, high-performance Shopify implementations.",
};

const TEAM_CONTEXT = {
  "1-10":
    "As a smaller, focused team, they offer hands-on attention and direct access to senior talent on every project.",
  "11-50":
    "With a mid-sized team, they balance personalized service with the capacity to handle complex, multi-faceted projects.",
  "51-200":
    "Their larger team gives them the depth to run multiple concurrent workstreams and bring specialist expertise to each project area.",
  "201-500":
    "As a large-scale agency, they have the resources and infrastructure to support enterprise clients with dedicated account teams.",
  "500+":
    "As one of the larger agencies in the Shopify ecosystem, they bring significant resources, global reach, and deep bench strength to every engagement.",
};

// ── Description generator ────────────────────────────────────────────────────

function generateLongDescription(agency) {
  const {
    name,
    description,
    location,
    country,
    specializations,
    budget_range,
    team_size,
    founded,
    rating,
    review_count,
  } = agency;

  const specs = specializations || [];
  const paragraphs = [];

  // Paragraph 1: Introduction
  const locationStr = [location, country].filter(Boolean).join(", ");
  const locationClause = locationStr
    ? ` based in ${locationStr}`
    : "";

  if (description && description.length > 30) {
    paragraphs.push(description);
  } else {
    const primarySpec = specs[0]
      ? SPEC_DESCRIPTIONS[specs[0]] || specs[0].toLowerCase()
      : "Shopify store design and development";
    paragraphs.push(
      `${name} is a Shopify agency${locationClause} specializing in ${primarySpec}. They work with ecommerce brands to build, optimize, and grow their Shopify stores.`
    );
  }

  // Paragraph 2: Services
  if (specs.length > 1) {
    const specDescriptions = specs
      .slice(0, 4)
      .map((s) => SPEC_DESCRIPTIONS[s] || s.toLowerCase())
      .filter(Boolean);

    if (specDescriptions.length >= 2) {
      paragraphs.push(
        `Their core capabilities include ${specDescriptions.slice(0, -1).join(", ")}, and ${specDescriptions.slice(-1)}. This combination of services allows them to deliver end-to-end ecommerce solutions for Shopify merchants.`
      );
    }
  }

  // Paragraph 3: Context (team, budget, founded)
  const contextParts = [];

  if (founded) {
    const years = new Date().getFullYear() - founded;
    contextParts.push(
      `Founded in ${founded}, ${name} brings ${years > 1 ? `over ${years} years` : "several years"} of experience in the Shopify ecosystem.`
    );
  }

  if (team_size && TEAM_CONTEXT[team_size]) {
    contextParts.push(TEAM_CONTEXT[team_size]);
  }

  if (budget_range && BUDGET_CONTEXT[budget_range]) {
    contextParts.push(BUDGET_CONTEXT[budget_range]);
  }

  if (contextParts.length > 0) {
    paragraphs.push(contextParts.join(" "));
  }

  // Paragraph 4: Social proof
  if (rating && review_count && review_count > 0) {
    paragraphs.push(
      `${name} holds a ${rating}/5 rating on the Shopify Partner directory based on ${review_count} ${review_count === 1 ? "review" : "reviews"}, reflecting consistent client satisfaction across their project portfolio.`
    );
  }

  return paragraphs.join("\n\n");
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🔧 Generate long descriptions (${WRITE ? "WRITE MODE" : "DRY RUN"})\n`
  );

  const { data: agencies, error } = await supabase
    .from("agencies")
    .select(
      "id, name, slug, description, location, country, specializations, budget_range, team_size, founded, rating, review_count"
    )
    .eq("status", "published")
    .or("long_description.is.null,long_description.eq.")
    .order("rating", { ascending: false, nullsFirst: false })
    .limit(LIMIT);

  if (error) {
    console.error("❌ Failed to fetch agencies:", error.message);
    process.exit(1);
  }

  console.log(`📋 Found ${agencies.length} agencies without long_description\n`);

  let updated = 0;
  let failed = 0;

  for (const agency of agencies) {
    const longDesc = generateLongDescription(agency);
    const wordCount = longDesc.split(/\s+/).length;

    if (!WRITE) {
      console.log(`─── ${agency.name} (${wordCount} words) ───`);
      console.log(longDesc.substring(0, 200) + "...\n");
      updated++;
      continue;
    }

    const { error: updateError } = await supabase
      .from("agencies")
      .update({ long_description: longDesc })
      .eq("id", agency.id);

    if (updateError) {
      console.error(`  ❌ ${agency.name}: ${updateError.message}`);
      failed++;
    } else {
      console.log(`  ✅ ${agency.name} (${wordCount} words)`);
      updated++;
    }
  }

  console.log(
    `\n📊 ${WRITE ? "Updated" : "Previewed"}: ${updated} | Failed: ${failed}`
  );
}

main();
