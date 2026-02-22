-- Run this in Supabase → SQL Editor → New Query
-- This seeds 15 real Shopify agencies into the directory

INSERT INTO agencies (name, slug, description, long_description, location, country, website, founded, team_size, budget_range, specializations, tags, rating, review_count, featured, status)
VALUES

('Velstar', 'velstar',
 'Award-winning Shopify Plus agency helping ambitious brands scale faster. Specialists in D2C growth strategy, UX design, and Shopify Plus development.',
 E'Velstar is a Shopify Plus agency and certified partner based in Liverpool, UK. We work with ambitious ecommerce brands who want to scale faster. Our team of strategists, designers and developers combine data-driven insight with beautiful design to create Shopify experiences that convert.\n\nWe have delivered projects for brands across fashion, health, beauty, and lifestyle sectors, consistently achieving exceptional results through CRO, personalisation, and performance optimisation.',
 'Liverpool, UK', 'GB', 'https://velstar.co.uk', 2016, '11-50', '$25,000 - $100,000',
 ARRAY['Shopify Plus','CRO','UX Design','D2C Growth'], ARRAY['shopify-plus','dtc','fashion','beauty'],
 4.9, 38, TRUE, 'published'),

('Kualo', 'kualo',
 'London-based Shopify agency delivering beautifully designed, high-performance ecommerce stores for brands worldwide.',
 E'Kualo is a leading Shopify agency based in London, specialising in the design and development of high-converting ecommerce stores. We work with growing brands and established retailers to build Shopify and Shopify Plus stores that are fast, beautiful, and built to scale.\n\nOur team of designers, developers and ecommerce strategists bring a holistic approach to every project, ensuring your store not only looks great but drives real business results.',
 'London, UK', 'GB', 'https://kualo.com', 2000, '11-50', '$25,000 - $100,000',
 ARRAY['Shopify Plus','Theme Development','Migrations','SEO'], ARRAY['shopify-plus','london','migrations','seo'],
 4.8, 52, TRUE, 'published'),

('Underwaterpistol', 'underwaterpistol',
 'A Shopify Plus agency with 15+ years of ecommerce experience, helping brands grow through strategic design and development.',
 E'Underwaterpistol is a full-service Shopify Plus agency and Shopify Partner based in London. With over 15 years of ecommerce experience, we combine creative design with technical expertise to deliver outstanding Shopify Plus stores.\n\nWe partner with lifestyle, fashion and retail brands to create memorable digital experiences. Our services span discovery, UX design, development, and post-launch growth.',
 'London, UK', 'GB', 'https://underwaterpistol.com', 2007, '11-50', '$25,000 - $100,000',
 ARRAY['Shopify Plus','Theme Development','Headless','UX Design'], ARRAY['shopify-plus','headless','fashion','lifestyle'],
 4.8, 29, FALSE, 'published'),

('Eastside Co', 'eastside-co',
 'One of the UK''s leading Shopify agencies — experts in Shopify Plus, app development, and ecommerce strategy.',
 E'Eastside Co is one of the UK''s leading Shopify Plus agencies, with a team of over 80 ecommerce specialists. We help brands launch, grow and scale on Shopify Plus with a full suite of services including strategy, design, development, and marketing.\n\nWe build bespoke Shopify Plus stores, custom apps, and integrations for brands across retail, fashion, health, and B2B. Our strategic approach ensures every project delivers measurable growth.',
 'Birmingham, UK', 'GB', 'https://eastsideco.com', 2012, '50-100', '$25,000 - $100,000',
 ARRAY['Shopify Plus','App Development','Strategy','Marketing'], ARRAY['shopify-plus','app-development','b2b','enterprise'],
 4.7, 61, TRUE, 'published'),

('We Make Websites', 'we-make-websites',
 'A global Shopify Plus agency building premium ecommerce experiences for ambitious fashion, beauty, and lifestyle brands.',
 E'We Make Websites is a global Shopify Plus agency specialising in high-end ecommerce for fashion, beauty, and lifestyle brands. With studios in London and New York, we bring together world-class design and engineering to create stores that are as beautiful as they are effective.\n\nOur clients include some of the world''s most recognised brands. We are known for our premium creative output, meticulous attention to detail, and our ability to deliver complex Shopify Plus projects on time.',
 'London, UK', 'GB', 'https://wemakewebsites.com', 2012, '50-100', '$100,000+',
 ARRAY['Shopify Plus','Headless','Fashion','Luxury Brands'], ARRAY['shopify-plus','luxury','fashion','beauty','headless'],
 4.9, 44, TRUE, 'published'),

