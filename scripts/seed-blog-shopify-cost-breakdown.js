/**
 * Seed blog post: How Much Does a Shopify Store Really Cost? A Data-Driven Breakdown
 * Run: node scripts/seed-blog-shopify-cost-breakdown.js
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
  slug: "how-much-does-shopify-store-cost",
  title: "How Much Does a Shopify Store Really Cost? A Data-Driven Breakdown",
  excerpt:
    "A transparent, data-driven breakdown of what it actually costs to build a Shopify store in 2026 \u2014 from DIY setups to enterprise Shopify Plus builds. Covers agency fees, app costs, hidden expenses, and how to budget realistically.",
  category: "Pricing Guide",
  tags: [
    "shopify development cost",
    "shopify agency pricing",
    "shopify store cost",
    "shopify plus pricing",
    "ecommerce budget",
    "shopify agency fees",
  ],
  author: "Varine Rashford",
  reading_time: 12,
  status: "published",
  featured: true,
  date: "2026-04-03",
  content: [
    p(
      "\"How much does a Shopify store cost?\" is the most common question we hear from merchants. And the most honest answer is frustratingly broad: anywhere from $29/month for a DIY setup to $500,000+ for a custom enterprise build."
    ),
    p(
      "The reason for this range is not that agencies are being evasive. It is that \"a Shopify store\" can mean wildly different things. A sole trader selling 20 handmade products needs a completely different build than a global brand with 10,000 SKUs, an ERP integration, and multi-currency checkout."
    ),
    p(
      "This guide breaks down every cost category with real pricing data from our directory of 900+ verified Shopify agencies. No vague ranges \u2014 actual numbers segmented by project type, complexity, and agency location."
    ),

    cta(
      "Want a personalised estimate right now? Our cost calculator factors in your project type, complexity, integrations, catalog size, and preferred agency location.",
      "/tools/cost-estimator",
      "Get Your Cost Estimate"
    ),

    h2("The Three Layers of Shopify Costs"),
    p(
      "Every Shopify store has three cost layers. Most merchants only think about the first one."
    ),

    h3("Layer 1: Shopify Platform Fees"),
    p(
      "This is the subscription you pay Shopify directly. It covers hosting, security, payment processing, and the core platform."
    ),
    table(
      ["Plan", "Monthly Cost", "Transaction Fee (with Shopify Payments)", "Best For"],
      [
        ["Basic", "$39/month", "2.9% + $0.30", "New stores, small catalogs, testing the platform"],
        ["Shopify", "$105/month", "2.6% + $0.30", "Growing stores that need professional reports and more staff accounts"],
        ["Advanced", "$399/month", "2.4% + $0.30", "Established stores that need advanced analytics, calculated shipping rates, and lower transaction fees"],
        ["Shopify Plus", "From $2,300/month", "2.15% + $0.30 (negotiable)", "Enterprise: custom checkout, B2B, automation, multi-store, high volume"],
      ]
    ),
    tip(
      "The plan you choose at launch is not permanent. Many merchants start on Basic or Shopify and upgrade as revenue grows. The break-even point for upgrading is usually when the lower transaction fee saves more than the difference in subscription cost."
    ),

    h3("Layer 2: Development and Design Costs"),
    p(
      "This is the one-time cost of building your store. It is where the biggest variation occurs, and where agency fees live."
    ),

    h3("Layer 3: Ongoing Costs"),
    p(
      "Apps, maintenance, marketing, and operational costs that recur monthly. These are often underestimated and can exceed development costs within the first year."
    ),

    h2("Development Costs by Project Type"),
    p(
      "Based on data from agencies in our directory, here are realistic cost ranges for each project type in 2026."
    ),

    h3("Theme-Based Store Build"),
    p(
      "You start with a pre-built Shopify 2.0 theme (free or premium) and customise it to match your brand. This is the most common and cost-effective approach."
    ),
    table(
      ["Scope", "Cost Range", "Timeline", "Includes"],
      [
        ["DIY (you do it yourself)", "$0\u2013$350 (theme cost)", "2\u20138 weeks", "Theme purchase, self-configuration, basic branding"],
        ["Freelancer", "$2,000\u2013$8,000", "2\u20134 weeks", "Theme customisation, basic branding, product upload, launch support"],
        ["Agency (basic)", "$5,000\u2013$15,000", "3\u20136 weeks", "Custom branding, homepage design, collection pages, basic SEO, mobile optimisation"],
        ["Agency (advanced)", "$15,000\u2013$30,000", "4\u20138 weeks", "Multiple custom sections, custom functionality, integrations, training"],
      ]
    ),

    h3("Custom Theme Build"),
    p(
      "A fully custom Shopify Liquid theme designed and built from scratch. No pre-built theme as a starting point."
    ),
    table(
      ["Scope", "Cost Range", "Timeline", "Includes"],
      [
        ["Mid-market", "$20,000\u2013$50,000", "6\u201310 weeks", "Custom design (Figma), custom Liquid development, responsive build, SEO, performance optimisation"],
        ["Enterprise", "$50,000\u2013$100,000", "8\u201316 weeks", "Full UX research, custom design system, advanced Liquid sections, app integrations, training, documentation"],
      ]
    ),

    h3("Headless / Composable Build"),
    p(
      "A decoupled architecture using Shopify as the backend with a custom front end built in React, Next.js, Remix, or another framework via the Shopify Storefront API or Hydrogen."
    ),
    table(
      ["Scope", "Cost Range", "Timeline", "Includes"],
      [
        ["Standard headless", "$40,000\u2013$80,000", "8\u201312 weeks", "Custom front end (React/Next.js), Storefront API integration, CDN deployment, performance optimisation"],
        ["Enterprise headless", "$80,000\u2013$200,000+", "12\u201324 weeks", "Full composable stack, CMS integration, personalisation, multi-market, CI/CD pipeline"],
      ]
    ),

    h3("Platform Migration"),
    p(
      "Moving from another platform (WooCommerce, Magento, BigCommerce, Squarespace, custom) to Shopify. Includes data migration, theme build, and SEO preservation."
    ),
    table(
      ["Source Platform", "Cost Range", "Timeline", "Key Cost Driver"],
      [
        ["Squarespace / Wix", "$3,000\u2013$10,000", "2\u20134 weeks", "Simple data model, limited custom features to replicate"],
        ["BigCommerce", "$5,000\u2013$20,000", "3\u20136 weeks", "Similar SaaS model but app ecosystem differences"],
        ["WooCommerce", "$8,000\u2013$35,000", "4\u20138 weeks", "Plugin dependencies, flexible data model, self-hosted quirks"],
        ["Magento 1/2", "$15,000\u2013$150,000+", "6\u201324 weeks", "Complex data model, heavy customisation, extension dependencies, EAV attributes"],
        ["Custom platform", "$20,000\u2013$100,000+", "8\u201316 weeks", "No standard export, custom data schemas, undocumented features"],
      ]
    ),

    h3("Shopify Plus Implementation"),
    p(
      "A full Shopify Plus build typically includes everything in a custom theme build plus Plus-specific features."
    ),
    table(
      ["Scope", "Cost Range", "Timeline", "Plus-Specific Features"],
      [
        ["Standard Plus", "$30,000\u2013$80,000", "8\u201312 weeks", "Checkout Extensibility, Shopify Flow automation, Scripts for discounting"],
        ["Enterprise Plus", "$80,000\u2013$250,000+", "12\u201324 weeks", "B2B/wholesale channel, expansion stores, headless, deep ERP integration, multi-market"],
      ]
    ),

    h3("Ongoing Retainer / Support"),
    p(
      "Many merchants hire an agency on a monthly retainer for ongoing development, design updates, CRO (conversion rate optimisation), and technical support."
    ),
    table(
      ["Retainer Level", "Monthly Cost", "Hours Included", "Typical Work"],
      [
        ["Light", "$1,000\u2013$2,500/month", "5\u201310 hours", "Bug fixes, minor updates, app management, monthly reporting"],
        ["Standard", "$2,500\u2013$5,000/month", "10\u201320 hours", "Feature development, A/B testing, CRO, design updates, SEO"],
        ["Growth", "$5,000\u2013$15,000/month", "20\u201360 hours", "Dedicated team, strategic growth, new feature builds, integration work, performance optimisation"],
      ]
    ),

    h2("Hidden Costs Most Merchants Miss"),
    p(
      "The agency quote is only part of the picture. Here are the costs that catch merchants off guard."
    ),

    h3("App Costs"),
    p(
      "The average Shopify store uses 6\u20138 paid apps. Enterprise stores can use 20+. App costs add up quickly."
    ),
    table(
      ["App Category", "Typical Monthly Cost", "Examples"],
      [
        ["Reviews", "$15\u2013$99/month", "Judge.me, Stamped, Yotpo, Loox"],
        ["Email marketing", "$0\u2013$200/month", "Klaviyo, Omnisend, Mailchimp"],
        ["Search and filtering", "$19\u2013$149/month", "Searchanise, Boost Commerce, Algolia"],
        ["Subscriptions", "$49\u2013$399/month", "Recharge, Loop, Bold Subscriptions"],
        ["Loyalty / rewards", "$49\u2013$299/month", "Smile.io, LoyaltyLion, Yotpo"],
        ["SEO tools", "$0\u2013$79/month", "Plug in SEO, SEO Manager, Ahrefs"],
        ["Inventory management", "$29\u2013$299/month", "Stocky, Inventory Planner, TradeGecko"],
        ["Upsell / cross-sell", "$19\u2013$99/month", "Bold Upsell, ReConvert, Rebuy"],
      ]
    ),
    p(
      "A mid-size store typically spends $200\u2013$500/month on apps. Enterprise stores can spend $1,000\u20133,000/month."
    ),

    h3("Content and Photography"),
    p(
      "Professional product photography costs $25\u2013$75 per product. Lifestyle photography for a full shoot runs $2,000\u2013$10,000. Copywriting for product descriptions costs $5\u201325 per product. These costs are often excluded from agency quotes."
    ),

    h3("Payment Processing"),
    p(
      "Shopify Payments charges 2.15%\u20132.9% + $0.30 per transaction depending on your plan. At $100,000/month in revenue, that is $2,450\u2013$3,200/month in processing fees. This is a cost of doing business, not an agency cost, but it needs to be in your budget."
    ),

    h3("Domain and Email"),
    p(
      "Domain registration ($10\u201320/year), professional email hosting ($5\u201312/user/month via Google Workspace or Microsoft 365), and SSL certificates (included free with Shopify) are minor but real costs."
    ),

    h2("What Drives Agency Pricing Up"),
    p(
      "Understanding what makes projects expensive helps you control costs."
    ),
    ul(
      "Custom design work \u2014 bespoke Figma mockups cost more than adapting a pre-built theme. If your brand guidelines require a pixel-perfect custom design, budget accordingly.",
      "Integration complexity \u2014 every API integration (ERP, POS, CRM, 3PL) adds $2,000\u2013$15,000+ to a project depending on the integration's complexity and documentation quality.",
      "Catalog complexity \u2014 products with many variants, custom options, bundled products, or subscription models require more development time.",
      "Multi-language and multi-currency \u2014 internationalisation adds 20\u201340% to project costs due to translation management, currency conversion, and market-specific configurations.",
      "Custom checkout (Plus only) \u2014 Shopify Checkout Extensibility development typically adds $5,000\u201320,000 to a Plus project.",
      "Agency location \u2014 rates vary significantly by region. North American agencies typically charge $150\u2013$300/hour, European agencies $100\u2013$200/hour, and agencies in South Asia or Eastern Europe $40\u2013$100/hour."
    ),

    h2("How to Budget Realistically"),
    ol(
      "Start with your project type \u2014 use the ranges above to identify your category",
      "Add 15\u201320% contingency \u2014 scope changes, unexpected integrations, and additional design rounds are inevitable",
      "Budget for apps separately \u2014 estimate $200\u2013$500/month for a typical store",
      "Include content costs \u2014 photography, copywriting, and video production are often excluded from agency quotes",
      "Plan for ongoing costs \u2014 at minimum, budget $1,000\u20132,500/month for a retainer to handle updates and maintenance",
      "Factor in your Shopify plan \u2014 your monthly subscription, transaction fees, and any additional staff accounts"
    ),
    tip(
      "Ask agencies for a detailed line-item quote, not just a total. A good proposal breaks costs down by phase: discovery, design, development, data migration, QA, and launch support. This makes it easier to compare proposals and identify where costs are coming from."
    ),

    cta(
      "Ready to get a detailed cost estimate? Our calculator factors in project type, complexity level, integration count, catalog size, and agency location.",
      "/tools/cost-estimator",
      "Estimate Your Project Cost"
    ),

    h2("Cost Comparison: DIY vs Freelancer vs Agency"),
    table(
      ["Factor", "DIY", "Freelancer", "Agency"],
      [
        ["Upfront cost", "$0\u2013$350", "$2,000\u2013$15,000", "$5,000\u2013$200,000+"],
        ["Timeline", "2\u20138 weeks", "2\u20136 weeks", "4\u201324 weeks"],
        ["Design quality", "Template-based", "Good (limited revisions)", "Excellent (custom design process)"],
        ["Custom development", "None (apps only)", "Basic customisation", "Full custom functionality"],
        ["SEO", "Basic (self-managed)", "Basic setup", "Comprehensive strategy and implementation"],
        ["Ongoing support", "Self-service", "Ad hoc (hourly)", "Retainer with SLAs"],
        ["Risk level", "High (learning curve, mistakes)", "Medium (single point of failure)", "Low (team, process, QA)"],
        ["Best for", "Very small stores, testing", "Small stores, tight budgets", "Serious businesses, growth-focused stores"],
      ]
    ),

    h2("How to Get Accurate Quotes from Agencies"),
    p(
      "The quality of the quotes you receive is directly proportional to the quality of your project brief. Vague briefs produce vague quotes. Detailed briefs produce accurate quotes."
    ),
    ol(
      "Use our Brief Generator to create a structured project brief \u2014 it covers all 7 sections agencies need to quote accurately",
      "Share your budget range \u2014 this is not about being taken advantage of. It helps agencies scope their proposal to fit your budget rather than proposing their ideal solution.",
      "Be specific about integrations \u2014 name every third-party system that needs to connect to Shopify",
      "Separate must-haves from nice-to-haves \u2014 this allows agencies to propose a phased approach that fits your budget",
      "Request proposals from 3\u20135 agencies \u2014 this gives you enough data points to identify outliers and understand the market rate"
    ),
    cta(
      "Create a professional project brief in minutes. Agencies take detailed briefs more seriously and provide more accurate quotes.",
      "/tools/brief-generator",
      "Create Your Project Brief"
    ),

    h2("Frequently Asked Questions"),
    faq([
      {
        q: "How much does it cost to hire a Shopify agency?",
        a: "Agency fees range from $5,000 for a basic theme customisation to $200,000+ for a complex enterprise build. The average mid-market Shopify project costs $15,000\u2013$50,000. Use our Cost Estimator for a personalised range based on your specific requirements.",
      },
      {
        q: "Is Shopify Plus worth the extra cost?",
        a: "Shopify Plus starts at $2,300/month (vs $39\u2013$399 for standard plans) and adds custom checkout, B2B/wholesale, Shopify Flow automation, expansion stores, and lower transaction fees. It is worth it if you need these features or if you process enough volume that the lower transaction fees offset the subscription cost.",
      },
      {
        q: "How much should I budget for apps?",
        a: "A typical mid-size store spends $200\u2013$500/month on apps. Enterprise stores can spend $1,000\u20133,000/month. Essential categories include reviews, email marketing, search/filtering, and analytics. Use free apps where possible and upgrade as needed.",
      },
      {
        q: "Why do Shopify agency prices vary so much?",
        a: "Pricing varies based on agency location (North America is 2\u20133x more expensive than South Asia), team size and experience, scope of work (design, development, data migration, SEO), and the complexity of your requirements. A custom headless build with ERP integration is fundamentally different from a theme customisation.",
      },
      {
        q: "Is it cheaper to use a freelancer or an agency?",
        a: "Freelancers are typically 40\u201360% cheaper than agencies but come with higher risk: single point of failure, limited availability, and no QA team. For simple projects under $10,000, a skilled freelancer is often the best value. For anything larger, an agency provides more reliability and breadth of skills.",
      },
      {
        q: "How much does a Shopify store cost per month to run?",
        a: "Total monthly running costs include your Shopify plan ($39\u2013$2,300+), apps ($200\u2013$3,000), payment processing (2.15\u20132.9% of revenue), and optional agency retainer ($1,000\u2013$15,000). A typical mid-size store spends $500\u2013$2,000/month before agency retainer costs.",
      },
    ]),
  ],
};

async function main() {
  console.log("Seeding blog post:", post.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        reading_time: post.reading_time,
        status: post.status,
        featured: post.featured,
        date: post.date,
      },
      { onConflict: "slug" }
    )
    .select("slug, title");

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
  console.log("Done:", data);
}

main();
