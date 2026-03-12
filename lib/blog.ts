// ---------------------------------------------------------------------------
// Blog post data — posts are stored in Supabase `blog_posts` table and
// managed from the admin dashboard. The hardcoded `posts` array below is
// kept as the seed source; once you run the seed SQL those rows live in DB.
// ---------------------------------------------------------------------------

import { getAllBlogPosts, getAllBlogPostsPaginated, getBlogPostBySlug } from "@/lib/supabase";
import type { BlogPostDB } from "@/lib/supabase";

export type { BlogPostDB };

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO format: YYYY-MM-DD
  updatedDate?: string;
  readingTime: number;    // minutes
  author: string;
  category: string;
  tags: string[];
  featured?: boolean;
  status?: "published" | "draft";
  content: ContentBlock[];
}

// ---------------------------------------------------------------------------
// Map Supabase DB row → BlogPost
// ---------------------------------------------------------------------------

function toPost(row: BlogPostDB): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.date,
    updatedDate: row.updated_date ?? undefined,
    readingTime: row.reading_time,
    author: row.author,
    category: row.category,
    tags: row.tags ?? [],
    featured: row.featured,
    status: row.status,
    content: (row.content ?? []) as ContentBlock[],
  };
}

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }       // highlighted tip box
  | { type: "cta"; text: string; href: string; label: string } // call to action
  | { type: "table"; headers: string[]; rows: string[][] }     // comparison table
  | { type: "faq"; items: { q: string; a: string }[] };        // FAQ section — generates FAQPage schema

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

