export interface SegmentFilter {
  country?: string;
  location?: string;
  specialization?: string;
  /** Multiple budget_range values — fetched with .in() */
  budgets?: string[];
}

export interface SegmentConfig {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  breadcrumbLabel: string;
  filter: SegmentFilter;
  faq?: Array<{ q: string; a: string }>;
}

export const SEGMENTS: Record<string, SegmentConfig> = {
  london: {
    slug: "london",
    h1: "Shopify Agencies in London",
    metaTitle: "Best Shopify Agencies in London",
    metaDescription:
      "Browse verified Shopify agencies based in London. Compare reviews, specializations, and budgets to find the right partner for your Shopify store.",
    intro:
      "London is home to some of the world's leading Shopify agencies, from boutique studios to large-scale enterprise partners. Browse verified agencies based in or near London, with real client reviews and transparent pricing.",
    breadcrumbLabel: "London",
    filter: { location: "London" },
    faq: [
      {
        q: "How much do London Shopify agencies charge?",
        a: "London agencies typically charge £80–£180/hour or offer fixed-price projects from £5,000 for small builds to £100,000+ for complex Shopify Plus implementations.",
      },
      {
        q: "Do London agencies work with international clients?",
        a: "Yes — most London agencies work remotely with clients worldwide. Many have teams fluent in multiple languages and extensive experience with cross-border ecommerce.",
      },
      {
        q: "What should I look for in a London Shopify agency?",
        a: "Look for Shopify Partner or Plus Partner status, a portfolio relevant to your industry, transparent pricing, and reviews from clients with comparable project scopes.",
      },
    ],
  },

  "shopify-plus": {
    slug: "shopify-plus",
    h1: "Shopify Plus Agencies",
    metaTitle: "Best Shopify Plus Agencies & Certified Partners",
    metaDescription:
      "Find verified Shopify Plus agencies and certified partners. Specialists in enterprise Shopify Plus builds, checkout extensibility, Shopify Functions, and B2B.",
    intro:
      "Shopify Plus requires specialist expertise — checkout extensibility, Shopify Functions, B2B pricing tiers, multi-store management, and automation via Shopify Flow. These agencies have demonstrated Shopify Plus capability with real-world enterprise projects.",
    breadcrumbLabel: "Shopify Plus",
    filter: { specialization: "Shopify Plus" },
    faq: [
      {
        q: "What is a Shopify Plus agency?",
        a: "A Shopify Plus agency specializes in the enterprise tier of Shopify, including custom checkout flows, Shopify Functions, advanced B2B features, and multi-store management.",
      },
      {
        q: "How much does a Shopify Plus project cost?",
        a: "Shopify Plus projects typically range from $25,000 for focused engagements to $250,000+ for full-scale enterprise builds. Shopify Plus itself starts at $2,300/month.",
      },
      {
        q: "Do I need a Shopify Plus certified partner?",
        a: "Shopify Plus Certified Partners have met Shopify's vetting requirements and are listed in the official directory. They're a strong starting point, but not all excellent Plus agencies hold official certification.",
      },
    ],
  },

  "united-states": {
    slug: "united-states",
    h1: "Shopify Agencies in the United States",
    metaTitle: "Best Shopify Agencies in the USA",
    metaDescription:
      "Browse the top Shopify agencies in the United States. Find US-based Shopify partners by city, specialization, and budget range.",
    intro:
      "The United States has the largest concentration of Shopify agencies globally, from boutique studios to enterprise-scale partners. Browse verified US agencies across New York, Los Angeles, Chicago, Austin, Miami, and beyond.",
    breadcrumbLabel: "United States",
    filter: { country: "US" },
    faq: [
      {
        q: "What are the best cities for Shopify agencies in the US?",
        a: "New York, Los Angeles, Chicago, Austin, and Miami have the highest density of Shopify agencies, though many US agencies work remotely with clients nationwide.",
      },
      {
        q: "How much do US Shopify agencies charge?",
        a: "US agency rates typically range from $100–$250/hour. Fixed-price projects start around $5,000 for simple builds and reach $200,000+ for complex Shopify Plus implementations.",
      },
      {
        q: "Should I hire a US-based agency or an overseas agency?",
        a: "US-based agencies offer timezone alignment, cultural familiarity, and easier escalation. Overseas agencies are often more cost-effective. The best choice depends on your project complexity, communication needs, and budget.",
      },
    ],
  },

  "new-york": {
    slug: "new-york",
    h1: "Shopify Agencies in New York",
    metaTitle: "Best Shopify Agencies in New York City",
    metaDescription:
      "Find the best Shopify agencies in New York. Compare NYC-based Shopify developers, designers, and growth partners for your ecommerce project.",
    intro:
      "New York City has a thriving Shopify agency ecosystem, particularly strong in fashion, luxury, beauty, and direct-to-consumer brands. Browse verified agencies based in New York with real client reviews.",
    breadcrumbLabel: "New York",
    filter: { location: "New York" },
    faq: [
      {
        q: "What industries do New York Shopify agencies specialize in?",
        a: "New York agencies are particularly strong in fashion, luxury goods, beauty, and direct-to-consumer brands — reflecting the city's strength in retail, media, and creative industries.",
      },
      {
        q: "How much do New York Shopify agencies charge?",
        a: "New York agency rates are among the highest in the US, typically $150–$250/hour. Fixed-price projects for a quality store build start around $10,000–$20,000.",
      },
      {
        q: "Can a New York agency work with my business if I'm based elsewhere?",
        a: "Yes — most New York Shopify agencies work with clients across the US and internationally via remote collaboration, async communication, and video calls.",
      },
    ],
  },

  "los-angeles": {
    slug: "los-angeles",
    h1: "Shopify Agencies in Los Angeles",
    metaTitle: "Best Shopify Agencies in Los Angeles",
    metaDescription:
      "Find top Shopify agencies in Los Angeles. Compare LA-based Shopify partners for store builds, redesigns, CRO, and DTC growth.",
    intro:
      "Los Angeles is a major hub for DTC brands, wellness companies, and ecommerce-first businesses. Browse verified Shopify agencies based in LA, known for creative design and growth-focused development.",
    breadcrumbLabel: "Los Angeles",
    filter: { location: "Los Angeles" },
    faq: [
      {
        q: "What industries do LA Shopify agencies specialize in?",
        a: "LA agencies have particular strength in wellness, beauty, apparel, and entertainment-adjacent brands — industries where brand-led creative design and storytelling are critical.",
      },
      {
        q: "How much do Los Angeles Shopify agencies charge?",
        a: "LA agency rates typically range from $120–$220/hour. Full store builds start around $8,000 for simpler projects.",
      },
      {
        q: "Do LA agencies work with smaller DTC brands?",
        a: "Yes — many LA agencies started as boutique studios serving emerging DTC brands and work across a range of project sizes from early-stage to established mid-market brands.",
      },
    ],
  },

  chicago: {
    slug: "chicago",
    h1: "Shopify Agencies in Chicago",
    metaTitle: "Best Shopify Agencies in Chicago",
    metaDescription:
      "Browse verified Shopify agencies in Chicago. Find Chicago-based Shopify developers and partners for store builds, migrations, and B2B projects.",
    intro:
      "Chicago's agency scene blends B2B expertise with strong retail and manufacturing heritage. Browse verified Shopify agencies based in Chicago across specializations from store builds to platform migrations.",
    breadcrumbLabel: "Chicago",
    filter: { location: "Chicago" },
    faq: [
      {
        q: "What industries do Chicago Shopify agencies serve?",
        a: "Chicago agencies are well-positioned for B2B ecommerce, manufacturing, food and beverage, and mid-market retail — all sectors with deep Chicago roots.",
      },
      {
        q: "How much do Chicago Shopify agencies charge?",
        a: "Chicago rates are typically $100–$180/hour — slightly below New York and LA while offering comparable technical quality.",
      },
      {
        q: "Are there Shopify Plus specialists in Chicago?",
        a: "Yes — several Chicago agencies hold Shopify Plus Partner status and have experience with enterprise-scale implementations, particularly in B2B and omnichannel retail.",
      },
    ],
  },

  austin: {
    slug: "austin",
    h1: "Shopify Agencies in Austin",
    metaTitle: "Best Shopify Agencies in Austin, Texas",
    metaDescription:
      "Find Shopify agencies in Austin, Texas. Compare verified Austin-based Shopify developers and ecommerce agencies for your store project.",
    intro:
      "Austin's fast-growing tech and startup scene has produced a strong cohort of ecommerce-focused agencies. Browse verified Shopify agencies based in Austin, Texas, with real client reviews.",
    breadcrumbLabel: "Austin",
    filter: { location: "Austin" },
    faq: [
      {
        q: "Why hire a Shopify agency in Austin?",
        a: "Austin agencies combine strong technical skills with a collaborative approach and competitive rates. The city's startup culture makes agencies particularly attuned to growth-stage and DTC brands.",
      },
      {
        q: "How much do Austin Shopify agencies charge?",
        a: "Austin rates typically range from $90–$160/hour — below the coasts but with strong technical depth, especially in integrations and custom app development.",
      },
      {
        q: "Do Austin agencies work with clients outside Texas?",
        a: "Yes — most Austin agencies work remotely with clients across the US. Many serve clients on both coasts and internationally.",
      },
    ],
  },

  miami: {
    slug: "miami",
    h1: "Shopify Agencies in Miami",
    metaTitle: "Best Shopify Agencies in Miami, Florida",
    metaDescription:
      "Find Shopify agencies in Miami. Compare verified Miami-based Shopify developers and ecommerce agencies for your store project.",
    intro:
      "Miami's international business community, luxury retail sector, and proximity to Latin American markets make it home to several strong Shopify agencies with multilingual capabilities.",
    breadcrumbLabel: "Miami",
    filter: { location: "Miami" },
    faq: [
      {
        q: "Do Miami Shopify agencies serve Latin American clients?",
        a: "Yes — many Miami agencies are bilingual and serve clients across Latin America, particularly in Brazil, Mexico, Colombia, and Argentina.",
      },
      {
        q: "What industries do Miami Shopify agencies specialize in?",
        a: "Miami agencies are particularly strong in fashion, luxury goods, hospitality, and beauty — reflecting the city's lifestyle brand economy and international retail scene.",
      },
      {
        q: "How much do Miami Shopify agencies charge?",
        a: "Miami rates typically range from $100–$180/hour for US-focused work, with some agencies offering competitive international rates.",
      },
    ],
  },

  migration: {
    slug: "migration",
    h1: "Shopify Migration Agencies",
    metaTitle: "Best Shopify Migration Agencies | WooCommerce, Magento & BigCommerce",
    metaDescription:
      "Find agencies specializing in Shopify migrations from WooCommerce, Magento, BigCommerce, and other platforms. Compare verified migration experts with real client reviews.",
    intro:
      "Migrating to Shopify from WooCommerce, Magento, or BigCommerce is a complex project requiring expertise in data migration, URL structure preservation, and SEO continuity. These agencies specialize in platform migrations and have the processes to protect your rankings and customer data throughout the transition.",
    breadcrumbLabel: "Migrations",
    filter: { specialization: "Migrations" },
    faq: [
      {
        q: "How much does a Shopify migration cost?",
        a: "A basic migration from WooCommerce to Shopify typically costs $3,000–$15,000. Complex Magento migrations with custom functionality can reach $50,000–$150,000 depending on scope and data complexity.",
      },
      {
        q: "Will I lose SEO rankings when migrating to Shopify?",
        a: "A well-executed migration should preserve your rankings. Key steps include URL mapping with 301 redirects, migrating metadata and structured data, preserving internal link structure, and submitting updated sitemaps to Google Search Console.",
      },
      {
        q: "How long does a platform migration take?",
        a: "Simple WooCommerce migrations can complete in 4–8 weeks. Magento enterprise migrations typically take 3–9 months depending on custom functionality, integration complexity, and data volume.",
      },
    ],
  },

  "under-25k": {
    slug: "under-25k",
    h1: "Shopify Agencies for Budgets Under $25,000",
    metaTitle: "Affordable Shopify Agencies | Projects Under $25,000",
    metaDescription:
      "Find Shopify agencies for projects under $25,000. Compare verified agencies working with smaller budgets for store builds, redesigns, and theme customizations.",
    intro:
      "Not every Shopify project requires a six-figure budget. These agencies work with projects from under $5,000 to $25,000, covering new store builds, theme customizations, app integrations, and smaller platform migrations.",
    breadcrumbLabel: "Under $25k",
    filter: { budgets: ["Under $5,000", "$5,000 - $25,000"] },
    faq: [
      {
        q: "What can I get from a Shopify agency for under $25,000?",
        a: "For under $25,000, you can typically get a full theme-based store build, a redesign of an existing store, a platform migration from WooCommerce, or a focused CRO or SEO engagement.",
      },
      {
        q: "Are lower-budget agencies less skilled?",
        a: "Not necessarily. Many excellent agencies work with smaller budgets — particularly agencies in lower cost-of-living regions or those focused on specific services rather than full-service retainers.",
      },
      {
        q: "How do I evaluate agencies for smaller projects?",
        a: "Focus on their portfolio of similar-sized projects, the clarity of their scope and contract, their post-launch support policy, and references from clients with comparable budgets.",
      },
    ],
  },

  australia: {
    slug: "australia",
    h1: "Shopify Agencies in Australia",
    metaTitle: "Best Shopify Agencies in Australia",
    metaDescription:
      "Browse verified Shopify agencies in Australia. Compare Australian Shopify partners by specialization, budget, and location for your ecommerce project.",
    intro:
      "Australia has a thriving Shopify ecosystem with agencies spanning Sydney, Melbourne, Brisbane, and beyond. Many Australian agencies have expertise in localised ecommerce — including local payment gateways, shipping integrations, and GST compliance — alongside strong DTC and retail brand work.",
    breadcrumbLabel: "Australia",
    filter: { country: "AU" },
    faq: [
      {
        q: "How much do Australian Shopify agencies charge?",
        a: "Australian agency rates typically range from AUD $120–$220/hour. Fixed-price store builds start around AUD $5,000–$10,000 for theme-based projects and reach AUD $100,000+ for complex Shopify Plus implementations.",
      },
      {
        q: "Do Australian agencies work with international clients?",
        a: "Yes — most Australian agencies work remotely with clients worldwide and are experienced with cross-border ecommerce, international payment gateways, and multi-currency Shopify setups.",
      },
      {
        q: "What should I look for in an Australian Shopify agency?",
        a: "Look for Shopify Partner status, a portfolio relevant to your industry, familiarity with Australian-specific requirements (GST, local payment gateways, shipping carriers), and client reviews from comparable projects.",
      },
    ],
  },

  canada: {
    slug: "canada",
    h1: "Shopify Agencies in Canada",
    metaTitle: "Best Shopify Agencies in Canada",
    metaDescription:
      "Find verified Shopify agencies in Canada. Compare Canadian Shopify partners in Toronto, Vancouver, Montreal, and beyond for your ecommerce project.",
    intro:
      "Canada is home to a strong Shopify agency ecosystem — unsurprisingly, given that Shopify itself was founded in Ottawa. Canadian agencies span Toronto, Vancouver, Montreal, and smaller cities, with deep expertise across DTC brands, B2B ecommerce, and enterprise Shopify Plus projects.",
    breadcrumbLabel: "Canada",
    filter: { country: "CA" },
    faq: [
      {
        q: "How much do Canadian Shopify agencies charge?",
        a: "Canadian agency rates typically range from CAD $100–$200/hour. Fixed-price projects start around CAD $5,000 for theme customizations and reach CAD $150,000+ for full Shopify Plus implementations.",
      },
      {
        q: "Which Canadian cities have the most Shopify agencies?",
        a: "Toronto and Vancouver have the highest concentration, followed by Montreal, Ottawa, and Calgary. Many Canadian agencies work remotely with clients across North America and internationally.",
      },
      {
        q: "Are Canadian agencies experienced with US ecommerce?",
        a: "Yes — most Canadian agencies are deeply familiar with US market requirements including USD pricing, US tax configurations, US shipping carriers, and cross-border logistics.",
      },
    ],
  },

  "ecommerce-seo": {
    slug: "ecommerce-seo",
    h1: "Shopify SEO Agencies",
    metaTitle: "Best Shopify SEO Agencies | Ecommerce SEO Specialists",
    metaDescription:
      "Find Shopify agencies specializing in ecommerce SEO. Compare verified SEO experts for technical SEO, content strategy, and organic growth for Shopify stores.",
    intro:
      "Ecommerce SEO for Shopify requires more than keyword research — it demands technical expertise in Shopify's URL structure, structured data, collection page optimization, and site speed. These agencies specialize in driving sustainable organic traffic and revenue growth for Shopify stores.",
    breadcrumbLabel: "Ecommerce SEO",
    filter: { specialization: "SEO" },
    faq: [
      {
        q: "What does Shopify SEO involve?",
        a: "Shopify SEO covers technical SEO (site speed, crawlability, schema markup), on-page optimization (collection and product page copy, metadata), content marketing, link building, and fixing platform-specific issues like duplicate content from Shopify's URL structure.",
      },
      {
        q: "How much does Shopify SEO cost?",
        a: "Shopify SEO retainers typically range from $1,500–$8,000/month depending on the scope of work, competition level, and agency location. One-off technical SEO audits range from $500 to $5,000.",
      },
      {
        q: "How long does SEO take to show results for a Shopify store?",
        a: "Most Shopify stores see meaningful organic traffic improvements within 3–6 months of a structured SEO programme. Competitive niches or stores with significant technical debt may take 6–12 months to see substantial results.",
      },
    ],
  },

  headless: {
    slug: "headless",
    h1: "Headless Shopify Agencies",
    metaTitle: "Best Headless Shopify Agencies | Next.js, Hydrogen & Custom Frontends",
    metaDescription:
      "Find agencies specializing in headless Shopify builds with Next.js, Shopify Hydrogen, and custom frontends. Compare verified headless commerce experts.",
    intro:
      "Headless Shopify decouples the frontend from Shopify's backend, enabling faster load times, custom user experiences, and integration with complex content stacks. These agencies specialize in headless builds using Shopify Hydrogen, Next.js with the Storefront API, and other modern frontend frameworks.",
    breadcrumbLabel: "Headless",
    filter: { specialization: "Headless" },
    faq: [
      {
        q: "What is headless Shopify?",
        a: "Headless Shopify uses Shopify as the commerce backend (inventory, checkout, payments) while serving the storefront through a separate, custom-built frontend — typically Next.js or Shopify's own Hydrogen framework. This enables faster performance and greater design flexibility.",
      },
      {
        q: "How much does a headless Shopify build cost?",
        a: "Headless Shopify projects typically start at $50,000 and can reach $300,000+ for complex enterprise implementations. The additional cost over a standard Shopify build reflects the custom frontend development and ongoing maintenance.",
      },
      {
        q: "Do I need headless Shopify?",
        a: "Headless is best suited for large stores with complex content requirements, very high traffic demanding sub-second load times, or businesses needing tight integration with a separate CMS like Contentful or Sanity. Most growing DTC brands are better served by Shopify's standard themes.",
      },
    ],
  },

  "theme-development": {
    slug: "theme-development",
    h1: "Shopify Theme Development Agencies",
    metaTitle: "Best Shopify Theme Development Agencies",
    metaDescription:
      "Find agencies specializing in custom Shopify theme development. Compare verified Shopify theme developers for bespoke store designs, theme customizations, and performance tuning.",
    intro:
      "A great Shopify theme is the foundation of your store's conversion rate and brand experience. These agencies specialize in custom theme development, theme customization, and performance optimization — going beyond off-the-shelf templates to build stores that reflect your brand and convert visitors into customers.",
    breadcrumbLabel: "Theme Development",
    filter: { specialization: "Theme Development" },
    faq: [
      {
        q: "What is custom Shopify theme development?",
        a: "Custom theme development means building a Shopify storefront from scratch or extensively modifying an existing theme using Liquid (Shopify's templating language), JavaScript, and CSS — rather than simply using a purchased theme with minor tweaks.",
      },
      {
        q: "How much does custom Shopify theme development cost?",
        a: "A fully custom Shopify theme typically costs $8,000–$50,000 depending on complexity, animations, and number of templates. A customized premium theme (starting from a paid base like Dawn, Prestige, or Impulse) typically costs $2,000–$15,000.",
      },
      {
        q: "Should I buy a premium theme or build custom?",
        a: "Most growing stores are well-served by a premium theme with thoughtful customization — this is faster and more cost-effective. Custom development makes sense for brands with very specific design requirements, large catalogs needing custom filtering, or stores where the design itself is a competitive differentiator.",
      },
    ],
  },
};

export function getSegment(slug: string): SegmentConfig | null {
  return SEGMENTS[slug] ?? null;
}

export const SEGMENT_SLUGS = Object.keys(SEGMENTS);
