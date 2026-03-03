/**
 * Publish the remaining 2 title variations of the Shopify cost topic.
 * Each post has a distinct angle to avoid duplicate content.
 * Run: node scripts/upsert-shopify-cost-variations.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const h2  = (text)              => ({ type: "h2", text });
const h3  = (text)              => ({ type: "h3", text });
const p   = (text)              => ({ type: "p",  text });
const ul  = (...items)          => ({ type: "ul", items });
const ol  = (...items)          => ({ type: "ol", items });
const tip = (text)              => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });

// ─────────────────────────────────────────────────────────────────────────────
// Variation 2 — "What You'll Actually Pay" angle
// Angle: transparency-first, real invoices, surprising truths, buyer psychology
// ─────────────────────────────────────────────────────────────────────────────
const post_v2 = {
  slug: "shopify-website-cost-what-you-will-actually-pay",
  title: "Shopify Website Cost in 2026: What You'll Actually Pay",
  excerpt: "Agency quotes look clean on paper. The final invoice rarely does. Here's a brutally honest look at what Shopify website projects actually cost — including the extras most merchants don't see coming.",
  category: "Pricing Guide",
  tags: ["shopify cost", "pricing", "agency quotes", "budget", "ecommerce"],
  author: "Shopify Agency Directory",
  reading_time: 8,
  status: "published",
  featured: false,
  date: "2026-03-03",
  content: [
    p("There's a gap between what agencies quote and what merchants actually pay. It's not always down to dishonesty — it's usually scope creep, underestimated complexity, and costs that nobody mentioned upfront. This guide is designed to close that gap."),
    p("We've spoken to hundreds of merchants who've been through Shopify builds. Here's what they wished they'd known before signing."),
    h2("The Quote vs. The Invoice: Why They Differ"),
    p("Most agency quotes are accurate for the scope as written. The problem is that scope changes. Here are the most common reasons a $15,000 project becomes a $22,000 project:"),
    ul(
      "Discovery reveals complexity — the brief didn't mention the ERP integration, the custom B2B pricing tier, or the 3,000-variant product catalogue",
      "Client-side delays — projects that stall (waiting for copy, images, or approvals) often incur holding fees or resource re-allocation costs",
      "Scope additions mid-project — 'while you're at it' requests are budget killers; every addition should trigger a formal change request",
      "Third-party app limitations — the app that was supposed to handle subscriptions can't do what you need; custom development fills the gap",
      "Post-launch fixes — bugs discovered after handover that fall outside the warranty window"
    ),
    tip("A fixed-price contract protects you from scope creep only if the scope is watertight. Always get a detailed scope document — page-by-page, feature-by-feature — before you sign anything."),
    h2("What Merchants Actually Pay: Real Ranges"),
    h3("New Store, Theme-Based Build"),
    p("Quote range: $2,500–$6,000. Actual cost range: $3,000–$9,000 once you add the premium theme licence, additional app setup, content formatting, and any post-launch tweaks outside the warranty."),
    h3("Mid-Market Custom Build"),
    p("Quote range: $12,000–$30,000. Actual cost range: $15,000–$45,000 after change requests, extended timelines, app integrations that needed custom work, and the photography and copywriting that wasn't in scope."),
    h3("Shopify Plus Enterprise Build"),
    p("Quote range: $50,000–$100,000. Actual cost range: $70,000–$180,000+ once ERP integration complexity is understood, headless architecture decisions are made mid-project, and the migration of 50,000 SKUs with metafields takes three times longer than estimated."),
    h2("The Costs Nobody Puts in the Quote"),
    ul(
      "Content creation — product descriptions, category copy, blog posts, and photography are almost never included in a development quote; budget $5,000–$20,000 for a full store's worth of content",
      "App licences during the build — you'll need apps running during development; these start billing from day one",
      "Domain transfer and DNS management — often a half-day of billable time that appears as a surprise line item",
      "SSL and security configuration — usually included but worth confirming",
      "Training — most agencies charge separately for admin training sessions; budget $300–$1,000",
      "Staging environment — some agencies charge for keeping a staging site live post-launch for testing",
      "Analytics setup — GA4 ecommerce tracking, Meta Pixel, and Google Ads conversion tracking are separate to a theme build"
    ),
    h2("Ongoing Costs Year One vs Year Two+"),
    p("Year one is always the most expensive. You're paying for the build plus setting up recurring tools. By year two, your spend should stabilise significantly."),
    h3("Year One Total (Mid-Market Store)"),
    ul(
      "Build: $15,000–$35,000",
      "Shopify plan (Shopify tier): ~$1,260/year",
      "Apps (essential stack): ~$3,600–$6,000/year",
      "Domain + email: ~$300/year",
      "Agency support retainer: $6,000–$18,000/year",
      "Content and photography: $3,000–$10,000 (one-off setup)",
      "Total year one: approximately $29,000–$70,000"
    ),
    h3("Year Two+ (Ongoing Only)"),
    ul(
      "Shopify plan: ~$1,260/year",
      "Apps: ~$3,600–$6,000/year",
      "Agency retainer (if retained): $6,000–$18,000/year",
      "Incremental development (new features): $2,000–$10,000/year",
      "Total year two+: approximately $13,000–$35,000/year"
    ),
    h2("How to Avoid Paying More Than the Quote"),
    ol(
      "Lock down the scope before you sign — insist on a feature-by-feature breakdown, not a high-level summary",
      "Define acceptance criteria — 'homepage built' is not an acceptance criterion; 'homepage matches approved design file, passes PageSpeed 90+ on mobile, and loads in under 2 seconds' is",
      "Agree a change request process upfront — any change to scope should require a written change request with a cost estimate before work begins",
      "Set a contingency budget of 15–20% — this is not a slush fund; it's a buffer for legitimate complexity you couldn't anticipate",
      "Confirm what's in vs. out of scope in writing — verbally agreed assumptions are the source of almost every billing dispute"
    ),
    tip("The cheapest quote is rarely the cheapest project. An agency that quotes low to win the work and then charges heavily for change requests will cost you more than an agency that quoted 20% higher with a comprehensive, watertight scope."),
    cta("Get matched with transparent agencies who price projects clearly", "/get-matched", "Get Free Matched →"),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Variation 3 — "Complete Breakdown" angle
// Angle: comprehensive reference guide covering ALL costs (not just build)
// including DIY, self-hosted comparison, international pricing context
// ─────────────────────────────────────────────────────────────────────────────
const post_v3 = {
  slug: "how-much-does-a-shopify-store-cost-complete-breakdown",
  title: "How Much Does a Shopify Store Cost? Complete 2026 Pricing Breakdown",
  excerpt: "From the Shopify subscription to agency fees, apps, domains, and ongoing support — here is every cost involved in running a Shopify store, broken down clearly for 2026.",
  category: "Pricing Guide",
  tags: ["shopify cost", "shopify store cost", "pricing", "total cost of ownership", "ecommerce budget"],
  author: "Shopify Agency Directory",
  reading_time: 10,
  status: "published",
  featured: false,
  date: "2026-03-03",
  content: [
    p("How much does a Shopify store cost — truly, from top to bottom? Most pricing articles cover the build cost. This one covers everything: the platform subscription, the build, the apps, the ongoing support, the hidden costs, and how it all adds up over a three-year horizon."),
    p("Whether you're evaluating Shopify for the first time or planning your next budget cycle, this is the most complete cost breakdown available."),
    h2("Cost Category 1: The Shopify Subscription"),
    p("Every Shopify store pays a monthly platform fee. This is your baseline — it covers hosting, the core ecommerce features, and Shopify's infrastructure."),
    ul(
      "Basic ($39/month) — 2 staff accounts, basic reports, 2% transaction fee (if not using Shopify Payments)",
      "Shopify ($105/month) — 5 staff accounts, standard reports, 1% transaction fee",
      "Advanced ($399/month) — 15 staff accounts, advanced reports, 0.5% transaction fee",
      "Plus ($2,300+/month) — unlimited staff, custom checkout, B2B features, 0.15% transaction fee",
      "Starter ($5/month) — for sell-via-social only; no full online store"
    ),
    tip("If you process payments through Shopify Payments (available in most countries), transaction fees are waived. On a store doing $500k/year, avoiding the 1% transaction fee on the Shopify plan saves $5,000/year — that's more than the plan upgrade cost."),
    h2("Cost Category 2: Building the Store"),
    p("This is the largest one-off cost for most merchants. Your options range from free self-build to a six-figure agency project."),
    h3("Option A: Build It Yourself (Free – $500)"),
    p("Shopify's theme editor is genuinely capable. With a free or premium theme ($200–$380), you can build a functional store without writing a line of code. This works well for: new stores testing a concept, merchants with strong design instincts, or very simple product catalogues."),
    h3("Option B: Freelancer ($1,500 – $6,000)"),
    p("A Shopify-specialist freelancer can configure a theme, set up your products, and make customisations within the theme editor. Good for small stores that want a step up from DIY without agency costs. Risk: limited bandwidth, no team backup, and typically no project management."),
    h3("Option C: Agency — Theme Build ($4,000 – $12,000)"),
    p("A professional agency takes a premium theme and builds your store to a high standard — with proper QA, mobile testing, SEO setup, and app integrations. The right choice for most established brands launching or rebuilding on Shopify."),
    h3("Option D: Agency — Custom Build ($15,000 – $50,000)"),
    p("Full bespoke UX design and custom Liquid theme development. Every design decision is intentional, every page is optimised for your specific conversion goals. Reserved for brands where design is a competitive advantage."),
    h3("Option E: Shopify Plus / Enterprise ($50,000 – $250,000+)"),
    p("Complex enterprise builds with headless architecture, custom app development, ERP and PIM integrations, and multi-region configurations. Typically a 6–12 month project with a team of 4–10 specialists."),
    h2("Cost Category 3: Apps"),
    p("Apps extend Shopify's native functionality. Most stores need 5–15 apps to operate properly. Here's a realistic budget by stack size:"),
    h3("Minimal Stack (new or small store): $50–$150/month"),
    ul(
      "Email marketing: Klaviyo or Omnisend (~$20–$45/month)",
      "Reviews: Judge.me free or paid (~$0–$15/month)",
      "SEO: Plug In SEO or similar (~$0–$30/month)",
      "Forms / popups: Privy or similar (~$0–$30/month)"
    ),
    h3("Standard Stack (growing store): $200–$600/month"),
    ul(
      "Email + SMS: Klaviyo (~$100–$200/month at mid-list size)",
      "Reviews: Okendo or Yotpo (~$19–$119/month)",
      "Loyalty: Smile.io (~$49–$199/month)",
      "Upsells: ReConvert (~$30–$80/month)",
      "Helpdesk: Gorgias (~$60–$150/month)"
    ),
    h3("Full Stack (scale-up): $600–$2,000+/month"),
    ul(
      "Marketing automation: Klaviyo at scale (~$300–$600/month)",
      "Reviews + loyalty + UGC: Yotpo suite (~$200–$400/month)",
      "Subscriptions: Recharge or Skio (~$99–$300/month)",
      "Returns management: Loop or Returnly (~$99–$400/month)",
      "Search and merchandising: Searchpie or Boost (~$50–$150/month)"
    ),
    h2("Cost Category 4: Domain and Email"),
    ul(
      "Domain registration: $10–$20/year (via Shopify or external registrar)",
      "Business email hosting: $6–$18/user/month (Google Workspace or Microsoft 365)",
      "SSL certificate: included in all Shopify plans — no additional cost"
    ),
    h2("Cost Category 5: Ongoing Agency Support"),
    p("Most brands engage an agency on a retainer after launch for ongoing development, CRO, and technical support. Retainer structures vary:"),
    ul(
      "Ad-hoc / hourly: $100–$200/hour — good for occasional small tasks",
      "Small retainer (5–10 hrs/month): $500–$2,000/month — ongoing maintenance and minor improvements",
      "Growth retainer (20–40 hrs/month): $2,000–$8,000/month — regular development, A/B testing, CRO",
      "Dedicated team: $10,000+/month — Shopify Plus stores with continuous development needs"
    ),
    h2("Cost Category 6: Content and Creative"),
    p("Often overlooked entirely in budgets. A Shopify store needs content to function — and content costs money to create."),
    ul(
      "Product photography: $500–$5,000 depending on product count and studio requirements",
      "Lifestyle / brand photography: $1,500–$8,000 for a full brand shoot",
      "Product copywriting: $30–$100 per product description (AI can help with first drafts)",
      "Category and blog content: $200–$800 per page for professional SEO copywriting",
      "Video (brand, product, ads): $2,000–$20,000+ depending on production quality"
    ),
    h2("Three-Year Total Cost of Ownership"),
    p("Here's how the numbers stack up across a realistic three-year window for three store sizes:"),
    h3("Small Store ($200k–$500k revenue)"),
    ul(
      "Build (theme, freelancer): $3,000–$8,000",
      "Shopify plan (Basic/Shopify, 3 years): $1,400–$3,800",
      "Apps (minimal stack, 3 years): $1,800–$5,400",
      "Content setup: $1,000–$3,000",
      "3-year total: approximately $7,000–$20,000"
    ),
    h3("Mid-Market Store ($500k–$2M revenue)"),
    ul(
      "Build (agency, custom theme): $15,000–$35,000",
      "Shopify plan (Shopify/Advanced, 3 years): $3,800–$14,400",
      "Apps (standard stack, 3 years): $7,200–$21,600",
      "Agency support (light retainer, 3 years): $18,000–$54,000",
      "Content and creative: $5,000–$15,000",
      "3-year total: approximately $49,000–$140,000"
    ),
    h3("Enterprise Store ($2M+ revenue)"),
    ul(
      "Build (Plus, custom/headless): $60,000–$180,000",
      "Shopify Plus (3 years): $82,800",
      "Apps (full stack, 3 years): $21,600–$72,000",
      "Dedicated agency/internal team (3 years): $120,000–$360,000",
      "3-year total: approximately $284,000–$695,000+"
    ),
    h2("Shopify vs WooCommerce vs Magento: True Cost Comparison"),
    p("Merchants often compare Shopify against self-hosted alternatives. The headline platform cost is lower on WooCommerce (free software) or Magento Open Source (free) — but total cost of ownership tells a different story."),
    ul(
      "WooCommerce: $0 software + $100–$500/month hosting + $500–$2,000/year in plugin licences + developer time for updates, security, and conflicts. TCO often matches or exceeds Shopify at any meaningful scale.",
      "Magento Open Source: free software but requires dedicated server infrastructure, regular security patching, and Magento-specialist developers (expensive and harder to find). Enterprise TCO is typically higher than Shopify Plus.",
      "Shopify: predictable monthly cost with hosting, security, and core updates included. Fewer unexpected infrastructure costs."
    ),
    cta("Find an agency that fits your budget and scale", "/get-matched", "Get Free Matched →"),
  ],
};

async function main() {
  const posts = [post_v2, post_v3];

  for (const post of posts) {
    console.log(`Upserting: "${post.title}"`);
    const { error } = await supabase
      .from("blog_posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`  Error: ${error.message}`);
      process.exit(1);
    }
    console.log(`  Published: /blog/${post.slug}`);
  }

  console.log("\nDone — both variations published.");
}

main();
