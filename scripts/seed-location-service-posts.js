/**
 * Seed Location × Service blog posts
 * URL pattern: /blog/shopify-[service]-agency-[city]
 * Run: node scripts/seed-location-service-posts.js
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
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });

// ═══════════════════════════════════════════════════════════════════════════════
// POST 1: Shopify Plus Agencies in London
// ═══════════════════════════════════════════════════════════════════════════════
const post1 = {
  slug: "shopify-plus-agency-london",
  title: "Best Shopify Plus Agencies in London (2026)",
  excerpt:
    "Looking for a Shopify Plus agency in London? Here's what separates the best from the rest — from enterprise expertise to realistic project costs.",
  category: "Hiring Guide",
  tags: ["Shopify Plus", "London", "agency hiring", "enterprise ecommerce", "UK"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-01",
  content: [
    p("London is one of Europe's biggest ecommerce hubs. Hundreds of DTC brands, enterprise retailers, and fast-growing startups call it home, and many of them run on Shopify Plus. But with dozens of agencies in the city claiming Plus expertise, how do you separate genuine specialists from generalists who added a badge to their website?"),
    p("This guide covers what to look for in a London-based Shopify Plus agency, when it makes sense to hire locally versus remotely, and what you should realistically budget for your project."),

    h2("Why London Merchants Choose Local Agencies"),
    p("There are practical reasons why many London merchants prefer agencies in their own city, even in an era of remote work."),
    ul(
      "Face-to-face workshops — Discovery sessions, design reviews, and launch-day war rooms are more productive in person. Most London agencies offer hybrid working arrangements that include regular on-site days.",
      "Time zone alignment — A London agency works the same hours as your team. No waiting overnight for responses, no 6 a.m. standups to accommodate a team twelve hours ahead.",
      "Local market knowledge — UK-specific payment gateways (Klarna, Clearpay), VAT compliance, Royal Mail integrations, and GDPR requirements are second nature to London-based developers.",
      "Ecosystem access — London agencies often have established relationships with Shopify's EMEA team, local app partners, and fulfilment providers that can accelerate your build."
    ),
    p("That said, remote agencies can be an excellent choice if your requirements are well-documented and you have internal project management capacity. The key is matching the engagement model to your team's working style."),

    h2("What to Look for in a Shopify Plus Agency"),
    h3("Verified Plus Partner Status"),
    p("Shopify maintains a partner directory with verified credentials. Any legitimate Plus agency should appear there. Check how many Plus stores they have launched and whether they hold additional certifications like Shopify Plus Certified App Partner status."),
    h3("Enterprise Migration Experience"),
    p("Plus migrations from Magento, Salesforce Commerce Cloud, or custom platforms are complex. Ask for case studies that show data migration strategy, URL redirect mapping, and post-launch performance metrics. An agency that has handled multi-market, multi-currency migrations will navigate your project far more smoothly."),
    h3("Technical Depth Beyond Theme Work"),
    p("Shopify Plus unlocks Shopify Functions, Checkout Extensibility, B2B features, and custom apps via the Admin API. Make sure the agency has developers who can work with these tools, not just theme customisation."),
    tip("Ask the agency to walk you through a recent Shopify Functions implementation. If they can't name a specific use case they've shipped, they may not have real Plus-level engineering depth."),

    h3("Ongoing Support and Retainer Models"),
    p("A Plus store needs ongoing optimisation. Look for agencies that offer monthly retainers covering performance monitoring, A/B testing, and conversion rate optimisation alongside ad-hoc development."),

    h2("Average Shopify Plus Project Costs in London"),
    p("London agency rates typically range from $120 to $200 per hour, depending on the agency's size and reputation. Here's a rough guide to total project costs:"),
    table(
      ["Project Type", "Typical Budget", "Timeline"],
      [
        ["Theme customisation (Plus)", "$15,000 – $40,000", "4 – 8 weeks"],
        ["Full custom build", "$50,000 – $150,000", "10 – 20 weeks"],
        ["Enterprise migration", "$60,000 – $200,000+", "12 – 24 weeks"],
        ["Monthly retainer", "$3,000 – $10,000/month", "Ongoing"],
      ]
    ),
    p("These figures reflect typical London market rates in 2026. Agencies outside Zone 1 or with smaller teams may come in lower, while top-tier agencies with enterprise portfolios will sit at the higher end."),
    tip("Always request a fixed-price proposal for well-scoped projects. Time-and-materials billing makes sense for ongoing retainers, but a new build should have a clear ceiling."),

    h2("Find the Right Shopify Plus Agency"),
    p("The best agency for your business is one that matches your technical requirements, communication style, and budget. Use our directory to compare verified Shopify Plus agencies in London and beyond."),
    cta(
      "Browse verified Shopify Plus agencies with client reviews and portfolio details.",
      "/agencies?specialization=Shopify+Plus",
      "Browse Shopify Plus Agencies →"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 2: Shopify Store Build Agencies in New York
// ═══════════════════════════════════════════════════════════════════════════════
const post2 = {
  slug: "shopify-store-build-agency-new-york",
  title: "Best Shopify Store Build Agencies in New York (2026)",
  excerpt:
    "Planning a new Shopify store in New York? Here's how to find the right agency, what a store build actually costs, and why NYC brands often go local.",
  category: "Hiring Guide",
  tags: ["Store Build", "New York", "agency hiring", "ecommerce", "US"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-02",
  content: [
    p("New York is the commercial capital of the United States and home to thousands of ecommerce brands ranging from fashion labels in SoHo to B2B wholesalers in the Garment District. If you are launching a Shopify store from New York, you have access to one of the deepest pools of agency talent in the world."),
    p("This guide helps you navigate that market: when to hire locally, how to evaluate agencies, and what to budget for a ground-up Shopify store build."),

    h2("Why New York Merchants Choose Local Agencies"),
    p("Remote agencies are a viable option for any Shopify project. But New York merchants frequently choose local partners for several reasons."),
    ul(
      "In-person collaboration — Brand strategy sessions, photoshoot coordination, and product workshops benefit from being in the same room. Many NYC agencies have studios where you can review designs on large screens alongside your team.",
      "Industry specialisation — New York agencies tend to specialise in the verticals that define the city: fashion, beauty, food and beverage, and luxury goods. They understand the visual standards and customer expectations these industries demand.",
      "Speed of communication — Same-timezone, same-city agencies can turn around requests faster when deadlines are tight. If your launch is tied to New York Fashion Week or a holiday campaign, that responsiveness matters.",
      "Networking — NYC's Shopify community runs regular meetups, and agencies often connect clients with photographers, fulfilment centres, and marketing partners in the city."
    ),

    h2("What to Look for in a Store Build Agency"),
    h3("Portfolio Relevant to Your Industry"),
    p("A store build is as much about brand expression as it is about technical execution. Review the agency's portfolio for stores in your industry. Do they understand your aesthetic? Can they demonstrate measurable results like conversion rate improvements or faster page speeds?"),
    h3("End-to-End Capability"),
    p("A good store build agency should handle UX design, Shopify theme development, app integration, content migration, and QA testing. If they outsource critical steps, you lose quality control."),
    h3("SEO From Day One"),
    p("Too many agencies treat SEO as an afterthought. Your store's URL structure, meta tags, page speed, and structured data should all be built correctly from the start, not patched later."),
    tip("Ask the agency whether they deliver a technical SEO checklist as part of their launch process. If they do not, they are likely leaving rankings on the table."),
    h3("Post-Launch Support"),
    p("Launching is only the beginning. Look for agencies that offer a post-launch warranty period (typically 30 to 90 days) plus optional retainer packages for iterative improvements."),

    h2("Average Store Build Costs in New York"),
    p("New York agencies typically charge between $100 and $200 per hour. Here is what total project costs look like for different store build scopes:"),
    table(
      ["Scope", "Typical Budget", "Timeline"],
      [
        ["Starter store (theme + config)", "$5,000 – $15,000", "2 – 4 weeks"],
        ["Custom theme build", "$20,000 – $60,000", "6 – 12 weeks"],
        ["Full custom + integrations", "$50,000 – $120,000", "10 – 18 weeks"],
        ["Post-launch retainer", "$2,000 – $8,000/month", "Ongoing"],
      ]
    ),
    p("If you are bootstrapping, a well-configured premium theme can get you to market quickly. If you have funding and a complex product catalogue, investing in a fully custom build will pay dividends in conversion rate and brand differentiation."),

    h2("Find Your Store Build Agency"),
    p("Use our directory to compare agencies that specialise in new Shopify store builds. Filter by location, specialization, and budget range to find the right match."),
    cta(
      "Browse agencies experienced in ground-up Shopify store builds.",
      "/agencies?specialization=Store+Build",
      "Browse Store Build Agencies →"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 3: Shopify CRO Agencies in Sydney
// ═══════════════════════════════════════════════════════════════════════════════
const post3 = {
  slug: "shopify-cro-agency-sydney",
  title: "Best Shopify CRO Agencies in Sydney (2026)",
  excerpt:
    "Conversion rate optimisation can transform your Shopify store's revenue without increasing ad spend. Here's how to find the right CRO agency in Sydney.",
  category: "Hiring Guide",
  tags: ["CRO", "Sydney", "conversion optimisation", "ecommerce", "Australia"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-03",
  content: [
    p("Australian ecommerce has grown rapidly over the past five years, and Sydney sits at the centre of that growth. But as customer acquisition costs continue to rise across Google and Meta, more Sydney brands are shifting their focus from traffic to conversion. That is where a CRO agency earns its fee."),
    p("A skilled conversion rate optimisation agency can increase your revenue by 20 to 50 percent without a single extra dollar of ad spend. This guide covers how to find the right one in Sydney, what good CRO actually looks like, and how much you should expect to invest."),

    h2("Why Sydney Merchants Choose Local CRO Agencies"),
    p("CRO is deeply collaborative work. Unlike a one-off store build, it requires ongoing communication, rapid test iteration, and a shared understanding of your customers. Here is why local often wins."),
    ul(
      "Customer empathy — A Sydney-based agency understands Australian shopping behaviour, seasonal patterns (think Boxing Day sales, not Black Friday as the main event), and local payment preferences like Afterpay and Zip.",
      "Workshop-driven process — CRO starts with hypothesis generation. In-person workshops where you walk through heatmaps, session recordings, and analytics together are far more productive than screen shares.",
      "Regulatory awareness — Australian Consumer Law, privacy regulations, and accessibility standards (WCAG) all affect how you design conversion flows. Local agencies build these into their process by default.",
      "AEST-friendly reporting — Weekly performance reviews and test result readouts happen during your working hours, not at 10 p.m."
    ),

    h2("What to Look for in a CRO Agency"),
    h3("Data-Driven Methodology"),
    p("A legitimate CRO agency starts with data, not opinions. They should conduct a full analytics audit, set up proper event tracking, and base their test roadmap on quantitative evidence. If an agency leads with 'best practice redesigns' rather than data analysis, they are guessing."),
    h3("Statistical Rigour"),
    p("Ask how they determine test winners. They should use statistical significance calculators, run tests for adequate sample sizes, and avoid calling winners too early. Bayesian and frequentist approaches are both valid as long as they can explain their method."),
    tip("A common red flag: agencies that guarantee a specific conversion lift before they have seen your data. CRO results depend on your traffic volume, current conversion rate, and how much room for improvement exists."),
    h3("Full-Funnel Thinking"),
    p("Conversion rate optimisation is not just about the product page. The best agencies look at the entire funnel: landing pages, collection pages, cart, checkout, post-purchase upsells, and email flows. Each stage is an opportunity."),
    h3("Transparent Reporting"),
    p("You should receive a regular cadence of reports showing tests run, statistical results, revenue impact, and the next round of hypotheses. If reporting is vague or infrequent, find a different agency."),

    h2("Average CRO Project Costs in Sydney"),
    p("CRO agencies in Sydney typically work on monthly retainers rather than fixed-price projects, since optimisation is an ongoing process. Here are typical investment levels:"),
    table(
      ["Engagement Type", "Typical Budget (AUD)", "What You Get"],
      [
        ["One-off CRO audit", "$3,000 – $8,000", "Analytics review, heatmap analysis, prioritised recommendations"],
        ["Monthly retainer (small)", "$4,000 – $8,000/month", "2 – 4 A/B tests per month, reporting, UX improvements"],
        ["Monthly retainer (mid)", "$8,000 – $15,000/month", "4 – 8 tests, personalisation, advanced analytics"],
        ["Enterprise CRO program", "$15,000+/month", "Dedicated team, multi-channel testing, experimentation culture"],
      ]
    ),
    p("For most Shopify merchants doing between $1 million and $10 million in annual revenue, a retainer in the $5,000 to $10,000 AUD per month range will deliver meaningful and measurable results within 3 to 6 months."),

    h2("Start Optimising Your Store"),
    p("If you are spending money to drive traffic but not optimising what happens after the click, you are leaving revenue on the table. Find a CRO-focused agency that fits your business."),
    cta(
      "Browse agencies that specialise in Shopify conversion rate optimisation.",
      "/agencies?specialization=CRO",
      "Browse CRO Agencies →"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 4: Shopify Migration Agencies in Toronto
// ═══════════════════════════════════════════════════════════════════════════════
const post4 = {
  slug: "shopify-migration-agency-toronto",
  title: "Best Shopify Migration Agencies in Toronto (2026)",
  excerpt:
    "Migrating to Shopify from WooCommerce, Magento, or a custom platform? Here's how Toronto merchants find the right migration agency and what it costs.",
  category: "Migration Guide",
  tags: ["Migrations", "Toronto", "platform migration", "ecommerce", "Canada"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-04",
  content: [
    p("Toronto is Canada's largest ecommerce market, and hundreds of merchants in the city are migrating to Shopify from legacy platforms every year. Whether you are leaving WooCommerce, Magento, BigCommerce, or a custom-built system, the migration process has more moving parts than most merchants expect."),
    p("Choosing the wrong agency for a platform migration can lead to lost SEO rankings, broken customer data, and weeks of downtime. This guide helps you find a Toronto-based migration specialist and understand the true cost of switching."),

    h2("Why Toronto Merchants Choose Local Migration Agencies"),
    p("Platform migrations involve complex coordination, and having an agency in your time zone and city can significantly reduce risk."),
    ul(
      "Bilingual capability — Many Toronto agencies serve both English and French-speaking markets. If your store needs to support both official languages, a local agency will have the translation and localisation workflows already in place.",
      "Canadian compliance — PCI-DSS requirements, CASL (anti-spam legislation), and Canadian tax rules including provincial sales tax calculations are areas where local agencies have hard-won expertise.",
      "Hands-on data review — Sitting down with the agency to audit your product catalogue, customer database, and order history in person reduces miscommunication during the most critical phase of the project.",
      "Fulfilment network knowledge — Toronto agencies know the Canadian fulfilment landscape: Canada Post integrations, cross-border shipping to the US, and duty and tax handling for international orders."
    ),

    h2("What to Look for in a Migration Agency"),
    h3("Platform-Specific Experience"),
    p("Ask the agency how many migrations they have completed from your specific source platform. A WooCommerce-to-Shopify migration is very different from a Magento-to-Shopify migration in terms of data structures, URL patterns, and integration complexity."),
    h3("SEO Migration Plan"),
    p("This is the single biggest risk in any migration. The agency must provide a comprehensive 301 redirect map, preserve URL structures where possible, migrate meta titles and descriptions, and monitor organic traffic for at least 90 days post-launch."),
    tip("Request the agency's SEO migration checklist before signing. It should cover redirects, canonical tags, structured data, sitemap submission, and a traffic monitoring plan. If they do not have one, keep looking."),
    h3("Data Integrity Guarantee"),
    p("Customer accounts, order history, product variants, metafields, and discount codes all need to transfer accurately. Ask the agency about their data validation process and whether they offer a post-migration data audit."),
    h3("Staged Migration Approach"),
    p("The best agencies run the new Shopify store in parallel with the old platform for a testing period. This allows you to verify data, train your team, and catch issues before cutting over."),

    h2("Average Migration Costs in Toronto"),
    p("Migration costs depend on the source platform, the volume of data, and the number of integrations. Here are typical Toronto market rates in 2026:"),
    table(
      ["Migration Type", "Typical Budget (CAD)", "Timeline"],
      [
        ["Simple migration (< 500 products)", "$8,000 – $20,000", "4 – 6 weeks"],
        ["Mid-size (500 – 5,000 products)", "$20,000 – $60,000", "6 – 12 weeks"],
        ["Enterprise migration (5,000+ products)", "$60,000 – $150,000+", "12 – 24 weeks"],
        ["Post-migration support", "$2,000 – $5,000/month", "3 – 6 months"],
      ]
    ),
    p("Budget a contingency of 15 to 20 percent above your quoted price. Migrations regularly uncover unexpected data issues, custom functionality that needs rebuilding, or third-party integrations that require API changes."),

    h2("Find a Migration Specialist"),
    p("A clean migration protects your SEO rankings, customer data, and revenue. Do not leave it to an agency that treats migrations as an afterthought."),
    cta(
      "Browse agencies that specialise in Shopify platform migrations.",
      "/agencies?specialization=Migrations",
      "Browse Migration Agencies →"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 5: Shopify Headless Agencies in Berlin
// ═══════════════════════════════════════════════════════════════════════════════
const post5 = {
  slug: "shopify-headless-agency-berlin",
  title: "Best Shopify Headless Agencies in Berlin (2026)",
  excerpt:
    "Considering a headless Shopify build? Berlin's tech-forward agency scene is a strong place to find specialists. Here's what to know before you hire.",
  category: "Hiring Guide",
  tags: ["Headless", "Berlin", "Hydrogen", "composable commerce", "Germany"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Berlin has established itself as one of Europe's leading tech cities, and its agency ecosystem reflects that. If you are considering a headless Shopify architecture using Hydrogen, Next.js, or another frontend framework with the Shopify Storefront API, Berlin is home to several agencies with deep expertise in composable commerce."),
    p("Headless builds are not for everyone. They add complexity and cost, but for brands that need blazing-fast performance, unique user experiences, or multi-channel content delivery, they can be transformative. This guide helps you decide whether headless is right for your business and how to find the right Berlin agency to build it."),

    h2("Why Berlin Merchants Choose Local Headless Agencies"),
    p("Headless commerce projects are technically complex and require close collaboration between your brand team and the agency's engineers. Here is why proximity helps."),
    ul(
      "Deep technical talent pool — Berlin attracts senior JavaScript and React developers from across Europe. Agencies here tend to have strong engineering cultures with experience in modern frameworks like Next.js, Remix, and Hydrogen.",
      "European market focus — Berlin agencies understand GDPR, PSD2 payment regulations, EU VAT rules, and multi-language requirements. These are not afterthoughts but core to how they architect solutions.",
      "Startup and scale-up DNA — Berlin's startup ecosystem means agencies are accustomed to working with fast-moving, venture-backed brands that need to ship quickly and iterate constantly.",
      "CET time zone — Central European Time works well for collaboration with teams across Europe, the UK, and even east-coast North America with reasonable overlap."
    ),

    h2("What to Look for in a Headless Shopify Agency"),
    h3("Storefront API Expertise"),
    p("The Shopify Storefront API is the backbone of any headless build. Your agency must demonstrate fluency with GraphQL queries, cart management, customer authentication, and checkout flows via the API. Ask to see their approach to handling Shopify's API rate limits and caching strategy."),
    h3("Framework Preference and Rationale"),
    p("Hydrogen (Shopify's own React framework), Next.js, Remix, and Astro are all common choices. A good agency should be able to explain why they recommend a specific framework for your use case, not just default to whatever they know best."),
    tip("If the agency only works with one frontend framework and cannot articulate trade-offs versus alternatives, they may lack the architectural depth you need for a headless project."),
    h3("Performance Engineering"),
    p("The whole point of going headless is performance. Your agency should set Core Web Vitals targets upfront and have a strategy for edge caching, image optimisation, lazy loading, and prefetching that gets your LCP under 2.5 seconds on mobile."),
    h3("Content Management Strategy"),
    p("Headless builds need a CMS. Whether it is Shopify's built-in metafields and metaobjects, Contentful, Sanity, or Storyblok, the agency should help you choose the right content architecture and build preview workflows so your marketing team can publish independently."),

    h2("Average Headless Project Costs in Berlin"),
    p("Headless builds are inherently more expensive than standard Shopify theme projects because they require custom frontend development, API integration, and infrastructure management. Berlin agency rates typically range from 100 to 180 EUR per hour."),
    table(
      ["Project Type", "Typical Budget (EUR)", "Timeline"],
      [
        ["Headless MVP", "\u20AC30,000 \u2013 \u20AC60,000", "8 \u2013 12 weeks"],
        ["Full headless build", "\u20AC60,000 \u2013 \u20AC150,000", "12 \u2013 20 weeks"],
        ["Headless + multi-market", "\u20AC100,000 \u2013 \u20AC250,000+", "16 \u2013 30 weeks"],
        ["Ongoing support", "\u20AC3,000 \u2013 \u20AC10,000/month", "Ongoing"],
      ]
    ),
    p("These are significant investments, so headless only makes sense when you have a genuine business case: performance-critical sites, complex multi-channel requirements, or a unique frontend experience that standard Shopify themes cannot deliver."),

    h2("Find a Headless Commerce Specialist"),
    p("Headless Shopify requires a different skill set than traditional theme development. Make sure your agency has the engineering depth to deliver."),
    cta(
      "Browse agencies experienced in headless Shopify and composable commerce.",
      "/agencies?specialization=Headless",
      "Browse Headless Agencies →"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// UPSERT ALL POSTS
// ═══════════════════════════════════════════════════════════════════════════════
async function main() {
  const posts = [post1, post2, post3, post4, post5];

  for (const post of posts) {
    const { error } = await supabase.from("blog_posts").upsert(post, {
      onConflict: "slug",
    });

    if (error) {
      console.error(`Failed to upsert "${post.slug}":`, error.message);
    } else {
      console.log(`✓ Published: ${post.title}`);
    }
  }

  console.log(`\nDone — ${posts.length} location × service posts published.`);
}

main().catch(console.error);