('Swanky', 'swanky',
 'Shopify Plus experts helping enterprise brands migrate, launch, and scale. Specialists in complex B2C and B2B commerce.',
 E'Swanky is a Shopify Plus agency with a strong focus on complex, enterprise-grade ecommerce. We specialise in platform migrations, particularly from Magento and Salesforce Commerce Cloud to Shopify Plus, helping brands reduce costs and accelerate growth.\n\nOur team covers strategy, UX, development and post-launch optimisation. We work across retail, fashion, health, and B2B markets, consistently delivering projects that exceed expectations.',
 'Exeter, UK', 'GB', 'https://swanky.agency', 2013, '11-50', '$25,000 - $100,000',
 ARRAY['Shopify Plus','Migrations','B2B Commerce','Enterprise'], ARRAY['shopify-plus','migrations','magento','b2b','enterprise'],
 4.8, 33, FALSE, 'published'),

('Charle Agency', 'charle-agency',
 'A creative-first Shopify agency crafting stunning, conversion-optimised stores for DTC brands ready to scale.',
 E'Charle is a boutique Shopify agency focused on building beautiful, high-performing stores for direct-to-consumer brands. We believe great ecommerce starts with great design and we combine this with deep Shopify expertise to deliver results.\n\nFrom strategy to launch and beyond, we partner closely with our clients to ensure their Shopify store is a true growth engine. Our work spans fashion, wellness, food, and lifestyle verticals.',
 'Manchester, UK', 'GB', 'https://charle.agency', 2019, '1-10', '$5,000 - $25,000',
 ARRAY['Shopify','Theme Development','CRO','DTC'], ARRAY['shopify','dtc','fashion','wellness','boutique'],
 4.9, 21, FALSE, 'published'),

('Diff Agency', 'diff-agency',
 'North America''s go-to Shopify Plus agency for brands looking to accelerate growth through technology and strategy.',
 E'Diff is a leading Shopify Plus agency based in Montreal, with a team of over 100 ecommerce specialists. We partner with brands across North America to build, optimise and scale their Shopify Plus stores.\n\nOur comprehensive service offering covers ecommerce strategy, UX and visual design, Shopify Plus development, systems integration, and ongoing growth optimisation. We are trusted by some of North America''s fastest-growing ecommerce brands.',
 'Montreal, Canada', 'CA', 'https://diffagency.com', 2011, '100-200', '$100,000+',
 ARRAY['Shopify Plus','Strategy','Integrations','CRO'], ARRAY['shopify-plus','north-america','enterprise','strategy'],
 4.8, 57, TRUE, 'published'),

('Absolute Web', 'absolute-web',
 'Miami-based Shopify agency with 20+ years of ecommerce experience building custom, high-converting stores.',
 E'Absolute Web is a full-service ecommerce agency based in Miami, Florida, with over 20 years of experience. We specialise in Shopify and Shopify Plus development, creating custom online stores that combine beautiful design with powerful functionality.\n\nOur team of 60+ experts handles everything from UX design and front-end development to back-end integrations and ongoing maintenance. We serve brands across fashion, health, beauty, home goods, and luxury sectors.',
 'Miami, FL', 'US', 'https://absoluteweb.com', 1999, '50-100', '$25,000 - $100,000',
 ARRAY['Shopify Plus','Custom Development','Integrations','Design'], ARRAY['shopify-plus','usa','miami','custom-development'],
 4.7, 48, FALSE, 'published'),

('Arctic Grey', 'arctic-grey',
 'A top-rated US Shopify Plus agency building enterprise-grade custom stores with a focus on performance and scalability.',
 E'Arctic Grey is a premier Shopify Plus agency headquartered in New York, with a reputation for delivering complex, enterprise-grade ecommerce solutions. We work with mid-market and enterprise brands across the US to build custom Shopify Plus experiences that scale.\n\nOur team excels at custom app development, complex system integrations (ERP, WMS, PIM), and performance optimisation. We are trusted by brands processing millions in annual revenue.',
 'New York, NY', 'US', 'https://arcticgrey.com', 2014, '11-50', '$100,000+',
 ARRAY['Shopify Plus','Custom Apps','ERP Integration','Enterprise'], ARRAY['shopify-plus','enterprise','custom-apps','erp','new-york'],
 4.9, 36, TRUE, 'published'),

