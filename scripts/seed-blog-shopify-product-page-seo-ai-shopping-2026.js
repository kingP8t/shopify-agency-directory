/**
 * Seed blog post: Shopify Product Page SEO for the AI Shopping Era (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Applies the SEO+GEO cluster to product pages — the resilient, revenue-driving query type.
 * Run: node scripts/seed-blog-shopify-product-page-seo-ai-shopping-2026.js
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
  slug: "shopify-product-page-seo-ai-shopping-2026",
  title:
    "Shopify Product Page SEO for the AI Shopping Era: How to Get Found and Recommended in 2026",
  seo_title: "Shopify Product Page SEO for AI Shopping (2026)",
  excerpt:
    "Product pages are the searches AI can't replace — but they now have to be found in classic search AND surfaced inside AI shopping. Here is how to optimize Shopify product pages for both: titles and descriptions, structured data, unique content, reviews, feeds, and the duplicate-content traps that hold most stores back.",
  category: "SEO",
  tags: [
    "shopify product page seo",
    "ai shopping",
    "product seo 2026",
    "shopify product descriptions",
    "google shopping shopify",
    "product schema",
    "ecommerce seo",
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
      "Last reviewed June 2026. Product page SEO is the practice of optimizing individual Shopify product pages so they rank in search and get surfaced inside AI shopping experiences. It matters more than ever because product and transactional searches are the queries AI answers cannot fully replace — a shopper ready to buy still needs to land on a real page. To win, each product page needs a clear, keyword-aware title and unique description, complete and accurate structured data, genuine reviews, and an accurate product feed, with no duplicate or thin-page problems dragging it down."
    ),
    p(
      "The shift in 2026 is that product pages now compete on two surfaces at once: classic search results, and AI-driven shopping answers in Google's AI Mode, ChatGPT, Perplexity, and similar tools. The good news is that the work overlaps almost entirely — a well-optimized product page tends to perform on both. This guide covers exactly what that looks like."
    ),
    tip(
      "Product searches are your most defensible traffic in the AI era. Someone searching to buy a specific item has intent an AI summary can't satisfy — so investing in product pages is investing in the clicks least likely to disappear."
    ),

    // ── Section 1: Two surfaces ────────────────────────────────────────
    h2("Product Pages Now Compete on Two Surfaces"),
    p(
      "Optimizing a product page used to mean one thing: rank it in Google. Now there are two distinct places to be visible, and they reward slightly different things."
    ),
    h3("Classic search and shopping results"),
    p(
      "Organic results and product/shopping listings still drive enormous purchase traffic. Here you compete on relevance, structured data, reviews, price, and the usual ranking signals — and a strong listing with star ratings and price still earns the click."
    ),
    h3("AI shopping answers"),
    p(
      "Increasingly, shoppers ask an assistant to recommend or compare products, and the AI returns specific items with reasoning. To be one of those items, your product's facts — attributes, price, availability, reviews — must be machine-readable and trustworthy, and your brand has to be a recognizable entity. This is product-level GEO."
    ),
    cta(
      "The mechanics of getting recommended by AI are their own discipline. Here's the full playbook.",
      "/blog/shopify-geo-ai-search-2026",
      "GEO for Shopify: Get Cited by AI Search"
    ),

    // ── Section 2: Fundamentals ────────────────────────────────────────
    h2("The Product Page SEO Fundamentals (Still Essential)"),
    p(
      "None of the classic work has gone away — if anything, it now feeds AI shopping too. Get these right on every product page:"
    ),
    table(
      ["Element", "What to do"],
      [
        ["Title tag", "Lead with the product name + a key descriptor; keep it specific and unique per product"],
        ["Meta description", "Write a benefit-led, accurate summary that earns the click; avoid duplicates"],
        ["URL handle", "Keep it short, readable, and stable — avoid changing it once indexed"],
        ["H1 / product name", "Clear, specific, and matching how shoppers actually describe the item"],
        ["Image alt text", "Describe each image factually — helps image search and accessibility"],
        ["Internal links", "Link from relevant collections, guides, and related products"],
      ]
    ),
    p(
      "The recurring theme is specificity and uniqueness. Pages that are precise about what the product is — and different from every other page — win on both surfaces."
    ),

    // ── Section 3: Unique content ──────────────────────────────────────
    h2("Write Product Content That Earns Its Ranking"),
    p(
      "The most common product page SEO failure is using the manufacturer's boilerplate description — the exact text dozens of other stores also publish. Duplicate, generic copy gives search engines no reason to prefer you and gives AI nothing distinctive to cite. Original, specific content is the fix."
    ),
    ul(
      "Write unique descriptions for your priority products instead of pasting supplier copy",
      "State concrete attributes — materials, dimensions, compatibility, sizing, use cases — as clear facts",
      "Answer the real buying questions shoppers ask, ideally in a short on-page Q&A",
      "Lead with specifics a machine can lift cleanly: who it's for, what it does, what makes it different",
    ),
    tip(
      "AI shopping engines reward the same thing buyers do: clarity. A description that plainly states materials, fit, and use cases is both more persuasive to a shopper and more quotable to an AI assistant comparing options."
    ),

    // ── Section 4: Structured data ─────────────────────────────────────
    h2("Structured Data: Non-Negotiable for Product Pages"),
    p(
      "Product schema is what lets search and AI engines read your price, availability, brand, and rating without guessing. It powers rich snippets in classic search and hands clean facts to AI shopping. Every priority product page should expose, accurately:"
    ),
    ul(
      "Product — name, image, description, brand, and identifiers like SKU and GTIN where you have them",
      "Offer — price, currency, and current availability, matching the visible page exactly",
      "AggregateRating and Review — only when genuine, visible reviews back them",
    ),
    p(
      "Accuracy is everything here: schema that disagrees with the visible page — a stale price, a rating with no reviews — gets you distrusted by both Google and AI engines rather than rewarded."
    ),
    cta(
      "Getting Product, Offer, and Review schema right (without the penalties) is covered step by step here.",
      "/blog/shopify-schema-markup-structured-data-2026",
      "Shopify Schema Markup: The 2026 Guide"
    ),

    // ── Section 5: Feeds ───────────────────────────────────────────────
    h2("Don't Forget the Product Feed"),
    p(
      "On-page SEO is only half the picture for products. Shopping surfaces — and, increasingly, AI shopping — also draw on structured product feeds, typically through Google Merchant Center via Shopify's Google sales channel. A clean, complete feed is what makes your products eligible to appear in those results."
    ),
    ul(
      "Connect the Google sales channel and keep your product feed syncing accurately",
      "Provide complete attributes — titles, descriptions, identifiers (GTIN/MPN), price, and availability",
      "Keep feed data and on-page data consistent; mismatches cause disapprovals and erode trust",
    ),
    p(
      "Think of the feed and your product pages as two expressions of the same truth. When they agree and are both complete, you maximize eligibility across every shopping surface."
    ),

    // ── Section 6: Reviews ─────────────────────────────────────────────
    h2("Reviews: The Trust Layer Buyers and AI Both Use"),
    p(
      "Reviews do double duty on a product page: they convert hesitant shoppers, and they give AI shopping engines independent corroboration of quality. When an assistant weighs which product to recommend, ratings and review content are exactly the kind of signal it leans on — provided they are genuine and properly marked up."
    ),
    cta(
      "Pick a review app that displays reviews well and outputs correct schema. Here's the comparison.",
      "/blog/best-shopify-review-apps-2026",
      "Best Shopify Review Apps in 2026"
    ),

    // ── Section 7: Duplicate / thin pages ──────────────────────────────
    h2("Fix the Duplicate and Thin-Page Traps"),
    p(
      "Stores quietly sabotage their product SEO with duplicate and thin pages — and AI engines, which prize distinctive, trustworthy sources, are even less forgiving of it. The usual culprits:"
    ),
    ul(
      "Near-identical pages for color or size variants competing against each other",
      "Manufacturer boilerplate repeated across many of your own products and dozens of competitors",
      "Thin pages with a photo and a price but no real, unique content",
      "Parameter and filter URLs creating duplicate versions of the same product",
    ),
    cta(
      "Variants, tags, and pagination are the most common Shopify duplicate-content sources. Here's how to fix them.",
      "/blog/fix-shopify-duplicate-content-seo",
      "Fix Shopify Duplicate Content Issues"
    ),

    // ── Section 8: Measurement ─────────────────────────────────────────
    h2("How to Measure Product Page Performance"),
    p(
      "Track the signals that tell you whether your product pages are winning on both surfaces:"
    ),
    ul(
      "Search Console: impressions, clicks, and average position for product queries and pages",
      "Rich result and Merchant listing reports: how many products are valid versus throwing errors",
      "Organic revenue by landing page: which product pages actually drive sales, not just traffic",
      "AI referrals and branded product searches: early signs your products are being surfaced and recommended",
    ),
    tip(
      "Prioritize by revenue, not page count. Most stores have far more products than they can optimize deeply — so start with the best-sellers and high-margin items where better pages translate directly into sales."
    ),

    // ── Section 9: When to call an agency ──────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Rewriting a few hero product descriptions is DIY. But doing this well at catalog scale is real work, and a specialist earns their fee when:"
    ),
    ul(
      "You have hundreds or thousands of products and need a scalable structured-data and content approach",
      "Variant, parameter, and duplicate-content issues are tangled in your theme and need untangling",
      "Your product feed is throwing disapprovals you can't resolve, costing you shopping visibility",
      "You want product pages optimized for AI shopping as part of a wider technical SEO program",
    ),
    cta(
      "Want experts who optimize product pages for search and AI shopping? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "Why does product page SEO matter more in the AI search era?",
        a: "Because product and transactional searches are the queries AI answers can't fully replace — a shopper ready to buy a specific item still needs a real page to land on. While informational content loses clicks to AI summaries, well-optimized product pages stay resilient and now also feed AI shopping recommendations, making them your most defensible traffic.",
      },
      {
        q: "Should I write unique descriptions for every Shopify product?",
        a: "For your priority products, yes. Manufacturer boilerplate is duplicated across many stores, so it gives search engines no reason to prefer you and gives AI nothing distinctive to cite. Unique, specific descriptions — materials, fit, use cases, buying questions answered — win on both classic search and AI shopping. Start with best-sellers and high-margin items.",
      },
      {
        q: "What structured data do Shopify product pages need?",
        a: "Product (name, image, description, brand, and identifiers like SKU/GTIN), Offer (price, currency, availability matching the visible page), and AggregateRating/Review only when genuine, visible reviews back them. Accuracy is critical — schema that disagrees with the page, like a stale price or a rating with no reviews, gets you distrusted rather than rewarded.",
      },
      {
        q: "How do my products get into AI shopping results?",
        a: "Make each product's facts machine-readable with accurate structured data, keep a clean and complete product feed (via Google Merchant Center through Shopify's Google channel), earn genuine reviews, write distinctive descriptions, and build brand recognition. AI shopping engines recommend products whose attributes and quality they can read and trust.",
      },
      {
        q: "Do product feeds still matter if my pages are optimized?",
        a: "Yes — they're the other half. Shopping surfaces and, increasingly, AI shopping draw on structured product feeds, usually through Google Merchant Center. Keep the feed complete and accurate and consistent with your on-page data; mismatches cause disapprovals and erode trust across every shopping surface.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "Product pages are where SEO and revenue meet most directly — and in the AI era, they are your most resilient source of traffic because buying intent can't be summarized away. The work to win on both classic search and AI shopping is largely the same: specific titles and unique descriptions, accurate structured data, a clean feed, genuine reviews, and no duplicate or thin pages dragging you down."
    ),
    p(
      "You can't optimize an entire catalog overnight, so don't try. Start with the product pages that drive the most revenue, get them genuinely right, and work down from there. Done well, each improved page earns clicks today and recommendations from the AI shopping tools your customers are starting to rely on."
    ),
    cta(
      "Want an expert to optimize your product pages for search and AI shopping? Get matched with a verified Shopify agency.",
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
