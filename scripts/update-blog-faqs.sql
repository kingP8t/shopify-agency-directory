-- ==========================================================================
-- Update blog_posts with FAQ content blocks for featured snippet eligibility
-- Run in Supabase SQL Editor after seeding blog posts
-- ==========================================================================

-- Helper: appends a FAQ block before the last content block (the CTA) in each post.
-- Uses jsonb_insert to place the FAQ just before the final element.

-- 1. How to Choose a Shopify Agency
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"How much does it cost to hire a Shopify agency?","a":"Shopify agency costs range from $2,000 for a theme-based build to $150,000+ for a custom Shopify Plus enterprise project. Most mid-market stores spend $8,000-$40,000 on their initial build."},{"q":"How long does it take a Shopify agency to build a store?","a":"A theme-based build typically takes 4-8 weeks. Custom design and development takes 8-16 weeks. Enterprise Shopify Plus projects can take 3-12 months depending on complexity."},{"q":"Should I hire a Shopify Partner or a general web agency?","a":"Always prefer a certified Shopify Partner. They have verified platform expertise, access to partner resources, and a track record of Shopify-specific work that generalist agencies lack."},{"q":"What questions should I ask a Shopify agency before hiring?","a":"Ask who will work on your project, what their typical timeline looks like, how they handle scope changes, whether they offer post-launch support, and for 2-3 client references from similar projects."},{"q":"How do I compare Shopify agency proposals?","a":"Compare proposals on scope clarity, named team members, milestone-based pricing, post-launch support terms, and relevant portfolio examples. Get at least three quotes to understand the market range."}]}'::jsonb
  )
)
WHERE slug = 'how-to-choose-a-shopify-agency'
  AND NOT content::text LIKE '%"type":"faq"%';

-- 2. Shopify vs Shopify Plus
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"How much does Shopify Plus cost per month?","a":"Shopify Plus starts at approximately $2,300/month billed annually. Enterprise pricing varies based on GMV and can be significantly higher for large-volume merchants."},{"q":"When should I upgrade from Shopify to Shopify Plus?","a":"Consider upgrading when you exceed $1M in annual revenue, need checkout customisation, require multiple storefronts, or need B2B/wholesale features alongside your DTC store."},{"q":"Can I migrate from standard Shopify to Shopify Plus?","a":"Yes. Shopify handles the migration directly. You keep your store, data, apps, and theme. The main work is configuring and taking advantage of the new Plus features."},{"q":"What is the biggest advantage of Shopify Plus?","a":"Checkout extensibility is the biggest differentiator. Plus gives you full control over checkout UI and logic, enabling custom upsells, complex discount rules, and branded checkout experiences."}]}'::jsonb
  )
)
WHERE slug = 'shopify-vs-shopify-plus-which-is-right-for-your-business'
  AND NOT content::text LIKE '%"type":"faq"%';

-- 3. How Much Does a Shopify Website Cost
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"How much does a basic Shopify store cost to build?","a":"A basic theme-based Shopify store built by an agency costs $2,000-$8,000. This includes theme setup, brand customisation, and product catalogue configuration with a typical timeline of 4-8 weeks."},{"q":"How much does a custom Shopify website cost?","a":"A fully custom-designed Shopify store costs $8,000-$40,000 and includes UX/UI design, custom Liquid theme development, app integrations, and technical SEO setup over 8-16 weeks."},{"q":"What are the ongoing monthly costs for a Shopify store?","a":"Monthly costs include the Shopify plan ($39-$399/month or $2,300+ for Plus), apps ($50-$1,500/month), domain/email ($15-$50/month), and optional agency retainer ($500-$5,000/month)."},{"q":"Is it cheaper to build a Shopify store yourself?","a":"DIY with a premium theme costs $0-$500 upfront plus your monthly Shopify subscription. This works for simple stores, but agency expertise typically pays back through higher conversion rates for established brands."},{"q":"What hidden costs should I budget for with Shopify?","a":"Common hidden costs include app subscriptions ($500-$1,500/month at scale), professional photography ($500-$3,000), post-launch fixes (10-15% of build cost), and theme maintenance ($500-$2,000/year)."}]}'::jsonb
  )
)
WHERE slug = 'how-much-does-a-shopify-website-cost'
  AND NOT content::text LIKE '%"type":"faq"%';

