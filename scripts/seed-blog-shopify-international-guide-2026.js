/**
 * Seed blog post: Shopify Internationalisation Guide 2026
 * Author: Varine Rashford
 * Category: Platform Guide
 * Targets "shopify international", "shopify multi currency", "shopify markets"
 * Run: node scripts/seed-blog-shopify-international-guide-2026.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const h2 = (text) => ({ type: "h2", text });
const h3 = (text) => ({ type: "h3", text });
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "shopify-international-multi-currency-markets-guide-2026",
  title: "Shopify International Expansion: Multi-Currency, Multi-Language, and Shopify Markets (2026 Guide)",
  seo_title: "Shopify International & Multi-Currency Guide (2026)",
  excerpt: "Selling internationally on Shopify in 2026 means choosing between Shopify Markets, Shopify Plus Markets Pro, and third-party tools. Here is what each option does, what it costs, and how to set it up without breaking your store.",
  category: "Platform Guide",
  tags: [
    "shopify international",
    "shopify multi currency",
    "shopify markets",
    "shopify multi language",
    "shopify global selling",
    "shopify markets pro",
  ],
  author: "Varine Rashford",
  reading_time: 10,
  status: "published",
  featured: false,
  date: "2026-06-02",
  updated_date: "2026-06-02",
  content: [
    p("Last reviewed June 2026. Shopify has become a genuinely capable international selling platform. Shopify Markets — the native internationalisation feature — lets you sell in multiple currencies and languages from a single store, with localised pricing, local payment methods, and country-specific domains or subfolders. You do not need a separate store for each country anymore. But the setup decisions matter: which market structure you choose, how you handle currency conversion, and whether you need Shopify Plus all affect what international customers see and what you pay."),
    p("This guide covers the current state of Shopify internationalisation in 2026 — what each tool does, what it costs, and the decisions most merchants get wrong."),

    h2("Shopify's Internationalisation Tools at a Glance"),
    table(
      ["Feature", "Available On", "What It Does"],
      [
        ["Shopify Markets", "All plans", "Sell in multiple countries with localised currency, language, and pricing from one store"],
        ["Shopify Translate & Adapt", "All plans (free)", "Translate content for each market; auto-translate or manual"],
        ["Shopify Payments multi-currency", "All plans (where available)", "Display and settle in local currencies; no third-party app needed"],
        ["Shopify Markets Pro", "Shopify Plus only", "Adds duty & tax calculation, local payment methods, and guaranteed local pricing"],
        ["Expansion stores", "Shopify Plus only", "Separate Shopify stores per region, managed under one Plus account"],
      ]
    ),

    h2("Shopify Markets: What It Does and Does Not Do"),
    p("Shopify Markets is the starting point for most international sellers. You create a Market for each country or region and configure it with a currency, language, and optional custom pricing. Customers are shown localised prices based on their location, and checkout happens in their currency if Shopify Payments is enabled."),
    p("What it does well:"),
    ul(
      "Single store, single inventory — no duplication of products or order management",
      "Currency auto-conversion with an optional markup to protect margins",
      "Subfolders (/en-gb, /de) or subdomains for different markets — both are SEO-friendly",
      "Per-market pricing overrides so you can set exact local prices rather than relying on conversion rates",
      "Basic language translation via Translate & Adapt",
    ),
    p("What it does not do on standard plans:"),
    ul(
      "Calculate and collect import duties and taxes at checkout — customers may face surprise fees on delivery",
      "Offer guaranteed local payment methods like iDEAL, Klarna SOFORT, or Alipay natively",
      "Handle complex tax registration requirements automatically across multiple countries",
    ),
    tip("If you sell to countries where import duties are a real issue — the EU, UK, Canada, Australia — the duty-and-tax gap is the most common reason international cart abandonment is higher than domestic. Markets Pro or a third-party duty calculator (Zonos, Avalara) fixes this."),

    h2("Shopify Markets Pro (Shopify Plus Only)"),
    p("Markets Pro is Shopify's answer to the duty-and-tax problem. Available only on Shopify Plus, it adds guaranteed local pricing in 150+ markets, duty and import tax calculation and collection at checkout, a wider range of local payment methods, and fraud protection for international orders. Shopify acts as the merchant of record for international transactions, handling tax compliance on your behalf."),
    p("The cost is a per-transaction fee (currently around 6.5% for international orders, reduced for higher volumes) on top of your Plus subscription. For stores doing significant international volume, the combination of reduced abandonment, fewer customs complaints, and tax compliance simplification often makes it worthwhile."),

    h2("Multi-Currency: How It Works"),
    p("When Shopify Payments is enabled and you activate multiple currencies in Markets, customers see prices in their local currency and pay in that currency. Shopify converts at the current rate plus an optional rounding rule you set. Settlement arrives in your bank account in your store's primary currency."),
    p("Key decisions:"),
    ul(
      "Auto-convert vs manual pricing: auto-conversion is easy but prices shift with exchange rates; manual per-market prices are stable but need maintaining",
      "Currency rounding: set prices to end in 0.99 or round to the nearest 5 to feel natural in each market",
      "Currency selector: Markets adds an automatic currency selector; make sure your theme surfaces it clearly on mobile",
      "Bank fees: check your payment processor's currency conversion fee — Shopify Payments charges around 1.5% for non-primary-currency settlements",
    ),

    h2("Multi-Language: Translate & Adapt"),
    p("Shopify's native Translate & Adapt app is free and handles translating storefront content — product titles, descriptions, collection names, pages, and navigation — into additional languages. It supports both manual translation and auto-translate (powered by Google Translate as the base, which you then edit). Third-party apps like Langify or Weglot offer more automation and glossary control if you have a large catalog."),
    p("SEO note: each language gets its own URL (/de/, /fr/) and hreflang tags, which tells Google which version to serve in each country. This is automatic with Shopify Markets and correct if you use the subfolder or subdomain structure."),

    h2("Domains and URL Structure"),
    p("Shopify Markets supports three URL structures for international markets:"),
    table(
      ["Structure", "Example", "Best For"],
        [
        ["Subfolder", "yourstore.com/en-gb/", "Most stores — easiest to set up, domain authority shared"],
        ["Subdomain", "uk.yourstore.com", "Larger operations that want clearer regional identity"],
        ["Country-code TLD", "yourstore.co.uk", "Maximum local credibility; requires separate domain registration and DNS setup"],
      ]
    ),
    p("For most merchants, subfolders are the right call — they inherit your existing domain authority and require no extra domain management. Country-code TLDs are worth the effort only if local trust is a core competitive advantage in a specific market."),

    h2("Expansion Stores vs Shopify Markets"),
    p("Expansion stores (separate Shopify Plus stores per region) were the standard approach before Markets launched. They give you complete independence per region — separate inventory, checkout, and admin — but at the cost of duplicated management and inventory. Markets has replaced expansion stores for most use cases. Expansion stores still make sense when a region needs a genuinely different business structure, separate legal entity, or completely distinct catalog that does not map cleanly to your primary store."),

    h2("The Most Common Mistakes"),
    ul(
      "Enabling multi-currency without fixing rounding — prices that end in odd amounts (£23.47) erode trust in local markets",
      "Ignoring duties and taxes — the single biggest driver of international cart abandonment and customer complaints",
      "Auto-translating without review — machine translation of product descriptions often reads strangely and can damage brand perception",
      "Not setting hreflang correctly — language/region mismatch in search results sends the wrong version of your store to the wrong country",
      "Treating all markets the same — what works in Germany often does not work in Japan; local payment preferences and shopping behaviour differ significantly",
    ),

    cta("International setup is an area where an experienced agency pays for itself. Browse verified Shopify agencies with international expansion experience.", "/agencies?specialization=International", "Browse International Agencies"),

    faq([
      {
        q: "What is Shopify Markets?",
        a: "Shopify Markets is Shopify's built-in internationalisation feature, available on all plans. It lets you sell to multiple countries from a single store with localised currency, language, pricing, and domain structure. You create a separate Market for each country or region and configure it independently.",
      },
      {
        q: "Does Shopify support multi-currency on all plans?",
        a: "Yes, when Shopify Payments is available in your country. Multi-currency display and payment is built into Shopify Payments at no extra cost beyond the standard processing fee, with a small additional fee for non-primary-currency settlements (around 1.5% with Shopify Payments).",
      },
      {
        q: "Do I need Shopify Plus to sell internationally?",
        a: "No. Shopify Markets works on all plans and covers most international selling needs — multi-currency, multi-language, and per-market pricing. Shopify Plus adds Markets Pro (duties, taxes, and local payment methods) and expansion stores. Standard plans are sufficient for most international sellers starting out.",
      },
      {
        q: "How does Shopify handle import duties for international orders?",
        a: "On standard plans, Shopify does not calculate or collect duties at checkout — customers pay them on delivery, which causes abandonment and complaints. Shopify Markets Pro (Plus only) handles duty collection at checkout. Alternatively, third-party duty tools like Zonos or Avalara work with standard Shopify.",
      },
      {
        q: "Is Shopify Translate & Adapt free?",
        a: "Yes. Shopify Translate & Adapt is Shopify's free native translation app. It supports manual translation and auto-translate (Google Translate base). For larger catalogs or better glossary control, paid apps like Langify or Weglot offer more automation.",
      },
      {
        q: "What URL structure is best for international SEO on Shopify?",
        a: "Subfolders (yourstore.com/de/) are the best starting point for most stores — they share your existing domain authority and are the easiest to configure. Subdomains are fine too. Country-code TLDs (yourstore.de) offer the most local credibility but require separate domain management and are usually only worth it for major regional operations.",
      },
    ]),

    h2("The Bottom Line"),
    p("Shopify Markets makes international selling far more accessible than it was two years ago. Most merchants can handle multi-currency, multi-language, and per-market pricing from a single store on any plan. The gap — duties and local payment methods — is real and worth solving early if you are targeting markets where import fees are common. Markets Pro solves it on Plus; third-party duty tools solve it on standard plans."),
    p("Start with one or two international markets rather than enabling twenty at once. Configure currency rounding, get translations reviewed by a native speaker, and watch your international abandonment rates before expanding further."),
    cta("Need help setting up Shopify Markets or expanding internationally? Browse verified Shopify agencies.", "/get-matched", "Get Matched Free"),
  ],
};

async function seed() {
  console.log("Seeding blog post:", post.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(
      {
        slug: post.slug,
        title: post.title,
        seo_title: post.seo_title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        reading_time: post.reading_time,
        status: post.status,
        featured: post.featured,
        date: post.date,
        updated_date: post.updated_date,
      },
      { onConflict: "slug" }
    )
    .select();

  if (error) { console.error("Failed:", error); process.exit(1); }
  console.log("Seeded:", data?.[0]?.slug);
}
seed();
