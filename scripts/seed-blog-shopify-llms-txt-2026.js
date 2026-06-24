/**
 * Seed blog post: llms.txt for Shopify — what it is, whether it's worth it (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Niche/high-GEO addition to the AI-search cluster. Honest about emerging, unproven status;
 * routes readers to the proven levers (schema, GEO).
 * Run: node scripts/seed-blog-shopify-llms-txt-2026.js
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
  slug: "shopify-llms-txt-ai-crawlers-2026",
  title:
    "llms.txt for Shopify: What It Is, Whether It's Worth It, and How to Add One in 2026",
  seo_title: "llms.txt for Shopify: Worth It? (2026 Guide)",
  excerpt:
    "llms.txt is the new file everyone in AI-SEO circles is talking about — a curated, LLM-friendly map of your site. But is it worth adding to a Shopify store in 2026, and can you even serve one? An honest look at what it does, the real state of adoption, the Shopify-specific catch, and where your effort is better spent.",
  category: "SEO",
  tags: [
    "llms.txt",
    "llms.txt shopify",
    "ai crawlers",
    "generative engine optimization",
    "shopify ai search",
    "ai seo",
  ],
  author: "Varine Rashford",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-06-24",
  updated_date: "2026-06-24",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. llms.txt is a proposed standard — a plain Markdown file placed at the root of your domain (yoursite.com/llms.txt) that gives AI systems a curated, easy-to-read map of your most important content. Think of it as a friendly guide written for language models rather than search crawlers. Is it worth adding to a Shopify store? Honest answer: it is a low-cost, low-risk bet that signals intent, but it is not yet reliably honored by the major AI engines, so it should come after the fundamentals that actually move the needle — clean structured data, crawler access, and citable content — not instead of them."
    ),
    p(
      "There is also a practical catch on Shopify: serving a true root-level /llms.txt is not straightforward, because Shopify does not let you drop arbitrary files at your domain root the way a self-hosted site can. This guide explains what llms.txt is, the realistic state of adoption, your options on Shopify, and where your time is better spent."
    ),
    tip(
      "Treat llms.txt as a cheap experiment, not a ranking lever. If it is trivial for you to add, add it. If it is fiddly on your setup, your hours pay off far more on structured data and content — the levers AI engines provably use today."
    ),

    // ── Section 1: what it is ──────────────────────────────────────────
    h2("What llms.txt Actually Is"),
    p(
      "Proposed in 2024, llms.txt is a convention for helping AI systems understand a website efficiently. Instead of making a model crawl and parse your entire site, you provide a single Markdown file that summarizes what your site is about and links to your key pages, in a clean, token-friendly format. Some sites also publish a longer companion file (often called llms-full.txt) with more complete content."
    ),
    p(
      "It is easy to confuse with files you already know, so here is how it differs:"
    ),
    table(
      ["File", "Audience", "Purpose"],
      [
        ["robots.txt", "Crawlers", "Says which bots may access which paths"],
        ["sitemap.xml", "Search engines", "Lists all URLs so they can be discovered and indexed"],
        ["llms.txt", "AI / language models", "A curated, human-readable summary and map of key content"],
      ],
    ),
    p(
      "Crucially, llms.txt does not control access (robots.txt does) and does not replace your sitemap. It is an optional, additive hint — a tidy front door for models that choose to look for it."
    ),

    // ── Section 2: the honest state ────────────────────────────────────
    h2("The Honest State of Adoption in 2026"),
    p(
      "This is where you need a clear head. llms.txt has gained real momentum as a convention, and plenty of sites — this directory included — publish one. But the major AI engines have not broadly committed to reading or relying on it, and there is no confirmed evidence that having an llms.txt meaningfully improves whether you get cited. It is a proposed standard with growing mindshare, not an established ranking factor."
    ),
    p(
      "So the realistic case for adding one is modest and forward-looking: it costs almost nothing, it signals that you are organized and AI-aware, and if adoption grows you are already set up. The case against over-investing is equally clear: do not let it distract from the levers that demonstrably work today."
    ),
    cta(
      "Those proven levers — structured data, entity clarity, crawler access, citable content — are covered in full here.",
      "/blog/shopify-geo-ai-search-2026",
      "GEO for Shopify: Get Cited by AI Search"
    ),

    // ── Section 3: the Shopify catch ───────────────────────────────────
    h2("The Shopify Catch: Can You Even Serve One?"),
    p(
      "On a self-hosted site, adding /llms.txt is trivial — you upload a file to the root. Shopify is more restrictive: it does not give you direct access to drop arbitrary static files at your domain root, so getting a genuine root-level /llms.txt takes a workaround. Your realistic options:"
    ),
    ul(
      "A dedicated app — some Shopify apps generate and serve an llms.txt for you; the lowest-effort route if one fits your needs",
      "An app proxy or custom development — a developer can route a root path to generated content, which is the most robust but requires technical work",
      "A regular Shopify page — you can publish the content at a normal page URL (e.g. /pages/llms-txt), though that is not the conventional root location models would look for",
    ),
    tip(
      "If your only option is a non-root page, weigh whether it is worth it at all. The whole value of llms.txt is being at the predictable root location; a page buried under /pages largely defeats the purpose. This is a case where the platform constraint is a legitimate reason to skip it for now."
    ),

    // ── Section 4: what goes in it ─────────────────────────────────────
    h2("What a Good llms.txt Contains"),
    p(
      "If you do add one, keep it simple and genuinely useful. The convention is plain Markdown:"
    ),
    ol(
      "A top-level heading with your site or brand name",
      "A short blockquote or sentence summarizing what your store is and sells",
      "Curated sections of links to your most important pages — key collections, best-sellers, policies, and helpful guides — each with a brief description",
      "Optionally, a separate, fuller file for models that want more detail",
    ),
    p(
      "The goal is curation, not completeness: point models at the pages you most want understood and cited, described clearly. A bloated, link-dump llms.txt is no more useful to a model than an unstructured site."
    ),

    // ── Section 5: better uses of time ─────────────────────────────────
    h2("Where Your Effort Pays Off More"),
    p(
      "If you have limited hours for AI-search work — and most merchants do — spend them here first, because these are the things AI engines provably use:"
    ),
    ul(
      "Structured data — clean, accurate Product, Review, and Organization schema that states your facts in a format machines parse",
      "Crawler access — making sure your robots.txt actually lets the AI search agents in, rather than blocking them by default",
      "Citable content — clear, self-contained, well-sourced passages a model can lift into an answer",
      "Reviews and brand signals — genuine reputation that corroborates your claims",
    ),
    cta(
      "Structured data is the single highest-return AI-readiness task. Start here.",
      "/blog/shopify-schema-markup-structured-data-2026",
      "Shopify Schema Markup: The 2026 Guide"
    ),
    cta(
      "And understand the bigger shift driving all of this — how AI Overviews and AI Mode are reshaping search.",
      "/blog/shopify-ai-overviews-google-ai-mode-seo-2026",
      "AI Overviews & Shopify SEO: What Changed in 2026",
    ),

    // ── Section 6: verdict ─────────────────────────────────────────────
    h2("The Verdict"),
    p(
      "llms.txt is worth a small, optional bet — add it if it is easy on your setup, skip it without guilt if the Shopify constraint makes it fiddly, and either way do not treat it as a substitute for real AI-readiness work. It is the kind of thing to do after your structured data is clean and your fundamentals are solid, not before."
    ),
    p(
      "If you want help getting the high-impact pieces right — structured data, technical SEO, and AI readiness as a whole — that is exactly the kind of work a specialist agency handles well."
    ),
    cta(
      "Want experts to make your store genuinely AI-search ready? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "What is llms.txt?",
        a: "llms.txt is a proposed standard: a plain Markdown file at your domain root (yoursite.com/llms.txt) that gives AI systems a curated, easy-to-read map of your most important content. It is written for language models rather than search crawlers, and is an optional, additive hint — not a replacement for robots.txt or your sitemap.",
      },
      {
        q: "Is llms.txt worth adding to a Shopify store in 2026?",
        a: "It is a low-cost, low-risk bet, not a proven ranking lever. The major AI engines have not broadly committed to reading it, and there is no confirmed evidence it improves citation. Add it if it is easy on your setup; otherwise prioritize structured data, crawler access, and citable content, which AI engines provably use today.",
      },
      {
        q: "How is llms.txt different from robots.txt and sitemap.xml?",
        a: "robots.txt tells crawlers which paths they may access; sitemap.xml lists all your URLs so search engines can discover them; llms.txt is a curated, human-readable summary and map of your key content aimed at AI models. llms.txt does not control access and does not replace your sitemap — it is purely an optional hint.",
      },
      {
        q: "Can I add llms.txt to Shopify?",
        a: "Not as easily as on a self-hosted site, because Shopify does not let you drop arbitrary files at your domain root. Options include a dedicated app that generates and serves it, an app proxy or custom development to route a root path, or publishing the content at a normal page URL (e.g. /pages/llms-txt) — though a non-root location largely defeats the purpose.",
      },
      {
        q: "Does llms.txt help me get cited by ChatGPT or Perplexity?",
        a: "There is no confirmed evidence that it does yet. The proven ways to improve AI citation are clean structured data, letting the right AI crawlers in, building a recognizable brand entity, earning genuine reviews, and writing citable content. Treat llms.txt as a small forward-looking bet on top of those, not a shortcut.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "llms.txt is a genuinely interesting idea and a cheap experiment, but it is not a magic switch for AI visibility — and on Shopify it is not even simple to serve. Add one if it is easy, keep it curated and useful, and hold realistic expectations about what it does today."
    ),
    p(
      "The durable wins in AI search are not in a single file. They are in clean structured data, crawlable and fast pages, genuine reviews, and content clear enough to quote. Get those right, treat llms.txt as a small bonus, and you are spending your effort where it actually counts."
    ),
    cta(
      "Want an expert to prioritize the AI-readiness work that matters for your store? Get matched with a verified Shopify agency.",
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
