/**
 * Seed Location × Service blog posts — Batch 3
 * Cities: Amsterdam, Singapore, Lagos, Mexico City, Melbourne
 * Run: node scripts/seed-location-service-posts-batch3.js
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
// POST 1: Shopify Plus Agencies in Amsterdam
// ═══════════════════════════════════════════════════════════════════════════════
const post1 = {
  slug: "shopify-plus-agency-amsterdam",
  title: "Best Shopify Plus Agencies in Amsterdam (2026)",
  excerpt:
    "Amsterdam is the ecommerce capital of Europe and home to Shopify's EU headquarters. Here's how to find the right Plus agency in the Netherlands.",
  category: "Hiring Guide",
  tags: ["Shopify Plus", "Amsterdam", "Netherlands", "agency hiring", "ecommerce", "Europe"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Amsterdam punches well above its weight in global ecommerce. The Netherlands has the highest ecommerce penetration in Europe, Shopify has its EMEA headquarters in the city, and Dutch merchants have been early adopters of Shopify Plus for cross-border selling. If you are running or launching a Plus store, Amsterdam is one of the strongest agency markets in Europe."),
    p("This guide covers why Amsterdam agencies have a distinctive edge for Plus projects, what to evaluate before hiring, and what realistic budgets look like in the Dutch market."),

    h2("Why Amsterdam Merchants Choose Local Agencies"),
    p("The Netherlands has a unique set of advantages that make local agency partnerships especially productive."),
    ul(
      "Cross-border commerce expertise — Dutch merchants sell across Europe by default. Amsterdam agencies build multi-market stores as standard, handling multi-currency, multi-language, and EU-wide logistics from day one. This is not an add-on; it is core to how they work.",
      "Proximity to Shopify EMEA — With Shopify's European headquarters in Amsterdam, local agencies often have direct relationships with Shopify's partner team. This means faster access to beta features, dedicated support escalation, and invitations to early-access programmes.",
      "Multilingual talent pool — Amsterdam is one of the most international cities in Europe. Agencies here routinely employ developers, designers, and strategists who speak Dutch, English, German, French, and Spanish, which is invaluable for multi-market content and UX.",
      "Strong logistics infrastructure — The Netherlands is a global logistics hub. Amsterdam agencies understand integrations with PostNL, DHL, Sendcloud, and cross-border fulfilment platforms that serve the entire EU.",
      "iDEAL and European payments — Dutch consumers overwhelmingly use iDEAL for online payments. Local agencies have deep experience integrating European payment methods including Bancontact, Sofort, Klarna, and SEPA direct debit alongside card payments."
    ),

    h2("What to Look for in a Shopify Plus Agency"),
    h3("Multi-Market Architecture"),
    p("Shopify Plus supports expansion stores for international selling. Your agency should demonstrate experience setting up multi-store architectures with shared product catalogues, localised pricing, market-specific checkout flows, and centralised order management. Ask how many expansion stores they have launched and in which markets."),
    h3("Checkout Extensibility Experience"),
    p("Shopify Plus gives you access to Checkout Extensibility for custom checkout experiences. This includes post-purchase upsells, custom payment logic, and branded checkout UI. Ensure your agency has shipped checkout customisations, not just awareness of the feature."),
    tip("Ask the agency to show you a checkout customisation they built with Checkout Extensibility. If they have only worked with checkout.liquid (the legacy approach), they are behind on the Plus roadmap."),
    h3("Data and Analytics Integration"),
    p("Dutch merchants tend to be data-driven. Your agency should be fluent in GA4 ecommerce tracking, server-side tagging, consent management (GDPR-compliant cookie banners are mandatory), and integration with business intelligence tools like Looker, Power BI, or Klaviyo's analytics."),
    h3("Composable Commerce Readiness"),
    p("Amsterdam is at the forefront of composable commerce in Europe. If your roadmap includes headless frontends, custom apps, or third-party CMS integration, make sure the agency has the engineering capability to support that evolution from a solid Plus foundation."),

    h2("Average Shopify Plus Costs in Amsterdam"),
    p("Amsterdam agency rates reflect the city's position as a premium European market. Hourly rates typically range from \u20ac100 to \u20ac175, with project budgets as follows:"),
    table(
      ["Project Type", "Typical Budget (EUR)", "Timeline"],
      [
        ["Plus theme customisation", "\u20ac15,000 \u2013 \u20ac40,000", "4 \u2013 8 weeks"],
        ["Custom Plus build", "\u20ac50,000 \u2013 \u20ac130,000", "10 \u2013 18 weeks"],
        ["Multi-market Plus setup", "\u20ac70,000 \u2013 \u20ac200,000+", "14 \u2013 24 weeks"],
        ["Monthly retainer", "\u20ac3,000 \u2013 \u20ac10,000/month", "Ongoing"],
      ]
    ),
    p("Multi-market setups are where costs increase significantly due to localised content, multiple payment gateway configurations, and market-specific compliance requirements. Budget accordingly if you plan to sell in more than three EU markets."),

    h2("Find a Shopify Plus Agency in Amsterdam"),
    p("Amsterdam combines European market expertise with proximity to Shopify's own team. Use our directory to compare Plus-certified agencies."),
    cta(
      "Browse verified Shopify Plus agencies with reviews and portfolio details.",
      "/agencies?specialization=Shopify+Plus",
      "Browse Shopify Plus Agencies \u2192"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 2: Shopify Store Build Agencies in Singapore
// ═══════════════════════════════════════════════════════════════════════════════
const post2 = {
  slug: "shopify-store-build-agency-singapore",
  title: "Best Shopify Store Build Agencies in Singapore (2026)",
  excerpt:
    "Singapore is the gateway to Southeast Asia's booming ecommerce market. Here's how to find the right Shopify agency and what a store build costs.",
  category: "Hiring Guide",
  tags: ["Store Build", "Singapore", "agency hiring", "ecommerce", "Southeast Asia"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Southeast Asia is one of the fastest-growing ecommerce regions in the world, and Singapore is its commercial and technological hub. With world-class infrastructure, a business-friendly regulatory environment, and a digitally savvy population, the city-state has become a natural base for brands selling across the ASEAN region."),
    p("Shopify has been gaining ground rapidly in Singapore as merchants move away from marketplace dependency (Shopee, Lazada) and invest in their own branded storefronts. This guide covers how to find the right agency, what makes the Singaporean market unique, and what you should budget."),

    h2("Why Singapore Merchants Choose Local Agencies"),
    p("Building a Shopify store for Southeast Asian consumers requires specific market knowledge that Singapore agencies deliver natively."),
    ul(
      "Multi-market ASEAN expertise — Singapore agencies routinely build stores that serve Malaysia, Indonesia, Thailand, the Philippines, and Vietnam alongside Singapore. They understand the payment preferences, shipping logistics, and consumer behaviour differences across these markets.",
      "Mobile-dominant design — Over 70 percent of ecommerce transactions in Southeast Asia happen on mobile devices. Singapore agencies design mobile-first by instinct, optimising for smaller screens, slower connections in regional markets, and thumb-friendly navigation.",
      "Regional payment integration — Southeast Asian consumers use a fragmented mix of payment methods: GrabPay, PayNow, and credit cards in Singapore; GCash in the Philippines; OVO and GoPay in Indonesia. Local agencies know which gateways to integrate for each market.",
      "Bilingual and multicultural — Singapore's multilingual workforce (English, Mandarin, Malay, Tamil) means agencies can handle localisation for Chinese-speaking and Malay-speaking markets without outsourcing translation.",
      "Strategic time zone — SGT (UTC+8) provides working-hour overlap with all ASEAN markets, Australia, and morning overlap with India and the Middle East."
    ),

    h2("What to Look for in a Store Build Agency"),
    h3("Southeast Asian Portfolio"),
    p("Review the agency's portfolio for stores that target regional consumers. Check whether they have built stores with multi-currency support, localised content, and the specific payment gateways used in your target markets. A portfolio of US or European stores does not guarantee they can execute for ASEAN audiences."),
    h3("Performance on Budget Devices"),
    p("Many consumers across Southeast Asia browse on mid-range Android devices with limited processing power. Your agency should test and optimise for these devices, not just the latest iPhones. Ask about their real-device testing process."),
    tip("Request Lighthouse scores from the agency's recent builds tested on a mid-range Android device with a throttled 4G connection. This is the reality for a large portion of your Southeast Asian audience."),
    h3("Marketplace-to-DTC Migration"),
    p("If you are transitioning from selling primarily on Shopee or Lazada to your own Shopify store, the agency should understand how to replicate marketplace features that your customers expect: fast checkout, integrated logistics tracking, and loyalty or cashback programmes."),
    h3("Compliance and Data Protection"),
    p("Singapore's Personal Data Protection Act (PDPA) governs how you collect, use, and store customer data. Your agency should implement proper consent flows, cookie management, and data handling practices that comply with PDPA from launch."),

    h2("Average Store Build Costs in Singapore"),
    p("Singapore agency rates are competitive relative to Western markets but higher than other ASEAN countries. Hourly rates typically range from SGD 120 to SGD 250 ($90 to $185 USD):"),
    table(
      ["Project Type", "Typical Budget (SGD)", "Timeline"],
      [
        ["Theme customisation", "SGD 5,000 \u2013 15,000", "2 \u2013 4 weeks"],
        ["Custom theme build", "SGD 18,000 \u2013 50,000", "6 \u2013 10 weeks"],
        ["Multi-market store", "SGD 40,000 \u2013 100,000", "10 \u2013 18 weeks"],
        ["Ongoing retainer", "SGD 3,000 \u2013 8,000/month", "Ongoing"],
      ]
    ),
    p("For merchants planning to sell across multiple ASEAN markets, the multi-market build is the most cost-effective approach. Building separate stores later is significantly more expensive than architecting for multi-market from the start."),

    h2("Launch Your Store for Southeast Asia"),
    p("Southeast Asia is a high-growth market with enormous potential. Find an agency that understands the region and can build a store that performs."),
    cta(
      "Browse agencies experienced in Shopify store builds for regional and global markets.",
      "/agencies?specialization=Store+Build",
      "Browse Store Build Agencies \u2192"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 3: Shopify Store Build Agencies in Lagos
// ═══════════════════════════════════════════════════════════════════════════════
const post3 = {
  slug: "shopify-store-build-agency-lagos",
  title: "Best Shopify Store Build Agencies in Lagos (2026)",
  excerpt:
    "Lagos is driving Africa's ecommerce revolution. Here's how to find a Shopify agency in Nigeria's commercial capital and what it costs to build a store.",
  category: "Hiring Guide",
  tags: ["Store Build", "Lagos", "Nigeria", "agency hiring", "ecommerce", "Africa"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Lagos is the undisputed commercial capital of Africa and the epicentre of the continent's rapidly expanding ecommerce market. With a population exceeding 20 million, a young and digitally connected consumer base, and a booming tech startup ecosystem, Lagos offers immense opportunity for merchants building on Shopify."),
    p("The Nigerian ecommerce market has unique challenges that require local expertise: payment processing, logistics, mobile-first design for budget devices, and consumer trust-building. This guide helps you find a Lagos-based agency that understands all of it."),

    h2("Why Lagos Merchants Choose Local Agencies"),
    p("Selling online in Nigeria is fundamentally different from selling in Western markets. Local agencies bring essential contextual knowledge."),
    ul(
      "Payment integration expertise — Nigeria has a complex payment landscape. Bank transfers, USSD payments, mobile money, and cards via Paystack and Flutterwave are all common. A Lagos agency knows which payment methods to prioritise and how to reduce checkout abandonment in the local market.",
      "Logistics and delivery understanding — Last-mile delivery in Lagos is challenging. Agencies in the city understand how to integrate with local logistics providers like GIG Logistics, Kwik, and Sendbox, and how to set delivery expectations that build rather than erode customer trust.",
      "Mobile-first by necessity — The vast majority of Nigerian consumers shop on smartphones, often on 3G or slow 4G connections. Lagos agencies build lightweight, fast-loading stores by default because their market demands it.",
      "Trust and credibility design — Nigerian consumers are cautious about online purchases. Local agencies know how to incorporate trust signals: visible customer service numbers, WhatsApp chat integration, cash-on-delivery options, and clear return policies that address local concerns.",
      "Naira pricing and local context — Displaying prices in NGN, handling currency fluctuations, and understanding local purchasing power are all areas where a Lagos agency operates naturally."
    ),

    h2("What to Look for in a Lagos Store Build Agency"),
    h3("Proven Ecommerce Launches"),
    p("The Lagos tech scene is vibrant but young. Verify that the agency has actually launched Shopify stores that are live and generating transactions, not just designed mockups. Ask for references from merchants who can speak to post-launch performance and support quality."),
    h3("Performance Optimisation Skills"),
    p("Page speed is not optional in Nigeria — it is existential. If your store takes more than 3 seconds to load on a mid-range device, you will lose the majority of visitors. Your agency must demonstrate aggressive optimisation: compressed images, minimal JavaScript, efficient theme code, and smart use of lazy loading."),
    tip("Test the agency's previous stores on a budget Android phone using a throttled 3G connection. If the homepage takes more than 4 seconds to become interactive, they are not optimising for the Nigerian market."),
    h3("WhatsApp Commerce Integration"),
    p("WhatsApp is the primary communication channel in Nigeria. Your store should integrate WhatsApp for customer support, order notifications, and even conversational commerce. A Lagos agency will treat this as a core feature, not an afterthought."),
    h3("Scalability Planning"),
    p("Nigeria's market can produce sudden traffic spikes during sale events and pay-day periods. Your agency should ensure your store can handle these peaks without downtime. Shopify's infrastructure handles scaling well, but theme code and third-party apps must be optimised to match."),

    h2("Average Store Build Costs in Lagos"),
    p("Lagos agencies offer highly competitive rates, making professional Shopify development accessible for Nigerian entrepreneurs and businesses:"),
    table(
      ["Project Type", "Typical Budget (USD)", "Timeline"],
      [
        ["Theme customisation", "$1,000 \u2013 $4,000", "1 \u2013 3 weeks"],
        ["Custom theme build", "$4,000 \u2013 $12,000", "4 \u2013 8 weeks"],
        ["Full custom + payment/logistics", "$10,000 \u2013 $30,000", "8 \u2013 14 weeks"],
        ["Ongoing support", "$500 \u2013 $2,500/month", "Ongoing"],
      ]
    ),
    p("For international brands entering the Nigerian market, these rates represent exceptional value. For local Nigerian merchants, the lower end of the range makes professional Shopify development achievable even with limited initial capital. The key is choosing an agency with live, revenue-generating stores in their portfolio."),

    h2("Build for Africa's Biggest Market"),
    p("Nigeria represents the largest single-country ecommerce opportunity on the African continent. A well-built Shopify store with local market expertise positions you to capture that growth."),
    cta(
      "Browse agencies experienced in Shopify store builds worldwide.",
      "/agencies?specialization=Store+Build",
      "Browse Store Build Agencies \u2192"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 4: Shopify Migration Agencies in Mexico City
// ═══════════════════════════════════════════════════════════════════════════════
const post4 = {
  slug: "shopify-migration-agency-mexico-city",
  title: "Best Shopify Migration Agencies in Mexico City (2026)",
  excerpt:
    "Migrating to Shopify in Mexico? Mexico City agencies understand local payments, Spanish-language SEO, and cross-border selling to the US. Here's what to know.",
  category: "Migration Guide",
  tags: ["Migrations", "Mexico City", "Mexico", "agency hiring", "ecommerce", "Latin America"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Mexico is the second-largest ecommerce market in Latin America and one of the fastest growing globally. Mexico City, home to over 21 million people, is the centre of this growth. As more Mexican merchants outgrow legacy platforms like Tiendanube, WooCommerce, or custom-built solutions, Shopify has become the migration destination of choice."),
    p("But migrating to Shopify in the Mexican market involves challenges that US or European agencies rarely encounter: Mexican payment methods, Spanish-language SEO, peso pricing strategies, and cross-border complexity for merchants selling into the United States. This guide helps you find a Mexico City agency that handles all of it."),

    h2("Why Mexico City Merchants Choose Local Agencies"),
    p("Mexico's ecommerce landscape has distinct characteristics that make local agency expertise highly valuable."),
    ul(
      "Mexican payment ecosystem — Cash-based payments through OXXO convenience stores, monthly instalment plans (meses sin intereses) on credit cards, and SPEI bank transfers are critical payment methods that international agencies often do not support. Mexico City agencies integrate these as standard.",
      "Spanish-language SEO migration — Migrating SEO from one platform to another is risky in any language. Doing it in Spanish requires keyword research, meta tag migration, and URL mapping by a team that thinks natively in the language. Machine translation and bilingual approximations lose rankings.",
      "Cross-border US/Mexico commerce — Many Mexico City merchants sell in both MXN and USD, often with separate inventories, shipping rules, and tax calculations. Local agencies build these dual-market architectures routinely.",
      "CFDI and fiscal compliance — Mexican ecommerce businesses must issue CFDI electronic invoices. Your agency should know how to integrate invoicing solutions (like Facturama or Bind ERP) with your Shopify store so compliance is seamless.",
      "Cultural alignment — Working in Spanish with a team that understands Mexican business culture, communication norms, and decision-making timelines makes the project smoother for everyone involved."
    ),

    h2("What to Look for in a Migration Agency"),
    h3("Source Platform Experience"),
    p("Ask the agency how many migrations they have completed from your specific current platform. A WooCommerce-to-Shopify migration differs significantly from a Tiendanube or Magento migration. Platform-specific experience reduces risk and timeline."),
    h3("SEO Preservation Strategy"),
    p("This is the single most important technical aspect of any migration. The agency must deliver a comprehensive 301 redirect map covering every product, collection, and page URL. They should also migrate meta titles, descriptions, and alt text, and monitor organic traffic for at least 90 days post-launch."),
    tip("Request the agency's SEO migration checklist in writing before signing. It should cover URL redirects, canonical tags, structured data migration, XML sitemap resubmission, and a traffic monitoring plan. If they do not have a documented process, they are not ready."),
    h3("Data Integrity and Testing"),
    p("Products, variants, customers, order history, and discount codes must all transfer accurately. The agency should run the migration in a staging environment first and provide you with a data validation report before the live cutover."),
    h3("OXXO and Instalment Payment Setup"),
    p("If your current platform supports OXXO payments and instalment plans, your new Shopify store must too. Verify that the agency will configure these payment methods during migration so you do not lose existing customers who depend on them."),

    h2("Average Migration Costs in Mexico City"),
    p("Mexico City agencies offer strong value relative to US and European markets. Rates typically range from $40 to $100 USD per hour, with project budgets as follows:"),
    table(
      ["Migration Type", "Typical Budget (USD)", "Timeline"],
      [
        ["Simple migration (< 500 products)", "$5,000 \u2013 $15,000", "3 \u2013 6 weeks"],
        ["Mid-size (500 \u2013 5,000 products)", "$15,000 \u2013 $40,000", "6 \u2013 12 weeks"],
        ["Enterprise migration", "$40,000 \u2013 $100,000+", "12 \u2013 20 weeks"],
        ["Post-migration support", "$1,500 \u2013 $4,000/month", "3 \u2013 6 months"],
      ]
    ),
    p("Always include a 15 to 20 percent contingency in your budget. Migrations routinely uncover unexpected data issues, custom functionality that needs rebuilding, and integration gaps that only surface during testing."),

    h2("Migrate to Shopify With Confidence"),
    p("A clean migration preserves your SEO, your customer relationships, and your revenue. Find an agency that specialises in it."),
    cta(
      "Browse agencies that specialise in Shopify platform migrations.",
      "/agencies?specialization=Migrations",
      "Browse Migration Agencies \u2192"
    ),
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST 5: Shopify CRO Agencies in Melbourne
// ═══════════════════════════════════════════════════════════════════════════════
const post5 = {
  slug: "shopify-cro-agency-melbourne",
  title: "Best Shopify CRO Agencies in Melbourne (2026)",
  excerpt:
    "Melbourne's thriving DTC scene means fierce competition. Here's how a CRO agency can help you convert more visitors and what it costs in Australia's creative capital.",
  category: "Hiring Guide",
  tags: ["CRO", "Melbourne", "Australia", "conversion optimisation", "ecommerce"],
  author: "Shopify Agency Directory",
  reading_time: 5,
  status: "published",
  featured: false,
  date: "2026-03-05",
  content: [
    p("Melbourne is Australia's creative and cultural capital, and its ecommerce scene reflects that energy. The city is home to hundreds of design-led DTC brands in fashion, homewares, specialty food, and wellness. But beautiful branding alone does not pay the bills. As customer acquisition costs on Meta and Google continue to climb, Melbourne merchants are increasingly turning to conversion rate optimisation to extract more revenue from the traffic they already have."),
    p("This guide covers why CRO is a smart investment for Melbourne Shopify merchants, what to look for in a local agency, and what you should expect to pay."),

    h2("Why Melbourne Merchants Choose Local CRO Agencies"),
    p("CRO requires deep, ongoing collaboration. Here is why Melbourne merchants often prefer a local partner."),
    ul(
      "Design-led market understanding — Melbourne consumers have high design expectations. A local CRO agency understands that optimising for conversion in this market does not mean adding ugly pop-ups and countdown timers. It means refining the user experience in ways that feel premium and on-brand.",
      "Australian shopping behaviour — Seasonal patterns in Australia are inverted from the Northern Hemisphere. A Melbourne agency knows that summer campaigns land in December, back-to-school runs in January, and that EOFY (End of Financial Year) sales in June are a major retail event. CRO test calendars need to align with these rhythms.",
      "Workshop culture — Melbourne agencies favour collaborative workshops for hypothesis generation, customer journey mapping, and test prioritisation. These sessions are significantly more productive in person.",
      "Afterpay and local payments — Optimising checkout for Australian consumers means understanding Afterpay, Zip, and how instalment messaging on product pages affects conversion. Melbourne agencies test these elements routinely.",
      "AEST availability — Regular reporting calls, test reviews, and strategy sessions happen during your business hours."
    ),

    h2("What to Look for in a CRO Agency"),
    h3("Evidence-Based Process"),
    p("Good CRO starts with data, not assumptions. Your agency should begin every engagement with a thorough analytics audit, heatmap and session recording analysis, and customer research. The test roadmap should emerge from evidence, not a generic list of best practices."),
    h3("Statistical Discipline"),
    p("Ask how the agency determines test winners. They should explain their approach to statistical significance, minimum sample sizes, and how long they run tests before calling results. Agencies that call winners after three days of data are wasting your money."),
    h3("Revenue-Focused Reporting"),
    p("CRO metrics should ultimately tie back to revenue. Your agency should report on revenue per visitor, average order value, and cart completion rate alongside conversion percentage. Optimising for micro-conversions like email signups is useful only if it ladders up to actual sales."),
    tip("Ask the agency for a redacted case study showing the revenue impact of their work over a 6-month period. If they can only show you conversion rate lifts without revenue data, they may be optimising vanity metrics."),
    h3("Full-Funnel Perspective"),
    p("Conversion does not happen only on the product page. Your agency should evaluate and test across the entire funnel: landing pages, collection pages, search results, cart, checkout, post-purchase upsells, and retention emails. Each stage is an opportunity to recover lost revenue."),

    h2("Average CRO Costs in Melbourne"),
    p("Melbourne CRO agencies typically work on monthly retainers since optimisation is an ongoing process. Here are typical investment levels in AUD:"),
    table(
      ["Engagement Type", "Typical Budget (AUD)", "What You Get"],
      [
        ["CRO audit", "$3,000 \u2013 $7,000", "Analytics review, heatmaps, prioritised test roadmap"],
        ["Monthly retainer (starter)", "$4,000 \u2013 $7,000/month", "2 \u2013 3 tests/month, reporting, UX fixes"],
        ["Monthly retainer (growth)", "$7,000 \u2013 $14,000/month", "4 \u2013 6 tests, personalisation, analytics"],
        ["Enterprise CRO program", "$14,000+/month", "Dedicated team, experimentation culture, multi-channel"],
      ]
    ),
    p("For most Melbourne Shopify merchants doing between $500,000 and $5 million in annual revenue, a retainer in the $5,000 to $8,000 AUD per month range will deliver meaningful results within 3 to 6 months. The ROI on well-executed CRO typically far exceeds the investment."),

    h2("Convert More of Your Existing Traffic"),
    p("Every visitor who leaves without purchasing is revenue left on the table. A CRO agency helps you keep more of what you have already paid to acquire."),
    cta(
      "Browse agencies that specialise in Shopify conversion rate optimisation.",
      "/agencies?specialization=CRO",
      "Browse CRO Agencies \u2192"
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
      console.log(`\u2713 Published: ${post.title}`);
    }
  }

  console.log(`\nDone \u2014 ${posts.length} location \u00d7 service posts published.`);
}

main().catch(console.error);
