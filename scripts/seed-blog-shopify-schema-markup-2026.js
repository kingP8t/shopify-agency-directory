/**
 * Seed blog post: Schema Markup / Structured Data for Shopify (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Pairs with the GEO post — structured data is the shared SEO + AI-citability lever.
 * Run: node scripts/seed-blog-shopify-schema-markup-2026.js
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
const ol = (...items) => ({ type: "ol", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "shopify-schema-markup-structured-data-2026",
  title:
    "Shopify Schema Markup: The 2026 Guide to Structured Data (Product, Review, FAQ & Organization)",
  seo_title: "Shopify Schema Markup: The 2026 Structured Data Guide",
  excerpt:
    "Structured data is the one technical change that helps your Shopify store in classic search AND AI search at the same time. Here is which schema types matter, what Shopify gives you out of the box, how to add the rest, the pitfalls that get you penalized, and how to validate it.",
  category: "SEO",
  tags: [
    "shopify schema markup",
    "shopify structured data",
    "product schema shopify",
    "shopify rich results",
    "shopify json-ld",
    "shopify aggregaterating",
    "schema for ecommerce",
  ],
  author: "Varine Rashford",
  reading_time: 12,
  status: "published",
  featured: false,
  date: "2026-06-24",
  updated_date: "2026-06-24",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. Schema markup (also called structured data) is code — usually JSON-LD following the schema.org vocabulary — that states your page's facts in a format machines parse directly: this is a product, it costs this much, it has this rating, this business is located here. On Shopify it is the single most efficient technical investment you can make, because the same markup powers rich results in Google AND helps AI engines like ChatGPT, Perplexity, and Google AI Overviews understand and cite your store."
    ),
    p(
      "Most Shopify themes ship some basic structured data, but it is frequently incomplete, duplicated, or missing the high-value types. Getting it right means knowing which schema types matter, filling the gaps your theme leaves, marking up only what is genuinely on the page, and validating the result. This guide walks through all four."
    ),
    tip(
      "Structured data does not change what shoppers see on your page — it changes what machines understand about it. That is exactly why it helps two audiences at once: search engines deciding how to display you, and AI engines deciding whether to cite you."
    ),

    // ── Section 1: Why it matters twice ────────────────────────────────
    h2("Why Structured Data Matters Twice in 2026"),
    p(
      "There are two payoffs, and they have diverged into two distinct channels worth understanding separately."
    ),
    h3("1. Rich results in classic search"),
    p(
      "When Google can read your structured data, it can enhance your listing: star ratings, price and availability, breadcrumbs, and other rich snippets. These make your result more prominent and clickable than a plain blue link — a real edge on a crowded results page."
    ),
    h3("2. Machine-readability for AI search"),
    p(
      "AI engines build answers by extracting facts from the web. Clean schema hands them your price, rating, and business details in the exact format they parse, instead of forcing them to guess from page text. In an answer-first world, being unambiguously machine-readable is a direct path to being cited."
    ),
    cta(
      "Structured data is one of the five core levers for getting your store named inside AI answers. See the full playbook.",
      "/blog/shopify-geo-ai-search-2026",
      "GEO for Shopify: Get Cited by AI Search"
    ),

    // ── Section 2: The schema types that matter ────────────────────────
    h2("The Schema Types That Matter for a Shopify Store"),
    p(
      "You do not need every schema type that exists — you need the handful that map to how stores are searched and shopped. Prioritize these:"
    ),
    table(
      ["Schema type", "Where it goes", "What it unlocks"],
      [
        ["Product + Offer", "Product pages", "Price, currency, availability — and price/stock rich snippets"],
        ["AggregateRating + Review", "Product & store", "Star ratings in results — only when real reviews exist"],
        ["BreadcrumbList", "All deep pages", "Breadcrumb trail in results; clearer site structure"],
        ["Organization", "Site-wide", "Brand identity, logo, contact, social profiles"],
        ["WebSite", "Home page", "Site identity and the sitelinks search box"],
        ["FAQPage", "Pages with Q&A", "Machine-readable Q&A (see the FAQ caveat below)"],
        ["Article / BlogPosting", "Blog posts", "Author, dates, and article context for content pages"],
      ]
    ),
    p(
      "For a typical store, Product, Organization, and BreadcrumbList do most of the heavy lifting, with AggregateRating added once you have genuine reviews to back it."
    ),

    // ── Section 3: What Shopify gives you ──────────────────────────────
    h2("What Shopify Gives You Out of the Box (and What It Misses)"),
    p(
      "Shopify itself does not inject a complete set of structured data for you — most of what exists comes from your theme. Modern themes such as Dawn include some baseline markup (often basic Product and Organization data), but coverage varies widely by theme and is rarely complete."
    ),
    p("The gaps you most often have to close yourself:"),
    ul(
      "Incomplete Product schema — missing fields like brand, SKU, GTIN, or accurate availability",
      "No review markup — themes rarely wire AggregateRating to your actual review app",
      "Missing BreadcrumbList — collection-to-product navigation often is not marked up",
      "Thin Organization data — no logo, contact, or social profiles declared site-wide",
      "Duplicate or conflicting schema — a theme and an app both output Product markup, contradicting each other",
    ),
    p(
      "That last one is common and quietly harmful: when two sources describe the same product differently, you send mixed signals. Knowing what your theme already outputs is step one — before you add anything, see what is there."
    ),

    // ── Section 4: How to add it ───────────────────────────────────────
    h2("How to Add Schema Markup on Shopify"),
    p("There are three practical routes, in rough order of control versus effort:"),
    ol(
      "A structured-data app. The fastest path for most merchants: dedicated JSON-LD/schema apps generate Product, Review, Breadcrumb, FAQ, and Organization markup and keep it in sync with your catalog. Lowest effort, least custom control.",
      "Theme code (Liquid). For full control, add or fix JSON-LD directly in your theme's Liquid templates, pulling real values from product and shop objects. This is the cleanest result but requires developer comfort with theme code.",
      "Metafields + theme. Store extra structured values (GTIN, brand, custom fields) in metafields and reference them in your theme's JSON-LD — useful when you need fields the base product object does not provide.",
    ),
    tip(
      "Whichever route you choose, avoid stacking two sources of the same schema. If an app outputs Product markup, make sure your theme is not also outputting a conflicting copy. One clean, accurate block beats two that disagree."
    ),

    // ── Section 5: The pitfalls ────────────────────────────────────────
    h2("The Pitfalls That Get You Penalized (Not Rewarded)"),
    p(
      "Structured data is powerful, but sloppy markup does more harm than good — it can trigger manual actions, suppress your rich results, and erode the machine trust you are trying to build. The big ones to avoid:"
    ),
    ul(
      "Marking up content that is not on the page — schema must reflect what a visitor actually sees; invisible or fabricated data violates the guidelines",
      "AggregateRating with no real reviews — declaring a star rating you cannot back with genuine, visible reviews is the classic ecommerce violation",
      "Mismatched prices or availability — schema that disagrees with the visible product page gets distrusted by search and AI alike",
      "Self-serving reviews — review markup must reflect independent customer feedback, not ratings you assign yourself",
      "Duplicate/conflicting blocks — multiple schema sources describing the same entity differently",
      "Spammy or irrelevant types — marking up things that are not really there to chase snippets",
    ),
    tip(
      "A simple rule keeps you safe: only ever mark up what is true and visible on that exact page. Accurate-but-modest structured data always beats inflated-but-wrong — both Google and AI engines reward the former and punish the latter."
    ),

    // ── Section 6: The FAQ caveat ──────────────────────────────────────
    h2("The FAQ Schema Caveat (Read Before You Add It)"),
    p(
      "FAQPage markup used to earn an expandable Q&A rich result in Google. Since 2023, Google has restricted those FAQ rich results to a small set of authoritative government and health sites, so adding FAQPage schema to a store page rarely produces the visual snippet it once did."
    ),
    p(
      "That does not make it pointless. Well-structured Q&A markup still helps machines — including AI engines — map your content to the exact questions shoppers ask, which supports citation in AI answers. Add it for the machine-readability benefit, just do not expect the old rich result to appear."
    ),

    // ── Section 7: Validation ──────────────────────────────────────────
    h2("How to Validate Your Structured Data"),
    p(
      "Never assume markup works — verify it. Three tools cover the job:"
    ),
    ul(
      "Google Rich Results Test — paste a URL or code to see which rich results Google can generate and flag errors",
      "Schema.org Validator — a vocabulary-level check that confirms your JSON-LD is well-formed and valid schema",
      "Google Search Console → Enhancements — ongoing field-level reports (Products, Breadcrumbs, Merchant listings) showing valid items, warnings, and errors across your live site",
    ),
    p(
      "Test the page types that matter — a product page, a collection page, and your home page — not just one. And recheck after any theme update or app change, since both can alter or duplicate your markup without warning."
    ),
    cta(
      "Conflicting and duplicated markup often rides along with broader duplicate-content issues. Clean both together.",
      "/blog/fix-shopify-duplicate-content-seo",
      "Fix Shopify Duplicate Content Issues"
    ),

    // ── Section 8: Reviews ─────────────────────────────────────────────
    h2("Getting Review Markup Right"),
    p(
      "Star ratings are among the most valuable rich results for a store — and the easiest to get wrong. The rule is simple: the rating must come from genuine, independent customer reviews that are actually displayed on the page. A review app that both collects reviews and outputs correct AggregateRating/Review schema is the safe way to do this, because the markup stays tied to real, visible feedback."
    ),
    cta(
      "Your review app is also your review-schema source. Compare the ones that handle markup cleanly.",
      "/blog/best-shopify-review-apps-2026",
      "Best Shopify Review Apps in 2026"
    ),

    // ── Section 9: When to call an agency ──────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Installing a schema app is DIY. But structured data gets genuinely technical fast, and a specialist pays for itself when:"
    ),
    ul(
      "Your theme and apps output duplicate or conflicting markup that needs untangling at the code level",
      "You need complete, accurate Product schema (brand, GTIN, availability) across a large catalog",
      "Search Console is reporting structured-data errors you cannot resolve through app settings",
      "You want structured data done as part of a wider technical SEO and AI-readiness audit",
    ),
    cta(
      "Want experts who handle structured data and technical SEO properly? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "What is schema markup, and does Shopify add it automatically?",
        a: "Schema markup is structured-data code (usually JSON-LD using the schema.org vocabulary) that describes your page's facts to machines — product, price, rating, business details. Shopify does not add a complete set automatically; most baseline markup comes from your theme, and it is often incomplete or missing high-value types like review and breadcrumb schema, which you add via an app or theme code.",
      },
      {
        q: "Which schema types matter most for a Shopify store?",
        a: "Prioritize Product + Offer (price and availability), AggregateRating + Review (only with genuine reviews), BreadcrumbList, Organization, and WebSite. Product, Organization, and BreadcrumbList do most of the work for a typical store, with review markup added once you have real customer feedback to back it.",
      },
      {
        q: "How do I add structured data to Shopify?",
        a: "Three routes: a dedicated structured-data/JSON-LD app (fastest, lowest effort), editing JSON-LD directly in your theme's Liquid templates (most control, needs developer comfort), or storing extra values in metafields and referencing them in your theme. Whichever you pick, avoid having a theme and an app both output conflicting copies of the same schema.",
      },
      {
        q: "Can I add a star rating to my Shopify product schema?",
        a: "Only if it reflects genuine, independent customer reviews that are actually displayed on the page. Declaring an AggregateRating with no real, visible reviews is a guidelines violation that can suppress your rich results or trigger a manual action. Use a review app that ties the AggregateRating markup to real reviews.",
      },
      {
        q: "Does FAQ schema still get a rich result in Google?",
        a: "Rarely for stores. Since 2023 Google has limited FAQ rich results to authoritative government and health sites, so FAQPage markup on a store page usually will not produce the expandable snippet it once did. It is still worth adding for machine-readability, since it helps AI engines map your content to shopper questions.",
      },
      {
        q: "How do I check my schema markup is working?",
        a: "Use Google's Rich Results Test to see which rich results Google can generate and catch errors, the Schema.org Validator to confirm the JSON-LD is valid, and Search Console's Enhancements reports for ongoing field data on your live site. Test product, collection, and home pages, and recheck after theme or app changes.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "Structured data is rare among SEO tasks in that it pays off twice: richer, more clickable listings in classic search, and clean, citable facts for AI search. Start by seeing what your theme already outputs, fill the gaps with accurate Product, Organization, and Breadcrumb markup, add review schema only when you have genuine reviews, and validate everything before you move on."
    ),
    p(
      "Keep one principle above all: mark up only what is true and visible. Done that way, structured data is one of the highest-return, lowest-risk investments a Shopify store can make — and it gets more valuable, not less, as search shifts toward AI-generated answers."
    ),
    cta(
      "Want an expert to audit and fix your store's structured data and technical SEO? Get matched with a verified Shopify agency.",
      "/get-matched",
      "Get Matched Free"
    ),
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

  if (error) {
    console.error("Failed to seed:", error);
    process.exit(1);
  }
  console.log("Seeded:", data?.[0]?.slug);
}

seed();
