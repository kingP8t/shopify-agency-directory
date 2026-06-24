/**
 * Seed blog post: How AI Overviews & Google AI Mode Are Changing Shopify SEO (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Strategic/top-funnel piece that anchors the SEO+GEO cluster (links to GEO + schema posts).
 * Run: node scripts/seed-blog-shopify-ai-overviews-seo-2026.js
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
  slug: "shopify-ai-overviews-google-ai-mode-seo-2026",
  title:
    "How AI Overviews & Google AI Mode Are Changing Shopify SEO (and What to Do About It)",
  seo_title: "AI Overviews & Shopify SEO: What Changed in 2026",
  excerpt:
    "Google now answers many searches with AI before anyone clicks. Here is what AI Overviews and AI Mode actually do to Shopify traffic, which queries lose clicks and which still convert, and the defensive — and offensive — playbook for protecting your store's organic revenue in 2026.",
  category: "SEO",
  tags: [
    "google ai overviews",
    "google ai mode",
    "shopify ai seo",
    "ai overviews ecommerce",
    "zero-click search",
    "is seo dead 2026",
    "shopify organic traffic",
  ],
  author: "Varine Rashford",
  reading_time: 11,
  status: "published",
  featured: false,
  date: "2026-06-24",
  updated_date: "2026-06-24",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. AI Overviews (Google's AI-generated answer at the top of results) and AI Mode (its dedicated conversational search experience) are absorbing the clicks that used to flow to informational pages. For Shopify merchants, the impact is uneven: top-of-funnel \"how/what/best\" content loses the most clicks, while transactional and brand searches — where people want to buy a specific product — hold up far better. SEO is not dead; it is splitting into two jobs. You still rank and earn clicks for commercial queries, and you now also optimize to be cited inside AI answers for the rest."
    ),
    p(
      "The practical response is not to panic or abandon search. It is to shift effort toward the queries that still convert, harden the trust and brand signals AI engines reward, and make your store easy to cite. This article covers what is actually changing, which of your pages are at risk, and the concrete moves that protect — and grow — organic revenue."
    ),
    tip(
      "The headline \"AI is killing SEO\" is mostly wrong for stores. The clicks most at risk are informational ones that rarely converted anyway. The revenue-driving commercial searches are the most resilient — so the sky is not falling, but the playbook is changing."
    ),

    // ── Section 1: What they are ───────────────────────────────────────
    h2("What AI Overviews and AI Mode Actually Are"),
    p(
      "These are two different surfaces, and it helps to keep them straight."
    ),
    h3("AI Overviews"),
    p(
      "An AI-generated summary that appears at the very top of a normal Google results page for many queries, above the classic links. It answers the question directly, often citing a few sources, and pushes the traditional blue links further down the page. The shopper may get what they need without scrolling — that is the zero-click effect."
    ),
    h3("AI Mode"),
    p(
      "A dedicated, conversational search experience — a separate mode rather than the standard results page — where users ask multi-part questions and get a synthesized, chat-style answer with follow-ups. It behaves more like an AI assistant than a list of links, and it leans heavily on which sources the system trusts enough to draw from."
    ),
    p(
      "Both change the same underlying thing: Google increasingly answers the question itself instead of just routing the shopper to ten sites. Your visibility now depends on being part of that answer, not only on ranking beneath it."
    ),

    // ── Section 2: The traffic impact ──────────────────────────────────
    h2("The Real Traffic Impact: Not All Queries Are Equal"),
    p(
      "The mistake is treating this as a single, uniform threat. It is not — the effect depends entirely on query type. Informational queries get absorbed into the answer; commercial and brand queries largely survive because the shopper still needs to land on a real page to compare, trust, and buy."
    ),
    table(
      ["Query type", "Example", "AI impact", "Why"],
      [
        ["Informational / top-funnel", "\"how to start a clothing brand\"", "High click loss", "The answer is summarized in place"],
        ["Commercial investigation", "\"best running shoes for flat feet\"", "Moderate", "Shoppers still click to compare and verify"],
        ["Transactional", "\"buy merino wool base layer\"", "Low", "Intent to purchase needs a real product page"],
        ["Brand / navigational", "\"[your brand] returns policy\"", "Low", "People want your specific page"],
        ["Local", "\"shopify agency near me\"", "Low–moderate", "Local and map intent stays click-driven"],
      ]
    ),
    p(
      "Look at where your organic traffic actually comes from before you worry. If your best pages are product and brand searches, you are far more insulated than a blog that lived on broad informational keywords."
    ),

    // ── Section 3: What still works ────────────────────────────────────
    h2("What Still Works — and Matters More Now"),
    p(
      "Several SEO fundamentals did not just survive the shift; they became more important, because they are exactly what AI engines use to decide who to trust and cite."
    ),
    ul(
      "Brand strength — a recognized brand gets searched by name (clicks AI cannot intercept) and cited more readily by AI engines",
      "E-E-A-T — experience, expertise, authoritativeness, and trust are the signals that decide which sources an answer draws from",
      "Commercial and product pages — well-optimized, well-reviewed product and collection pages keep earning clicks from buyers",
      "Genuine reviews and reputation — independent feedback both converts shoppers and corroborates your claims to AI",
      "Technical health — fast, crawlable, well-structured pages stay eligible for both ranking and AI citation",
    ),
    cta(
      "The technical foundation underneath all of this hasn't changed. Make sure your fundamentals are solid.",
      "/blog/shopify-seo-guide-2026",
      "Read the Complete Shopify SEO Guide"
    ),

    // ── Section 4: The defensive playbook ──────────────────────────────
    h2("The Defensive Playbook: Protecting Your Clicks"),
    p(
      "Start by limiting the downside. These moves protect the traffic and revenue you already have:"
    ),
    ol(
      "Audit your traffic by intent. Identify which of your top pages are informational (at risk) versus commercial (resilient), so you know where the exposure actually is.",
      "Double down on commercial pages. Invest in product and collection pages — the searches that still drive clicks and sales — rather than chasing broad informational keywords AI now answers.",
      "Build branded demand. Brand searches are clicks AI cannot intercept; everything that grows brand awareness (content, social, reputation) compounds here.",
      "Go deeper than the summary. For informational content you keep, offer what an AI answer cannot: original data, hands-on testing, tools, and genuine expertise worth the click.",
      "Strengthen reviews and trust signals. Reputation protects conversion when shoppers do arrive, and feeds the trust AI engines look for.",
    ),

    // ── Section 5: The offensive playbook ──────────────────────────────
    h2("The Offensive Playbook: Getting Into the Answer"),
    p(
      "Defense is not enough. The stores that win treat AI search as a new place to be visible, not just a threat to absorb. That means optimizing to be the source the AI names — Generative Engine Optimization."
    ),
    p("The high-leverage moves, in short:"),
    ul(
      "Make your store machine-readable with clean, accurate structured data so engines can pull your facts directly",
      "Establish your brand as a clear, consistent entity across the web so models recognize and trust it",
      "Write content in self-contained, well-sourced, quotable passages that an answer can lift cleanly",
      "Let the right AI crawlers in, and earn third-party mentions that corroborate your claims",
    ),
    cta(
      "This is its own discipline. Here's the full playbook for getting your store cited in ChatGPT, Perplexity, and AI Overviews.",
      "/blog/shopify-geo-ai-search-2026",
      "GEO for Shopify: Get Cited by AI Search"
    ),
    cta(
      "Structured data is the technical core of being citable. Get it right with this guide.",
      "/blog/shopify-schema-markup-structured-data-2026",
      "Shopify Schema Markup: The 2026 Guide"
    ),

    // ── Section 6: Measurement ─────────────────────────────────────────
    h2("How to Tell If It's Affecting You"),
    p(
      "Do not guess — read your own data. The fingerprints of AI search are visible in the tools you already use:"
    ),
    ul(
      "Search Console: watch for queries where impressions hold steady but clicks fall — a classic sign the answer is being shown without the click",
      "Segment by intent: compare click trends on informational pages versus product and brand pages to see where the erosion actually is",
      "Branded vs non-branded: track whether branded search (more resilient) is growing as a share of your traffic",
      "AI referrals: monitor visits from ChatGPT, Perplexity, Gemini, and Copilot — small today, and a sign your citability work is landing",
      "Assisted conversions: AI-informed shoppers often arrive later in the funnel, so judge value beyond last-click",
    ),
    tip(
      "The tell-tale pattern is steady impressions with falling clicks on informational queries. If your product and brand pages are stable, the change is reshaping your traffic mix — not destroying your revenue."
    ),

    // ── Section 7: When to call an agency ──────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Reading your own Search Console is DIY. But adapting an SEO strategy to AI search is real work, and a specialist earns their fee when:"
    ),
    ul(
      "You have seen clicks fall and need an expert to diagnose how much is AI versus other causes",
      "You want a strategy that rebalances toward resilient commercial queries and brand building",
      "You need structured data, technical SEO, and AI-readiness handled together, properly",
      "You want a measurement framework that ties AI visibility and branded demand to revenue",
    ),
    cta(
      "Want experts who understand SEO in the AI era, not just keyword rankings? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),
    cta(
      "Not sure what to look for when hiring? Ask these questions first.",
      "/blog/how-to-hire-a-shopify-seo-agency",
      "How to Hire a Shopify SEO Agency"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "Is SEO dead because of AI Overviews?",
        a: "No. SEO is splitting into two jobs rather than dying. Informational, top-of-funnel queries lose clicks to AI answers, but commercial, transactional, and brand searches — the ones that drive sales — remain click-driven and resilient. You still rank and earn clicks for those, and you now also optimize to be cited inside AI answers for the rest.",
      },
      {
        q: "What is the difference between AI Overviews and AI Mode?",
        a: "AI Overviews is an AI-generated summary shown at the top of a normal Google results page, above the classic links. AI Mode is a separate, conversational search experience where users ask multi-part questions and get a chat-style synthesized answer. Both shift visibility from ranking beneath the answer to being part of it.",
      },
      {
        q: "Which Shopify pages are most affected by AI Overviews?",
        a: "Informational and top-of-funnel content (how-to and broad \"best\" articles) is most absorbed into AI answers. Product pages, collection pages, and brand or navigational searches are far more resilient, because shoppers with buying intent still need to land on a real page to compare, trust, and purchase.",
      },
      {
        q: "How do I know if AI Overviews are reducing my traffic?",
        a: "Check Google Search Console for queries where impressions stay steady but clicks fall — a classic sign the answer is shown without a click. Segment informational versus product and brand pages to locate the erosion, and watch whether branded search is growing as a share of traffic. Stable product and brand pages mean your revenue is largely intact.",
      },
      {
        q: "What should a Shopify store do to adapt to AI search?",
        a: "Defensively: audit traffic by intent, invest in resilient commercial pages, build branded demand, and make informational content deeper than a summary. Offensively: optimize to be cited (clean structured data, entity clarity, quotable content, AI-crawler access). Together these protect existing clicks and win visibility inside AI answers.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "AI Overviews and AI Mode are reshaping how search visibility works, but for stores the change is a reshuffle, not a collapse. The clicks most at risk are informational ones that rarely drove sales; the commercial and brand searches that fund your business are the most resilient. The job is to lean into those, strengthen the trust and brand signals AI rewards, and make your store easy to cite."
    ),
    p(
      "Merchants who already invest in real SEO, genuine reviews, and a recognizable brand are best placed — they simply need to defend their commercial traffic and learn to play the AI-citation game. Treat this as a strategy shift, not an emergency, and you come out ahead of competitors still hoping it blows over."
    ),
    cta(
      "Want an expert to adapt your store's SEO for the AI era? Get matched with a verified Shopify agency.",
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
