/**
 * Upsert the updated "How Much Does a Shopify Website Cost?" blog post.
 * Run: node scripts/upsert-shopify-cost-post.js
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

const post = {
  slug: "how-much-does-a-shopify-website-cost",
  title: "How Much Does a Shopify Website Cost? (2026 Pricing Guide)",
  excerpt: "Shopify website costs range from $2,000 to $150,000+. Here's a transparent breakdown of what you'll actually pay — from platform fees to agency quotes — and how to budget your build.",
  category: "Pricing Guide",
  tags: ["shopify cost", "pricing", "budget", "web development", "shopify agency cost"],
  author: "Shopify Agency Directory",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-02-01",
  updated_date: "2026-03-03",
  content: [
    p("How much does a Shopify website cost? It's the most common question merchants ask before starting a project — and the answer genuinely depends on what you're building. A basic theme customisation for a small brand can cost $2,000–$4,000. A bespoke Shopify Plus store for an enterprise retailer can run to $150,000 or more."),
    p("This guide breaks down every cost category clearly, with real-world price ranges, so you can set an accurate budget before you approach a single agency."),
    h2("Quick Answer: Shopify Website Cost by Project Type"),
    ul(
      "DIY with a premium theme: $0 – $500 (theme licence only)",
      "Theme-based agency build: $2,000 – $8,000",
      "Custom design + development: $8,000 – $40,000",
      "Shopify Plus / enterprise build: $40,000 – $150,000+"
    ),
    tip("If you build yourself using Shopify's theme editor, your main costs are the monthly Shopify plan and optionally a premium theme ($200–$380). DIY works for simple stores — but for established brands, agency expertise typically pays back through higher conversion rates."),
    h2("Shopify Platform Monthly Costs"),
    p("Before any build cost, budget for Shopify's subscription. Every store pays a monthly plan fee:"),
    ul(
      "Basic Shopify: $39/month — good for new stores with simple needs",
      "Shopify: $105/month — adds more staff accounts and better reporting",
      "Advanced Shopify: $399/month — unlocks advanced reporting and lower transaction fees",
      "Shopify Plus: $2,300+/month — enterprise plan with checkout customisation, automation, and multi-store support"
    ),
    p("Transaction fees apply if you don't use Shopify Payments: 2% on Basic, 1% on Shopify, 0.5% on Advanced, 0.15% on Plus. For high-volume stores these fees add up quickly — factoring them into your platform decision matters."),
    h2("Agency Build Costs: The Three Tiers"),
    h3("Tier 1: Theme-Based Build ($2,000 – $8,000)"),
    p("The most common starting point for new Shopify stores. An agency configures a premium theme (Dawn, Impulse, Prestige, or similar), customises it to match your brand, and sets up your product catalogue. Faster and more affordable than a custom build."),
    ul(
      "Best for: new stores, brands with a clear visual identity, straightforward product catalogues",
      "Typical timeline: 4–8 weeks",
      "Includes: theme setup, colour and typography customisation, homepage layout, collection and product pages",
      "Doesn't include: custom functionality, bespoke app integrations, original UX research or wireframing"
    ),
    h3("Tier 2: Custom Design Build ($8,000 – $40,000)"),
    p("A fully designed-from-scratch Shopify store with custom UX, bespoke Liquid theme development, and strategic conversion optimisation. The right choice for established brands and mid-market retailers who need a differentiated online presence."),
    ul(
      "Best for: established brands, complex product ranges, stores where conversion rate is a priority",
      "Typical timeline: 8–16 weeks",
      "Includes: UX/UI design, custom Liquid theme development, app integrations, technical SEO setup",
      "Doesn't include: custom Shopify app development, advanced B2B features, headless architecture"
    ),
    h3("Tier 3: Enterprise / Shopify Plus ($40,000 – $150,000+)"),
    p("Enterprise-level builds on Shopify Plus, often involving headless architecture, custom app development, and deep third-party integrations (ERP, PIM, OMS). These projects are typically led by Shopify Plus Partners with specialist engineering teams."),
    ul(
      "Best for: large retailers, Shopify Plus merchants, businesses with complex operational requirements",
      "Typical timeline: 3–12 months",
      "Includes: custom app development, ERP/OMS/PIM integrations, performance engineering, multi-region or multi-store setup"
    ),
    h2("What Drives the Price Up?"),
    p("Understanding the cost drivers helps you prioritise where to spend — and where to save. These factors most commonly push projects into a higher tier:"),
    ol(
      "Custom functionality — any feature not available in Shopify's native toolset or the app ecosystem requires custom development; typical agency rates are $100–$200/hour",
      "Complex integrations — connecting Shopify to an ERP (NetSuite, SAP), PIM, or custom OMS is one of the biggest cost drivers at enterprise level",
      "Product catalogue complexity — a store with 10 products builds faster than one with 10,000 SKUs, complex variants, and custom metafields",
      "Bespoke UX design — full UX research, wireframing, and visual design adds $5,000–$15,000 but typically pays back through conversion rate improvements",
      "Headless architecture — using Shopify as a headless backend (with a Next.js or Hydrogen frontend) adds significant development cost but unlocks top-tier performance and flexibility"
    ),
    h2("Ongoing Monthly Costs After Launch"),
    p("The build is a one-off investment. These are the recurring costs you'll pay every month:"),
    ul(
      "Shopify plan: $39 – $399/month (or $2,300+/month for Plus)",
      "Essential apps (reviews, email, SEO, forms): $50 – $300/month",
      "Extended app stack (loyalty, upsells, subscriptions, helpdesk): $300 – $1,500+/month",
      "Domain and email hosting: $15 – $50/month",
      "Agency retainer for ongoing support or CRO: $500 – $5,000/month",
      "Hosting: included in Shopify's monthly fee — no separate server costs"
    ),
    tip("Total year-one cost for a mid-market Shopify store is typically $25,000–$70,000: build ($15k–$40k) + Shopify plan (~$1,260/year on Shopify plan) + apps ($3k–$6k/year) + agency support ($6k–$24k/year). Build this into your business case from day one."),
    h2("Hidden Costs Most Merchants Miss"),
    p("These costs frequently catch merchants off guard after launch:"),
    ul(
      "App subscriptions — easy to underestimate; a fully-featured app stack for a growing store can reach $500–$1,500/month",
      "Content and photography — professional product photography costs $500–$3,000; copywriting for a full store adds $1,000–$5,000",
      "Post-launch fixes and tweaks — even well-built stores need iteration; budget 10–15% of the build cost as a post-launch reserve",
      "Theme maintenance — major Shopify updates occasionally require theme updates; budget $500–$2,000/year for a custom theme",
      "App replacement costs — if a key app raises prices sharply or closes down, re-implementing the feature has a real development cost"
    ),
    h2("How to Get the Best Value from Your Budget"),
    ol(
      "Get at least three agency quotes — prices for identical scopes vary by 2–4x between agencies; use the range to negotiate and identify outliers",
      "Separate must-haves from nice-to-haves — phase your build; launch with core functionality and add features in months 3–6",
      "Use apps before custom development — always check if a $50/month app solves your problem before paying $5,000 for bespoke code",
      "Match the build tier to your revenue stage — a custom $25,000 build is hard to justify on $200k revenue; a theme build often gets you 80% of the outcome at 20% of the cost",
      "Ask for a fixed-price contract — T&M (time and materials) projects can run over budget; a fixed-price quote protects you from scope creep when requirements are clear"
    ),
    cta("Find an agency that fits your budget and requirements", "/get-matched", "Get Free Matched →"),
  ],
};

async function main() {
  console.log(`Upserting: "${post.title}"`);
  const { error } = await supabase
    .from("blog_posts")
    .upsert(post, { onConflict: "slug" });

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
  console.log("Done — post published.");
}

main();