const posts: BlogPost[] = [
  // ─── Post 1 ───────────────────────────────────────────────────────────────
  {
    slug: "how-to-choose-a-shopify-agency",
    title: "How to Choose a Shopify Agency: The Complete 2026 Guide",
    excerpt:
      "Choosing the wrong Shopify agency can cost you months and thousands of dollars. Here's exactly what to look for — and the red flags to avoid.",
    date: "2026-01-15",
    readingTime: 8,
    author: "Shopify Agency Directory",
    category: "Hiring Guide",
    tags: ["hiring", "shopify agency", "ecommerce", "guide"],
    content: [
      {
        type: "p",
        text: "Finding the right Shopify agency is one of the most important decisions you'll make for your ecommerce business. Get it right and you'll have a trusted partner who helps you scale. Get it wrong and you're looking at missed deadlines, blown budgets, and a store that underperforms.",
      },
      {
        type: "p",
        text: "In this guide we'll walk through everything you need to evaluate — from checking portfolios to asking the right questions in your first call.",
      },
      { type: "h2", text: "1. Define Your Project Before You Start Looking" },
      {
        type: "p",
        text: "Before approaching any agency, get clear on what you actually need. Agencies specialise in different areas, and matching your project to the right specialism will save you huge amounts of time.",
      },
      {
        type: "ul",
        items: [
          "New store build — you need a full-service agency with design and development capabilities",
          "Migration from Magento/WooCommerce — look for agencies with dedicated migration experience",
          "CRO and optimisation — specialist CRO agencies will outperform generalists here",
          "Ongoing support and maintenance — a smaller, agile agency is often better than a large one",
          "Shopify Plus — only work with Shopify Plus Partners if you're on or moving to Plus",
        ],
      },
      { type: "h2", text: "2. Check Their Shopify Partner Status" },
      {
        type: "p",
        text: "Shopify has an official Partner and Plus Partner programme. While not every good agency is listed, Partner status does confirm a baseline level of experience and knowledge.",
      },
      {
        type: "tip",
        text: "Shopify Plus Partners have completed additional training and built a proven track record on the enterprise plan. If your store turns over more than $1M/year, only consider Plus Partners.",
      },
      { type: "h2", text: "3. Review Their Portfolio Critically" },
      {
        type: "p",
        text: "Anyone can show a pretty screenshot. Here's what to actually look for when reviewing an agency's portfolio:",
      },
      {
        type: "ol",
        items: [
          "Visit the live stores, not just screenshots — do they load fast? Are they bug-free on mobile?",
          "Look for stores in your industry or with similar complexity to yours",
          "Check if the stores have been updated recently — old work may not reflect current standards",
          "Ask specifically about their role — did they build it from scratch, or just make tweaks?",
          "Look for measurable results — any good agency will have conversion rate or revenue uplift data",
        ],
      },
      { type: "h2", text: "4. Ask These Questions in Your First Call" },
      {
        type: "p",
        text: "Use your discovery call to assess fit and capability. These questions separate strong agencies from average ones:",
      },
      {
        type: "ul",
        items: [
          "Who specifically will work on my project — and can I meet them?",
          "What does your typical project timeline look like, and what causes delays?",
          "How do you handle scope creep and change requests?",
          "What happens after launch — do you offer a warranty period?",
          "Can you share 2–3 client references I can speak to?",
          "How do you measure success on a project like mine?",
        ],
      },
      { type: "h2", text: "5. Understand Pricing Models" },
      {
        type: "p",
        text: "Shopify agencies typically charge in one of three ways:",
      },
      {
        type: "ul",
        items: [
          "Fixed price — best for well-defined projects; get everything in writing",
          "Time and materials (T&M) — more flexible but requires careful scope management",
          "Retainer — best for ongoing work; ensures dedicated resource each month",
        ],
      },
      {
        type: "p",
        text: "Don't always go for the cheapest quote. A $10,000 project that runs over to $25,000 is worse value than a transparent $18,000 fixed-price quote.",
      },
      { type: "h2", text: "6. Red Flags to Watch Out For" },
      {
        type: "ul",
        items: [
          "No discovery process — agencies that quote without understanding your business are guessing",
          "Vague timelines — 'we'll get it done quickly' is not a project plan",
          "No references — a confident agency will always connect you with happy clients",
          "One-size-fits-all proposals — your project should have a custom proposal",
          "Pressure to sign quickly — legitimate agencies don't use high-pressure sales tactics",
          "No post-launch support — what happens when something breaks after go-live?",
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How much does it cost to hire a Shopify agency?", a: "Shopify agency costs range from $2,000 for a theme-based build to $150,000+ for a custom Shopify Plus enterprise project. Most mid-market stores spend $8,000-$40,000 on their initial build." },
          { q: "How long does it take a Shopify agency to build a store?", a: "A theme-based build typically takes 4-8 weeks. Custom design and development takes 8-16 weeks. Enterprise Shopify Plus projects can take 3-12 months depending on complexity." },
          { q: "Should I hire a Shopify Partner or a general web agency?", a: "Always prefer a certified Shopify Partner. They have verified platform expertise, access to partner resources, and a track record of Shopify-specific work that generalist agencies lack." },
          { q: "What questions should I ask a Shopify agency before hiring?", a: "Ask who will work on your project, what their typical timeline looks like, how they handle scope changes, whether they offer post-launch support, and for 2-3 client references from similar projects." },
          { q: "How do I compare Shopify agency proposals?", a: "Compare proposals on scope clarity, named team members, milestone-based pricing, post-launch support terms, and relevant portfolio examples. Get at least three quotes to understand the market range." },
        ],
      },
      {
        type: "cta",
        text: "Ready to find your perfect Shopify agency?",
        href: "/get-matched",
        label: "Get Matched Free →",
      },
    ],
  },

  // ─── Post 2 ───────────────────────────────────────────────────────────────
  {
    slug: "shopify-vs-shopify-plus-which-is-right-for-your-business",
    title: "Shopify vs Shopify Plus: Which Is Right for Your Business?",
    excerpt:
      "Shopify Plus starts at $2,300/month. Is it worth it? We break down every difference so you can make the right call for your business.",
    date: "2026-01-22",
    readingTime: 7,
    author: "Shopify Agency Directory",
    category: "Platform Guide",
    tags: ["shopify plus", "shopify", "ecommerce platform", "comparison"],
    content: [
      {
        type: "p",
        text: "Shopify Plus is Shopify's enterprise tier — and it comes with a significant price jump. Starting at around $2,300/month (billed annually), it's a serious investment. But for the right business, it pays for itself many times over.",
      },
      {
        type: "p",
        text: "Here's an honest breakdown of every meaningful difference between standard Shopify and Shopify Plus to help you decide.",
      },
      { type: "h2", text: "What You Get on Standard Shopify" },
      {
        type: "p",
        text: "Standard Shopify plans (Basic, Shopify, Advanced) give you everything you need to run a successful ecommerce store:",
      },
      {
        type: "ul",
        items: [
          "Unlimited products and storage",
          "24/7 support",
          "Up to 15 staff accounts (Advanced plan)",
          "Built-in payment processing",
          "App store access",
          "Standard checkout customisation",
        ],
      },
      { type: "h2", text: "What Shopify Plus Adds" },
      {
        type: "ul",
        items: [
          "Checkout extensibility — full control over checkout UI and logic",
          "Up to 9 expansion stores included in your plan",
          "Unlimited staff accounts",
          "Shopify Flow — powerful automation without code",
          "Launchpad — schedule sales, campaigns, and inventory changes",
          "B2B and wholesale features built in",
          "Priority 24/7 support with a dedicated launch engineer",
          "Lower transaction fees at scale",
          "Access to Shopify Plus Academy and exclusive partner community",
        ],
      },
      {
        type: "tip",
        text: "The checkout is the biggest Plus differentiator. If you need custom upsells, complex discount logic, or branded checkout experiences, Plus is the only way to do it natively.",
      },
      { type: "h2", text: "When to Upgrade to Shopify Plus" },
      {
        type: "p",
        text: "The general rule of thumb: consider Plus when you're doing over $1M in annual revenue. At that point the lower transaction fees alone can offset much of the monthly cost.",
      },
      {
        type: "ol",
        items: [
          "You're turning over $1M+ per year and transaction fee savings make financial sense",
          "You need customised checkout experiences (upsells, custom fields, branding)",
          "You're selling B2B/wholesale alongside DTC",
          "You need multiple storefronts for different regions or brands",
          "You require advanced automation (Flow) to manage operations at scale",
          "Your current plan's staff account limits are holding you back",
        ],
      },
      { type: "h2", text: "When to Stay on Standard Shopify" },
      {
        type: "ul",
        items: [
          "You're under $1M revenue — the ROI case is hard to make",
          "Your checkout needs are straightforward",
          "You don't need multiple storefronts",
          "Your current plan meets all your operational needs",
        ],
      },
      { type: "h2", text: "The Migration Process" },
      {
        type: "p",
        text: "Moving from standard Shopify to Plus is straightforward — Shopify handles the migration directly. You keep your store, your data, your apps, and your theme. The main work is taking advantage of the new Plus features, which is where an experienced Shopify Plus agency adds real value.",
      },
      {
        type: "faq",
        items: [
          { q: "How much does Shopify Plus cost per month?", a: "Shopify Plus starts at approximately $2,300/month billed annually. Enterprise pricing varies based on GMV and can be significantly higher for large-volume merchants." },
          { q: "When should I upgrade from Shopify to Shopify Plus?", a: "Consider upgrading when you exceed $1M in annual revenue, need checkout customisation, require multiple storefronts, or need B2B/wholesale features alongside your DTC store." },
          { q: "Can I migrate from standard Shopify to Shopify Plus?", a: "Yes. Shopify handles the migration directly. You keep your store, data, apps, and theme. The main work is configuring and taking advantage of the new Plus features." },
          { q: "What is the biggest advantage of Shopify Plus?", a: "Checkout extensibility is the biggest differentiator. Plus gives you full control over checkout UI and logic, enabling custom upsells, complex discount rules, and branded checkout experiences." },
        ],
      },
      {
        type: "cta",
        text: "Looking for a Shopify Plus agency to help you scale?",
        href: "/agencies?specialization=Shopify+Plus",
        label: "Browse Plus Agencies →",
      },
    ],
  },

  // ─── Post 3 ───────────────────────────────────────────────────────────────
  {
    slug: "how-much-does-a-shopify-website-cost",
    title: "How Much Does a Shopify Website Cost? (2026 Pricing Guide)",
    excerpt:
      "Shopify website costs range from $2,000 to $150,000+. Here's a transparent breakdown of what you'll actually pay — from platform fees to agency quotes — and how to budget your build.",
    date: "2026-02-01",
    updatedDate: "2026-03-03",
    readingTime: 9,
    author: "Shopify Agency Directory",
    category: "Pricing Guide",
    tags: ["shopify cost", "pricing", "budget", "web development", "shopify agency cost"],
    content: [
      {
        type: "p",
        text: "How much does a Shopify website cost? It's the most common question merchants ask before starting a project — and the answer genuinely depends on what you're building. A basic theme customisation for a small brand can cost $2,000–$4,000. A bespoke Shopify Plus store for an enterprise retailer can run to $150,000 or more.",
      },
      {
        type: "p",
        text: "This guide breaks down every cost category clearly, with real-world price ranges, so you can set an accurate budget before you approach a single agency.",
      },
      { type: "h2", text: "Quick Answer: Shopify Website Cost by Project Type" },
      {
        type: "ul",
        items: [
          "DIY with a premium theme: $0 – $500 (theme licence only)",
          "Theme-based agency build: $2,000 – $8,000",
          "Custom design + development: $8,000 – $40,000",
          "Shopify Plus / enterprise build: $40,000 – $150,000+",
        ],
      },
      {
        type: "tip",
        text: "If you build yourself using Shopify's theme editor, your main costs are the monthly Shopify plan and optionally a premium theme ($200–$380). DIY works for simple stores — but for established brands, agency expertise typically pays back through higher conversion rates.",
      },
      { type: "h2", text: "Shopify Platform Monthly Costs" },
      {
        type: "p",
        text: "Before any build cost, budget for Shopify's subscription. Every store pays a monthly plan fee:",
      },
      {
        type: "ul",
        items: [
          "Basic Shopify: $39/month — good for new stores with simple needs",
          "Shopify: $105/month — adds more staff accounts and better reporting",
          "Advanced Shopify: $399/month — unlocks advanced reporting and lower transaction fees",
          "Shopify Plus: $2,300+/month — enterprise plan with checkout customisation, automation, and multi-store support",
        ],
      },
      {
        type: "p",
        text: "Transaction fees apply if you don't use Shopify Payments: 2% on Basic, 1% on Shopify, 0.5% on Advanced, 0.15% on Plus. For high-volume stores these fees add up quickly — factoring them into your platform decision matters.",
      },
      { type: "h2", text: "Agency Build Costs: The Three Tiers" },
      { type: "h3", text: "Tier 1: Theme-Based Build ($2,000 – $8,000)" },
      {
        type: "p",
        text: "The most common starting point for new Shopify stores. An agency configures a premium theme (Dawn, Impulse, Prestige, or similar), customises it to match your brand, and sets up your product catalogue. Faster and more affordable than a custom build.",
      },
      {
        type: "ul",
        items: [
          "Best for: new stores, brands with a clear visual identity, straightforward product catalogues",
          "Typical timeline: 4–8 weeks",
          "Includes: theme setup, colour and typography customisation, homepage layout, collection and product pages",
          "Doesn't include: custom functionality, bespoke app integrations, original UX research or wireframing",
        ],
      },
      { type: "h3", text: "Tier 2: Custom Design Build ($8,000 – $40,000)" },
      {
        type: "p",
        text: "A fully designed-from-scratch Shopify store with custom UX, bespoke Liquid theme development, and strategic conversion optimisation. The right choice for established brands and mid-market retailers who need a differentiated online presence.",
      },
      {
        type: "ul",
        items: [
          "Best for: established brands, complex product ranges, stores where conversion rate is a priority",
          "Typical timeline: 8–16 weeks",
          "Includes: UX/UI design, custom Liquid theme development, app integrations, technical SEO setup",
          "Doesn't include: custom Shopify app development, advanced B2B features, headless architecture",
        ],
      },
      { type: "h3", text: "Tier 3: Enterprise / Shopify Plus ($40,000 – $150,000+)" },
      {
        type: "p",
        text: "Enterprise-level builds on Shopify Plus, often involving headless architecture, custom app development, and deep third-party integrations (ERP, PIM, OMS). These projects are typically led by Shopify Plus Partners with specialist engineering teams.",
      },
      {
        type: "ul",
        items: [
          "Best for: large retailers, Shopify Plus merchants, businesses with complex operational requirements",
          "Typical timeline: 3–12 months",
          "Includes: custom app development, ERP/OMS/PIM integrations, performance engineering, multi-region or multi-store setup",
        ],
      },
      { type: "h2", text: "What Drives the Price Up?" },
      {
        type: "p",
        text: "Understanding the cost drivers helps you prioritise where to spend — and where to save. These factors most commonly push projects into a higher tier:",
      },
      {
        type: "ol",
        items: [
          "Custom functionality — any feature not available in Shopify's native toolset or the app ecosystem requires custom development; typical agency rates are $100–$200/hour",
          "Complex integrations — connecting Shopify to an ERP (NetSuite, SAP), PIM, or custom OMS is one of the biggest cost drivers at enterprise level",
          "Product catalogue complexity — a store with 10 products builds faster than one with 10,000 SKUs, complex variants, and custom metafields",
          "Bespoke UX design — full UX research, wireframing, and visual design adds $5,000–$15,000 but typically pays back through conversion rate improvements",
          "Headless architecture — using Shopify as a headless backend (with a Next.js or Hydrogen frontend) adds significant development cost but unlocks top-tier performance and flexibility",
        ],
      },
      { type: "h2", text: "Ongoing Monthly Costs After Launch" },
      {
        type: "p",
        text: "The build is a one-off investment. These are the recurring costs you'll pay every month:",
      },
      {
        type: "ul",
        items: [
          "Shopify plan: $39 – $399/month (or $2,300+/month for Plus)",
          "Essential apps (reviews, email, SEO, forms): $50 – $300/month",
          "Extended app stack (loyalty, upsells, subscriptions, helpdesk): $300 – $1,500+/month",
          "Domain and email hosting: $15 – $50/month",
          "Agency retainer for ongoing support or CRO: $500 – $5,000/month",
          "Hosting: included in Shopify's monthly fee — no separate server costs",
        ],
      },
      {
        type: "tip",
        text: "Total year-one cost for a mid-market Shopify store is typically $25,000–$70,000: build ($15k–$40k) + Shopify plan (~$1,260/year on Shopify plan) + apps ($3k–$6k/year) + agency support ($6k–$24k/year). Build this into your business case from day one.",
      },
      { type: "h2", text: "Hidden Costs Most Merchants Miss" },
      {
        type: "p",
        text: "These costs frequently catch merchants off guard after launch:",
      },
      {
        type: "ul",
        items: [
          "App subscriptions — easy to underestimate; a fully-featured app stack for a growing store can reach $500–$1,500/month",
          "Content and photography — professional product photography costs $500–$3,000; copywriting for a full store adds $1,000–$5,000",
          "Post-launch fixes and tweaks — even well-built stores need iteration; budget 10–15% of the build cost as a post-launch reserve",
          "Theme maintenance — major Shopify updates occasionally require theme updates; budget $500–$2,000/year for a custom theme",
          "App replacement costs — if a key app raises prices sharply or closes down, re-implementing the feature has a real development cost",
        ],
      },
      { type: "h2", text: "How to Get the Best Value from Your Budget" },
      {
        type: "ol",
        items: [
          "Get at least three agency quotes — prices for identical scopes vary by 2–4x between agencies; use the range to negotiate and identify outliers",
          "Separate must-haves from nice-to-haves — phase your build; launch with core functionality and add features in months 3–6",
          "Use apps before custom development — always check if a $50/month app solves your problem before paying $5,000 for bespoke code",
          "Match the build tier to your revenue stage — a custom $25,000 build is hard to justify on $200k revenue; a theme build often gets you 80% of the outcome at 20% of the cost",
          "Ask for a fixed-price contract — T&M (time and materials) projects can run over budget; a fixed-price quote protects you from scope creep when requirements are clear",
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How much does a basic Shopify store cost to build?", a: "A basic theme-based Shopify store built by an agency costs $2,000-$8,000. This includes theme setup, brand customisation, and product catalogue configuration with a typical timeline of 4-8 weeks." },
          { q: "How much does a custom Shopify website cost?", a: "A fully custom-designed Shopify store costs $8,000-$40,000 and includes UX/UI design, custom Liquid theme development, app integrations, and technical SEO setup over 8-16 weeks." },
          { q: "What are the ongoing monthly costs for a Shopify store?", a: "Monthly costs include the Shopify plan ($39-$399/month or $2,300+ for Plus), apps ($50-$1,500/month), domain/email ($15-$50/month), and optional agency retainer ($500-$5,000/month)." },
          { q: "Is it cheaper to build a Shopify store yourself?", a: "DIY with a premium theme costs $0-$500 upfront plus your monthly Shopify subscription. This works for simple stores, but agency expertise typically pays back through higher conversion rates for established brands." },
          { q: "What hidden costs should I budget for with Shopify?", a: "Common hidden costs include app subscriptions ($500-$1,500/month at scale), professional photography ($500-$3,000), post-launch fixes (10-15% of build cost), and theme maintenance ($500-$2,000/year)." },
        ],
      },
      {
        type: "cta",
        text: "Find an agency that fits your budget and requirements",
        href: "/get-matched",
        label: "Get Free Matched →",
      },
    ],
  },

  // ─── Post 4 ───────────────────────────────────────────────────────────────
  {
    slug: "shopify-migration-guide-woocommerce-magento",
    title: "Migrating to Shopify from WooCommerce or Magento: Complete Guide",
    excerpt:
      "Thinking of moving to Shopify? Here's everything you need to know about migrating from WooCommerce or Magento — without losing data, SEO, or customers.",
    date: "2026-02-08",
    readingTime: 9,
    author: "Shopify Agency Directory",
    category: "Migration Guide",
    tags: ["migration", "woocommerce", "magento", "shopify", "replatforming"],
    content: [
      {
        type: "p",
        text: "Replatforming to Shopify is one of the biggest technical projects an ecommerce business can undertake. Done well, it results in faster page speeds, lower maintenance overhead, and a better merchant experience. Done poorly, it can tank your SEO rankings and cost you months of revenue.",
      },
      {
        type: "p",
        text: "Here's a comprehensive guide to migrating to Shopify from WooCommerce or Magento — covering data, SEO, and everything in between.",
      },
      { type: "h2", text: "Why Merchants Move to Shopify" },
      {
        type: "ul",
        items: [
          "Lower total cost of ownership — no server management, security patches, or hosting headaches",
          "Faster page performance out of the box",
          "Better checkout conversion rates (Shopify's checkout converts at ~15% vs industry average of ~2.5%)",
          "Easier to find agencies and developers",
          "More reliable uptime during peak sales events",
          "Shopify's ongoing investment in the platform (new features released constantly)",
        ],
      },
      { type: "h2", text: "What Needs to Be Migrated" },
      {
        type: "p",
        text: "A full replatform involves migrating significantly more than just your products. Here's the complete list:",
      },
      {
        type: "ul",
        items: [
          "Products — titles, descriptions, images, variants, SKUs, metafields",
          "Collections and categories",
          "Customer accounts and order history",
          "Blog posts and content pages",
          "Redirects — critical for SEO (every old URL needs a 301 redirect)",
          "Reviews — if using a review platform like Yotpo or Judge.me",
          "Discount codes and gift cards",
          "Email subscriber lists",
        ],
      },
      { type: "h2", text: "Protecting Your SEO During Migration" },
      {
        type: "p",
        text: "SEO is where most migrations go wrong. Follow these steps to protect your rankings:",
      },
      {
        type: "ol",
        items: [
          "Crawl your existing site with Screaming Frog before migration to capture all URLs",
          "Map every old URL to its new Shopify equivalent",
          "Set up 301 redirects for all changed URLs — Shopify has a built-in redirect manager",
          "Migrate all meta titles and descriptions",
          "Ensure your new store's page speed is at least as fast as the old one",
          "Submit your new sitemap to Google Search Console immediately after launch",
          "Monitor Google Search Console for crawl errors in the weeks after launch",
        ],
      },
      {
        type: "tip",
        text: "Never launch a migration without a complete redirect map. Missing redirects are the single biggest cause of post-migration traffic drops.",
      },
      { type: "h2", text: "WooCommerce to Shopify: Key Differences" },
      {
        type: "p",
        text: "Coming from WooCommerce, the biggest adjustments are around theme structure (Liquid vs PHP), the app ecosystem (Shopify's is larger and more curated), and hosting (Shopify handles it all — no more WordPress maintenance).",
      },
      { type: "h2", text: "Magento to Shopify: Key Differences" },
      {
        type: "p",
        text: "Magento migrations are typically more complex due to Magento's deeper customisation. Custom modules usually need to be rebuilt as Shopify apps or replaced with off-the-shelf solutions. Budget 20–30% extra compared to a WooCommerce migration.",
      },
      { type: "h2", text: "How Long Does a Migration Take?" },
      {
        type: "ul",
        items: [
          "Small store (under 500 products): 4–8 weeks",
          "Medium store (500–5,000 products): 8–16 weeks",
          "Large/enterprise store (5,000+ products): 4–9 months",
        ],
      },
      {
        type: "faq",
        items: [
          { q: "How long does it take to migrate to Shopify?", a: "Small stores (under 500 products) take 4-8 weeks. Medium stores (500-5,000 products) take 8-16 weeks. Large enterprise stores with 5,000+ products can take 4-9 months." },
          { q: "Will I lose my SEO rankings when migrating to Shopify?", a: "Not if you set up proper 301 redirects for every changed URL, migrate all meta titles and descriptions, and submit your new sitemap to Google Search Console immediately after launch." },
          { q: "Can I migrate customer data from WooCommerce to Shopify?", a: "Yes. Customer accounts, order history, product data, reviews, blog posts, and email subscriber lists can all be migrated. Use CSV imports or a dedicated migration tool for bulk transfers." },
          { q: "Is migrating from Magento to Shopify more expensive?", a: "Yes, typically 20-30% more than a WooCommerce migration. Magento's deeper customisation means custom modules usually need to be rebuilt as Shopify apps or replaced with off-the-shelf solutions." },
        ],
      },
      {
        type: "cta",
        text: "Find a Shopify migration specialist",
        href: "/agencies?specialization=Migrations",
        label: "Browse Migration Agencies →",
      },
    ],
  },

  // ─── Post 5 ───────────────────────────────────────────────────────────────
  {
    slug: "best-shopify-review-apps-2026",
    title: "Best Shopify Review Apps in 2026: Yotpo vs Judge.me vs Okendo vs Stamped",
    excerpt:
      "Customer reviews can lift conversion rates by 15–30%. But which review app is actually worth paying for? We compare the four leading options side by side.",
    date: "2026-02-20",
    readingTime: 9,
    author: "Shopify Agency Directory",
    category: "Tools & Apps",
    tags: ["shopify apps", "reviews", "yotpo", "judge.me", "okendo", "stamped", "social proof"],
    content: [
      {
        type: "p",
        text: "Product reviews are one of the highest-ROI additions to any Shopify store. Studies consistently show that displaying reviews increases conversion rates by 15–30%, and review content improves SEO by adding unique, keyword-rich text to product pages. But the app market is crowded — and choosing the wrong one means paying for features you don't use, or missing features you need.",
      },
      {
        type: "p",
        text: "We've tested all four of the leading Shopify review apps across real stores ranging from small DTC brands to Shopify Plus merchants. Here's our honest verdict.",
      },
      { type: "h2", text: "Quick Comparison: At a Glance" },
      {
        type: "ul",
        items: [
          "Judge.me — best overall value; excellent free plan; fast loading; ideal for small to mid-size stores",
          "Yotpo — best enterprise option; combines reviews, loyalty, SMS, and referrals; highest price",
          "Okendo — best for DTC brands wanting rich UGC (photos, videos, attributes); strong integrations",
          "Stamped.io — best all-in-one platform; reviews + loyalty + referrals in one subscription",
        ],
      },
      { type: "h2", text: "1. Judge.me — Best for Value & Speed" },
      {
        type: "p",
        text: "Judge.me is the most widely installed review app on Shopify — and for good reason. Its free plan is genuinely generous, and even the paid plan (around $15/month) unlocks almost every feature most stores will ever need.",
      },
      {
        type: "ul",
        items: [
          "Free plan includes unlimited review requests, basic widgets, and SEO rich snippets",
          "Paid plan adds Q&A, Google Shopping integration, custom forms, and coupons",
          "Review request emails are among the best-performing in the industry",
          "Extremely fast — review widgets add almost no page weight",
          "Strong Klaviyo and Shopify Flow integrations",
        ],
      },
      {
        type: "tip",
        text: "Judge.me is the default recommendation for stores under $2M revenue. The $15/month plan covers 99% of what merchants need. Only upgrade to Yotpo or Okendo if you have specific enterprise requirements.",
      },
      { type: "h2", text: "2. Yotpo — Best Enterprise Platform" },
      {
        type: "p",
        text: "Yotpo has evolved from a review app into a full retention marketing suite. Reviews are just one module — you can also add SMS marketing, loyalty, referrals, and visual UGC under one platform and one bill.",
      },
      {
        type: "ul",
        items: [
          "Deep Shopify Plus integration including checkout extensibility",
          "Visual UGC (Instagram photos, video reviews) displayed natively in product pages",
          "Combine with Yotpo SMSBump for tightly integrated post-purchase flows",
          "Paid plans start at ~$15/month for basic reviews; enterprise pricing is bespoke",
          "Analytics dashboard is the strongest of any review app",
          "The main drawback: costs scale quickly as you add modules",
        ],
      },
      { type: "h2", text: "3. Okendo — Best for DTC Brands" },
      {
        type: "p",
        text: "Okendo has carved out a strong niche with DTC brands that care deeply about UGC quality and brand presentation. Its review widgets are the most visually polished of any app on this list.",
      },
      {
        type: "ul",
        items: [
          "Media reviews — photo and video uploads are beautiful and highly conversion-focused",
          "Review attributes (e.g., 'Fits True to Size', 'Great Quality') drive purchase confidence",
          "Micro-surveys capture structured feedback alongside reviews",
          "Strong integrations with Klaviyo, Gorgias, and Attentive",
          "Plans start at $19/month; mid-tier plans run $119–$299/month",
          "Best fit for brands in fashion, beauty, wellness, or lifestyle categories",
        ],
      },
      { type: "h2", text: "4. Stamped.io — Best All-in-One Stack" },
      {
        type: "p",
        text: "Stamped.io bundles reviews, loyalty, referrals, and visual UGC into a single subscription. If you want to consolidate your social proof and retention stack into one vendor, Stamped is worth serious consideration.",
      },
      {
        type: "ul",
        items: [
          "Reviews, NPS, Q&A, and loyalty points all available within one platform",
          "Google Shopping and structured data built in on all plans",
          "Loyalty module is competitive with Smile.io, especially at scale",
          "Plans start free; growth plans run $59–$149/month for the combined stack",
          "Slightly less polished UX than Okendo, but the value-per-feature ratio is strong",
        ],
      },
      { type: "h2", text: "Which App Should You Choose?" },
      {
        type: "ol",
        items: [
          "Starting out or under $500k revenue → Judge.me free or paid ($15/month)",
          "DTC brand focused on UGC and brand image → Okendo",
          "Shopify Plus merchant wanting a full retention suite → Yotpo",
          "Looking to consolidate reviews + loyalty into one platform → Stamped.io",
        ],
      },
      { type: "h2", text: "Installation Tips" },
      {
        type: "ul",
        items: [
          "Migrate existing reviews before switching apps — all four support CSV imports",
          "Set up automated review request emails immediately after install; timing matters (usually 7–14 days post-delivery)",
          "Enable rich snippets / structured data to get star ratings appearing in Google search results",
          "A/B test widget placement — below the fold vs above the fold can swing conversion by 5–10%",
        ],
      },
      {
        type: "cta",
        text: "Need help configuring the right app stack for your store?",
        href: "/get-matched",
        label: "Talk to a Shopify Agency →",
      },
    ],
  },

  // ─── Post 6 ───────────────────────────────────────────────────────────────
  {
    slug: "best-shopify-loyalty-apps-2026",
    title: "Best Shopify Loyalty & Rewards Apps in 2026: Smile.io vs LoyaltyLion vs Yotpo",
    excerpt:
      "Loyalty programmes increase repeat purchase rates by up to 40%. Here's a detailed comparison of the top Shopify loyalty apps to help you choose the right one.",
    date: "2026-02-25",
    readingTime: 8,
    author: "Shopify Agency Directory",
    category: "Tools & Apps",
    tags: ["shopify apps", "loyalty", "rewards", "smile.io", "loyaltylion", "retention", "ecommerce"],
    content: [
      {
        type: "p",
        text: "Acquiring a new customer costs five to seven times more than retaining an existing one. A well-designed loyalty programme is one of the most cost-effective growth levers available to Shopify merchants — and the right app makes the difference between a programme customers love and one they ignore.",
      },
      {
        type: "p",
        text: "Here's our in-depth comparison of the three leading Shopify loyalty apps in 2026, based on real implementations across stores of different sizes.",
      },
      { type: "h2", text: "What to Look for in a Loyalty App" },
      {
        type: "ul",
        items: [
          "Points and rewards flexibility — can you reward purchases, referrals, reviews, and social actions?",
          "Redemption options — discounts, free products, early access, or custom rewards",
          "Programme tiers (VIP) — do they support bronze/silver/gold or equivalent status levels?",
          "Email and SMS integration — can you trigger loyalty-specific flows in Klaviyo?",
          "Analytics — can you measure the programme's impact on CLV and repeat purchase rate?",
          "Shopify Plus compatibility — does it integrate with the checkout and POS?",
        ],
      },
      { type: "h2", text: "1. Smile.io — Best for Getting Started Fast" },
      {
        type: "p",
        text: "Smile.io is the most popular loyalty app on Shopify and for many stores, the easiest path from zero to a working programme. Setup takes hours rather than days, the default templates are solid, and the free plan is a genuine starting point.",
      },
      {
        type: "ul",
        items: [
          "Free plan available (limited to basic points and referrals, no VIP tiers)",
          "Starter plan from $49/month includes VIP tiers and branding customisation",
          "Growth plan ($199/month) adds Klaviyo integration and advanced analytics",
          "Points for purchases, referrals, reviews, birthdays, and social follows",
          "Embedded loyalty widget and dedicated /rewards page out of the box",
          "Best fit for stores doing $100k–$2M revenue",
        ],
      },
      {
        type: "tip",
        text: "The Smile + Judge.me combination is the most popular loyalty and reviews stack on Shopify. Both apps integrate with each other — customers earn points for leaving reviews, creating a powerful flywheel.",
      },
      { type: "h2", text: "2. LoyaltyLion — Best for Customisation" },
      {
        type: "p",
        text: "LoyaltyLion is the go-to choice for brands that want deep customisation, complex programme logic, and granular control over every aspect of the customer experience. It's more technical to set up than Smile.io, but the ceiling is much higher.",
      },
      {
        type: "ul",
        items: [
          "Highly configurable earning and redemption rules — far more flexible than Smile",
          "Full API access on higher plans — build custom loyalty experiences in your storefront",
          "Advanced segmentation — target loyalty campaigns to specific customer cohorts",
          "Checkout extensions for Shopify Plus — apply points at the native checkout",
          "Embedded analytics with CLV, repeat purchase rate, and programme ROI reporting",
          "Plans from $159/month; enterprise pricing for large stores",
          "Best fit for stores doing $1M+ revenue with complex loyalty requirements",
        ],
      },
      { type: "h2", text: "3. Yotpo Loyalty — Best for Suite Consolidation" },
      {
        type: "p",
        text: "If you're already using Yotpo for reviews (or considering it), the Yotpo Loyalty module is worth evaluating seriously. The tight integration between reviews, loyalty, SMS, and referrals within one platform creates meaningful synergies — customers earn points for leaving reviews, SMS flows trigger loyalty milestones, and analytics are unified.",
      },
      {
        type: "ul",
        items: [
          "Native integration with Yotpo Reviews, SMSBump, and Referrals — no extra setup",
          "Points, tiers, referrals, and VIP benefits all configurable from one dashboard",
          "Shopify Plus checkout extensibility — show loyalty points balance at checkout",
          "Strong for brands wanting to reduce vendor count and unify customer data",
          "Pricing is module-based; costs add up quickly but value is strong at scale",
          "Best fit for Shopify Plus stores already in the Yotpo ecosystem",
        ],
      },
      { type: "h2", text: "Loyalty Programme Best Practices" },
      {
        type: "ol",
        items: [
          "Launch with a simple programme first — too many earning actions confuses customers",
          "Make the redemption value clear: '$5 off for every 500 points' beats vague 'earn rewards'",
          "Add VIP tiers once you have data on top customer behaviour — typically 3–6 months post-launch",
          "Email new members within 24 hours explaining how to earn and redeem",
          "Reward actions beyond purchase — reviews, referrals, and social shares build community",
          "Review programme performance quarterly and adjust earning rates to improve ROI",
        ],
      },
      { type: "h2", text: "Our Recommendation" },
      {
        type: "ul",
        items: [
          "Under $500k revenue or just getting started → Smile.io (free or Starter plan)",
          "$500k–$5M revenue with specific customisation needs → LoyaltyLion",
          "Shopify Plus merchant already using Yotpo → Yotpo Loyalty",
          "Wanting reviews + loyalty under one bill → Stamped.io (also worth considering)",
        ],
      },
      {
        type: "cta",
        text: "Get expert help designing and implementing your loyalty programme",
        href: "/get-matched",
        label: "Find a Shopify Expert →",
      },
    ],
  },

  // ─── Post 7 ───────────────────────────────────────────────────────────────
  {
    slug: "best-shopify-themes-2026-review",
    title: "Best Shopify Themes in 2026: Dawn vs Impulse vs Prestige vs Turbo Reviewed",
    excerpt:
      "Your theme shapes every visitor's first impression and directly impacts your conversion rate. Here's our honest review of the best Shopify themes in 2026.",
    date: "2026-03-01",
    readingTime: 10,
    author: "Shopify Agency Directory",
    category: "Tools & Apps",
    tags: ["shopify themes", "dawn", "impulse", "prestige", "turbo", "theme review", "ecommerce design"],
    content: [
      {
        type: "p",
        text: "Your Shopify theme is the foundation of your store's design — it affects page speed, mobile experience, conversion rate, and how much custom development you'll need. Choosing the right theme upfront saves you thousands in development costs and months of frustration.",
      },
      {
        type: "p",
        text: "We've reviewed and built stores on every major Shopify theme. Here's our honest assessment of the four most important ones in 2026.",
      },
      { type: "h2", text: "What Makes a Great Shopify Theme?" },
      {
        type: "ul",
        items: [
          "Page speed — Core Web Vitals directly affect SEO rankings and conversion rate",
          "Mobile-first design — over 70% of Shopify traffic is now mobile",
          "Flexibility — sections and blocks that let you build pages without a developer",
          "App compatibility — does it play nicely with popular third-party apps?",
          "Active development — is the theme regularly updated for new Shopify features?",
          "Support quality — are bugs resolved quickly when they appear?",
        ],
      },
      { type: "h2", text: "1. Dawn — Best Free Theme" },
      {
        type: "p",
        text: "Dawn is Shopify's flagship free theme and was rebuilt from the ground up in 2021 as a showcase for OS 2.0 features. It's fast, clean, and surprisingly flexible for a free option.",
      },
      {
        type: "ul",
        items: [
          "Price: Free (maintained by Shopify)",
          "Best for: new stores, brands wanting a minimal aesthetic, merchants with a limited budget",
          "Core Web Vitals: Excellent — one of the fastest themes available",
          "Customisation: Sections and blocks on every page; good without code",
          "Notable features: predictive search, cart drawer, image zoom, multi-column menus",
          "Limitations: design is minimal and similar to thousands of other stores using it",
        ],
      },
      {
        type: "tip",
        text: "Dawn is a genuinely good starting point. If you're a new store, launch on Dawn, prove your concept, then invest in a premium theme or custom design once revenue supports it.",
      },
      { type: "h2", text: "2. Impulse — Best for Fashion & Lifestyle Brands" },
      {
        type: "p",
        text: "Impulse by Archetype Themes is one of the best-selling premium Shopify themes and a favourite among fashion, apparel, and lifestyle brands. It strikes an excellent balance between visual impact and performance.",
      },
      {
        type: "ul",
        items: [
          "Price: $380 one-off (Shopify Theme Store)",
          "Best for: fashion, apparel, beauty, lifestyle, and brands with strong visual identity",
          "Core Web Vitals: Very good — Archetype has invested heavily in performance",
          "Customisation: Excellent section coverage; advanced promotional features built in",
          "Notable features: colour swatches, quick-add-to-cart, announcement bar rotator, mega menu",
          "Agency favourite: widely used by UK and US agencies — easy to find developers familiar with it",
        ],
      },
      { type: "h2", text: "3. Prestige — Best for Luxury & Premium Brands" },
      {
        type: "p",
        text: "Prestige is the go-to theme for luxury, high-AOV, and aspirational brands. Developed by Maestrooo, it's built with editorial storytelling in mind — large imagery, refined typography, and a premium feel that cheaper themes can't replicate.",
      },
      {
        type: "ul",
        items: [
          "Price: $380 one-off (Shopify Theme Store)",
          "Best for: luxury, jewellery, fashion, interiors, wine, and high-AOV brands",
          "Core Web Vitals: Good — image-heavy by nature so requires careful optimisation",
          "Customisation: Strong, with a focus on content and storytelling sections",
          "Notable features: lookbook sections, age verification, sticky header with cart, variant image groups",
          "Watch out for: image-heavy designs need good image compression to maintain page speed",
        ],
      },
      { type: "h2", text: "4. Turbo — Best for Large Catalogues" },
      {
        type: "p",
        text: "Turbo by Out of the Sandbox is the most feature-rich premium theme available for Shopify and has been a favourite of agencies for nearly a decade. If you have a large product catalogue, complex navigation, or need maximum configuration options without custom development, Turbo delivers.",
      },
      {
        type: "ul",
        items: [
          "Price: $385 one-off (Out of the Sandbox)",
          "Best for: large catalogues, multi-brand stores, stores with complex product ranges",
          "Core Web Vitals: Good; Turbo introduced performance-focused updates in 2023–24",
          "Customisation: The most customisable theme available without writing code",
          "Notable features: Ajax cart, predictive search, mega menus, multiple homepage layouts, product filtering",
          "Agency notes: steeper learning curve than Impulse or Prestige; worth it for complex builds",
        ],
      },
      { type: "h2", text: "Honourable Mentions" },
      {
        type: "ul",
        items: [
          "Sense (free) — Shopify's best free theme for health and beauty",
          "Craft (free) — ideal for artisan, handmade, or small-batch product brands",
          "Motion by Archetype — best theme for brands wanting video and animation",
          "Symmetry by Clean Canvas — strong for stores with complex product variants",
          "Streamline by Fluorescent — popular with outdoor, fitness, and lifestyle brands",
        ],
      },
      { type: "h2", text: "Free vs Premium: Is It Worth Paying?" },
      {
        type: "p",
        text: "A premium theme costs $280–$380 as a one-off purchase. At even a 1% conversion rate improvement on a store doing $50k/month, that pays back in days. More importantly, premium themes reduce your reliance on expensive custom development — a good theme can save you $2,000–$5,000 in agency fees by building in features you'd otherwise need coded.",
      },
      {
        type: "ol",
        items: [
          "New store, minimal budget → Start with Dawn (free)",
          "Fashion or lifestyle brand → Impulse ($380)",
          "Luxury or high-AOV brand → Prestige ($380)",
          "Large catalogue or complex navigation → Turbo ($385)",
          "Wanting video and animation → Motion ($380)",
        ],
      },
      {
        type: "cta",
        text: "Need an agency to customise your Shopify theme to perfection?",
        href: "/agencies?specialization=Theme+Development",
        label: "Browse Theme Agencies →",
      },
    ],
  },

  // ─── Post 8 (original Post 5) ─────────────────────────────────────────────
  {
    slug: "best-shopify-apps-2026",
    title: "The 20 Best Shopify Apps in 2026 (Tested & Ranked)",
    excerpt:
      "With 10,000+ apps in the Shopify App Store, how do you know which ones are worth it? We've tested the best apps across every category.",
    date: "2026-02-15",
    readingTime: 10,
    author: "Shopify Agency Directory",
    category: "Tools & Apps",
    tags: ["shopify apps", "tools", "ecommerce", "recommendations"],
    content: [
      {
        type: "p",
        text: "The Shopify App Store has over 10,000 apps. Most of them are mediocre. A handful are genuinely transformative. This is our curated list of the best Shopify apps in 2026 — tested across real stores, not just based on review counts.",
      },
      { type: "h2", text: "Reviews & Social Proof" },
      {
        type: "ul",
        items: [
          "Judge.me — best value reviews app, generous free plan, fast loading",
          "Yotpo — enterprise-grade reviews with SMS and loyalty, higher cost but powerful",
          "Okendo — popular with DTC brands, excellent UGC features",
        ],
      },
      { type: "h2", text: "Email & SMS Marketing" },
      {
        type: "ul",
        items: [
          "Klaviyo — the gold standard for Shopify email marketing, deep segmentation",
          "Omnisend — strong email + SMS at a lower price point than Klaviyo",
          "Postscript — best dedicated SMS marketing app",
        ],
      },
      { type: "h2", text: "Upsells & Conversion" },
      {
        type: "ul",
        items: [
          "ReConvert — post-purchase upsells, ROI pays for itself quickly",
          "Zipify Pages — best landing page builder for Shopify",
          "Frequently Bought Together — Amazon-style product bundling",
        ],
      },
      { type: "h2", text: "Subscriptions & Recurring Revenue" },
      {
        type: "ul",
        items: [
          "Recharge — market leader for subscription commerce",
          "Skio — modern subscription platform with better analytics than Recharge",
          "Bold Subscriptions — strong for complex subscription logic",
        ],
      },
      { type: "h2", text: "Loyalty & Retention" },
      {
        type: "ul",
        items: [
          "Smile.io — best loyalty programme app, easy to set up",
          "LoyaltyLion — more customisable than Smile, better for enterprise",
          "Stamped.io — combines reviews, loyalty, and referrals in one platform",
        ],
      },
      { type: "h2", text: "Shipping & Fulfilment" },
      {
        type: "ul",
        items: [
          "ShipStation — best for multi-carrier shipping management",
          "Shipbob — if you want to outsource fulfilment entirely",
          "Parcel Panel — best order tracking experience for customers",
        ],
      },
      { type: "h2", text: "SEO" },
      {
        type: "ul",
        items: [
          "SEO Manager — comprehensive SEO toolkit built for Shopify",
          "Plug In SEO — good free option for smaller stores",
          "Schema Plus — adds advanced structured data to your store",
        ],
      },
      {
        type: "tip",
        text: "Every app you add slows your store slightly. Audit your app list quarterly and remove anything you're not actively using. Page speed directly impacts conversion rate.",
      },
      {
        type: "cta",
        text: "Need help choosing and configuring the right app stack?",
        href: "/get-matched",
        label: "Talk to an Agency →",
      },
    ],
  },

  // ─── Post 9 ── Hiring Guide: Red Flags ────────────────────────────────────
  {
    slug: "shopify-agency-red-flags",
    title: "Shopify Agency Red Flags: 12 Warning Signs to Spot Before You Sign",
    excerpt:
      "Not every agency that claims Shopify expertise has it. Here are 12 concrete warning signs that predict a bad project outcome — and how to spot them before you commit.",
    date: "2026-02-03",
    readingTime: 9,
    author: "Shopify Agency Directory",
    category: "Hiring Guide",
    tags: ["hiring", "shopify agency", "red flags", "agency vetting", "ecommerce"],
    content: [
      {
        type: "p",
        text: "Hiring the wrong Shopify agency is one of the most expensive mistakes an ecommerce business can make. A bad project doesn't just cost you money — it costs you months of momentum, opportunity, and sometimes SEO rankings you've spent years building. The frustrating reality is that most agencies look credible from the outside. Good websites, polished decks, and a confident sales process don't tell you much about execution quality.",
      },
      {
        type: "p",
        text: "These 12 warning signs are the ones that most reliably predict a failed or disappointing engagement. Learn to spot them early.",
      },
      { type: "h2", text: "1. They Quote Without Understanding Your Business" },
      {
        type: "p",
        text: "Any agency that sends you a proposal within 24 hours of your first conversation — without a proper discovery call or written brief — is not taking your project seriously. Good agencies ask questions. They want to understand your current tech stack, your customers, your business model, your growth goals, and your constraints before putting a number on anything.",
      },
      {
        type: "tip",
        text: "A discovery call should last at least 45 minutes. If an agency skips this step or rushes through it, their proposal is a guess — and the scope creep will start from day one.",
      },
      { type: "h2", text: "2. No Questions About Your Existing Tech Stack" },
      {
        type: "p",
        text: "Professional agencies investigate before prescribing. If they don't ask about your current apps, integrations, third-party systems, and any custom code before starting work, they'll be flying blind. This is how you end up with app conflicts, broken features, and emergency fixes a week after launch.",
      },
      { type: "h2", text: "3. Every Portfolio Site Looks the Same" },
      {
        type: "p",
        text: "A strong agency portfolio shows range. If every site in their portfolio has an almost identical layout, colour palette, or structure, the agency is applying a template rather than solving each client's unique problem. Great design solves specific problems for specific audiences — it doesn't clone the same solution repeatedly.",
      },
      { type: "h2", text: "4. They Guarantee SEO Rankings" },
      {
        type: "p",
        text: "No one can guarantee specific Google rankings. Any agency that promises 'page one in 30 days' or guarantees a specific number of keyword positions is either being dishonest or planning to use black-hat tactics that will harm your domain long-term. Ethical SEO takes 3–6 months minimum and comes with probability, not guarantees.",
      },
      { type: "h2", text: "5. Vague or Padded Proposals" },
      {
        type: "p",
        text: "Watch out for proposals full of agency buzzwords ('omnichannel ecosystem', 'synergistic digital strategy', 'frictionless customer journeys') with no concrete deliverables. A good proposal names specific pages to be built, features to be developed, milestones to be hit, and acceptance criteria for each. If you can't point to exactly what you're paying for, renegotiate or walk away.",
      },
      { type: "h2", text: "6. No Post-Launch Support Plan" },
      {
        type: "p",
        text: "Launches break things. Bugs appear. Apps conflict. Traffic spikes expose performance issues. Any agency that doesn't have a clear post-launch support offering — even a basic 30-day warranty period — is planning to hand over and disappear. Ask specifically: 'What is your process for bugs discovered in the first 30 days after launch?' A confident agency will have a clear answer.",
      },
      { type: "h2", text: "7. Pressure to Sign Quickly" },
      {
        type: "p",
        text: "Legitimate agencies don't use high-pressure sales tactics. 'This slot is only available until Friday' or 'we have two other clients looking at the same timeline' are manipulation techniques, not genuine constraints. Good agencies plan their capacity carefully — they don't rush you into a contract.",
      },
      { type: "h2", text: "8. They Can't Name Who Will Work on Your Project" },
      {
        type: "p",
        text: "Ask specifically: 'Who will be my day-to-day developer and project manager?' If the answer is vague — 'our team' or 'we'll assign the best people' — be cautious. Many agencies win work with senior people and deliver with juniors or offshore contractors. You have the right to know who will actually build your store and what their Shopify experience is.",
      },
      { type: "h2", text: "9. No References From Comparable Projects" },
      {
        type: "p",
        text: "Any credible agency will connect you with 2–3 happy clients from comparable projects. If an agency claims NDA restrictions on all their clients, or can only offer references from very small or very different projects, that's a warning sign. Ask to speak to a client who ran a similar project — similar budget, similar complexity, similar category.",
      },
      { type: "h2", text: "10. Unusual Payment Terms" },
      {
        type: "p",
        text: "Standard agency payment terms are typically 30–50% upfront, with the remainder tied to milestones or delivery. Be wary of agencies asking for 100% upfront, or agencies offering very low upfront fees that spike in the second half. Both structures can incentivise poor behaviour. Milestone-based payments keep the agency accountable throughout the project.",
      },
      { type: "h2", text: "11. They Dismiss Your Concerns Rather Than Address Them" },
      {
        type: "p",
        text: "Pay close attention to how an agency handles your questions during the sales process. If you raise a concern and they dismiss it, deflect, or over-promise without substance, this is exactly how they'll behave when problems arise mid-project. A trustworthy agency acknowledges complexity, explains trade-offs, and gives you honest assessments rather than just telling you what you want to hear.",
      },
      { type: "h2", text: "12. No Formal Handover or Documentation Process" },
      {
        type: "p",
        text: "When a project ends, you need to own it completely. This means receiving: all login credentials, custom code with comments, a list of all installed apps and their configurations, documentation of any custom integrations, and a theme backup. Agencies that don't have a documented handover process often leave clients locked out, dependent, or unable to onboard a new agency later.",
      },
      { type: "h2", text: "What Good Looks Like" },
      {
        type: "ul",
        items: [
          "A thorough discovery call before any proposal",
          "A proposal with named deliverables, milestones, and acceptance criteria",
          "Clear post-launch support terms in the contract",
          "Named team members who you can meet before signing",
          "2–3 references from comparable projects you can actually call",
          "Milestone-based payment structure",
          "A documented handover and offboarding process",
        ],
      },
      {
        type: "faq",
        items: [
          { q: "What is the biggest red flag when hiring a Shopify agency?", a: "Quoting without understanding your business. Any agency that sends a proposal without a proper discovery call is guessing at scope, which leads to budget overruns and missed expectations." },
          { q: "Should I always choose the cheapest Shopify agency?", a: "No. A $10,000 project that runs over to $25,000 due to scope creep is worse value than a transparent $18,000 fixed-price quote. Evaluate proposals on clarity, not just price." },
          { q: "How much should I pay upfront to a Shopify agency?", a: "Standard payment terms are 30-50% upfront with the remainder tied to milestones. Be wary of agencies asking for 100% upfront or unusually low initial fees that spike later." },
          { q: "How do I verify a Shopify agency is legitimate?", a: "Check their Shopify Partner status, visit live stores in their portfolio on mobile, ask for 2-3 client references from comparable projects, and confirm who will actually work on your project." },
        ],
      },
      {
        type: "cta",
        text: "Browse verified Shopify agencies with transparent portfolios and real client reviews.",
        href: "/agencies",
        label: "Find a Verified Agency →",
      },
    ],
  },

  // ─── Post 10 ── Hiring Guide: Brief Template ───────────────────────────────
  {
    slug: "how-to-brief-a-shopify-agency",
    title: "How to Brief a Shopify Agency: The Exact Template We Use",
    excerpt:
      "A well-written brief gets you better proposals, fewer surprises, and a project that actually delivers what you envisioned. Here's the exact framework to use.",
    date: "2026-02-24",
    readingTime: 8,
    author: "Shopify Agency Directory",
    category: "Hiring Guide",
    tags: ["hiring", "shopify agency", "project brief", "rfp", "ecommerce"],
    content: [
      {
        type: "p",
        text: "The quality of the brief you send an agency directly determines the quality of the proposal you receive. A vague brief gets vague proposals. A precise brief gets precise proposals — with accurate budgets, realistic timelines, and agencies who actually understand what they're getting into.",
      },
      {
        type: "p",
        text: "Most merchants underinvest in their brief. They send a few bullet points or a short email and hope agencies will figure out the rest. The result is proposals that are incomparable (agencies have interpreted the brief differently), scopes that drift from day one, and costs that escalate unpredictably.",
      },
      {
        type: "p",
        text: "Here is the exact framework for a Shopify agency brief that gets you better outcomes.",
      },
      { type: "h2", text: "Section 1: Company Overview (1 page max)" },
      {
        type: "p",
        text: "Give agencies the context they need to understand your brand, your market, and your customers. This isn't marketing copy — it's background information to help the agency understand your world.",
      },
      {
        type: "ul",
        items: [
          "What your business does and what you sell",
          "Your target audience — who buys from you and why",
          "Your current annual revenue range (approximate is fine)",
          "Key competitors — who do you respect in your category?",
          "Your brand personality and any brand guidelines you have",
          "Current platform — what are you migrating from, or is this a new build?",
        ],
      },
      { type: "h2", text: "Section 2: Project Objectives" },
      {
        type: "p",
        text: "Be specific about what success looks like. Agencies need to understand the business problem you're solving — not just the deliverable you want. Good objectives are measurable.",
      },
      {
        type: "ul",
        items: [
          "What is the primary business goal? (e.g. improve conversion rate from 1.8% to 2.5%, reduce cart abandonment, launch into 3 new markets)",
          "What are the secondary goals? (e.g. reduce page load time, improve mobile experience, enable wholesale B2B)",
          "What does failure look like? What outcome would make this project a disappointment?",
          "What is the must-have outcome vs. nice-to-have outcome?",
        ],
      },
      {
        type: "tip",
        text: "The clearer you are about objectives, the better proposals you'll get. Agencies price and plan differently for 'improve conversion rate' vs 'build a new homepage' — even though the deliverable might be similar.",
      },
      { type: "h2", text: "Section 3: Scope of Work" },
      {
        type: "p",
        text: "List every page, feature, and integration you need. Be exhaustive. Anything not in the brief risks becoming a change request later.",
      },
      {
        type: "ul",
        items: [
          "Pages required: homepage, collection pages, product pages, cart, checkout, about, contact, blog, custom pages",
          "Custom features: product configurators, subscription logic, wholesale pricing, multi-currency, loyalty integration",
          "Third-party integrations: ERP, CRM, email marketing, loyalty, reviews, returns management",
          "Shopify plan: standard Shopify or Shopify Plus? (determines checkout customisation options)",
          "Content: will you provide copy and images, or does the agency need to source/create them?",
          "Data migration: what needs to move from your existing platform? (products, customers, orders, reviews)",
        ],
      },
      { type: "h2", text: "Section 4: Technical Requirements" },
      {
        type: "ul",
        items: [
          "Current app stack: list every app you currently use and want to keep",
          "Custom integrations: any existing API connections to other systems",
          "Performance requirements: specific PageSpeed targets, if any",
          "Accessibility requirements: WCAG 2.1 AA compliance, if required",
          "Multi-language or multi-currency requirements",
          "Any known technical constraints or legacy code issues",
        ],
      },
      { type: "h2", text: "Section 5: Design Direction" },
      {
        type: "p",
        text: "Even if you're using a theme rather than building from scratch, give agencies your design direction to help them scope correctly.",
      },
      {
        type: "ul",
        items: [
          "Brand assets: do you have a full brand identity (logo, fonts, colour palette, imagery guidelines)?",
          "Inspiration sites: share 3–5 Shopify stores you admire and say specifically what you like about each",
          "Existing assets: what photography, video, and copy do you already have vs. need created?",
          "Theme preference: open to premium themes, or looking for a bespoke custom build?",
        ],
      },
      { type: "h2", text: "Section 6: Timeline & Budget" },
      {
        type: "p",
        text: "Be transparent about both. Agencies calibrate their proposals to your budget — if you hide your budget, you'll get proposals ranging from $5,000 to $150,000 with no way to compare them fairly.",
      },
      {
        type: "ul",
        items: [
          "Target launch date — is it fixed (e.g. tied to a product launch or sale period) or flexible?",
          "Budget range — give a range rather than a single number (e.g. '$15,000–$25,000 for the initial build')",
          "Ongoing budget — are you looking for ongoing support/retainer post-launch?",
          "Payment preference — milestone-based is standard; note if you require specific terms",
        ],
      },
      { type: "h2", text: "Section 7: Selection Criteria" },
      {
        type: "p",
        text: "Tell agencies how you'll evaluate proposals. This signals professionalism and helps agencies tailor their response to what actually matters to you.",
      },
      {
        type: "ul",
        items: [
          "Relevant Shopify experience (specific industry or project type)",
          "Team quality and named individuals who will work on the project",
          "Proposed approach and methodology",
          "References from comparable projects",
          "Price and value",
          "Communication style and cultural fit",
        ],
      },
      { type: "h2", text: "Section 8: Process & Next Steps" },
      {
        type: "ul",
        items: [
          "Proposal deadline — give agencies at least 7–10 business days to respond properly",
          "Proposal format — ask for: executive summary, proposed approach, team bios, timeline, itemised budget, references",
          "Q&A process — will you hold a group briefing call, or answer questions by email?",
          "Decision timeline — when will you notify the successful agency?",
          "Contract terms — note any specific contract requirements upfront (e.g. IP ownership, confidentiality)",
        ],
      },
      {
        type: "tip",
        text: "Send your brief to 3–5 agencies maximum. More than that and you're wasting everyone's time, including your own. Use your brief quality and shortlisting process to get to the right 3–5.",
      },
      {
        type: "cta",
        text: "Ready to send your brief? Browse our directory of verified Shopify agencies.",
        href: "/agencies",
        label: "Browse Agencies →",
      },
    ],
  },

  // ─── Post 11 ── SEO Guide ─────────────────────────────────────────────────
  {
    slug: "shopify-seo-guide-2026",
    title: "Shopify SEO in 2026: The Complete Guide for Ecommerce Merchants",
    excerpt:
      "Over 50% of ecommerce traffic comes from organic search. This step-by-step Shopify SEO guide covers technical setup, on-page optimisation, content strategy, and the tools that actually move the needle.",
    date: "2026-02-10",
    readingTime: 12,
    author: "Shopify Agency Directory",
    category: "SEO",
    tags: ["shopify seo", "technical seo", "ecommerce seo", "on-page seo", "site speed"],
    content: [
      {
        type: "p",
        text: "Search engine optimisation is the highest-ROI marketing channel available to most ecommerce merchants. Unlike paid ads, organic traffic compounds over time — rankings you earn today can deliver revenue for years. Yet most Shopify stores leave significant organic opportunity on the table because they don't address the technical and content fundamentals. This guide covers exactly what matters in 2026.",
      },
      { type: "h2", text: "Why SEO Is More Important Than Ever in 2026" },
      {
        type: "ul",
        items: [
          "Over 50% of all ecommerce traffic still comes from organic search",
          "Google's AI Overviews (SGE) reward well-structured, authoritative content — not keyword stuffing",
          "Paid ad costs have risen sharply — SEO is often 5–10× cheaper per acquisition at scale",
          "Unlike ads, SEO builds lasting brand equity and domain authority",
          "Merchants who invested in SEO early have a compounding competitive advantage",
        ],
      },
      { type: "h2", text: "1. Technical SEO Foundations" },
      {
        type: "p",
        text: "Technical SEO is the foundation everything else sits on. If search engines can't crawl, index, or understand your store correctly, no amount of great content will compensate. Run a technical audit before anything else.",
      },
      {
        type: "h3",
        text: "Fix These Technical Issues First",
      },
      {
        type: "ul",
        items: [
          "Duplicate content — Shopify creates duplicate URLs for products in multiple collections; canonical tags fix this (Shopify adds them automatically, but verify)",
          "Broken links and missing images — use Google Search Console to identify 404 errors and fix them with 301 redirects",
          "Missing or thin meta titles/descriptions — every product, collection, and blog post needs unique, keyword-rich metadata",
          "Uncompressed images — large images are the #1 cause of slow Shopify stores; compress everything with WebP where possible",
          "Unused apps — each installed app can inject extra JavaScript; apps you're not using still slow your store",
        ],
      },
      {
        type: "tip",
        text: "Submit your sitemap to Google Search Console (yourstore.com/sitemap.xml). Shopify generates this automatically. Once submitted, monitor crawl stats and indexing errors weekly.",
      },
      { type: "h2", text: "2. Page Speed Optimisation" },
      {
        type: "p",
        text: "Google uses Core Web Vitals as a ranking signal. Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) all affect both rankings and conversion rate. A 1-second delay in page load time can reduce conversions by 7%.",
      },
      {
        type: "ul",
        items: [
          "Use Google PageSpeed Insights or GTmetrix to benchmark your store — aim for LCP under 2.5 seconds",
          "Choose a fast theme — Dawn (Shopify's free default) scores well; avoid heavy premium themes with excessive animations",
          "Compress and lazy-load images — use apps like TinyIMG or Crush.pics",
          "Reduce app bloat — audit your installed apps and remove anything not actively generating ROI",
          "Avoid large hero videos on mobile — they dramatically increase load time",
          "Enable Shopify's built-in CDN — it's on by default but verify your images are served via cdn.shopify.com",
        ],
      },
      { type: "h2", text: "3. On-Page SEO: Products, Collections & Blog" },
      {
        type: "h3",
        text: "Product Pages",
      },
      {
        type: "ul",
        items: [
          "Write unique product descriptions — never use manufacturer copy verbatim; Google penalises thin/duplicate content",
          "Include the primary keyword naturally in the product title and first paragraph of description",
          "Optimise image alt text with descriptive, keyword-relevant text (e.g., 'black leather wallet mens bifold' not 'IMG_001')",
          "Keep meta titles under 60 characters; meta descriptions under 155 characters",
          "Add customer reviews — UGC adds fresh content and improves dwell time",
        ],
      },
      {
        type: "h3",
        text: "Collection Pages",
      },
      {
        type: "ul",
        items: [
          "Collection pages often have the highest commercial keyword value — treat them like landing pages",
          "Add 150–300 words of descriptive content above or below the product grid",
          "Use keyword-rich collection handles (e.g., /collections/mens-running-shoes not /collections/cat-123)",
          "Internal link from collection pages to related collections and blog posts",
        ],
      },
      {
        type: "h3",
        text: "Blog Content",
      },
      {
        type: "p",
        text: "Shopify includes a built-in blog. Use it to target informational queries that your product pages can't rank for — 'how to', 'best', 'vs', 'guide' content. This drives top-of-funnel traffic that you can convert through internal links to products and collections.",
      },
      { type: "h2", text: "4. Structured Data (Schema Markup)" },
      {
        type: "p",
        text: "Schema markup helps Google understand your content and enables rich results — star ratings, prices, and availability showing directly in search results. These increase click-through rates by an average of 20–30%.",
      },
      {
        type: "ul",
        items: [
          "Product schema — Shopify themes include basic product schema by default; verify it with Google's Rich Results Test",
          "Review/rating schema — apps like Judge.me and Yotpo inject review schema automatically",
          "Article schema — important for blog posts to qualify for Google News and article rich results",
          "BreadcrumbList schema — helps Google understand site structure and appears in search snippets",
          "Use the JSON-LD for SEO app or Smart SEO to add and manage schema without touching code",
        ],
      },
      { type: "h2", text: "5. URL Structure & Internal Linking" },
      {
        type: "p",
        text: "Shopify forces certain URL structures (/products/, /collections/, /blogs/) that you can't change. Work within these constraints by making product handles and collection handles as clean and keyword-rich as possible.",
      },
      {
        type: "ul",
        items: [
          "Keep URL handles short and descriptive — /products/organic-green-tea not /products/product-1234",
          "Avoid stop words in handles ('the', 'and', 'of')",
          "If you change a URL, always set up a 301 redirect — Shopify's Online Store > Navigation > URL Redirects",
          "Build a logical internal link structure: homepage → collections → products → blog posts → back to collections",
          "Include links to relevant products and collections within every blog post",
        ],
      },
      { type: "h2", text: "6. Link Building & Off-Page SEO" },
      {
        type: "p",
        text: "Backlinks from authoritative external sites remain one of Google's strongest ranking signals. You don't need thousands of links — a handful of high-quality, relevant links outperforms hundreds of low-quality ones.",
      },
      {
        type: "ul",
        items: [
          "Earn links through genuinely useful content — comprehensive guides, original research, and comparison posts attract natural backlinks",
          "Partner with complementary brands for co-marketing and mutual links",
          "Get listed in niche directories relevant to your products",
          "PR and media coverage — a mention in a respected publication can drive significant domain authority",
          "Supplier and manufacturer pages — ask if they list retailers; many do",
          "Avoid link farms, PBNs, or paid link schemes — Google penalties can tank your rankings for months",
        ],
      },
      { type: "h2", text: "7. Tracking & Measurement" },
      {
        type: "ul",
        items: [
          "Google Search Console — free, essential; shows impressions, clicks, rankings, crawl errors",
          "Google Analytics 4 — track organic traffic, conversion rates, and revenue by landing page",
          "Ahrefs or Semrush — track keyword rankings over time, identify link opportunities, audit competitors",
          "Core Web Vitals monitoring — set up alerts for LCP/CLS/INP regressions after theme or app changes",
        ],
      },
      {
        type: "tip",
        text: "Don't obsess over rankings in isolation. A keyword ranking #3 with 500 monthly searches and high buyer intent is more valuable than ranking #1 for a keyword with 5,000 searches and no commercial intent.",
      },
      {
        type: "faq",
        items: [
          { q: "Does Shopify have good SEO out of the box?", a: "Shopify provides solid SEO foundations including auto-generated sitemaps, canonical tags, SSL, and mobile-responsive themes. However, it has limitations like forced URL structures and potential duplicate content that require manual optimisation." },
          { q: "How long does it take to see SEO results on Shopify?", a: "Meaningful SEO results typically take 3-6 months. Technical fixes can show impact within weeks, but content-driven and link-building strategies compound over time with the biggest gains at 6-12 months." },
          { q: "What is the most important SEO factor for Shopify stores?", a: "Page speed and Core Web Vitals are the most impactful technical factor. For rankings, unique product descriptions and collection page content with strong internal linking drive the most commercial traffic." },
          { q: "Do Shopify apps hurt my SEO?", a: "Yes, unused or poorly coded apps inject extra JavaScript that slows your store. Audit your app list quarterly and remove anything not actively generating ROI. Page speed directly impacts both rankings and conversion rate." },
          { q: "How do I get star ratings to show in Google for my Shopify store?", a: "Enable structured data (schema markup) for products and reviews. Apps like Judge.me and Yotpo inject review schema automatically. Verify with Google's Rich Results Test to confirm star ratings will display in search results." },
        ],
      },
      {
        type: "cta",
        text: "Want an SEO-specialist agency to audit and grow your Shopify store's organic traffic?",
        href: "/agencies?specialization=SEO",
        label: "Find an SEO Agency →",
      },
    ],
  },

  // ─── Post 10 ───────────────────────────────────────────────────────────────
  {
    slug: "how-to-hire-a-shopify-seo-agency",
    title: "How to Hire a Shopify SEO Agency: 10 Questions to Ask Before You Sign",
    excerpt:
      "Hiring the wrong SEO agency is an expensive mistake. Here are the 10 questions every Shopify merchant should ask before signing a contract — and what good answers look like.",
    date: "2026-02-17",
    readingTime: 8,
    author: "Shopify Agency Directory",
    category: "SEO",
    tags: ["hire seo agency", "shopify seo agency", "ecommerce seo", "agency vetting"],
    content: [
      {
        type: "p",
        text: "There's no shortage of agencies claiming to 'do Shopify SEO'. But the quality gap between the best and worst providers is enormous. A good SEO agency compounds your organic traffic month over month; a bad one burns your budget on low-impact tactics while your rankings stagnate — or worse, decline. Asking the right questions upfront separates genuine experts from generalist agencies who have added 'Shopify SEO' to their service list.",
      },
      { type: "h2", text: "Before You Start: Define What Success Looks Like" },
      {
        type: "p",
        text: "Before you interview any agency, be clear on your own goals. Are you trying to reduce reliance on paid ads? Break into a competitive product category? Recover from a Google algorithm penalty? The more specific your objective, the better you can evaluate whether an agency's approach is right for you.",
      },
      { type: "h2", text: "The 10 Questions to Ask Every Agency" },
      {
        type: "h3",
        text: "1. How do you define SEO success for an ecommerce client?",
      },
      {
        type: "p",
        text: "If the agency's primary answer is 'improved keyword rankings', be cautious. Rankings are an input, not an outcome. Strong agencies define success in business terms: organic revenue, qualified traffic, reduced customer acquisition cost, and conversion rate improvements tied to SEO changes.",
      },
      {
        type: "h3",
        text: "2. Can you show me results from a Shopify client in a similar category?",
      },
      {
        type: "p",
        text: "Any credible agency will have case studies. Look for specifics: what was the starting position, what was done, and what measurably changed? Be wary of agencies who claim NDA restrictions prevent them sharing any examples — that's often a sign of a thin portfolio.",
      },
      {
        type: "h3",
        text: "3. How do you handle Shopify's technical SEO limitations?",
      },
      {
        type: "p",
        text: "Shopify has known SEO constraints — forced URL structures (/products/, /collections/), duplicate content from collection filters, and limited control over robots.txt. A Shopify-specialist agency will have concrete answers for how they work within these constraints, including canonical tag strategies and structured data implementation.",
      },
      {
        type: "h3",
        text: "4. What does your onboarding and audit process look like?",
      },
      {
        type: "p",
        text: "A good agency starts with a comprehensive technical and content audit before doing anything else. They should be able to describe what they audit, what tools they use (Google Search Console, Screaming Frog, Ahrefs/Semrush), and how they prioritise findings. Agencies that jump straight to 'we'll write content and build links' without auditing first are not thinking strategically.",
      },
      {
        type: "h3",
        text: "5. How do you approach keyword research for ecommerce?",
      },
      {
        type: "p",
        text: "Ecommerce SEO keyword research should separate transactional queries (product/collection pages), informational queries (blog content), and navigational queries (branded search). Ask how they map keywords to different page types and how they balance short-tail commercial terms with long-tail buyer-intent queries.",
      },
      {
        type: "h3",
        text: "6. What's your link building approach, and what do you consider off-limits?",
      },
      {
        type: "p",
        text: "This question reveals a lot. Reputable agencies build links through content, PR, and outreach. Red flags include: link farms, PBN (private blog network) links, bulk directory submissions, and any guarantee of a specific number of links per month. Ask explicitly: 'Have any of your clients ever received a Google manual action?' If yes, ask how it was resolved.",
      },
      {
        type: "h3",
        text: "7. How often will we meet, and what does reporting look like?",
      },
      {
        type: "p",
        text: "Good agencies offer monthly reporting tied to real business metrics, not just a screenshot of keyword rankings. Ask to see a sample report. It should show organic traffic trends, conversions, revenue attributed to organic search, and a clear account of work completed and planned.",
      },
      {
        type: "h3",
        text: "8. What happens to our rankings if we stop working together?",
      },
      {
        type: "p",
        text: "This question tests for ethical practice. Good SEO builds lasting assets — optimised pages, earned backlinks, well-structured site architecture — that you own. Some agencies use tactics that only maintain results for as long as you're paying (e.g., rented links). Make sure the work they do is yours to keep.",
      },
      {
        type: "h3",
        text: "9. How do you stay current with Google algorithm changes?",
      },
      {
        type: "p",
        text: "Google makes thousands of algorithm updates per year. In 2024–2026, major changes have included the Helpful Content system, AI Overviews, and Core Updates targeting E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness). Ask the agency to describe a recent algorithm change and how it affected their clients' strategies.",
      },
      {
        type: "h3",
        text: "10. What's your minimum contract length, and what are the exit terms?",
      },
      {
        type: "p",
        text: "SEO takes time — meaningful results typically take 3–6 months. Most reputable agencies require a 3–6 month minimum engagement. Be wary of month-to-month contracts with very low prices (they're likely selling you templates, not strategy) or 12-month lock-ins with no performance clauses. Aim for a 6-month agreement with clear deliverables and a review clause.",
      },
      { type: "h2", text: "Red Flags to Watch Out For" },
      {
        type: "ul",
        items: [
          "Guaranteed rankings — no one can guarantee Google rankings; any agency that does is being dishonest",
          "Vague deliverables — 'we'll improve your SEO' is not a scope of work",
          "No case studies or references — experience claims without evidence",
          "Instant results promises — sustainable SEO takes 3–6 months minimum",
          "Proprietary 'secret techniques' — legitimate SEO is transparent and follows Google's guidelines",
          "Reporting that only shows rankings, not traffic or revenue",
        ],
      },
      { type: "h2", text: "What Good Agencies Charge" },
      {
        type: "p",
        text: "Shopify SEO retainers typically range from $1,000–$5,000/month for small to mid-size stores, rising to $5,000–$15,000+/month for enterprise accounts or competitive categories. One-off SEO audits run $500–$3,000. Be suspicious of agencies charging under $500/month — at that price point, you're unlikely to get meaningful strategic work.",
      },
      {
        type: "tip",
        text: "Ask for a paid discovery or audit engagement before committing to a full retainer. A $500–$1,000 audit will reveal the quality of the agency's thinking — and give you a prioritised action list you own regardless of whether you continue.",
      },
      {
        type: "cta",
        text: "Browse verified Shopify SEO agencies with proven ecommerce track records.",
        href: "/agencies?specialization=SEO",
        label: "Find an SEO Agency →",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Category slug utilities
// ---------------------------------------------------------------------------

export const CATEGORY_SLUGS: Record<string, string> = {
  "Hiring Guide":    "hiring-guide",
  "Platform Guide":  "platform-guide",
  "Pricing Guide":   "pricing-guide",
  "Migration Guide": "migration-guide",
  "Tools & Apps":    "tools-apps",
  "SEO":             "seo",
};

export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([k, v]) => [v, k])
);

export function getCategorySlug(category: string): string {
  return (
    CATEGORY_SLUGS[category] ??
    category.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  );
}

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Hiring Guide":
    "Expert guides to help you find, evaluate, and hire the right Shopify agency for your project.",
  "Platform Guide":
    "In-depth comparisons and guides on Shopify plans, features, and platform decisions.",
  "Pricing Guide":
    "Transparent breakdowns of Shopify development costs, agency pricing, and budget planning.",
  "Migration Guide":
    "Step-by-step guides for migrating to Shopify from WooCommerce, Magento, and other platforms.",
  "Tools & Apps":
    "Reviews and comparisons of the best Shopify apps, themes, and tools for your tech stack.",
  "SEO":
    "Technical SEO guides, audits, and strategies to grow organic traffic on your Shopify store.",
};

// ---------------------------------------------------------------------------
// Helper functions — fetch from Supabase (async)
// Falls back to the hardcoded `posts` array if Supabase returns nothing
// (e.g., during local dev before seeding).
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<BlogPost[]> {
  const rows = await getAllBlogPosts();
  if (rows.length > 0) return rows.map(toPost);
  // Fallback: return hardcoded posts sorted by date
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostsPaginated(
  page: number,
  limit = 12
): Promise<{ posts: BlogPost[]; total: number }> {
  const { posts: rows, total } = await getAllBlogPostsPaginated(page, limit);
  if (total > 0) {
    return { posts: rows.map(toPost), total };
  }
  // Fallback: paginate the hardcoded array
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const start = (page - 1) * limit;
  return {
    posts: sorted.slice(start, start + limit),
    total: sorted.length,
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const row = await getBlogPostBySlug(slug);
  if (row) return toPost(row);
  // Fallback: find in hardcoded posts
  return posts.find((p) => p.slug === slug);
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const all = await getAllPosts();
  const category = SLUG_TO_CATEGORY[categorySlug];
  if (!category) return [];
  return all.filter((p) => p.category === category);
}

export function getAllCategoryPairs(): Array<{ slug: string; label: string }> {
  return Object.entries(CATEGORY_SLUGS).map(([label, slug]) => ({ slug, label }));
}

// ---------------------------------------------------------------------------
// Blog → Directory internal-linking map
// Returns contextual directory links based on post category, tags, and slug.
// ---------------------------------------------------------------------------

export interface DirectoryLink {
  label: string;
  href: string;
  description: string;
}

/** Extract all FAQ items from a post's content blocks (for JSON-LD generation). */
export function extractFaqItems(post: BlogPost): { q: string; a: string }[] {
  return post.content
    .filter((b): b is Extract<ContentBlock, { type: "faq" }> => b.type === "faq")
    .flatMap((b) => b.items);
}

export function getDirectoryLinks(post: BlogPost): DirectoryLink[] {
  const links: DirectoryLink[] = [];
  const tags = post.tags.map((t) => t.toLowerCase());
  const cat = post.category;
  const slug = post.slug;

  // ── Category-based primary links ──────────────────────────────────────────

  if (cat === "SEO" || tags.includes("seo") || tags.includes("shopify seo")) {
    links.push({
      label: "Browse SEO Agencies",
      href: "/agencies?specialization=SEO",
      description: "Find Shopify SEO specialists",
    });
  }

  if (cat === "Migration Guide" || tags.includes("migration") || tags.includes("replatforming")) {
    links.push({
      label: "Browse Migration Specialists",
      href: "/agencies?specialization=Migrations",
      description: "Find agencies that handle platform migrations",
    });
  }

  if (cat === "Pricing Guide" || tags.includes("budget") || tags.includes("pricing")) {
    links.push(
      {
        label: "Agencies Under $5k",
        href: `/agencies?budget=${encodeURIComponent("Under $5,000")}`,
        description: "Budget-friendly Shopify partners",
      },
      {
        label: "Mid-Range ($5k–$25k)",
        href: `/agencies?budget=${encodeURIComponent("$5,000 - $25,000")}`,
        description: "Agencies for growing businesses",
      },
      {
        label: "Enterprise ($100k+)",
        href: `/agencies?budget=${encodeURIComponent("$100,000+")}`,
        description: "Full-service enterprise partners",
      },
    );
  }

  if (cat === "Platform Guide" || tags.includes("shopify plus")) {
    links.push({
      label: "Browse Shopify Plus Agencies",
      href: "/agencies?search=shopify+plus",
      description: "Agencies specializing in Shopify Plus",
    });
  }

  // ── Tag-based secondary links ─────────────────────────────────────────────

  if (tags.includes("theme") || tags.includes("shopify themes") || tags.includes("design")) {
    links.push({
      label: "Theme Development Agencies",
      href: "/agencies?specialization=Theme+Development",
      description: "Custom theme design and development",
    });
  }

  if (tags.includes("shopify apps") || tags.includes("app development")) {
    links.push({
      label: "App Development Agencies",
      href: "/agencies?specialization=App+Development",
      description: "Custom Shopify app builders",
    });
  }

  if (tags.includes("cro") || tags.includes("conversion") || tags.includes("social proof") || tags.includes("retention")) {
    links.push({
      label: "CRO Specialists",
      href: "/agencies?specialization=CRO",
      description: "Conversion rate optimization experts",
    });
  }

  if (tags.includes("headless") || tags.includes("hydrogen")) {
    links.push({
      label: "Headless Commerce Agencies",
      href: "/agencies?specialization=Headless",
      description: "Headless Shopify development experts",
    });
  }

  if (tags.includes("marketing") || tags.includes("email marketing") || tags.includes("paid ads")) {
    links.push({
      label: "Shopify Marketing Agencies",
      href: "/agencies?specialization=Marketing",
      description: "Growth and marketing specialists",
    });
  }

  // ── Slug-specific overrides for posts with unique needs ───────────────────

  if (slug === "how-to-choose-a-shopify-agency" || slug === "shopify-agency-red-flags") {
    // These are general hiring posts — link to store build as default
    if (!links.some((l) => l.href.includes("Store+Build"))) {
      links.push({
        label: "Browse Store Build Agencies",
        href: "/agencies?specialization=Store+Build",
        description: "Agencies for full Shopify store builds",
      });
    }
  }

  if (slug === "how-to-brief-a-shopify-agency") {
    if (!links.some((l) => l.href === "/agencies")) {
      links.push({
        label: "Browse All Agencies",
        href: "/agencies",
        description: "Find the agency to send your brief to",
      });
    }
  }

  // ── Loyalty / review apps → CRO link ─────────────────────────────────────

  if (tags.includes("loyalty") || tags.includes("rewards") || tags.includes("reviews")) {
    if (!links.some((l) => l.href.includes("CRO"))) {
      links.push({
        label: "CRO & Retention Agencies",
        href: "/agencies?specialization=CRO",
        description: "Specialists in conversion and retention",
      });
    }
  }

  // ── Fallback: ensure every post has at least one directory link ────────────

  if (links.length === 0) {
    links.push({
      label: "Browse All Agencies",
      href: "/agencies",
      description: "Explore our full directory of verified Shopify partners",
    });
  }

  // Deduplicate by href
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const [all, current] = await Promise.all([getAllPosts(), getPostBySlug(slug)]);
  if (!current) return all.slice(0, limit);
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aOverlap = a.tags.filter((t) => current.tags.includes(t)).length;
      const bOverlap = b.tags.filter((t) => current.tags.includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}
