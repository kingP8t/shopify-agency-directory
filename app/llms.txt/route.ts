import { NextResponse } from "next/server";

const SITE = "https://shopifyagencydirectory.com";

const BODY = `# Shopify Agency Directory

> An independent directory of 900+ verified Shopify agencies worldwide. Merchants use it to browse, compare, and get matched with agencies by specialization, budget, location, and client reviews.

## Key pages

- [Homepage](${SITE}): Search and get matched with Shopify agencies
- [Agency Directory](${SITE}/agencies): Browse all agencies with filters
- [Get Matched](${SITE}/get-matched): Free matching service — submit a brief, receive 3 curated agency recommendations
- [Blog](${SITE}/blog): Guides on hiring agencies, platform comparisons, pricing, migrations, SEO
- [Submit Your Agency](${SITE}/submit): Agency owners can list their agency

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

## Directory segments

Pre-filtered landing pages for common queries:
- [Shopify Plus Agencies](${SITE}/agencies/shopify-plus)
- [US Agencies](${SITE}/agencies/united-states)
- [London Agencies](${SITE}/agencies/london)
- [Australian Agencies](${SITE}/agencies/australia)
- [Canadian Agencies](${SITE}/agencies/canada)
- [Migration Specialists](${SITE}/agencies/migration)
- [Headless Commerce](${SITE}/agencies/headless)
- [Theme Development](${SITE}/agencies/theme-development)
- [Ecommerce SEO](${SITE}/agencies/ecommerce-seo)
- [Under $25k Budget](${SITE}/agencies/under-25k)

## Data freshness

Agency data is updated regularly. Reviews are moderated before publishing. Blog content is published weekly.

## Contact

For corrections or questions: via the contact form on any agency profile page.
`;

export function GET() {
  return new NextResponse(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