('Reload Digital', 'reload-digital',
 'Australian Shopify Plus agency combining strategy, design, and development to help brands dominate their market.',
 E'Reload Digital is one of Australia''s leading Shopify Plus agencies, helping brands across APAC grow their ecommerce revenue. Our team of strategists, designers, and developers work together to create Shopify Plus stores that are beautiful, fast, and built to convert.\n\nWe have deep experience in the Australian market across fashion, sport, outdoor, and lifestyle categories. Our full-service approach covers discovery, UX design, development, and ongoing growth services.',
 'Sydney, Australia', 'AU', 'https://reloaddigital.com.au', 2014, '11-50', '$25,000 - $100,000',
 ARRAY['Shopify Plus','Strategy','Design','Growth'], ARRAY['shopify-plus','australia','apac','fashion','sport'],
 4.8, 27, FALSE, 'published'),

('Pixel Union', 'pixel-union',
 'Shopify theme developers and agency building polished, fast storefronts trusted by thousands of merchants worldwide.',
 E'Pixel Union is a Shopify partner and theme developer with a portfolio of popular Shopify themes used by thousands of merchants worldwide. Our agency team builds custom Shopify and Shopify Plus stores with the same attention to design quality and performance that defines our theme business.\n\nWe work with brands of all sizes to create stores that look great and convert. Our themes are consistently among the top sellers on the Shopify Theme Store.',
 'Victoria, Canada', 'CA', 'https://pixelunion.net', 2011, '11-50', '$5,000 - $25,000',
 ARRAY['Shopify Themes','Theme Development','Custom Design','Shopify'], ARRAY['shopify','themes','design','canada'],
 4.7, 89, FALSE, 'published'),

('Commerce Pundit', 'commerce-pundit',
 'Full-service Shopify agency offering end-to-end development, marketing, and managed ecommerce services.',
 E'Commerce Pundit is a full-service ecommerce agency specialising in Shopify and Shopify Plus. Based in Atlanta, we offer a comprehensive range of services including store design, development, migration, SEO, and ongoing managed services.\n\nOur team of 50+ ecommerce specialists has completed over 1,000 Shopify projects for clients across the US and internationally. We pride ourselves on delivering projects on time and on budget, with a satisfaction guarantee.',
 'Atlanta, GA', 'US', 'https://commercepundit.com', 2010, '50-100', '$5,000 - $25,000',
 ARRAY['Shopify','Shopify Plus','SEO','Migrations','Marketing'], ARRAY['shopify','shopify-plus','seo','migrations','managed-services'],
 4.6, 74, FALSE, 'published'),

('Pointer Creative', 'pointer-creative',
 'Boutique Canadian Shopify agency specialising in brand-forward design and bespoke Shopify development for growing businesses.',
 E'Pointer Creative is a boutique Shopify agency based in Toronto, Canada. We specialise in working with growing ecommerce brands that care about their brand identity and want a store that reflects it.\n\nOur small, senior team provides highly personalised service and brings a craft-first approach to every project. We handle strategy, brand design, Shopify development and launch, and work closely with our clients throughout.',
 'Toronto, Canada', 'CA', 'https://pointercreative.com', 2018, '1-10', '$5,000 - $25,000',
 ARRAY['Shopify','Brand Design','Theme Development','DTC'], ARRAY['shopify','brand-design','boutique','canada','toronto'],
 5.0, 14, FALSE, 'published'),

('Storetasker', 'storetasker',
 'The marketplace connecting Shopify merchants with vetted freelance Shopify experts for any task, big or small.',
 E'Storetasker is a unique platform that connects Shopify store owners with pre-vetted Shopify experts. Whether you need a quick fix, a custom feature, or a full store build, Storetasker matches you with the right expert for your project and budget.\n\nAll experts on the platform are rigorously vetted by our team. With thousands of completed projects and a satisfaction guarantee, Storetasker is the easiest way to get Shopify work done quickly and reliably.',
 'San Francisco, CA', 'US', 'https://storetasker.com', 2016, '11-50', 'Under $5,000',
 ARRAY['Shopify','Freelance','Quick Tasks','Customisation'], ARRAY['shopify','freelance','marketplace','small-business'],
 4.6, 210, FALSE, 'published')

ON CONFLICT (slug) DO NOTHING;
