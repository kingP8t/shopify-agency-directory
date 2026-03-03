/**
 * Seed 3 Shopify Tools, Apps & Tech Stack Review blog posts
 * Run: node scripts/seed-blog-tools-apps-posts.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─── Content block helpers ────────────────────────────────────────────────────
const h2 = (text) => ({ type: "h2", text });
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });

// ─────────────────────────────────────────────────────────────────────────────
// POST 1: Best Shopify Review Apps — comparison
// ─────────────────────────────────────────────────────────────────────────────
const post1 = {
  slug: "best-shopify-review-apps-2026",
  title: "Best Shopify Review Apps in 2026: Yotpo vs Judge.me vs Okendo vs Stamped",
  excerpt:
    "Customer reviews can lift conversion rates by 15–30%. But which review app is actually worth paying for? We compare the four leading options side by side.",
  category: "Tools & Apps",
  tags: ["shopify apps", "reviews", "yotpo", "judge.me", "okendo", "stamped", "social proof"],
  author: "Shopify Agency Directory",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-02-20",
  content: [
    p("Product reviews are one of the highest-ROI additions to any Shopify store. Studies consistently show that displaying reviews increases conversion rates by 15–30%, and review content improves SEO by adding unique, keyword-rich text to product pages. But the app market is crowded — and choosing the wrong one means paying for features you don't use, or missing features you need."),
    p("We've tested all four of the leading Shopify review apps across real stores ranging from small DTC brands to Shopify Plus merchants. Here's our honest verdict."),
    h2("Quick Comparison: At a Glance"),
    ul(
      "Judge.me — best overall value; excellent free plan; fast loading; ideal for small to mid-size stores",
      "Yotpo — best enterprise option; combines reviews, loyalty, SMS, and referrals; highest price",
      "Okendo — best for DTC brands wanting rich UGC (photos, videos, attributes); strong integrations",
      "Stamped.io — best all-in-one platform; reviews + loyalty + referrals in one subscription"
    ),
    h2("1. Judge.me — Best for Value & Speed"),
    p("Judge.me is the most widely installed review app on Shopify — and for good reason. Its free plan is genuinely generous, and even the paid plan (around $15/month) unlocks almost every feature most stores will ever need."),
    ul(
      "Free plan includes unlimited review requests, basic widgets, and SEO rich snippets",
      "Paid plan adds Q&A, Google Shopping integration, custom forms, and coupons",
      "Review request emails are among the best-performing in the industry",
      "Extremely fast — review widgets add almost no page weight",
      "Strong Klaviyo and Shopify Flow integrations"
    ),
    tip("Judge.me is the default recommendation for stores under £2M revenue. The $15/month plan covers 99% of what merchants need. Only upgrade to Yotpo or Okendo if you have specific enterprise requirements."),
    h2("2. Yotpo — Best Enterprise Platform"),
    p("Yotpo has evolved from a review app into a full retention marketing suite. Reviews are just one module — you can also add SMS marketing, loyalty, referrals, and visual UGC under one platform and one bill."),
    ul(
      "Deep Shopify Plus integration including checkout extensibility",
      "Visual UGC (Instagram photos, video reviews) displayed natively in product pages",
      "Combine with Yotpo SMSBump for tightly integrated post-purchase flows",
      "Paid plans start at ~$15/month for basic reviews; enterprise pricing is bespoke",
      "Analytics dashboard is the strongest of any review app",
      "The main drawback: costs scale quickly as you add modules"
    ),
    h2("3. Okendo — Best for DTC Brands"),
    p("Okendo has carved out a strong niche with DTC brands that care deeply about UGC quality and brand presentation. Its review widgets are the most visually polished of any app on this list."),
    ul(
      "Media reviews — photo and video uploads are beautiful and highly conversion-focused",
      "Review attributes (e.g., 'Fits True to Size', 'Great Quality') drive purchase confidence",
      "Micro-surveys capture structured feedback alongside reviews",
      "Strong integrations with Klaviyo, Gorgias, and Attentive",
      "Plans start at $19/month; mid-tier plans run $119–$299/month",
      "Best fit for brands in fashion, beauty, wellness, or lifestyle categories"
    ),
    h2("4. Stamped.io — Best All-in-One Stack"),
    p("Stamped.io bundles reviews, loyalty, referrals, and visual UGC into a single subscription. If you want to consolidate your social proof and retention stack into one vendor, Stamped is worth serious consideration."),
    ul(
      "Reviews, NPS, Q&A, and loyalty points all available within one platform",
      "Google Shopping and structured data built in on all plans",
      "Loyalty module is competitive with Smile.io, especially at scale",
      "Plans start free; growth plans run $59–$149/month for the combined stack",
      "Slightly less polished UX than Okendo, but the value-per-feature ratio is strong"
    ),
    h2("Which App Should You Choose?"),
    ol(
      "Starting out or under £500k revenue → Judge.me free or paid ($15/month)",
      "DTC brand focused on UGC and brand image → Okendo",
      "Shopify Plus merchant wanting a full retention suite → Yotpo",
      "Looking to consolidate reviews + loyalty into one platform → Stamped.io"
    ),
    h2("Installation Tips"),
    ul(
      "Migrate existing reviews before switching apps — all four support CSV imports",
      "Set up automated review request emails immediately after install; timing matters (usually 7–14 days post-delivery)",
      "Enable rich snippets / structured data to get star ratings appearing in Google search results",
      "A/B test widget placement — below the fold vs above the fold can swing conversion by 5–10%"
    ),
    cta("Need help configuring the right app stack for your store?", "/get-matched", "Talk to a Shopify Agency →"),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// POST 2: Best Shopify Loyalty Apps — comparison
// ─────────────────────────────────────────────────────────────────────────────
const post2 = {
  slug: "best-shopify-loyalty-apps-2026",
  title: "Best Shopify Loyalty & Rewards Apps in 2026: Smile.io vs LoyaltyLion vs Yotpo",
  excerpt:
    "Loyalty programmes increase repeat purchase rates by up to 40%. Here's a detailed comparison of the top Shopify loyalty apps to help you choose the right one.",
  category: "Tools & Apps",
  tags: ["shopify apps", "loyalty", "rewards", "smile.io", "loyaltylion", "retention", "ecommerce"],
  author: "Shopify Agency Directory",
  reading_time: 8,
  status: "published",
  featured: false,
  date: "2026-02-25",
  content: [
    p("Acquiring a new customer costs five to seven times more than retaining an existing one. A well-designed loyalty programme is one of the most cost-effective growth levers available to Shopify merchants — and the right app makes the difference between a programme customers love and one they ignore."),
    p("Here's our in-depth comparison of the three leading Shopify loyalty apps in 2026, based on real implementations across stores of different sizes."),
    h2("What to Look for in a Loyalty App"),
    ul(
      "Points and rewards flexibility — can you reward purchases, referrals, reviews, and social actions?",
      "Redemption options — discounts, free products, early access, or custom rewards",
      "Programme tiers (VIP) — do they support bronze/silver/gold or equivalent status levels?",
      "Email and SMS integration — can you trigger loyalty-specific flows in Klaviyo?",
      "Analytics — can you measure the programme's impact on CLV and repeat purchase rate?",
      "Shopify Plus compatibility — does it integrate with the checkout and POS?"
    ),
    h2("1. Smile.io — Best for Getting Started Fast"),
    p("Smile.io is the most popular loyalty app on Shopify and for many stores, the easiest path from zero to a working programme. Setup takes hours rather than days, the default templates are solid, and the free plan is a genuine starting point."),
    ul(
      "Free plan available (limited to basic points and referrals, no VIP tiers)",
      "Starter plan from $49/month includes VIP tiers and branding customisation",
      "Growth plan ($199/month) adds Klaviyo integration and advanced analytics",
      "Points for purchases, referrals, reviews, birthdays, and social follows",
      "Embedded loyalty widget and dedicated /rewards page out of the box",
      "Best fit for stores doing £100k–£2M revenue"
    ),
    tip("The Smile + Judge.me combination is the most popular loyalty and reviews stack on Shopify. Both apps integrate with each other — customers earn points for leaving reviews, creating a powerful flywheel."),
    h2("2. LoyaltyLion — Best for Customisation"),
    p("LoyaltyLion is the go-to choice for brands that want deep customisation, complex programme logic, and granular control over every aspect of the customer experience. It's more technical to set up than Smile.io, but the ceiling is much higher."),
    ul(
      "Highly configurable earning and redemption rules — far more flexible than Smile",
      "Full API access on higher plans — build custom loyalty experiences in your storefront",
      "Advanced segmentation — target loyalty campaigns to specific customer cohorts",
      "Checkout extensions for Shopify Plus — apply points at the native checkout",
      "Embedded analytics with CLV, repeat purchase rate, and programme ROI reporting",
      "Plans from $159/month; enterprise pricing for large stores",
      "Best fit for stores doing £1M+ revenue with complex loyalty requirements"
    ),
    h2("3. Yotpo Loyalty — Best for Suite Consolidation"),
    p("If you're already using Yotpo for reviews (or considering it), the Yotpo Loyalty module is worth evaluating seriously. The tight integration between reviews, loyalty, SMS, and referrals within one platform creates meaningful synergies — customers earn points for leaving reviews, SMS flows trigger loyalty milestones, and analytics are unified."),
    ul(
      "Native integration with Yotpo Reviews, SMSBump, and Referrals — no extra setup",
      "Points, tiers, referrals, and VIP benefits all configurable from one dashboard",
      "Shopify Plus checkout extensibility — show loyalty points balance at checkout",
      "Strong for brands wanting to reduce vendor count and unify customer data",
      "Pricing is module-based; costs add up quickly but value is strong at scale",
      "Best fit for Shopify Plus stores already in the Yotpo ecosystem"
    ),
    h2("Loyalty Programme Best Practices"),
    ol(
      "Launch with a simple programme first — too many earning actions confuses customers",
      "Make the redemption value clear: '£1 off for every 100 points' beats vague 'earn rewards'",
      "Add VIP tiers once you have data on top customer behaviour — typically 3–6 months post-launch",
      "Email new members within 24 hours explaining how to earn and redeem",
      "Reward actions beyond purchase — reviews, referrals, and social shares build community",
      "Review programme performance quarterly and adjust earning rates to improve ROI"
    ),
    h2("Our Recommendation"),
    ul(
      "Under £500k revenue or just getting started → Smile.io (free or Starter plan)",
      "£500k–£5M revenue with specific customisation needs → LoyaltyLion",
      "Shopify Plus merchant already using Yotpo → Yotpo Loyalty",
      "Wanting reviews + loyalty under one bill → Stamped.io (also worth considering)"
    ),
    cta("Get expert help designing and implementing your loyalty programme", "/get-matched", "Find a Shopify Expert →"),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// POST 3: Best Shopify Themes — reviews
// ─────────────────────────────────────────────────────────────────────────────
const post3 = {
  slug: "best-shopify-themes-2026-review",
  title: "Best Shopify Themes in 2026: Dawn vs Impulse vs Prestige vs Turbo Reviewed",
  excerpt:
    "Your theme shapes every visitor's first impression and directly impacts your conversion rate. Here's our honest review of the best Shopify themes in 2026.",
  category: "Tools & Apps",
  tags: ["shopify themes", "dawn", "impulse", "prestige", "turbo", "theme review", "ecommerce design"],
  author: "Shopify Agency Directory",
  reading_time: 10,
  status: "published",
  featured: false,
  date: "2026-03-01",
  content: [
    p("Your Shopify theme is the foundation of your store's design — it affects page speed, mobile experience, conversion rate, and how much custom development you'll need. Choosing the right theme upfront saves you thousands in development costs and months of frustration."),
    p("We've reviewed and built stores on every major Shopify theme. Here's our honest assessment of the four most important ones in 2026."),
    h2("What Makes a Great Shopify Theme?"),
    ul(
      "Page speed — Core Web Vitals directly affect SEO rankings and conversion rate",
      "Mobile-first design — over 70% of Shopify traffic is now mobile",
      "Flexibility — sections and blocks that let you build pages without a developer",
      "App compatibility — does it play nicely with popular third-party apps?",
      "Active development — is the theme regularly updated for new Shopify features?",
      "Support quality — are bugs resolved quickly when they appear?"
    ),
    h2("1. Dawn — Best Free Theme"),
    p("Dawn is Shopify's flagship free theme and was rebuilt from the ground up in 2021 as a showcase for OS 2.0 features. It's fast, clean, and surprisingly flexible for a free option."),
    ul(
      "Price: Free (maintained by Shopify)",
      "Best for: new stores, brands wanting a minimal aesthetic, merchants with a limited budget",
      "Core Web Vitals: Excellent — one of the fastest themes available",
      "Customisation: Sections and blocks on every page; good without code",
      "Notable features: predictive search, cart drawer, image zoom, multi-column menus",
      "Limitations: design is minimal and similar to thousands of other stores using it"
    ),
    tip("Dawn is a genuinely good starting point. If you're a new store, launch on Dawn, prove your concept, then invest in a premium theme or custom design once revenue supports it."),
    h2("2. Impulse — Best for Fashion & Lifestyle Brands"),
    p("Impulse by Archetype Themes is one of the best-selling premium Shopify themes and a favourite among fashion, apparel, and lifestyle brands. It strikes an excellent balance between visual impact and performance."),
    ul(
      "Price: $380 one-off (Shopify Theme Store)",
      "Best for: fashion, apparel, beauty, lifestyle, and brands with strong visual identity",
      "Core Web Vitals: Very good — Archetype has invested heavily in performance",
      "Customisation: Excellent section coverage; advanced promotional features built in",
      "Notable features: colour swatches, quick-add-to-cart, announcement bar rotator, mega menu",
      "Agency favourite: widely used by UK and US agencies — easy to find developers familiar with it"
    ),
    h2("3. Prestige — Best for Luxury & Premium Brands"),
    p("Prestige is the go-to theme for luxury, high-AOV, and aspirational brands. Developed by Maestrooo, it's built with editorial storytelling in mind — large imagery, refined typography, and a premium feel that cheaper themes can't replicate."),
    ul(
      "Price: $380 one-off (Shopify Theme Store)",
      "Best for: luxury, jewellery, fashion, interiors, wine, and high-AOV brands",
      "Core Web Vitals: Good — image-heavy by nature so requires careful optimisation",
      "Customisation: Strong, with a focus on content and storytelling sections",
      "Notable features: lookbook sections, age verification, sticky header with cart, variant image groups",
      "Watch out for: image-heavy designs need good image compression to maintain page speed"
    ),
    h2("4. Turbo — Best for Large Catalogues"),
    p("Turbo by Out of the Sandbox is the most feature-rich premium theme available for Shopify and has been a favourite of agencies for nearly a decade. If you have a large product catalogue, complex navigation, or need maximum configuration options without custom development, Turbo delivers."),
    ul(
      "Price: $385 one-off (Out of the Sandbox)",
      "Best for: large catalogues, multi-brand stores, stores with complex product ranges",
      "Core Web Vitals: Good; Turbo introduced performance-focused updates in 2023–24",
      "Customisation: The most customisable theme available without writing code",
      "Notable features: Ajax cart, predictive search, mega menus, multiple homepage layouts, product filtering",
      "Agency notes: steeper learning curve than Impulse or Prestige; worth it for complex builds"
    ),
    h2("Honourable Mentions"),
    ul(
      "Sense (free) — Shopify's best free theme for health and beauty",
      "Craft (free) — ideal for artisan, handmade, or small-batch product brands",
      "Motion by Archetype — best theme for brands wanting video and animation",
      "Symmetry by Clean Canvas — strong for stores with complex product variants",
      "Streamline by Fluorescent — popular with outdoor, fitness, and lifestyle brands"
    ),
    h2("Free vs Premium: Is It Worth Paying?"),
    p("A premium theme costs £300–£400 as a one-off purchase. At even a 1% conversion rate improvement on a store doing £50k/month, that pays back in days. More importantly, premium themes reduce your reliance on expensive custom development — a good theme can save you £2,000–£5,000 in agency fees by building in features you'd otherwise need coded."),
    ol(
      "New store, minimal budget → Start with Dawn (free)",
      "Fashion or lifestyle brand → Impulse ($380)",
      "Luxury or high-AOV brand → Prestige ($380)",
      "Large catalogue or complex navigation → Turbo ($385)",
      "Wanting video and animation → Motion ($380)"
    ),
    cta("Need an agency to customise your Shopify theme to perfection?", "/agencies", "Browse Shopify Agencies →"),
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Seed
// ─────────────────────────────────────────────────────────────────────────────
async function seed() {
  const posts = [post1, post2, post3];
  console.log(`Seeding ${posts.length} Tools & Apps blog posts...`);

  for (const post of posts) {
    const { error } = await supabase
      .from("blog_posts")
      .upsert(post, { onConflict: "slug" });

    if (error) {
      console.error(`✗ Failed: ${post.slug}`, error.message);
    } else {
      console.log(`✓ Seeded: ${post.slug}`);
    }
  }

  console.log("Done.");
}

seed().catch(console.error);
