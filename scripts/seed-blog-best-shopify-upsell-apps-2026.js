/**
 * Seed blog post: Best Shopify Upsell & Cross-Sell Apps in 2026
 * Author: Helena Hernandez
 * Category: Tools & Apps
 * Targets "best shopify upsell app" — clean gap in the Tools & Apps cluster.
 * Run: node scripts/seed-blog-best-shopify-upsell-apps-2026.js
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
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "best-shopify-upsell-cross-sell-apps-2026",
  title: "Best Shopify Upsell & Cross-Sell Apps in 2026: ReConvert vs Frequently Bought Together vs Candy Rack vs Zipify",
  seo_title: "Best Shopify Upsell Apps in 2026 (Compared)",
  excerpt: "Upselling is one of the highest-ROI things you can add to a Shopify store. Here are the best Shopify upsell and cross-sell apps in 2026 — compared by where they trigger, what they cost, and what each does best.",
  category: "Tools & Apps",
  tags: [
    "best shopify upsell app",
    "shopify cross sell app",
    "shopify post purchase upsell",
    "reconvert shopify",
    "shopify upsell",
    "increase shopify aov",
  ],
  author: "Helena Hernandez",
  reading_time: 9,
  status: "published",
  featured: false,
  date: "2026-06-02",
  updated_date: "2026-06-02",
  content: [
    p("Last reviewed June 2026. Upselling and cross-selling are among the fastest ways to lift average order value (AOV) without spending more on traffic. On Shopify, the right app places a relevant offer at the right moment — on the product page, in the cart, at checkout, or after the purchase — and a well-configured upsell can add 10 to 20 percent to your AOV with no extra ad spend."),
    p("I have tested these apps on real stores. This is what each one is actually good at, where it fits in your funnel, and who should pick it."),

    cta("Need help configuring your AOV strategy? Get matched with a verified Shopify CRO agency.", "/get-matched", "Get Matched Free"),

    h2("Upsell vs Cross-Sell: The Difference"),
    p("It is worth being clear before comparing apps. An upsell offers a higher-value version of what the customer is already buying — a larger pack, a premium model, or an extended warranty. A cross-sell suggests a complementary product — a case for a phone, a brush for a paint set, a belt for a pair of trousers. Most apps do both; where they differ is which trigger points they support."),

    h2("The Best Shopify Upsell Apps at a Glance"),
    table(
      ["App", "Best For", "Key Trigger Points", "Pricing"],
      [
        ["ReConvert", "Post-purchase upsells & thank-you page", "Post-purchase, thank-you page", "Free tier; paid from ~$4.99/mo"],
        ["Frequently Bought Together", "Product page cross-sells", "Product page bundles", "Free tier; paid from ~$19.99/mo"],
        ["Candy Rack", "In-cart & pre-purchase offers", "Product page, cart, checkout", "Paid from ~$19.99/mo"],
        ["Zipify OneClickUpsell", "Post-purchase (Shopify Plus)", "Post-purchase checkout extension", "Paid from ~$35/mo"],
        ["Rebuy Personalization Engine", "AI-powered full-funnel upsells", "All funnel stages", "Paid from ~$99/mo"],
        ["UFE — Upsell Funnel Engine", "Best free full-funnel option", "Product page, cart, post-purchase", "Free tier; paid from ~$9.99/mo"],
      ]
    ),

    h2("App-by-App Breakdown"),

    h3("ReConvert — Best for Post-Purchase"),
    p("ReConvert specialises in the thank-you page and post-purchase flow — the moment immediately after a customer completes their order, when they are in a buyer mindset and most open to a follow-on offer. It lets you build a custom thank-you page with product recommendations, discount offers, surveys, and a one-click upsell. Rated exceptionally well and widely used. The free tier is generous for small stores; the paid plans scale with revenue. Best for: any store wanting to monetise the post-purchase moment without Shopify Plus."),

    h3("Frequently Bought Together — Best for Product Page Bundles"),
    p("Inspired by Amazon's classic recommendation widget, this app adds a product-page block showing items commonly bought together, with a one-click add-to-cart for the bundle. It uses sales data to generate recommendations automatically and has a light, unobtrusive design. Very easy to set up, performs consistently, and the free tier covers most small store needs. Best for: stores with clear product adjacencies — fashion accessories, kitchenware, beauty kits."),

    h3("Candy Rack — Best for Pre-Purchase Offers"),
    p("Candy Rack focuses on the product page and add-to-cart moment, presenting upsells and cross-sells in a clean pop-up before the customer reaches the cart. It supports gifting, warranties, and bundles, and the offer logic is more flexible than most. Better designed than average and straightforward to configure. Best for: stores that want to capture upsell revenue before checkout without relying solely on the thank-you page."),

    h3("Zipify OneClickUpsell — Best for Shopify Plus"),
    p("Zipify is built specifically for Shopify Plus and uses checkout extensibility to add post-purchase offers directly inside Shopify's native checkout flow — no redirect, no third-party page. This is the gold standard for Plus stores that want seamless, native post-purchase upsells. It is Plus-only and priced accordingly. Best for: Shopify Plus merchants who want the cleanest, most trusted post-purchase upsell experience."),

    h3("Rebuy Personalization Engine — Best Full-Funnel AI"),
    p("Rebuy is the most powerful option on this list and also the most expensive. It uses AI to personalise recommendations across every touchpoint — product pages, cart, checkout, post-purchase, and email re-engagement. It integrates deeply with Klaviyo and Recharge. The results can be excellent, but it requires proper configuration to pay off and is best suited to stores doing meaningful monthly revenue. Best for: scaling stores with $500k+ annual revenue that want a data-driven, full-funnel AOV strategy."),

    h3("UFE — Upsell Funnel Engine — Best Free Full-Funnel Option"),
    p("UFE offers product-page, cart-page, and post-purchase upsells on a free plan — unusual for an app that covers the whole funnel. The interface is less polished than Candy Rack or Rebuy, but it works and it is genuinely free to start. Best for: new or small stores testing upsell strategies before committing to a paid app."),

    tip("Do not activate upsells at every touchpoint simultaneously. Start with one — usually the post-purchase thank-you page, which has the least friction — measure the uplift, then layer in product-page or cart offers once you know what resonates with your customers."),

    h2("Choosing by Funnel Stage"),
    table(
      ["Funnel Stage", "Best App(s)", "Why"],
      [
        ["Product page", "Frequently Bought Together, Candy Rack", "Bundle suggestions and add-on offers while intent is high"],
        ["Cart page", "Candy Rack, UFE", "Last chance before checkout; keep offers simple"],
        ["Checkout (Plus only)", "Zipify, Rebuy", "Highest-converting placement; requires Shopify Plus"],
        ["Post-purchase / thank-you page", "ReConvert, Zipify, UFE", "Buyer mindset; no payment friction for one-click offers"],
        ["Full funnel, AI-driven", "Rebuy", "Worth it at scale; needs configuration to deliver"],
      ]
    ),

    h2("What an App Cannot Do"),
    p("An upsell app amplifies what is already working. It will not save a store with poor product-market fit, weak product pages, or a broken checkout. Before installing, make sure your core conversion funnel is solid — then use an upsell app to extract more value from the traffic you are already converting."),
    cta("Want a CRO expert to audit your full funnel first? Browse verified Shopify CRO agencies.", "/agencies?specialization=CRO", "Browse CRO Agencies"),

    faq([
      {
        q: "What is the best Shopify upsell app in 2026?",
        a: "It depends on where you want to upsell. ReConvert is the most popular for post-purchase thank-you page upsells. Frequently Bought Together is the go-to for product page cross-sells. Zipify is the best choice for Shopify Plus stores using checkout extensibility. Rebuy is the most powerful full-funnel option for larger stores.",
      },
      {
        q: "Do Shopify upsell apps slow down my store?",
        a: "Well-built apps add minimal overhead if they load asynchronously and do not block the main page render. Check the app's impact in PageSpeed Insights after installing and remove it if you see a meaningful speed regression — AOV gains should outweigh any conversion loss from slower pages.",
      },
      {
        q: "Can I use post-purchase upsells without Shopify Plus?",
        a: "Yes. ReConvert and UFE both offer post-purchase upsells on standard Shopify plans via the thank-you page. The cleanest in-checkout upsell experience (using Shopify's checkout extensibility) requires Shopify Plus, but the post-purchase thank-you page approach works on all plans and converts well.",
      },
      {
        q: "How much can a Shopify upsell app increase my AOV?",
        a: "Results vary by product type, offer relevance, and placement. A well-configured upsell typically lifts AOV by 10 to 20 percent. Poorly configured offers — irrelevant products, too many prompts, high prices — can hurt conversion rates, so start with one placement and measure before expanding.",
      },
      {
        q: "Should I use bundles or one-click upsells?",
        a: "Bundles (pre-cart, product page) work best for products with natural adjacencies. One-click post-purchase upsells work best as a standalone complementary offer after checkout. Use bundles to increase initial cart value and post-purchase offers to capture incremental revenue from buyers who have already committed.",
      },
    ]),

    h2("The Bottom Line"),
    p("For most stores, start with a post-purchase thank-you page upsell via ReConvert — it is the highest-converting placement, the easiest to configure, and the free tier gets you started at no cost. Add product-page cross-sells via Frequently Bought Together once that is working. Only layer in a full-funnel tool like Rebuy when your revenue justifies the cost and configuration effort."),
    cta("Want expert help maximising your store's AOV? Browse verified Shopify CRO agencies.", "/agencies?specialization=CRO", "Browse CRO Agencies"),
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

  if (error) { console.error("Failed:", error); process.exit(1); }
  console.log("Seeded:", data?.[0]?.slug);
}
seed();
