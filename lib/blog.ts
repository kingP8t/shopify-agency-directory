// ---------------------------------------------------------------------------
// Blog post data — no CMS or MDX needed, just TypeScript.
// To add a new post: copy an existing entry, change the slug, and fill in
// the content array. Each content item is a paragraph, heading, or list.
// ---------------------------------------------------------------------------

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;           // ISO format: YYYY-MM-DD
  updatedDate?: string;
  readingTime: number;    // minutes
  author: string;
  category: string;
  tags: string[];
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "tip"; text: string }       // highlighted tip box
  | { type: "cta"; text: string; href: string; label: string }; // call to action

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

const posts: BlogPost[] = [
  // ─── Post 1 ───────────────────────────────────────────────────────────────
  {
    slug: "how-to-choose-a-shopify-agency",
    title: "How to Choose a Shopify Agency: The Complete 2026 Guide",
    excerpt:
      "Choosing the wrong Shopify agency can cost you months and thousands of pounds. Here's exactly what to look for — and the red flags to avoid.",
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
        text: "Shopify Plus Partners have completed additional training and built a proven track record on the enterprise plan. If your store turns over more than £1M/year, only consider Plus Partners.",
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
        text: "Don't always go for the cheapest quote. A £10,000 project that runs over to £25,000 is worse value than a transparent £18,000 fixed-price quote.",
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
      "Shopify Plus costs £2,000+ per month. Is it worth it? We break down every difference so you can make the right call for your business.",
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
    title: "How Much Does a Shopify Website Cost in 2026?",
    excerpt:
      "From £3,000 to £150,000+ — Shopify website costs vary enormously. Here's a transparent breakdown of what you'll actually pay and why.",
    date: "2026-02-01",
    readingTime: 6,
    author: "Shopify Agency Directory",
    category: "Pricing Guide",
    tags: ["shopify cost", "pricing", "budget", "web development"],
    content: [
      {
        type: "p",
        text: "One of the most common questions merchants ask is: how much does a Shopify website cost? The honest answer is — it depends enormously on what you're building. A basic theme customisation might cost £2,000. A fully bespoke Shopify Plus store for an enterprise brand can run to £150,000 or more.",
      },
      {
        type: "p",
        text: "Here's a transparent breakdown of real-world costs so you can set the right budget.",
      },
      { type: "h2", text: "The Three Tiers of Shopify Projects" },
      { type: "h3", text: "Tier 1: Theme-Based Build (£2,000 – £8,000)" },
      {
        type: "p",
        text: "This is the most common starting point for new Shopify stores. An agency takes a premium theme (like Dawn, Impulse, or Prestige), customises it to match your brand, and sets up your products and collections.",
      },
      {
        type: "ul",
        items: [
          "Best for: new stores, brands with a clear vision, businesses with straightforward product catalogues",
          "Typical timeline: 4–8 weeks",
          "What's included: theme setup, colour/font customisation, homepage design, collection and product pages",
          "What's not included: custom functionality, complex integrations, bespoke UX design",
        ],
      },
      { type: "h3", text: "Tier 2: Custom Design Build (£8,000 – £40,000)" },
      {
        type: "p",
        text: "A fully designed-from-scratch Shopify store with custom UX, bespoke theme development, and thoughtful conversion optimisation.",
      },
      {
        type: "ul",
        items: [
          "Best for: established brands, stores with complex product ranges, businesses prioritising conversion rate",
          "Typical timeline: 8–16 weeks",
          "What's included: UX/UI design, custom Liquid theme development, app integrations, basic SEO setup",
          "What's not included: custom Shopify apps, advanced B2B features, headless architecture",
        ],
      },
      { type: "h3", text: "Tier 3: Enterprise / Headless (£40,000 – £150,000+)" },
      {
        type: "p",
        text: "Enterprise Shopify Plus projects with headless architecture, custom app development, complex integrations (ERP, PIM, OMS), and multi-region setups.",
      },
      {
        type: "ul",
        items: [
          "Best for: large retailers, Shopify Plus merchants, businesses with complex operational requirements",
          "Typical timeline: 4–12 months",
          "What's included: everything above plus custom app development, API integrations, performance engineering",
        ],
      },
      { type: "h2", text: "Ongoing Costs to Budget For" },
      {
        type: "p",
        text: "The build cost is just the start. Here's what you'll pay every month after launch:",
      },
      {
        type: "ul",
        items: [
          "Shopify plan: $39 – $399/month (or $2,300+/month for Plus)",
          "Apps: £100 – £1,000+/month depending on your stack",
          "Theme licence: £200 – £400 one-off for a premium theme",
          "Ongoing support retainer: £500 – £3,000/month if you use an agency",
          "Hosting: included in Shopify's monthly fee",
        ],
      },
      {
        type: "tip",
        text: "Get at least three quotes from agencies before committing. Prices for identical scopes can vary by 3x between agencies — and higher price doesn't always mean better quality.",
      },
      {
        type: "cta",
        text: "Get matched with an agency that fits your budget",
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
        type: "cta",
        text: "Find a Shopify migration specialist",
        href: "/agencies?specialization=Migrations",
        label: "Browse Migration Agencies →",
      },
    ],
  },

  // ─── Post 5 ───────────────────────────────────────────────────────────────
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
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getAllPosts(): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return getAllPosts().slice(0, limit);
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      // Sort by tag overlap
      const aOverlap = a.tags.filter((t) => post.tags.includes(t)).length;
      const bOverlap = b.tags.filter((t) => post.tags.includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}
