import { NextResponse } from "next/server";

const SITE = "https://shopifyagencydirectory.com";

const BODY = `# Shopify Agency Directory

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

- [How to Choose a Shopify Agency](${SITE}/blog/how-to-choose-a-shopify-agency)
- [Shopify vs Shopify Plus](${SITE}/blog/shopify-vs-shopify-plus-which-is-right-for-your-business)
- [How Much Does a Shopify Website Cost?](${SITE}/blog/how-much-does-a-shopify-website-cost)
- [Shopify Migration Guide](${SITE}/blog/shopify-migration-guide-woocommerce-magento)
- [Best Shopify Review Apps 2026](${SITE}/blog/best-shopify-review-apps-2026)
- [Best Shopify Loyalty Apps 2026](${SITE}/blog/best-shopify-loyalty-apps-2026)
- [Best Shopify Themes 2026](${SITE}/blog/best-shopify-themes-2026-review)
- [Best Shopify Apps 2026](${SITE}/blog/best-shopify-apps-2026)
- [Shopify Agency Red Flags](${SITE}/blog/shopify-agency-red-flags)
- [How to Brief a Shopify Agency](${SITE}/blog/how-to-brief-a-shopify-agency)
- [Shopify SEO Guide 2026](${SITE}/blog/shopify-seo-guide-2026)
- [How to Hire a Shopify SEO Agency](${SITE}/blog/how-to-hire-a-shopify-seo-agency)

## Directory segments — by location

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

export function GET() {
  return new NextResponse(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
