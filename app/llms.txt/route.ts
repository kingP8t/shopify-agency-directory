import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

// Regenerate hourly so newly published posts appear without a redeploy.
export const revalidate = 3600;

const SITE = "https://shopifyagencydirectory.com";

const HEADER = `# Shopify Agency Directory

> An independent directory of 1,000+ verified Shopify agencies worldwide. Merchants use it to browse, compare, and get matched with agencies by specialization, budget, location, and client reviews.

## Key pages

- [Homepage](${SITE}): Search and get matched with Shopify agencies
- [Agency Directory](${SITE}/agencies): Browse all agencies with filters (specialization, budget, location, rating)
- [Get Matched](${SITE}/get-matched): Free matching service — submit a brief, receive 3 curated agency recommendations
- [Blog](${SITE}/blog): Guides on hiring agencies, platform comparisons, pricing, migrations, SEO
- [Submit Your Agency](${SITE}/submit): Agency owners can list their agency
- [About](${SITE}/about): How we verify agencies and editorial methodology

## Agency profiles

Each agency has a profile at ${SITE}/agencies/{slug} with:
- Description, specializations, team size, founding year
- Client reviews with star ratings (1–5)
- Budget range and location
- Contact form for direct inquiries

## Blog categories

- [Hiring Guide](${SITE}/blog/category/hiring-guide): How to evaluate and hire Shopify agencies
- [Platform Guide](${SITE}/blog/category/platform-guide): Shopify features, Shopify Plus, headless commerce
- [Pricing Guide](${SITE}/blog/category/pricing-guide): Agency costs and budgeting
- [Migration Guide](${SITE}/blog/category/migration-guide): Replatforming to Shopify
- [Tools & Apps](${SITE}/blog/category/tools-apps): Shopify ecosystem tools
- [SEO](${SITE}/blog/category/seo): Ecommerce SEO strategies

## Blog posts
`;

const FOOTER = `## Directory segments — by location

Pre-filtered landing pages for agencies by location:
- [London Agencies](${SITE}/agencies/london)
- [US Agencies](${SITE}/agencies/united-states)
- [New York Agencies](${SITE}/agencies/new-york)
- [Los Angeles Agencies](${SITE}/agencies/los-angeles)
- [Chicago Agencies](${SITE}/agencies/chicago)
- [Austin Agencies](${SITE}/agencies/austin)
- [Miami Agencies](${SITE}/agencies/miami)
- [Australian Agencies](${SITE}/agencies/australia)
- [Canadian Agencies](${SITE}/agencies/canada)

## Directory segments — by service

- [Shopify Plus Agencies](${SITE}/agencies/shopify-plus)
- [Migration Specialists](${SITE}/agencies/migration)
- [Headless Commerce](${SITE}/agencies/headless)
- [Theme Development](${SITE}/agencies/theme-development)
- [Ecommerce SEO](${SITE}/agencies/ecommerce-seo)
- [Store Build Agencies](${SITE}/agencies/store-build)
- [App Development](${SITE}/agencies/app-development)
- [CRO Agencies](${SITE}/agencies/cro)
- [Shopify Marketing](${SITE}/agencies/shopify-marketing)
- [Branding Agencies](${SITE}/agencies/branding)
- [Analytics & Data](${SITE}/agencies/analytics)
- [Ongoing Support & Retainers](${SITE}/agencies/ongoing-support)
- [Internationalization](${SITE}/agencies/internationalization)
- [Checkout & Conversion Upgrade](${SITE}/agencies/checkout-upgrade)
- [Systems Integration](${SITE}/agencies/systems-integration)
- [Performance Optimization](${SITE}/agencies/performance)

## Directory segments — by budget

- [Under $5,000](${SITE}/agencies/under-5k)
- [Under $10,000](${SITE}/agencies/under-10k)
- [Under $25,000](${SITE}/agencies/under-25k)
- [$25k–$100k Mid-Range](${SITE}/agencies/mid-budget)
- [$25k–$100k+ Enterprise](${SITE}/agencies/enterprise-budget)
- [$100k+ Premium](${SITE}/agencies/100k-plus)

## Directory segments — by industry

- [Fashion & Apparel](${SITE}/agencies/fashion-brands)
- [Beauty & Cosmetics](${SITE}/agencies/beauty-cosmetics)
- [Health & Wellness](${SITE}/agencies/health-wellness)
- [Food & Beverage](${SITE}/agencies/food-beverage)
- [Home & Furniture](${SITE}/agencies/home-furniture)
- [Sports & Outdoors](${SITE}/agencies/sports-outdoors)
- [Luxury Brands](${SITE}/agencies/luxury-brands)
- [B2B & Wholesale](${SITE}/agencies/b2b-wholesale)
- [Electronics & Tech](${SITE}/agencies/electronics-tech)
- [Pets & Animals](${SITE}/agencies/pets)

## Data freshness

Agency data is updated regularly via the Shopify Partner Directory. Reviews are moderated before publishing. Blog content is published weekly.

## Contact

For corrections or questions: via the contact form on any agency profile page.
`;

// Preferred category order; any others are appended after these.
const CATEGORY_ORDER = [
  "SEO",
  "Hiring Guide",
  "Pricing Guide",
  "Platform Guide",
  "Migration Guide",
  "Tools & Apps",
];

export async function GET() {
  // Build the blog list from live data so newly published posts always appear.
  const posts = await getAllPosts();
  const byCategory = new Map<string, { title: string; slug: string }[]>();
  for (const p of posts) {
    const cat = p.category || "Other";
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push({ title: p.title, slug: p.slug });
  }

  const orderedCats = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((c) => !CATEGORY_ORDER.includes(c)),
  ];

  const blogSection = orderedCats
    .map(
      (cat) =>
        `### ${cat}\n` +
        byCategory
          .get(cat)!
          .map((p) => `- [${p.title}](${SITE}/blog/${p.slug})`)
          .join("\n")
    )
    .join("\n\n");

  const body = `${HEADER}\n${blogSection}\n\n${FOOTER}`;

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
