/**
 * Seed blog post: Shopify Page Speed & Core Web Vitals (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Fills the page-speed / Core Web Vitals gap in the SEO cluster.
 * Run: node scripts/seed-blog-shopify-core-web-vitals-2026.js
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
  slug: "shopify-core-web-vitals-page-speed-2026",
  title:
    "Shopify Page Speed & Core Web Vitals: How to Pass in 2026",
  seo_title: "Shopify Core Web Vitals: How to Pass in 2026",
  excerpt:
    "Slow Shopify stores lose rankings and sales. Here is what Core Web Vitals measure in 2026 (LCP, INP, CLS), how to check your store, and the fixes that actually move the numbers — from images and apps to themes.",
  category: "SEO",
  tags: [
    "shopify core web vitals",
    "shopify page speed",
    "shopify site speed",
    "improve shopify speed",
    "shopify lcp inp cls",
    "shopify performance",
  ],
  author: "Varine Rashford",
  reading_time: 10,
  status: "published",
  featured: false,
  date: "2026-06-01",
  updated_date: "2026-06-01",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed June 2026. Core Web Vitals are the three speed and stability metrics Google uses to judge real-world page experience: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). To pass, you need LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1, measured on real mobile visits. On Shopify, the most common reasons stores fail are heavy themes, too many apps, and unoptimized images — and all three are fixable."
    ),
    p(
      "Speed is not just an SEO checkbox. Slower pages convert worse: study after study shows conversion rates fall as load time climbs, and most Shopify traffic is mobile, where the penalty is harshest. Passing Core Web Vitals protects both your rankings and your revenue."
    ),

    // ── Section 1: The three metrics ───────────────────────────────────
    h2("The Three Core Web Vitals (and the 2026 Thresholds)"),
    p(
      "Note that INP replaced First Input Delay (FID) as an official Core Web Vital in 2024 — if an old guide still mentions FID, it is out of date. Here is what each metric measures and the threshold you need to hit."
    ),
    table(
      ["Metric", "What It Measures", "Good", "Needs Work", "Poor"],
      [
        ["LCP (Largest Contentful Paint)", "How fast the main content loads", "≤ 2.5s", "2.5 – 4.0s", "> 4.0s"],
        ["INP (Interaction to Next Paint)", "How fast the page responds to taps/clicks", "≤ 200ms", "200 – 500ms", "> 500ms"],
        ["CLS (Cumulative Layout Shift)", "How much the layout jumps while loading", "≤ 0.1", "0.1 – 0.25", "> 0.25"],
      ]
    ),
    p(
      "To pass, the 75th percentile of your real visitors must fall in the \"Good\" band for all three. That means a few fast loads do not save you — your typical mobile visitor is what counts."
    ),

    // ── Section 2: How to measure ──────────────────────────────────────
    h2("How to Measure Your Shopify Store's Speed"),
    p(
      "There are two kinds of data, and the difference matters. Field data (real visitors) is what Google ranks on; lab data (a simulated test) is for debugging. Use both."
    ),
    ul(
      "Google Search Console → Core Web Vitals report: your real field data, grouped by URL pattern. This is the source of truth for ranking.",
      "PageSpeed Insights: enter any URL for both field data (if available) and a lab test with specific recommendations.",
      "Chrome DevTools → Lighthouse: a lab audit you can run on demand while you debug a specific page.",
      "Test the pages that matter most: your home page, a top collection page, and a best-selling product page — not just the home page.",
    ),
    tip(
      "Always judge success on field data in Search Console, not a one-off Lighthouse score. Lab scores swing with your connection and machine; field data reflects what your actual customers experience on real phones."
    ),

    // ── Section 3: The speed killers ───────────────────────────────────
    h2("The Biggest Shopify Speed Killers"),
    p(
      "Before you optimize, know what you are fighting. On Shopify, slow scores almost always trace back to the same short list:"
    ),
    ul(
      "Unoptimized images — oversized hero images and product photos are the number one LCP problem",
      "Too many apps — every app can inject JavaScript that runs on every page, hurting INP",
      "Heavy or bloated themes — feature-packed premium themes often ship far more code than you use",
      "Third-party scripts — chat widgets, pop-ups, reviews, and analytics tags pile up quickly",
      "Render-blocking resources — CSS and JS that must load before anything appears on screen",
      "Layout shifts — images and embeds without reserved space push content around as they load",
    ),

    // ── Section 4: Fix each metric ─────────────────────────────────────
    h2("How to Improve Each Metric"),

    h3("Improving LCP (loading speed)"),
    p(
      "LCP is usually your hero image or main heading. Compress and correctly size every above-the-fold image, serve modern formats (WebP or AVIF), and preload the hero image so the browser fetches it early. Reduce render-blocking CSS and JavaScript, and lean on Shopify's fast hosting rather than adding image-heavy sliders that delay the main content."
    ),

    h3("Improving INP (responsiveness)"),
    p(
      "INP measures how quickly the page reacts when someone taps or clicks. The fix is almost always less JavaScript. Audit your apps and remove any you do not actively use, defer non-critical scripts so they load after the page is interactive, and avoid stacking multiple tools that each add their own code. Fewer, lighter scripts mean a snappier page."
    ),

    h3("Improving CLS (visual stability)"),
    p(
      "CLS is the annoying jump when a button moves just as you tap it. Prevent it by setting explicit width and height on every image so the browser reserves the space, allocating fixed space for ads, banners, and embeds, and loading fonts in a way that does not cause a late text reflow. Most CLS problems are theme-level and fixable once you know where they come from."
    ),

    // ── Section 5: The app problem ─────────────────────────────────────
    h2("The App Problem"),
    p(
      "Apps are the most common hidden cause of poor Shopify performance. Each one can add JavaScript and network requests that run on every page load, and the cost compounds. A store running 20 apps is almost always slower than it needs to be."
    ),
    p(
      "Audit your installed apps honestly. For each one ask: do I actively use this, and is it earning its place? Uninstall the ones you do not — and remember that uninstalling an app does not always remove its leftover code from your theme, so check for orphaned snippets after removal."
    ),
    cta(
      "Image weight is the most common speed killer. A good image-optimization app fixes it automatically — see our SEO app comparison.",
      "/blog/best-shopify-seo-apps-2026",
      "Best Shopify SEO Apps in 2026"
    ),

    // ── Section 6: When to call an agency ──────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Many speed wins are DIY: compress images, prune apps, set image dimensions. But some problems are structural and need a developer. Consider professional help when:"
    ),
    ul(
      "Your theme is fundamentally bloated and needs rebuilding on a lightweight, performance-first foundation",
      "Render-blocking and JavaScript issues require editing Liquid, CSS, and theme code you are not comfortable changing",
      "You are considering a headless or composable build to push performance further than a standard theme allows",
      "You have optimized the obvious things and still fail Core Web Vitals in Search Console",
    ),
    cta(
      "Need a developer to fix what an app can't? Browse verified Shopify SEO and performance agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "What is a good Core Web Vitals score for a Shopify store?",
        a: "To pass, the 75th percentile of your real visitors needs LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1. Check your status in Google Search Console's Core Web Vitals report, which uses real field data rather than a one-off lab test.",
      },
      {
        q: "Does page speed actually affect Shopify SEO rankings?",
        a: "Yes. Core Web Vitals are a confirmed Google ranking signal as part of page experience. Speed rarely outranks content relevance, but among similar pages it is a tiebreaker — and faster pages also convert better, so the benefit is double.",
      },
      {
        q: "What is INP, and how is it different from FID?",
        a: "Interaction to Next Paint (INP) replaced First Input Delay (FID) as a Core Web Vital in 2024. FID only measured the delay of the first interaction; INP measures responsiveness across all interactions during a visit, making it a stricter, more representative metric. Aim for INP under 200ms.",
      },
      {
        q: "Do Shopify apps slow down my store?",
        a: "They can. Each app may inject JavaScript and extra network requests that run on every page, which mainly hurts INP and overall load time. Audit your apps, remove any you do not actively use, and check for leftover code after uninstalling, since it is not always removed automatically.",
      },
      {
        q: "Can I pass Core Web Vitals on a standard Shopify theme?",
        a: "Often yes. Many stores pass on a well-built theme once images are optimized, unused apps are removed, and image dimensions are set to prevent layout shift. If a theme is fundamentally bloated, a rebuild on a lightweight theme — or a developer's help — may be needed.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "Start with the highest-impact, lowest-effort fixes: optimize your images, prune apps you do not use, and set dimensions on images to stop layout shift. Those three alone move most stores a long way toward passing. Then measure in Search Console, and tackle the structural issues — theme bloat, render-blocking code — only if real field data says you still need to."
    ),
    p(
      "Speed compounds with everything else you do for SEO and conversion. A fast store ranks more easily, converts more visitors, and wastes less of your ad spend — which is why it is worth getting right."
    ),
    cta(
      "Want an expert to audit and fix your store's speed? Get matched with a verified Shopify agency.",
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
