/**
 * Seed blog post: GEO for Shopify — getting cited by ChatGPT, Perplexity & AI Overviews (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Fills the GEO / AI-search whitespace — no existing post covers generative engine optimization.
 * Run: node scripts/seed-blog-shopify-geo-ai-search-2026.js
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
  slug: "shopify-geo-ai-search-2026",
  title:
    "GEO for Shopify: How to Get Your Store Cited by ChatGPT, Perplexity & Google AI Overviews (2026)",
  seo_title: "Shopify GEO: Get Cited by ChatGPT & AI Overviews (2026)",
  excerpt:
    "AI search is sending fewer clicks and more answers. Generative Engine Optimization (GEO) is how you get your Shopify store named and linked inside ChatGPT, Perplexity, and Google AI Overviews. Here is what actually moves the needle in 2026 — structured data, entity clarity, reviews, crawler access, and citable content.",
  category: "SEO",
  tags: [
    "shopify geo",
    "generative engine optimization",
    "shopify ai search",
    "ai overviews ecommerce",
    "get cited by chatgpt",
    "perplexity ecommerce seo",
    "answer engine optimization",
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
      "Last reviewed June 2026. Generative Engine Optimization (GEO) is the practice of getting your store named, summarized, and linked inside AI answers — the responses from ChatGPT, Perplexity, Google AI Overviews, Google AI Mode, Gemini, and Copilot. It is the AI-era companion to SEO: instead of optimizing only to rank a blue link, you optimize so a language model can find your information, trust it, and cite it as a source."
    ),
    p(
      "The short version of how to do it: make your store easy for machines to read (clean structured data and clear on-page facts), establish your brand as a recognizable entity, earn third-party mentions and genuine reviews, let the AI crawlers in, and write content in clear, quotable, well-sourced passages. None of this replaces classic SEO — strong organic foundations are still what most AI engines draw from. GEO simply adds a second layer on top."
    ),
    tip(
      "GEO and SEO are not rivals. Most AI engines build answers from the same web they crawl and rank. Fix your SEO fundamentals first; GEO is the multiplier you apply once they are in place."
    ),

    // ── Section 1: What changed ────────────────────────────────────────
    h2("Why GEO Matters Now: The Click Is Disappearing"),
    p(
      "For two decades, search worked one way: a shopper typed a query, scanned a list of links, and clicked. AI search breaks that pattern. Increasingly the engine reads the web for the shopper and hands back a synthesized answer — often with only a few cited sources, and sometimes with no click at all. This is the rise of the \"zero-click\" answer, and it changes the goal."
    ),
    p(
      "If a shopper asks an AI assistant \"what's the best platform for a subscription box business\" or \"which agency should I hire to migrate from WooCommerce to Shopify,\" you are no longer competing for position one on a results page. You are competing to be one of the handful of sources the model decides to name. Getting cited is the new ranking."
    ),
    table(
      ["", "Classic SEO", "GEO (AI search)"],
      [
        ["Goal", "Rank a clickable link", "Be cited inside the answer"],
        ["Surface", "Results page (10 blue links)", "AI summary / chat response"],
        ["Winner takes", "Clicks", "Mentions + attributed links"],
        ["Key signal", "Relevance + authority + links", "Machine-readability + entity trust + citability"],
        ["Measured by", "Rankings, organic clicks", "AI referrals, brand mentions, citation share"],
      ]
    ),

    // ── Section 2: How AI engines choose sources ───────────────────────
    h2("How AI Engines Decide What to Cite"),
    p(
      "No engine publishes its exact recipe, and they differ — Perplexity leans heavily on live retrieval, Google AI Overviews builds on its existing index, ChatGPT blends trained knowledge with live browsing. But across them, the same signals keep deciding which sources get named:"
    ),
    ul(
      "Retrievability — the page is crawlable, fast, and not blocked to AI bots, so it can be pulled into the answer in the first place",
      "Machine-readability — facts (price, rating, location, specs) are exposed in clean structured data, not buried in images or scripts",
      "Entity clarity — the brand is a well-defined, consistent entity the model recognizes across the web",
      "Corroboration — the same facts appear on independent sites (directories, reviews, press), so the model trusts them",
      "Citability — content is written in self-contained, quotable passages with clear claims, numbers, and sources",
      "Freshness — the page shows a recent review or update date for queries where recency matters",
    ),
    p(
      "Notice how much of this overlaps with good SEO and good E-E-A-T (experience, expertise, authoritativeness, trust). That is the point: GEO rewards the same trustworthiness signals, just read by a machine instead of a human."
    ),

    // ── Section 3: Structured data ─────────────────────────────────────
    h2("Lever 1: Make Your Store Machine-Readable (Structured Data)"),
    p(
      "Structured data — schema.org markup in JSON-LD — is the single highest-leverage GEO move for a store, because it states your facts in the exact format machines parse. When a model needs a price, a rating, or what a business does, clean schema hands it over unambiguously instead of forcing the model to guess from page text."
    ),
    p("For a Shopify store, prioritize these schema types:"),
    table(
      ["Schema type", "What it tells an AI engine"],
      [
        ["Product + Offer", "Name, price, currency, availability of each product"],
        ["AggregateRating + Review", "How well-rated a product or business is — only when real reviews back it"],
        ["Organization / LocalBusiness", "Who the brand is, where it operates, how to contact it"],
        ["BreadcrumbList", "Where a page sits in your site's structure"],
        ["FAQPage", "Question-and-answer pairs a model can lift directly into an answer"],
        ["WebSite", "Your site identity and search action"],
      ]
    ),
    tip(
      "One caution: only mark up what is genuinely on the page. Claiming an AggregateRating with no visible reviews, or prices that do not match, gets you distrusted by both Google and AI engines. Accurate-but-modest beats inflated-but-wrong every time."
    ),
    cta(
      "Structured data is also your rich-results lever in classic search. See how the fundamentals fit together.",
      "/blog/shopify-seo-guide-2026",
      "Read the Complete Shopify SEO Guide"
    ),

    // ── Section 4: Crawler access ──────────────────────────────────────
    h2("Lever 2: Let the Right Crawlers In"),
    p(
      "You cannot be cited by an engine that cannot read you. AI systems use their own user agents to fetch pages, and your robots.txt decides who gets in. If you have blocked these bots — or your CDN or firewall does it by default — you have quietly opted out of AI search."
    ),
    p("The crawlers worth knowing in 2026 include:"),
    ul(
      "GPTBot, OAI-SearchBot and ChatGPT-User — OpenAI's training, search, and on-demand browsing agents",
      "ClaudeBot and Claude-User — Anthropic's crawler and assistant fetch agent",
      "PerplexityBot and Perplexity-User — Perplexity's index and live-answer agents",
      "Google-Extended — the control that governs whether Google uses your content for Gemini and AI grounding (separate from normal Googlebot)",
      "Applebot-Extended, Amazonbot and others — additional assistant and shopping crawlers",
    ),
    p(
      "Decide deliberately. Most stores that want AI visibility should allow the search and answer agents (they drive referrals) and can still make a separate choice about training-only crawlers. The mistake to avoid is blocking everything by accident and never knowing."
    ),
    p(
      "An emerging convention called llms.txt — a plain-text file at your domain root that points AI systems to your most important pages — is cheap to add and signals intent, though it is not yet honored by every major engine. Treat it as a low-cost bet, not a guarantee, and never rely on it in place of a clean robots.txt and sitemap."
    ),

    // ── Section 5: Entity clarity ──────────────────────────────────────
    h2("Lever 3: Become a Recognizable Entity"),
    p(
      "Language models reason about the world as entities — brands, products, places, people — and the connections between them. The more consistently and clearly your brand is defined across the web, the more confidently a model can name you. Vague, inconsistent identity is invisible to AI search."
    ),
    ul(
      "Use one exact brand name, spelled and styled identically everywhere — your site, profiles, directories, and listings",
      "Keep your name, location, and contact details identical across every platform (inconsistency reads as low trust)",
      "Maintain a clear, fact-dense About page that states who you are, what you sell or do, where, and since when",
      "Build presence on the independent sites models already trust — industry directories, marketplaces, and reputable review platforms",
    ),
    cta(
      "A complete, verified directory listing is one of the cleanest entity signals you can add. List your agency or store in ours.",
      "/agencies",
      "Browse the Directory"
    ),

    // ── Section 6: Reviews and corroboration ───────────────────────────
    h2("Lever 4: Earn Reviews and Third-Party Corroboration"),
    p(
      "AI engines weight what others say about you, not just what you say about yourself. When the same claim — \"reliable,\" \"specializes in migrations,\" \"great support\" — shows up in independent reviews and mentions, a model treats it as corroborated fact. This off-site layer is something GEO inherits directly from how trust works for humans."
    ),
    ul(
      "Collect genuine customer reviews and display them with proper Review and AggregateRating markup",
      "Pursue mentions on independent sites: directories, roundups, partner pages, and press",
      "Encourage user-generated content — Q&A, ratings, and detailed testimonials add corroborating language models can quote",
    ),
    cta(
      "Reviews are both a trust signal and a GEO asset. Compare the tools that collect and display them well.",
      "/blog/best-shopify-review-apps-2026",
      "Best Shopify Review Apps in 2026"
    ),

    // ── Section 7: Citable content ─────────────────────────────────────
    h2("Lever 5: Write Content a Model Can Quote"),
    p(
      "When models pull a passage into an answer, they favor text that stands on its own. Research into generative engine optimization has consistently found that adding clear statistics, direct quotations, and cited sources raises the odds of being included. The structural habits that help:"
    ),
    ol(
      "Lead with the answer. Put a direct, self-contained response in the first sentence or two, then expand — exactly the pattern this article opens with.",
      "Use specific numbers and facts. \"Conversion fell as load time rose\" is weak; concrete figures and named thresholds are quotable.",
      "Cite your sources. Reference studies, official docs, and data — models prefer passages that show their evidence.",
      "Structure with real headings and Q&A. Clear sections and FAQ blocks map neatly onto the questions shoppers actually ask.",
      "Keep claims atomic. One idea per paragraph, so a model can lift it cleanly without dragging in unrelated context.",
    ),
    cta(
      "Thin and duplicated pages confuse both search and AI. Clean up the most common Shopify culprits first.",
      "/blog/fix-shopify-duplicate-content-seo",
      "Fix Shopify Duplicate Content Issues"
    ),

    // ── Section 8: Technical foundation ────────────────────────────────
    h2("Don't Skip the Foundation: Speed and Crawlability"),
    p(
      "GEO sits on top of technical health, not beside it. If a page is slow, blocked, or buried, no amount of clever framing gets it cited. The same Core Web Vitals and crawlability work that protects your rankings also keeps you eligible for AI answers, because retrieval-based engines fetch pages live and abandon ones that are slow or broken."
    ),
    cta(
      "Fast, crawlable pages are table stakes for both SEO and GEO. Here is how to pass Core Web Vitals.",
      "/blog/shopify-core-web-vitals-page-speed-2026",
      "Shopify Core Web Vitals: How to Pass in 2026"
    ),

    // ── Section 9: Measurement ─────────────────────────────────────────
    h2("How to Measure GEO (When the Click Is Gone)"),
    p(
      "GEO is harder to measure than rankings precisely because the win is often a no-click mention. You will not capture all of it, but you can track meaningful proxies:"
    ),
    ul(
      "AI referral traffic — segment visits from ChatGPT, Perplexity, Gemini, and Copilot referrers in your analytics; it is small today and growing",
      "Brand-mention monitoring — periodically ask the major assistants your key questions and note whether (and how) you are named",
      "Citation share — for the queries that matter, track how often you appear versus competitors across engines",
      "Branded search lift — AI exposure often shows up later as more people searching your name directly",
      "Assisted conversions — AI-referred visitors often arrive further down the funnel, already informed",
    ),
    tip(
      "Don't judge GEO by a single metric. Treat AI referrals, brand mentions, and branded-search lift as a basket — the trend across them is the signal, not any one number."
    ),

    // ── Section 10: When to call an agency ─────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Plenty of GEO is DIY: write clearer content, claim your listings, collect reviews, check your robots.txt. But some of it is genuinely technical, and a specialist earns their fee when:"
    ),
    ul(
      "Your structured data is missing, broken, or fighting your theme, and product/review markup needs doing properly across the catalog",
      "You need a technical SEO audit covering crawlability, indexation, and AI-crawler access at the same time",
      "You are competing in a high-stakes category where citation share directly drives revenue",
      "You have done the obvious things and want a measurement framework that ties AI visibility to sales",
    ),
    cta(
      "Want experts who handle technical SEO and structured data, not just keywords? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "What is GEO (Generative Engine Optimization)?",
        a: "GEO is the practice of optimizing your content so AI search engines — ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot — find it, trust it, and cite it inside their answers. It is the AI-era complement to SEO: rather than only ranking a clickable link, you optimize to be one of the sources the model names.",
      },
      {
        q: "Is GEO different from SEO, or a replacement for it?",
        a: "It is a complement, not a replacement. Most AI engines build answers from the same web they crawl and rank, so strong SEO foundations — crawlability, fast pages, authority, accurate content — are still what they draw on. GEO adds machine-readability, entity clarity, and citable structure on top.",
      },
      {
        q: "How do I get my Shopify store cited by ChatGPT or Perplexity?",
        a: "Make your store easy for machines to read with clean structured data, let the AI crawlers in via robots.txt, establish your brand as a consistent entity across the web, earn genuine reviews and third-party mentions, and write content in clear, self-contained, well-sourced passages. Fix classic SEO and site speed first, since AI engines rely on them.",
      },
      {
        q: "Which AI crawlers should a Shopify store allow?",
        a: "If you want AI visibility, generally allow the search and answer agents — GPTBot/OAI-SearchBot (OpenAI), ClaudeBot (Anthropic), PerplexityBot (Perplexity) — and decide separately about training-only access via controls like Google-Extended. The common mistake is blocking everything by default through a CDN or firewall and unknowingly opting out of AI search.",
      },
      {
        q: "Does structured data help with AI search?",
        a: "Yes — it is one of the highest-leverage moves. Schema.org markup (Product, Offer, AggregateRating, Organization, FAQPage, BreadcrumbList) states your facts in the exact format machines parse, so an AI engine can pull a price, rating, or business detail without guessing. Only mark up what is genuinely on the page, or you lose trust.",
      },
      {
        q: "How do I measure whether GEO is working?",
        a: "Track a basket of proxies rather than one number: AI referral traffic from ChatGPT/Perplexity/Gemini/Copilot in your analytics, brand mentions when you query the assistants directly, citation share versus competitors, branded-search lift, and assisted conversions. The trend across them is the signal.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "GEO is not a new discipline so much as an extension of doing the fundamentals well, read by a machine. Get your structured data clean, let the right crawlers in, make your brand a consistent and well-reviewed entity, and write content that stands on its own as a quotable source. Stores that already invest in real SEO and genuine trust are best positioned — they simply need to expose those strengths in a machine-readable way."
    ),
    p(
      "The shift to answer-first search is early, and the engines will keep changing. But the direction is set: visibility increasingly means being the source an AI trusts enough to name. Build for that now, while the competition still treats it as optional."
    ),
    cta(
      "Want an expert to get your store AI-search ready — structured data, technical SEO, and all? Get matched with a verified Shopify agency.",
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
