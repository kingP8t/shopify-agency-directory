/**
 * Seed blog post: Top Shopify Plus Agencies in 2026
 * Author: Elena King
 * Category: Hiring Guide
 * Curated from real published agencies in the directory; links to profiles.
 * Run: node scripts/seed-blog-top-shopify-plus-agencies-2026.js
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
  slug: "top-shopify-plus-agencies-2026",
  title:
    "Top Shopify Plus Agencies in 2026 (and How to Choose the Right One)",
  seo_title: "Top Shopify Plus Agencies in 2026",
  excerpt:
    "Looking for a Shopify Plus agency in 2026? Here are nine of the strongest Plus specialists from our directory — by region and what each does best — plus how to choose the right partner for an enterprise build.",
  category: "Hiring Guide",
  tags: [
    "shopify plus agencies",
    "best shopify plus agency",
    "top shopify plus agencies",
    "shopify plus partner",
    "enterprise shopify agency",
    "hire shopify plus agency",
  ],
  author: "Elena King",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-06-01",
  updated_date: "2026-06-01",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. A Shopify Plus agency handles the complex, high-stakes work that standard Shopify builds rarely need: enterprise migrations, custom checkout, ERP and PIM integrations, B2B commerce, and high-traffic performance. Below are nine of the strongest Plus specialists in our directory, spanning North America, the UK, and Australia, each with what they do best — followed by how to choose the right one for your project."
    ),
    p(
      "A note on how this list was built: these agencies were selected from our directory of 900+ verified agencies, filtered for genuine Shopify Plus specialization and sorted by client rating and review volume. It is a curated shortlist, not a paid ranking, and it is grouped by strength rather than ranked one-to-nine — the \"best\" agency depends entirely on your project."
    ),

    cta(
      "Prefer to see every option? Browse all verified Shopify Plus agencies, filterable by region and budget.",
      "/agencies?specialization=Shopify+Plus",
      "Browse All Plus Agencies"
    ),

    // ── Section 1: Criteria ────────────────────────────────────────────
    h2("What Makes a Great Shopify Plus Agency"),
    p(
      "Before the list, know what you are actually looking for. The agencies worth your shortlist tend to share these traits:"
    ),
    ul(
      "Genuine Plus experience — not just Shopify work, but launched and scaled Plus stores specifically",
      "Integration depth — proven ERP, PIM, 3PL, and CRM integrations, which is where enterprise builds get hard",
      "A track record at your scale — case studies matching your order volume, catalog size, and complexity",
      "Relevant vertical experience — B2B, fashion, subscriptions, or whatever your model demands",
      "Strong post-launch support — Plus stores are living systems that need ongoing development, not a one-off build",
      "A real team — enough people that your project does not stall when one developer is on leave",
    ),

    // ── Section 2: The agencies ────────────────────────────────────────
    h2("The Top Shopify Plus Agencies in 2026"),

    h3("Diff Agency — Montreal, Canada"),
    p(
      "One of North America's best-known Shopify Plus agencies, Diff pairs a 100-plus-person team with a strong focus on growth strategy, integrations, and CRO. Founded in 2011 and rated 4.8 across 57 reviews, they are a natural fit for ambitious brands that want strategy and technology under one roof. Best for: enterprise growth and complex integrations."
    ),
    cta("View Diff Agency's profile and reviews.", "/agencies/diff-agency", "View Profile →"),

    h3("We Make Websites — London, UK"),
    p(
      "A global Shopify Plus agency building premium experiences for fashion, beauty, and lifestyle brands, with headless expertise on tap. Founded in 2012 and rated 4.9 across 44 reviews, they are a strong pick where brand and design polish are the priority. Best for: premium fashion, beauty, and luxury brands."
    ),
    cta("View We Make Websites' profile and reviews.", "/agencies/we-make-websites", "View Profile →"),

    h3("Arctic Grey — New York, USA"),
    p(
      "A top-rated US Plus agency building enterprise-grade custom stores with a focus on performance and scalability. Founded in 2014 and rated 4.9 across 36 reviews, with specialisms in custom apps and ERP integration. Best for: custom app development and ERP-heavy enterprise builds."
    ),
    cta("View Arctic Grey's profile and reviews.", "/agencies/arctic-grey", "View Profile →"),

    h3("Velstar — Liverpool, UK"),
    p(
      "An award-winning Shopify Plus agency focused on helping D2C brands scale through growth strategy, UX design, and CRO. Founded in 2016 and rated 4.9 across 38 reviews. Best for: direct-to-consumer growth and conversion optimization."
    ),
    cta("View Velstar's profile and reviews.", "/agencies/velstar", "View Profile →"),

    h3("Swanky — Exeter, UK"),
    p(
      "Shopify Plus experts helping enterprise brands migrate, launch, and scale, with particular strength in complex B2C and B2B commerce. Founded in 2013 and rated 4.8 across 33 reviews. Best for: B2B commerce and enterprise migrations."
    ),
    cta("View Swanky's profile and reviews.", "/agencies/swanky", "View Profile →"),

    h3("Eastside Co — Birmingham, UK"),
    p(
      "One of the UK's leading Shopify agencies, combining Plus development with app development and ecommerce strategy. Founded in 2012 and rated 4.7 across 61 reviews — one of the deeper review records on this list. Best for: app development and strategy-led builds."
    ),
    cta("View Eastside Co's profile and reviews.", "/agencies/eastside-co", "View Profile →"),

    h3("Commerce Pundit — Atlanta, USA"),
    p(
      "A full-service Shopify agency offering end-to-end development, marketing, and managed ecommerce. Founded in 2010 and rated 4.6 across 74 reviews — the largest review count featured here. Best for: brands wanting development and marketing managed together."
    ),
    cta("View Commerce Pundit's profile and reviews.", "/agencies/commerce-pundit", "View Profile →"),

    h3("Absolute Web — Miami, USA"),
    p(
      "A Miami-based agency with more than two decades of ecommerce experience building custom, high-converting Plus stores with deep integration work. Founded in 1999 and rated 4.7 across 48 reviews. Best for: complex custom development and integrations."
    ),
    cta("View Absolute Web's profile and reviews.", "/agencies/absolute-web", "View Profile →"),

    h3("Reload Digital — Sydney, Australia"),
    p(
      "An Australian Shopify Plus agency combining strategy, design, and development to help brands grow in the APAC market and beyond. Founded in 2014 and rated 4.8 across 27 reviews. Best for: strategy-led growth and APAC-based brands."
    ),
    cta("View Reload Digital's profile and reviews.", "/agencies/reload-digital", "View Profile →"),

    tip(
      "Notice the range of locations and specialisms above. The right Plus agency is rarely the highest-rated one in the abstract — it is the one whose experience matches your model (B2B, fashion, subscriptions), your scale, and your time zone. Shortlist three and compare them properly."
    ),

    // ── Section 3: How to choose ───────────────────────────────────────
    h2("How to Choose Between Them"),
    p(
      "Once you have a shortlist, the selection process matters as much as the list itself. Request proposals from three to five agencies, send them all the same detailed brief so the quotes are comparable, and watch for the warning signs that separate a safe partner from a risky one."
    ),
    cta(
      "Send every agency the same brief so you can compare quotes fairly.",
      "/blog/how-to-brief-a-shopify-agency",
      "How to Brief a Shopify Agency"
    ),
    cta(
      "Know the warning signs before you sign anything.",
      "/blog/shopify-agency-proposal-red-flags",
      "Shopify Agency Proposal Red Flags",
    ),

    // ── Section 4: Cost ────────────────────────────────────────────────
    h2("What It Costs to Work With a Shopify Plus Agency"),
    p(
      "Plus projects sit at the higher end of agency pricing. A Plus build typically runs from $50,000 to $250,000 or more depending on complexity, integrations, and whether the work is theme-based or fully custom, with ongoing retainers common after launch. Budget for the full engagement, not just the build."
    ),
    cta(
      "See the full breakdown of what hiring a Shopify agency costs by project type and region.",
      "/blog/how-much-does-it-cost-to-hire-a-shopify-agency",
      "How Much It Costs to Hire a Shopify Agency",
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "What is a Shopify Plus agency?",
        a: "A Shopify Plus agency specializes in Shopify's enterprise tier, handling the complex work standard builds rarely need — enterprise migrations, custom checkout, ERP/PIM integrations, B2B commerce, and high-traffic performance. Many are Shopify Plus Partners, a status Shopify grants to agencies with a proven Plus track record.",
      },
      {
        q: "How much does a Shopify Plus agency cost?",
        a: "A Shopify Plus build typically costs $50,000 to $250,000 or more, depending on complexity, integrations, and whether it is theme-based or fully custom. Most brands also keep the agency on an ongoing retainer after launch, commonly $2,000 to $10,000 a month.",
      },
      {
        q: "Do I need a Shopify Plus Partner specifically?",
        a: "Not strictly, but Plus Partner status is a useful signal — Shopify only grants it to agencies with a demonstrated record of successful Plus projects. More important than the badge is relevant experience at your scale and in your vertical. Verify the track record, not just the label.",
      },
      {
        q: "How do I choose the right Shopify Plus agency?",
        a: "Shortlist three to five agencies whose experience matches your model and scale, send them all the same detailed brief, and compare proposals on scope and value rather than headline price. Check references for similar projects and watch for proposal red flags like no discovery phase or vague scope.",
      },
      {
        q: "Are UK and Australian agencies a good option for US brands?",
        a: "Yes. Many top Plus agencies work with international clients, and time-zone differences are manageable with a clear communication plan. Judge an agency on relevant experience, process, and communication rather than location — strong remote delivery is standard among established Plus agencies.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "Any of the agencies above can deliver an excellent Shopify Plus project — the question is fit. Match the agency's strengths to your model, scale, and vertical, then run a proper selection process with a clear brief and comparable proposals. The right partner is the one whose experience maps to your project, not simply the one with the highest star rating."
    ),
    cta(
      "Ready to find your match? Browse all verified Shopify Plus agencies, or tell us about your project and we'll match you for free.",
      "/get-matched",
      "Get Matched Free",
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