-- 4. Migration Guide
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"How long does it take to migrate to Shopify?","a":"Small stores (under 500 products) take 4-8 weeks. Medium stores (500-5,000 products) take 8-16 weeks. Large enterprise stores with 5,000+ products can take 4-9 months."},{"q":"Will I lose my SEO rankings when migrating to Shopify?","a":"Not if you set up proper 301 redirects for every changed URL, migrate all meta titles and descriptions, and submit your new sitemap to Google Search Console immediately after launch."},{"q":"Can I migrate customer data from WooCommerce to Shopify?","a":"Yes. Customer accounts, order history, product data, reviews, blog posts, and email subscriber lists can all be migrated. Use CSV imports or a dedicated migration tool for bulk transfers."},{"q":"Is migrating from Magento to Shopify more expensive?","a":"Yes, typically 20-30% more than a WooCommerce migration. Magento deeper customisation means custom modules usually need to be rebuilt as Shopify apps or replaced with off-the-shelf solutions."}]}'::jsonb
  )
)
WHERE slug = 'shopify-migration-guide-woocommerce-magento'
  AND NOT content::text LIKE '%"type":"faq"%';

-- 5. Shopify Agency Red Flags
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"What is the biggest red flag when hiring a Shopify agency?","a":"Quoting without understanding your business. Any agency that sends a proposal without a proper discovery call is guessing at scope, which leads to budget overruns and missed expectations."},{"q":"Should I always choose the cheapest Shopify agency?","a":"No. A $10,000 project that runs over to $25,000 due to scope creep is worse value than a transparent $18,000 fixed-price quote. Evaluate proposals on clarity, not just price."},{"q":"How much should I pay upfront to a Shopify agency?","a":"Standard payment terms are 30-50% upfront with the remainder tied to milestones. Be wary of agencies asking for 100% upfront or unusually low initial fees that spike later."},{"q":"How do I verify a Shopify agency is legitimate?","a":"Check their Shopify Partner status, visit live stores in their portfolio on mobile, ask for 2-3 client references from comparable projects, and confirm who will actually work on your project."}]}'::jsonb
  )
)
WHERE slug = 'shopify-agency-red-flags'
  AND NOT content::text LIKE '%"type":"faq"%';

-- 6. Shopify SEO Guide
UPDATE blog_posts
SET content = (
  SELECT jsonb_insert(
    content,
    ARRAY[(jsonb_array_length(content) - 1)::text],
    '{"type":"faq","items":[{"q":"Does Shopify have good SEO out of the box?","a":"Shopify provides solid SEO foundations including auto-generated sitemaps, canonical tags, SSL, and mobile-responsive themes. However, it has limitations like forced URL structures and potential duplicate content that require manual optimisation."},{"q":"How long does it take to see SEO results on Shopify?","a":"Meaningful SEO results typically take 3-6 months. Technical fixes can show impact within weeks, but content-driven and link-building strategies compound over time with the biggest gains at 6-12 months."},{"q":"What is the most important SEO factor for Shopify stores?","a":"Page speed and Core Web Vitals are the most impactful technical factor. For rankings, unique product descriptions and collection page content with strong internal linking drive the most commercial traffic."},{"q":"Do Shopify apps hurt my SEO?","a":"Yes, unused or poorly coded apps inject extra JavaScript that slows your store. Audit your app list quarterly and remove anything not actively generating ROI. Page speed directly impacts both rankings and conversion rate."},{"q":"How do I get star ratings to show in Google for my Shopify store?","a":"Enable structured data (schema markup) for products and reviews. Apps like Judge.me and Yotpo inject review schema automatically. Verify with Google Rich Results Test to confirm star ratings will display in search results."}]}'::jsonb
  )
)
WHERE slug = 'shopify-seo-guide-2026'
  AND NOT content::text LIKE '%"type":"faq"%';
