const { createClient } = require("@supabase/supabase-js");

const client = createClient(
  "https://xsvdnqqddspzmokcnzyv.supabase.co",
  "sb_publishable_61ZCRZ6ADMfcWSWeT7lutw_bfYe0e0T"
);

const agencies = [
  {
    name: "Velstar",
    slug: "velstar",
    description:
      "Award-winning Shopify Plus agency helping ambitious brands scale faster. Specialists in D2C growth strategy, UX design, and Shopify Plus development.",
    long_description:
      "Velstar is a Shopify Plus agency and certified partner based in Liverpool, UK. We work with ambitious ecommerce brands who want to scale faster. Our team of strategists, designers and developers combine data-driven insight with beautiful design to create Shopify experiences that convert.\n\nWe have delivered projects for brands across fashion, health, beauty, and lifestyle sectors, consistently achieving exceptional results through CRO, personalisation, and performance optimisation.",
    location: "Liverpool, UK",
    country: "GB",
    website: "https://velstar.co.uk",
    founded: 2016,
    team_size: "11-50",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "CRO", "UX Design", "D2C Growth"],
    tags: ["shopify-plus", "dtc", "fashion", "beauty"],
    rating: 4.9,
    review_count: 38,
    featured: true,
    status: "published",
  },
  {
    name: "Kualo",
    slug: "kualo",
    description:
      "London-based Shopify agency delivering beautifully designed, high-performance ecommerce stores for brands worldwide.",
    long_description:
      "Kualo is a leading Shopify agency based in London, specialising in the design and development of high-converting ecommerce stores. We work with growing brands and established retailers to build Shopify and Shopify Plus stores that are fast, beautiful, and built to scale.\n\nOur team of designers, developers and ecommerce strategists bring a holistic approach to every project, ensuring your store not only looks great but drives real business results.",
    location: "London, UK",
    country: "GB",
    website: "https://kualo.com",
    founded: 2000,
    team_size: "11-50",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "Theme Development", "Migrations", "SEO"],
    tags: ["shopify-plus", "london", "migrations", "seo"],
    rating: 4.8,
    review_count: 52,
    featured: true,
    status: "published",
  },
  {
    name: "Underwaterpistol",
    slug: "underwaterpistol",
    description:
      "A Shopify Plus agency with 15+ years of ecommerce experience, helping brands grow through strategic design and development.",
    long_description:
      "Underwaterpistol is a full-service Shopify Plus agency and Shopify Partner based in London. With over 15 years of ecommerce experience, we combine creative design with technical expertise to deliver outstanding Shopify Plus stores.\n\nWe partner with lifestyle, fashion and retail brands to create memorable digital experiences. Our services span discovery, UX design, development, and post-launch growth.",
    location: "London, UK",
    country: "GB",
    website: "https://underwaterpistol.com",
    founded: 2007,
    team_size: "11-50",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "Theme Development", "Headless", "UX Design"],
    tags: ["shopify-plus", "headless", "fashion", "lifestyle"],
    rating: 4.8,
    review_count: 29,
    featured: false,
    status: "published",
  },
  {
    name: "Eastside Co",
    slug: "eastside-co",
    description:
      "One of the UK's leading Shopify agencies — experts in Shopify Plus, app development, and ecommerce strategy.",
    long_description:
      "Eastside Co is one of the UK's leading Shopify Plus agencies, with a team of over 80 ecommerce specialists. We help brands launch, grow and scale on Shopify Plus with a full suite of services including strategy, design, development, and marketing.\n\nWe build bespoke Shopify Plus stores, custom apps, and integrations for brands across retail, fashion, health, and B2B. Our strategic approach ensures every project delivers measurable growth.",
    location: "Birmingham, UK",
    country: "GB",
    website: "https://eastsideco.com",
    founded: 2012,
    team_size: "50-100",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "App Development", "Strategy", "Marketing"],
    tags: ["shopify-plus", "app-development", "b2b", "enterprise"],
    rating: 4.7,
    review_count: 61,
    featured: true,
    status: "published",
  },
  {
    name: "We Make Websites",
    slug: "we-make-websites",
    description:
      "A global Shopify Plus agency building premium ecommerce experiences for ambitious fashion, beauty, and lifestyle brands.",
    long_description:
      "We Make Websites is a global Shopify Plus agency specialising in high-end ecommerce for fashion, beauty, and lifestyle brands. With studios in London and New York, we bring together world-class design and engineering to create stores that are as beautiful as they are effective.\n\nOur clients include some of the world's most recognised brands. We are known for our premium creative output, meticulous attention to detail, and our ability to deliver complex Shopify Plus projects on time.",
    location: "London, UK",
    country: "GB",
    website: "https://wemakewebsites.com",
    founded: 2012,
    team_size: "50-100",
    budget_range: "$100,000+",
    specializations: ["Shopify Plus", "Headless", "Fashion", "Luxury Brands"],
    tags: ["shopify-plus", "luxury", "fashion", "beauty", "headless"],
    rating: 4.9,
    review_count: 44,
    featured: true,
    status: "published",
  },
  {
    name: "Swanky",
    slug: "swanky",
    description:
      "Shopify Plus experts helping enterprise brands migrate, launch, and scale. Specialists in complex B2C and B2B commerce.",
    long_description:
      "Swanky is a Shopify Plus agency with a strong focus on complex, enterprise-grade ecommerce. We specialise in platform migrations, particularly from Magento and Salesforce Commerce Cloud to Shopify Plus, helping brands reduce costs and accelerate growth.\n\nOur team covers strategy, UX, development and post-launch optimisation. We work across retail, fashion, health, and B2B markets, consistently delivering projects that exceed expectations.",
    location: "Exeter, UK",
    country: "GB",
    website: "https://swanky.agency",
    founded: 2013,
    team_size: "11-50",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "Migrations", "B2B Commerce", "Enterprise"],
    tags: ["shopify-plus", "migrations", "magento", "b2b", "enterprise"],
    rating: 4.8,
    review_count: 33,
    featured: false,
    status: "published",
  },
  {
    name: "Charle Agency",
    slug: "charle-agency",
    description:
      "A creative-first Shopify agency crafting stunning, conversion-optimised stores for DTC brands ready to scale.",
    long_description:
      "Charle is a boutique Shopify agency focused on building beautiful, high-performing stores for direct-to-consumer brands. We believe great ecommerce starts with great design and we combine this with deep Shopify expertise to deliver results.\n\nFrom strategy to launch and beyond, we partner closely with our clients to ensure their Shopify store is a true growth engine. Our work spans fashion, wellness, food, and lifestyle verticals.",
    location: "Manchester, UK",
    country: "GB",
    website: "https://charle.agency",
    founded: 2019,
    team_size: "1-10",
    budget_range: "$5,000 - $25,000",
    specializations: ["Shopify", "Theme Development", "CRO", "DTC"],
    tags: ["shopify", "dtc", "fashion", "wellness", "boutique"],
    rating: 4.9,
    review_count: 21,
    featured: false,
    status: "published",
  },
  {
    name: "Diff Agency",
    slug: "diff-agency",
    description:
      "North America's go-to Shopify Plus agency for brands looking to accelerate growth through technology and strategy.",
    long_description:
      "Diff is a leading Shopify Plus agency based in Montreal, with a team of over 100 ecommerce specialists. We partner with brands across North America to build, optimise and scale their Shopify Plus stores.\n\nOur comprehensive service offering covers ecommerce strategy, UX and visual design, Shopify Plus development, systems integration, and ongoing growth optimisation. We are trusted by some of North America's fastest-growing ecommerce brands.",
    location: "Montreal, Canada",
    country: "CA",
    website: "https://diffagency.com",
    founded: 2011,
    team_size: "100-200",
    budget_range: "$100,000+",
    specializations: ["Shopify Plus", "Strategy", "Integrations", "CRO"],
    tags: ["shopify-plus", "north-america", "enterprise", "strategy"],
    rating: 4.8,
    review_count: 57,
    featured: true,
    status: "published",
  },
  {
    name: "Absolute Web",
    slug: "absolute-web",
    description:
      "Miami-based Shopify agency with 20+ years of ecommerce experience building custom, high-converting stores.",
    long_description:
      "Absolute Web is a full-service ecommerce agency based in Miami, Florida, with over 20 years of experience. We specialise in Shopify and Shopify Plus development, creating custom online stores that combine beautiful design with powerful functionality.\n\nOur team of 60+ experts handles everything from UX design and front-end development to back-end integrations and ongoing maintenance. We serve brands across fashion, health, beauty, home goods, and luxury sectors.",
    location: "Miami, FL",
    country: "US",
    website: "https://absoluteweb.com",
    founded: 1999,
    team_size: "50-100",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "Custom Development", "Integrations", "Design"],
    tags: ["shopify-plus", "usa", "miami", "custom-development"],
    rating: 4.7,
    review_count: 48,
    featured: false,
    status: "published",
  },
  {
    name: "Arctic Grey",
    slug: "arctic-grey",
    description:
      "A top-rated US Shopify Plus agency building enterprise-grade custom stores with a focus on performance and scalability.",
    long_description:
      "Arctic Grey is a premier Shopify Plus agency headquartered in New York, with a reputation for delivering complex, enterprise-grade ecommerce solutions. We work with mid-market and enterprise brands across the US to build custom Shopify Plus experiences that scale.\n\nOur team excels at custom app development, complex system integrations (ERP, WMS, PIM), and performance optimisation. We are trusted by brands processing millions in annual revenue.",
    location: "New York, NY",
    country: "US",
    website: "https://arcticgrey.com",
    founded: 2014,
    team_size: "11-50",
    budget_range: "$100,000+",
    specializations: ["Shopify Plus", "Custom Apps", "ERP Integration", "Enterprise"],
    tags: ["shopify-plus", "enterprise", "custom-apps", "erp", "new-york"],
    rating: 4.9,
    review_count: 36,
    featured: true,
    status: "published",
  },
  {
    name: "Reload Digital",
    slug: "reload-digital",
    description:
      "Australian Shopify Plus agency combining strategy, design, and development to help brands dominate their market.",
    long_description:
      "Reload Digital is one of Australia's leading Shopify Plus agencies, helping brands across APAC grow their ecommerce revenue. Our team of strategists, designers, and developers work together to create Shopify Plus stores that are beautiful, fast, and built to convert.\n\nWe have deep experience in the Australian market across fashion, sport, outdoor, and lifestyle categories. Our full-service approach covers discovery, UX design, development, and ongoing growth services.",
    location: "Sydney, Australia",
    country: "AU",
    website: "https://reloaddigital.com.au",
    founded: 2014,
    team_size: "11-50",
    budget_range: "$25,000 - $100,000",
    specializations: ["Shopify Plus", "Strategy", "Design", "Growth"],
    tags: ["shopify-plus", "australia", "apac", "fashion", "sport"],
    rating: 4.8,
    review_count: 27,
    featured: false,
    status: "published",
  },
  {
    name: "Pixel Union",
    slug: "pixel-union",
    description:
      "Shopify theme developers and agency building polished, fast storefronts trusted by thousands of merchants worldwide.",
    long_description:
      "Pixel Union is a Shopify partner and theme developer with a portfolio of popular Shopify themes used by thousands of merchants worldwide. Our agency team builds custom Shopify and Shopify Plus stores with the same attention to design quality and performance that defines our theme business.\n\nWe work with brands of all sizes to create stores that look great and convert. Our themes are consistently among the top sellers on the Shopify Theme Store.",
    location: "Victoria, Canada",
    country: "CA",
    website: "https://pixelunion.net",
    founded: 2011,
    team_size: "11-50",
    budget_range: "$5,000 - $25,000",
    specializations: ["Shopify Themes", "Theme Development", "Custom Design", "Shopify"],
    tags: ["shopify", "themes", "design", "canada"],
    rating: 4.7,
    review_count: 89,
    featured: false,
    status: "published",
  },
  {
    name: "Commerce Pundit",
    slug: "commerce-pundit",
    description:
      "Full-service Shopify agency offering end-to-end development, marketing, and managed ecommerce services.",
    long_description:
      "Commerce Pundit is a full-service ecommerce agency specialising in Shopify and Shopify Plus. Based in Atlanta, we offer a comprehensive range of services including store design, development, migration, SEO, and ongoing managed services.\n\nOur team of 50+ ecommerce specialists has completed over 1,000 Shopify projects for clients across the US and internationally. We pride ourselves on delivering projects on time and on budget, with a satisfaction guarantee.",
    location: "Atlanta, GA",
    country: "US",
    website: "https://commercepundit.com",
    founded: 2010,
    team_size: "50-100",
    budget_range: "$5,000 - $25,000",
    specializations: ["Shopify", "Shopify Plus", "SEO", "Migrations", "Marketing"],
    tags: ["shopify", "shopify-plus", "seo", "migrations", "managed-services"],
    rating: 4.6,
    review_count: 74,
    featured: false,
    status: "published",
  },
  {
    name: "Pointer Creative",
    slug: "pointer-creative",
    description:
      "Boutique Canadian Shopify agency specialising in brand-forward design and bespoke Shopify development for growing businesses.",
    long_description:
      "Pointer Creative is a boutique Shopify agency based in Toronto, Canada. We specialise in working with growing ecommerce brands that care about their brand identity and want a store that reflects it.\n\nOur small, senior team provides highly personalised service and brings a craft-first approach to every project. We handle strategy, brand design, Shopify development and launch, and work closely with our clients throughout.",
    location: "Toronto, Canada",
    country: "CA",
    website: "https://pointercreative.com",
    founded: 2018,
    team_size: "1-10",
    budget_range: "$5,000 - $25,000",
    specializations: ["Shopify", "Brand Design", "Theme Development", "DTC"],
    tags: ["shopify", "brand-design", "boutique", "canada", "toronto"],
    rating: 5.0,
    review_count: 14,
    featured: false,
    status: "published",
  },
  {
    name: "Storetasker",
    slug: "storetasker",
    description:
      "The marketplace connecting Shopify merchants with vetted freelance Shopify experts for any task, big or small.",
    long_description:
      "Storetasker is a unique platform that connects Shopify store owners with pre-vetted Shopify experts. Whether you need a quick fix, a custom feature, or a full store build, Storetasker matches you with the right expert for your project and budget.\n\nAll experts on the platform are rigorously vetted by our team. With thousands of completed projects and a satisfaction guarantee, Storetasker is the easiest way to get Shopify work done quickly and reliably.",
    location: "San Francisco, CA",
    country: "US",
    website: "https://storetasker.com",
    founded: 2016,
    team_size: "11-50",
    budget_range: "Under $5,000",
    specializations: ["Shopify", "Freelance", "Quick Tasks", "Customisation"],
    tags: ["shopify", "freelance", "marketplace", "small-business"],
    rating: 4.6,
    review_count: 210,
    featured: false,
    status: "published",
  },
];

async function seed() {
  console.log(`Inserting ${agencies.length} agencies...`);
  const { data, error } = await client
    .from("agencies")
    .upsert(agencies, { onConflict: "slug" })
    .select("name");

  if (error) {
    console.error("ERROR:", JSON.stringify(error, null, 2));
    process.exit(1);
  }
  console.log(`SUCCESS: ${data.length} agencies upserted:`);
  data.forEach((a) => console.log(" -", a.name));
}

seed();
