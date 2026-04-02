/**
 * Seed blog post: How to Assess Your Shopify Migration Complexity
 * Run: node scripts/seed-blog-migration-complexity.js
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
const h3 = (text) => ({ type: "h3", text });
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "how-to-assess-shopify-migration-complexity",
  title: "How to Assess Your Shopify Migration Complexity (Before You Get a Quote)",
  excerpt:
    "Not all Shopify migrations are equal. Learn the five factors that determine how complex your migration will be — and use our free calculator to get a personalised assessment in 2 minutes.",
  category: "Migration Guide",
  tags: [
    "shopify migration",
    "migration complexity",
    "platform migration",
    "magento to shopify",
    "woocommerce to shopify",
    "ecommerce migration planning",
  ],
  author: "Elena King",
  reading_time: 11,
  status: "published",
  featured: true,
  date: "2026-04-03",
  content: [
    p(
      "You have decided to migrate to Shopify. Maybe your current platform is costing too much to maintain, maybe you have outgrown it, or maybe you are tired of fighting with hosting and security updates. Whatever the reason, the first question every merchant asks is the same: how hard is this going to be?"
    ),
    p(
      "The honest answer is: it depends. A small Squarespace store with 50 products and no custom code can be migrated in a weekend. A Magento 1 store with 15,000 SKUs, a custom ERP integration, multi-language support, and a heavily modified checkout could take six months and a team of specialists."
    ),
    p(
      "The gap between those two scenarios is enormous — and understanding where your migration falls on that spectrum is critical before you request quotes, set timelines, or make promises to your team."
    ),

    cta(
      "Want to skip the reading and get your score now? Try our free Migration Complexity Calculator — it takes 2 minutes and gives you a complexity score, timeline estimate, and risk factors.",
      "/tools/migration-calculator",
      "Try the Migration Calculator"
    ),

    h2("The 5 Factors That Determine Migration Complexity"),
    p(
      "After analysing hundreds of Shopify migrations across 900+ agencies in our directory, we have identified five factors that account for nearly all of the variation in migration complexity. Understanding each one will help you plan realistically and communicate clearly with agencies."
    ),

    h3("1. Your Current Platform"),
    p(
      "This is the single biggest factor. Some platforms are relatively straightforward to migrate from because they use similar data structures and have well-documented export tools. Others are notoriously difficult."
    ),
    table(
      ["Platform", "Typical Complexity", "Why"],
      [
        ["Squarespace / Wix", "Low", "Simple data structures, limited customisation, clean export tools"],
        ["BigCommerce", "Low–Medium", "Similar SaaS model, good data export, some app differences"],
        ["WooCommerce", "Medium", "Flexible data model means more variation, plugin dependencies, self-hosted quirks"],
        ["Custom / Bespoke", "Medium–High", "No standard export, custom data schemas, often poor documentation"],
        ["Magento 1", "High", "End-of-life, complex data model, heavy customisation, extension dependencies"],
        ["Magento 2 / Adobe Commerce", "High–Very High", "Enterprise complexity, deep customisation, multi-store architectures"],
      ]
    ),
    tip(
      "If you are on Magento 1, urgency matters. Security patches are no longer issued, which means every day you delay increases your exposure to vulnerabilities."
    ),

    h3("2. Store Size and Data Volume"),
    p(
      "The amount of data you need to migrate directly affects timeline and cost. There are three dimensions to consider:"
    ),
    ul(
      "Product catalog size — not just the number of products, but variants, images, metafields, and SEO metadata. A store with 500 simple products is very different from 500 products with 20 variants each.",
      "Customer accounts — migrating customer data requires careful handling of personal information, order history associations, and (critically) password hashes. Shopify cannot import password hashes from most platforms, which means customers will need to reset their passwords.",
      "Order history — historical orders are important for customer service, analytics, and returns processing. Large order histories require batch migration tooling."
    ),
    p(
      "As a rough guide: under 100 products and a few hundred customers is straightforward. Over 2,000 products with tens of thousands of customers and a deep order history will require dedicated migration tooling and a phased approach."
    ),

    h3("3. Customisations"),
    p(
      "Every piece of custom functionality on your current store is something that needs to be rebuilt, replaced, or dropped during migration. The three areas to audit are:"
    ),
    ul(
      "Custom theme — if you are using a heavily modified or fully custom theme, all of that front-end work needs to be recreated in Shopify's Liquid templating system (or a headless framework). Stock themes with minor tweaks are much simpler.",
      "Custom apps and plugins — WooCommerce plugins, Magento extensions, and custom-built functionality all need Shopify equivalents. Some will have direct replacements in the Shopify App Store. Others will need custom development.",
      "Custom checkout — this is the big one. If you have a customised checkout flow (payment options, custom fields, specific logic), it needs to be rebuilt using Shopify's Checkout Extensibility framework. This is one of the most common sources of scope creep in migrations."
    ),
    tip(
      "Before contacting agencies, make a list of every custom feature on your current store. For each one, note whether it is essential for launch or can wait for a phase two. This list alone will save you hours of back-and-forth."
    ),

    h3("4. Integrations and Data Complexity"),
    p(
      "Modern ecommerce stores rarely operate in isolation. The integrations connected to your store — and the complexity of the data flowing between them — can significantly increase migration scope."
    ),
    ul(
      "ERP systems (NetSuite, SAP, Microsoft Dynamics) — these often require middleware or custom API development to connect to Shopify",
      "POS systems — if you have physical retail locations, your POS integration needs to work seamlessly with Shopify POS or a third-party solution",
      "CRM and email marketing — customer data flows, segmentation, and automation rules all need to be reconfigured",
      "Accounting software — order and financial data sync needs to be maintained during and after migration",
      "Multi-language and multi-currency — if your store serves multiple markets, you will need Shopify Markets or expansion stores, which adds significant complexity",
      "Custom data structures — metafields, custom database tables, and non-standard data schemas need to be mapped to Shopify's data model (metafields and metaobjects)"
    ),

    h3("5. Timeline and Shopify Plus Requirements"),
    p(
      "Two final factors that affect complexity are often overlooked:"
    ),
    ul(
      "Shopify Plus — if your business needs Shopify Plus features (custom checkout, B2B, wholesale, automation via Shopify Flow, expansion stores), the migration becomes a Shopify Plus implementation, not just a data migration. This typically doubles the scope.",
      "Timeline urgency — a migration with a flexible timeline can be done carefully with proper testing. An urgent migration (driven by platform end-of-life, contract expiry, or security concerns) compresses the schedule and increases the risk of issues."
    ),

    h2("How to Score Your Migration"),
    p(
      "We built a free tool that scores your migration across all five factors. It takes about 2 minutes to complete and gives you:"
    ),
    ul(
      "A complexity score (Low, Medium, High, or Very High)",
      "An estimated timeline range",
      "Specific risk factors based on your answers",
      "A recommended agency type",
      "A shareable URL so you can send results to your team"
    ),
    cta(
      "Get your personalised migration complexity score in 2 minutes.",
      "/tools/migration-calculator",
      "Try the Migration Calculator"
    ),

    h2("What Your Score Means"),
    table(
      ["Score Range", "Rating", "What to Expect"],
      [
        ["0–15", "Low Complexity", "Straightforward migration. Most agencies can handle this. Expect 2–4 weeks and relatively simple data migration with minimal custom work."],
        ["16–30", "Medium Complexity", "Moderate migration with some challenges. Look for an experienced Shopify agency with migration references. Expect 4–8 weeks with some custom development."],
        ["31–45", "High Complexity", "Significant migration project. You need a specialist migration agency. Expect 8–16 weeks, phased approach, and dedicated project management."],
        ["46+", "Very High Complexity", "Enterprise-scale migration. Engage an enterprise migration specialist early. Expect 16–24+ weeks, potentially parallel running of both platforms during transition."],
      ]
    ),

    h2("Common Migration Pitfalls (and How to Avoid Them)"),

    h3("Underestimating URL Redirects"),
    p(
      "Every URL on your current site that has been indexed by Google, linked to from other sites, or bookmarked by customers needs a 301 redirect to its Shopify equivalent. A store with 10,000 pages might need 10,000+ redirect rules. Failing to handle this properly will tank your SEO and send customers to 404 pages."
    ),

    h3("Forgetting About SEO Metadata"),
    p(
      "Page titles, meta descriptions, image alt text, and structured data all need to be migrated — not just product data. Many merchants lose significant organic traffic after migration because SEO metadata was not included in the migration scope."
    ),

    h3("Ignoring the Customer Password Problem"),
    p(
      "Shopify cannot import password hashes from other platforms. This means every customer will need to reset their password after migration. Plan for this with a communication strategy: send emails before migration explaining the change, and set up a smooth password reset flow."
    ),

    h3("Skipping the Parallel Running Period"),
    p(
      "For medium and high-complexity migrations, consider running both platforms simultaneously for a period. Process orders on the old platform while testing the new one. This gives you a safety net and allows for thorough QA without risking live orders."
    ),

    h2("Your Migration Checklist"),
    p(
      "Before contacting agencies, prepare the following:"
    ),
    ol(
      "Run the Migration Complexity Calculator to get your baseline score",
      "List every custom feature on your current store and mark each as essential or phase-two",
      "Export your current URL structure (all pages, products, collections) for redirect mapping",
      "Document all third-party integrations and their current API configurations",
      "Check whether you need Shopify Plus features",
      "Use the Cost Estimator to get a budget range for your migration type",
      "Create a project brief with the Brief Generator to send to agencies"
    ),
    cta(
      "Ready to estimate your migration budget? Use our Cost Estimator for data-driven pricing.",
      "/tools/cost-estimator",
      "Estimate Migration Cost"
    ),

    h2("Finding the Right Migration Agency"),
    p(
      "Not every Shopify agency is a migration specialist. When evaluating agencies for a migration project, look for:"
    ),
    ul(
      "Specific migration experience with your source platform (e.g. Magento-to-Shopify, not just general Shopify builds)",
      "References from similar-scale migrations (ask for case studies with comparable product counts and data volumes)",
      "A clear migration methodology — they should be able to explain their process for data mapping, redirect handling, and QA",
      "Experience with your integration stack (especially if you have ERP or POS connections)",
      "A phased approach for complex migrations, not a big-bang cutover"
    ),
    cta(
      "Browse verified Shopify agencies that specialise in platform migrations.",
      "/agencies?specialization=Migration",
      "Find Migration Agencies"
    ),

    faq([
      {
        q: "How long does a Shopify migration take?",
        a: "It depends on complexity. Simple migrations (small catalog, few customisations) take 2–4 weeks. Medium migrations take 4–8 weeks. Complex or enterprise migrations can take 4–6 months. Use our Migration Complexity Calculator for a personalised estimate.",
      },
      {
        q: "Will I lose my SEO rankings during migration?",
        a: "Not if the migration is handled properly. The key factors are comprehensive 301 redirects, migrating all SEO metadata (titles, descriptions, alt text), maintaining URL structure where possible, and submitting updated sitemaps to Google. Expect a temporary dip of 2–4 weeks even with perfect execution.",
      },
      {
        q: "Can I migrate customer passwords to Shopify?",
        a: "No. Shopify cannot import password hashes from other platforms for security reasons. All customers will need to reset their passwords. Plan a communication strategy to minimise friction.",
      },
      {
        q: "Should I migrate my order history?",
        a: "It depends on your needs. If you need historical order data for customer service, returns, or analytics, yes. For very large order histories (100K+), consider archiving older orders separately and only migrating recent ones.",
      },
      {
        q: "Do I need Shopify Plus for a migration?",
        a: "Not necessarily. Shopify Plus is needed if you require custom checkout, B2B/wholesale features, advanced automation, or multi-store architecture. Our Migration Calculator includes this in the assessment.",
      },
      {
        q: "How much does a Shopify migration cost?",
        a: "Costs range from $3,000 for simple WooCommerce migrations to $100,000+ for enterprise Magento migrations. Use our Cost Estimator for a data-driven range based on your specific requirements.",
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
