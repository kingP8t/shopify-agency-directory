/**
 * Seed blog post: How Much Does It Cost to Hire a Shopify Agency?
 * Author: Elena King
 * Category: Pricing Guide
 * Role: pricing-cluster pillar — links out to the model, region, freelancer,
 *       brief, and store-cost posts rather than repeating them.
 * Run: node scripts/seed-blog-cost-to-hire-shopify-agency.js
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
  slug: "how-much-does-it-cost-to-hire-a-shopify-agency",
  title:
    "How Much Does It Cost to Hire a Shopify Agency? (2026 Rates by Project & Region)",
  seo_title: "What It Costs to Hire a Shopify Agency (2026)",
  excerpt:
    "What does it actually cost to hire a Shopify agency in 2026? Real rate ranges by project type, region, and engagement model — plus how to budget the agency line item and avoid overpaying.",
  category: "Pricing Guide",
  tags: [
    "shopify agency cost",
    "hire shopify agency",
    "shopify agency rates",
    "shopify agency pricing",
    "shopify development cost",
    "cost to hire shopify developer",
  ],
  author: "Elena King",
  reading_time: 10,
  status: "published",
  featured: false,
  date: "2026-06-01",
  updated_date: "2026-06-01",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. Hiring a Shopify agency in 2026 typically costs anywhere from $3,000 for a straightforward theme setup to $250,000 or more for a complex Shopify Plus build. Most established brands hiring an agency for a custom store or a replatform land somewhere between $15,000 and $60,000 for the project, plus an ongoing retainer of $1,500 to $10,000 a month if they keep the agency on after launch."
    ),
    p(
      "That is a wide range, and the reason is simple: \"hiring a Shopify agency\" can mean tidying up a theme or it can mean rebuilding an enterprise store from the ground up. This guide breaks the cost down by what you are actually buying — by project type, by region, and by how the engagement is structured — so you can budget the agency line item with confidence instead of being surprised by the first quote that lands in your inbox."
    ),

    cta(
      "Skip the guesswork — get matched with verified Shopify agencies that fit your budget and project.",
      "/get-matched",
      "Get Matched Free"
    ),

    // ── Section 1: Headline ranges ─────────────────────────────────────
    h2("The Short Answer: Shopify Agency Cost Ranges in 2026"),
    p(
      "Here is what a Shopify agency engagement typically costs, broken down by the kind of project you are hiring for. These are global market ranges — agencies in higher-cost regions sit at the top, and equally capable agencies in lower-cost regions sit at the bottom (more on that below)."
    ),
    table(
      ["Project Type", "Typical Cost", "Typical Timeline"],
      [
        ["Theme setup & customization", "$3,000 – $8,000", "2 – 4 weeks"],
        ["Custom theme build", "$10,000 – $35,000", "6 – 12 weeks"],
        ["Replatform / migration to Shopify", "$15,000 – $60,000", "8 – 16 weeks"],
        ["Headless / composable build", "$40,000 – $150,000", "3 – 6 months"],
        ["Shopify Plus / enterprise build", "$50,000 – $250,000+", "4 – 9 months"],
        ["Ongoing retainer (post-launch)", "$1,500 – $10,000 / month", "Ongoing"],
      ]
    ),
    p(
      "If your number does not fall neatly into one row, that is normal — most projects are a blend (for example, a migration that also needs a partial redesign). Use these as anchors, then read on to understand what pushes a quote toward the top or bottom of its range."
    ),

    // ── Section 2: What you're paying for ──────────────────────────────
    h2("What You Are Actually Paying For"),
    p(
      "A common mistake is comparing two quotes as if they cover the same work. They rarely do. A complete agency engagement includes far more than \"building the site,\" and the cheapest quote is often the one that quietly leaves things out. A professional scope covers:"
    ),
    ul(
      "Discovery — requirements gathering, technical audit, and a written specification before any code is written",
      "Design — wireframes, UX, and visual design tailored to your brand and conversion goals",
      "Development — theme or custom build, app integrations, and any bespoke functionality",
      "Data migration — products, customers, orders, and historical data moved cleanly from your current platform",
      "Quality assurance — cross-device, cross-browser, and pre-launch testing",
      "Project management — a named point of contact, status updates, and a launch plan",
      "Post-launch support — a warranty period to fix anything that breaks after go-live",
    ),
    p(
      "When you compare quotes, compare them line by line against this list. A $12,000 quote that includes discovery, QA, and 30 days of post-launch support is usually better value than an $8,000 quote that excludes all three and bills them later as \"out of scope.\""
    ),

    // ── Section 3: What drives price ───────────────────────────────────
    h2("What Drives the Price Up (and Down)"),
    p(
      "Two stores that look similar from the outside can differ by a factor of three in build cost. These are the factors that move the number:"
    ),
    ul(
      "Custom vs theme — a customized premium theme is far cheaper than a bespoke design built from scratch",
      "Catalog size — migrating and configuring 200 products is a different job than 20,000 SKUs with variants",
      "Integrations — connecting an ERP, PIM, 3PL, or a legacy CRM adds significant scope",
      "B2B and wholesale — gated pricing, customer-specific catalogs, and quote flows add complexity",
      "Data migration complexity — clean, well-structured data is cheap to move; messy data needs remapping",
      "Timeline pressure — a compressed deadline that requires a larger team will cost more",
      "Region and seniority — where the agency is based, and who actually does the work, both move the rate",
    ),
    tip(
      "The single biggest cost lever is custom vs theme-based. If your brand does not strictly need a bespoke design, a well-executed premium-theme build can deliver 80% of the result for a fraction of a fully custom project. Ask every agency whether a theme-based approach could meet your goals before you commit to custom."
    ),

    // ── Section 4: Engagement models (link out) ────────────────────────
    h2("Cost by Engagement Model"),
    p(
      "How you pay matters as much as how much you pay. The three common structures are fixed price (best for well-defined projects), monthly retainer (best for ongoing work), and time and materials (best when scope is still evolving). Each shifts risk differently between you and the agency, and the wrong model for your project can quietly inflate the final cost."
    ),
    cta(
      "We break down each model — and which one protects you — in detail here.",
      "/blog/shopify-agency-pricing-fixed-retainer-time-materials",
      "Fixed Price vs Retainer vs Time & Materials"
    ),

    // ── Section 5: Cost by region (link out) ───────────────────────────
    h2("Cost by Region"),
    p(
      "The same scope can carry very different price tags depending on where the agency is based. This is not simply \"cheaper is worse\" — there are excellent agencies across every region, and a lower rate often reflects local cost of living rather than lower quality. As a rough guide:"
    ),
    table(
      ["Region", "Typical Senior Rate (per hour)", "Notes"],
      [
        ["North America / UK / Australia", "$120 – $250", "Highest rates; strong for enterprise and Plus work"],
        ["Western Europe", "$90 – $180", "Strong technical depth; many Plus partners"],
        ["Eastern Europe", "$50 – $110", "Excellent value; large, mature Shopify talent pool"],
        ["Latin America", "$45 – $100", "Growing fast; good time-zone overlap with the Americas"],
        ["South & Southeast Asia", "$30 – $80", "Lowest rates; quality varies most — vet carefully"],
      ]
    ),
    p(
      "Region affects rate, not necessarily outcome. What matters is relevant experience, communication, and process — a vetted agency at $70/hour can outperform an unvetted one at $200/hour. Use region to set budget expectations, not to judge quality."
    ),
    cta(
      "See a fuller breakdown of where to hire for the best value.",
      "/blog/shopify-development-costs-by-country",
      "Shopify Development Costs by Country"
    ),

    // ── Section 6: Agency vs freelancer vs in-house ────────────────────
    h2("Agency vs Freelancer vs In-House — What Each Really Costs"),
    p(
      "An agency is not always the right answer. Depending on your project size and risk tolerance, a freelancer or an in-house hire may be a better fit — and a different cost shape entirely."
    ),
    table(
      ["Option", "Typical Cost", "Best For"],
      [
        ["Freelancer", "$50 – $120 / hour, or $1,500 – $15,000 / project", "Small, well-defined projects; tight budgets"],
        ["Agency", "$10,000 – $250,000+ / project", "Complex builds, migrations, and teams that need backup"],
        ["In-house developer", "$70,000 – $140,000 / year", "Continuous, long-term development needs"],
      ]
    ),
    p(
      "The freelancer's headline rate looks cheaper, but a solo freelancer offers no team backup, limited bandwidth, and usually no formal project management — which is exactly what larger or higher-risk projects need. Match the option to the stakes, not just the budget."
    ),
    cta(
      "Not sure which path fits your project? Here is how to decide.",
      "/blog/shopify-agency-vs-freelancer-how-to-decide",
      "Shopify Agency vs Freelancer: How to Decide"
    ),

    // ── Section 7: Budgeting ───────────────────────────────────────────
    h2("How to Budget Realistically"),
    p(
      "The most common budgeting mistake is treating the build quote as the total cost. It is not. A realistic budget accounts for the full first year:"
    ),
    ul(
      "Build cost — the agency's project quote",
      "App subscriptions — most stores run 5 to 15 apps, often $200 to $600 a month at a growing scale",
      "Content and creative — product photography, copy, and any video the build assumes you already have",
      "Ongoing support — a retainer, or a budget for ad-hoc work, after launch",
      "A contingency reserve — hold back roughly 20 to 30% of the build budget for scope changes and post-launch fixes",
    ),
    tip(
      "Always keep a contingency reserve. Even on a well-scoped project, you will discover things during the build that you want to change. Going in with 100% of your budget already committed is how good projects turn into stressful ones."
    ),
    cta(
      "For the full picture of what a store costs to build and run, see our complete breakdown.",
      "/blog/how-much-does-shopify-store-cost",
      "How Much Does a Shopify Store Cost?"
    ),

    // ── Section 8: Getting accurate quotes ─────────────────────────────
    h2("How to Get Accurate, Comparable Quotes"),
    p(
      "The quality of the quotes you receive depends almost entirely on the quality of the brief you send. A vague brief produces vague quotes that are impossible to compare; a detailed brief produces accurate, line-item quotes you can evaluate side by side."
    ),
    ol(
      "Write a clear brief — your goals, current platform, catalog size, must-have integrations, timeline, and budget range",
      "Request proposals from three to five agencies — enough to compare, not so many that evaluation becomes a chore",
      "Insist on a line-item breakdown — by phase and deliverable, with explicit exclusions and assumptions",
      "Watch for red flags — no discovery phase, vague scope, or payment terms that favor the agency",
    ),
    p(
      "Sharing a budget range is not a weakness — it helps agencies scope appropriately instead of guessing. Without it, you will get proposals that are impossible to compare because each one assumes a different scale of project."
    ),
    cta(
      "Use our free brief template so agencies can quote accurately.",
      "/blog/how-to-brief-a-shopify-agency",
      "How to Brief a Shopify Agency"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "How much does it cost to hire a Shopify agency in 2026?",
        a: "It ranges from about $3,000 for a simple theme setup to $250,000 or more for a complex Shopify Plus build. Most established brands hiring an agency for a custom store or replatform pay between $15,000 and $60,000 for the project, plus an optional ongoing retainer of $1,500 to $10,000 a month after launch.",
      },
      {
        q: "Is it cheaper to hire a freelancer than a Shopify agency?",
        a: "Usually yes, on headline rate — freelancers typically charge $50 to $120 an hour, or $1,500 to $15,000 per project, versus $10,000 and up for an agency. But a freelancer offers no team backup, limited bandwidth, and usually no formal project management, which makes them riskier for complex builds, migrations, and tight deadlines.",
      },
      {
        q: "What is a normal payment structure for a Shopify agency?",
        a: "The healthiest structure for fixed-price projects is milestone-based — for example, 25% deposit, then payments tied to design approval, development, and launch. Be cautious of any agency that requires 100% upfront, or 50% upfront with the balance due before you have seen the finished work.",
      },
      {
        q: "How much should I budget for support after launch?",
        a: "Plan for either a retainer of $1,500 to $10,000 a month for ongoing development and CRO, or a smaller ad-hoc budget billed at roughly $100 to $200 an hour for occasional fixes. A 30-day post-launch warranty period for in-scope bugs should be included in the original quote at no extra cost.",
      },
      {
        q: "Why are agency quotes for the same project so different?",
        a: "Because they are rarely quoting the same scope. One quote may include discovery, QA, and post-launch support while another excludes them. Region and seniority also play a role. The fix is to send every agency the same detailed brief and require a line-item breakdown so you are comparing like for like.",
      },
      {
        q: "Do cheaper overseas agencies deliver the same quality?",
        a: "They can. A lower rate often reflects local cost of living rather than lower quality, and there are excellent agencies in every region. What matters is relevant experience, communication, and process — vet for those rather than judging on rate alone.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "The cost of hiring a Shopify agency comes down to one question: what are you actually buying? A theme tidy-up and an enterprise replatform both count as \"hiring an agency,\" and they sit at opposite ends of a very wide range. Once you know your project type, your region budget, and the engagement model that fits, the number stops being a mystery."
    ),
    p(
      "Send a detailed brief, get three to five comparable quotes, and weigh them on scope and value rather than headline price. The right agency at the right structure pays for itself; the cheapest quote with the most exclusions rarely does."
    ),
    cta(
      "Ready to find the right fit? Browse 900+ verified Shopify agencies filtered by specialization, region, and budget.",
      "/agencies",
      "Browse Verified Agencies"
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
