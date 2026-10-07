import type { SegmentConfig } from "@/lib/segments";

// Country landing pages. Each one reuses the shared SegmentPage design, so a
// new country is one entry in COUNTRIES below.
//
// Copy rules: every country has its own intro, FAQ, and local detail so the
// pages are not near duplicates. Facts stay general and well known, with no
// invented price ranges. Copy follows the site plain style, so avoid colons,
// semicolons, dashes, parentheses, and apostrophes in the strings.

interface CountryEntry {
  /** URL slug under /agencies */
  slug: string;
  /** ISO 3166-1 alpha-2 code stored in agencies.country */
  code: string;
  /** Display name used in breadcrumbs and cards */
  name: string;
  /** Phrase that follows "in" in headings, for example "the United Kingdom" */
  inPlace: string;
  metaDescription: string;
  intro: string;
  faq: Array<{ q: string; a: string }>;
  whyShopify: string;
  tips: string[];
  relatedPosts: Array<{ title: string; slug: string }>;
  /** Segment slugs to link first in "Explore More Agencies" */
  relatedSlugs?: string[];
}

const HOW_TO_CHOOSE = {
  title: "How to Choose a Shopify Agency",
  slug: "how-to-choose-a-shopify-agency",
};
const COSTS_BY_COUNTRY = {
  title: "Shopify Development Costs by Country",
  slug: "shopify-development-costs-by-country",
};
const INTERNATIONAL = {
  title: "Shopify International Expansion Guide",
  slug: "shopify-international-multi-currency-markets-guide-2026",
};
const RED_FLAGS = {
  title: "Shopify Agency Red Flags",
  slug: "shopify-agency-red-flags",
};

const COUNTRIES: CountryEntry[] = [
  {
    slug: "united-kingdom",
    code: "GB",
    name: "United Kingdom",
    inPlace: "the United Kingdom",
    metaDescription:
      "Browse verified Shopify agencies across the United Kingdom, from London to Manchester and Bristol. Compare partners by service, budget, and reviews.",
    intro:
      "The United Kingdom has one of the deepest Shopify agency scenes in Europe, with studios in London, Manchester, Birmingham, Leeds, Bristol, and many smaller towns. UK agencies know VAT inclusive pricing, local carriers and payment methods, and the rules for selling to both UK and EU customers. Browse verified agencies and compare them by service, budget, and client reviews.",
    faq: [
      {
        q: "How much do UK Shopify agencies charge?",
        a: "Prices vary a lot with agency size and project scope. Small studios often quote fixed prices for theme based builds, while larger agencies price custom design, Shopify Plus work, and migrations as bigger projects. Ask for a written scope, compare at least three quotes, and check whether each quote includes VAT.",
      },
      {
        q: "Do UK agencies work with clients outside the UK?",
        a: "Yes. Most UK agencies work remotely with merchants in Europe, North America, and beyond. The UK time zone overlaps with Europe for the whole working day and with the US morning, which makes calls easy to schedule.",
      },
      {
        q: "What UK details should my agency know?",
        a: "A good UK agency handles VAT inclusive pricing, UK GDPR and cookie consent, Royal Mail and courier options, and the customs and import VAT steps for orders shipped to the EU since Brexit. Ask how they have set these up for other stores.",
      },
    ],
    whyShopify:
      "Shopify is a leading platform for UK ecommerce, and the agency scene reflects it. London leads on enterprise and brand work, while Manchester, Birmingham, Leeds, and Bristol have strong development and growth studios, often at lower day rates than the capital. UK agencies are used to the local details that trip up foreign builders, such as VAT inclusive pricing, delivery options from Royal Mail, DPD, and Evri, and pay later options such as Klarna and Clearpay. Since Brexit they have also worked through the extra customs and VAT steps for selling into the EU, which matters if you ship across the Channel.",
    tips: [
      "Decide whether you need a London studio or whether a regional agency fits, since many UK agencies outside London offer strong work at lower rates",
      "Check that quotes show VAT clearly, and that prices on your store display including VAT for UK shoppers",
      "Ask how the agency handles selling into the EU after Brexit, including customs paperwork, import VAT, and delivery times",
      "Confirm they set up the payment options UK shoppers expect, such as Klarna, Clearpay, PayPal, and Apple Pay, and the carriers your customers use",
      "Ask how they handle UK GDPR and cookie consent, since privacy rules apply to your store from day one",
    ],
    relatedPosts: [HOW_TO_CHOOSE, COSTS_BY_COUNTRY, INTERNATIONAL],
    relatedSlugs: ["london"],
  },
  {
    slug: "india",
    code: "IN",
    name: "India",
    inPlace: "India",
    metaDescription:
      "Find verified Shopify agencies in India, from Mumbai, Delhi, and Bangalore to Ahmedabad, Surat, and Pune. Compare partners by service, budget, and reviews.",
    intro:
      "India is home to one of the largest groups of Shopify agencies in this directory, with teams across Mumbai, Delhi, Bangalore, Ahmedabad, Surat, Pune, and many other cities. Many Indian agencies build stores for merchants worldwide as well as for the Indian market, offering everything from theme work to custom apps at a wide range of prices.",
    faq: [
      {
        q: "Are Indian Shopify agencies cheaper than agencies in the US or UK?",
        a: "Rates are often lower, but price alone is a poor guide. Quality, communication, and experience vary widely, so compare portfolios, ask for references, and judge each agency on scope and results and not only on the quote.",
      },
      {
        q: "Can Indian agencies work with clients in other time zones?",
        a: "Yes. Many Indian agencies serve clients in Europe, North America, and Australia and arrange overlapping hours for calls. India Standard Time overlaps with the European morning and with Asia Pacific hours, and many teams offer early or late calls for US clients.",
      },
      {
        q: "What should I check before hiring an agency in India?",
        a: "Check Shopify Partner status, review live stores they have built, confirm who will work on your project, and agree scope, milestones, and payment terms in writing. Ask about support after launch, since time zones can slow fixes if nobody is on call.",
      },
    ],
    whyShopify:
      "India has a large and fast growing Shopify talent pool, with agencies and freelancers in Mumbai, Delhi, Bangalore, Pune, and Hyderabad as well as strong hubs in Gujarat, including Ahmedabad and Surat. Many serve overseas merchants and cover theme building, store setup, migrations, apps, and ongoing support. For stores selling inside India, local knowledge matters. That includes GST, UPI and card payments through gateways such as Razorpay and PayU, cash on delivery, and couriers such as Delhivery and Blue Dart.",
    tips: [
      "Compare portfolios and live stores and not only price, since quality varies a lot between agencies",
      "If you sell in India, ask about GST invoicing, UPI, and cash on delivery handling, plus gateways such as Razorpay and PayU",
      "Agree overlap hours for calls up front, especially if you are in the US or Europe",
      "Get scope, milestones, and payment terms in writing before work starts",
      "Ask who will actually work on your store, and what support you get after launch",
    ],
    relatedPosts: [HOW_TO_CHOOSE, COSTS_BY_COUNTRY, RED_FLAGS],
  },
  {
    slug: "germany",
    code: "DE",
    name: "Germany",
    inPlace: "Germany",
    metaDescription:
      "Browse verified Shopify agencies in Germany, including Berlin, Munich, Hamburg, and Frankfurt. Compare German Shopify partners by service, budget, and reviews.",
    intro:
      "Germany is one of the largest ecommerce markets in Europe, and its Shopify agencies work in Berlin, Munich, Hamburg, Frankfurt, Cologne, Stuttgart, and many smaller cities. German agencies understand the legal and payment details of selling to German shoppers, and many build stores for the wider German speaking market in Austria and Switzerland.",
    faq: [
      {
        q: "What legal details does a German Shopify store need?",
        a: "German law expects a complete legal notice called an Impressum, clear information about the 14 day right of withdrawal, privacy and cookie consent that follow GDPR, and transparent pricing that includes VAT. A German agency should set these up, but you should still have the final texts checked by a lawyer.",
      },
      {
        q: "Which payment methods do German shoppers expect?",
        a: "Many German shoppers expect PayPal, purchase on invoice, SEPA direct debit, and cards, with Klarna widely used. Offering the right mix often lifts conversion, so ask your agency how they set up and test these options.",
      },
      {
        q: "Do German agencies build stores in other languages?",
        a: "Yes. Many German agencies build multilingual and multi market stores for the EU and work in English as well as German. Ask for examples with correct translations, hreflang setup, and local legal pages.",
      },
    ],
    whyShopify:
      "Germany rewards stores that look trustworthy and follow local rules closely. German Shopify agencies build with that in mind, from the required legal pages to the payment mix shoppers expect, including PayPal, Klarna, SEPA direct debit, and purchase on invoice. Carriers such as DHL, DPD, and Hermes are the norm, and trust marks such as Trusted Shops can help conversion. Agencies in Berlin, Munich, Hamburg, and other cities also support sales into Austria and Switzerland and across the EU, including VAT and the German packaging register that applies to many sellers.",
    tips: [
      "Make sure the agency sets up the Impressum, withdrawal information, and privacy pages, and have a lawyer review the final texts",
      "Offer the payment methods German shoppers expect, including PayPal, Klarna, SEPA direct debit, and purchase on invoice",
      "Ask about the German packaging register if you ship packaged goods to German customers",
      "Check for correct German product copy and translations, since machine translated text hurts trust",
      "If you also sell in Austria and Switzerland, ask about currencies, VAT, and shipping differences",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "pakistan",
    code: "PK",
    name: "Pakistan",
    inPlace: "Pakistan",
    metaDescription:
      "Find verified Shopify agencies in Pakistan, including Karachi, Lahore, and Islamabad. Compare Pakistani Shopify partners by service, budget, and reviews.",
    intro:
      "Pakistan has a fast growing Shopify community, with agencies in Karachi, Lahore, Islamabad, Faisalabad, and other cities. Many Pakistani agencies build stores for clients in the United States, the United Kingdom, the Gulf, and Europe, and also help local merchants set up stores for the Pakistani market.",
    faq: [
      {
        q: "Do Pakistani agencies work with international clients?",
        a: "Yes. Many Pakistani agencies mainly serve overseas merchants and are used to remote work, written updates, and scheduled calls across time zones. Ask for examples of stores built for clients in your own market.",
      },
      {
        q: "What is different about selling inside Pakistan?",
        a: "Cash on delivery is very common, and mobile wallets such as JazzCash and Easypaisa matter alongside cards. Delivery is handled by local couriers such as TCS and Leopards. An agency with local experience can set these up and help reduce failed deliveries.",
      },
      {
        q: "How do I judge an agency in Pakistan?",
        a: "Look at live stores, Shopify Partner status, and reviews from clients with similar projects. Agree scope, milestones, and payment terms in writing, and confirm how support works after launch.",
      },
    ],
    whyShopify:
      "Pakistan has a large pool of developers and designers, and many agencies have built strong Shopify skills in Karachi, Lahore, and Islamabad. A good share work mostly with overseas merchants, which has made remote communication and clear process a normal part of how they work. For stores that sell inside Pakistan, local detail matters, including cash on delivery, mobile wallets such as JazzCash and Easypaisa, and couriers such as TCS and Leopards.",
    tips: [
      "Ask for live stores built for clients in your market and not only local examples",
      "Agree call times and response times early, since Pakistan Standard Time is five hours ahead of UTC",
      "If you sell inside Pakistan, check experience with cash on delivery, mobile wallets, and local couriers",
      "Get scope, milestones, and payment terms in writing before work begins",
      "Confirm who handles support after launch and how quickly urgent issues are fixed",
    ],
    relatedPosts: [HOW_TO_CHOOSE, COSTS_BY_COUNTRY, RED_FLAGS],
  },
  {
    slug: "spain",
    code: "ES",
    name: "Spain",
    inPlace: "Spain",
    metaDescription:
      "Browse verified Shopify agencies in Spain, including Madrid, Barcelona, and Bilbao. Compare Spanish Shopify partners by service, budget, and reviews.",
    intro:
      "Spain has a lively Shopify agency scene in Madrid, Barcelona, Bilbao, and other cities. Spanish agencies build stores in Spanish and often in Catalan, English, and other languages, and many also support merchants selling into Latin America.",
    faq: [
      {
        q: "Do Spanish agencies build stores for Latin America?",
        a: "Many do. They can set up Spanish language stores, multi currency pricing, and local payment and shipping options for several markets. Ask for examples in the countries you plan to sell in, since each market has its own tax and delivery rules.",
      },
      {
        q: "What payment methods matter in Spain?",
        a: "Cards and PayPal are standard, Bizum is a popular mobile payment, and pay later options such as Klarna are also used. Ask your agency which of these they can set up for your store.",
      },
      {
        q: "What legal details apply to a Spanish store?",
        a: "Stores selling to Spanish customers need clear legal pages, VAT shown correctly, GDPR compliant privacy and cookie notices, and clear return and withdrawal terms. A Spanish agency can help set these up, but have the final texts checked by a local adviser.",
      },
    ],
    whyShopify:
      "Spain is a large ecommerce market with strong growth in fashion, food, and lifestyle brands, and its agencies are used to selling in Spanish and to serving the wider Spanish speaking world. Agencies in Madrid and Barcelona lead on brand and growth work, while Bilbao and smaller cities offer strong development talent. Local details include VAT at 21 percent, carriers such as Correos, SEUR, and GLS, payments through cards, PayPal, and Bizum, and EU rules on privacy and cookie consent.",
    tips: [
      "Choose an agency with strong Spanish copywriting, since translated text that reads poorly hurts trust",
      "If you sell in Latin America, ask for examples in each country, since tax, payments, and delivery differ",
      "Check support for local payment options such as cards, PayPal, and Bizum, and carriers such as Correos and SEUR",
      "Make sure legal pages, VAT, and cookie consent follow Spanish and EU rules",
      "Ask about Catalan or other regional language support if your customers need it",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "italy",
    code: "IT",
    name: "Italy",
    inPlace: "Italy",
    metaDescription:
      "Find verified Shopify agencies in Italy, including Milan and Rome. Compare Italian Shopify partners by service, budget, and reviews for your ecommerce project.",
    intro:
      "Italy has Shopify agencies in Milan, Rome, and many smaller cities, with strong experience in fashion, food, design, and craft brands. Italian agencies build stores in Italian and English and help brands take Made in Italy products to customers abroad.",
    faq: [
      {
        q: "What do Italian agencies do best?",
        a: "Many have deep experience with fashion, food, furniture, and design brands, where presentation and storytelling matter. Ask to see live stores in your category and how they handle product photography, variants, and cross border selling.",
      },
      {
        q: "What payment and delivery options do Italian shoppers use?",
        a: "Cards and PayPal are common, and local options such as PostePay and Satispay are used too. Cash on delivery is still seen. Carriers include Poste Italiane, BRT, and GLS. Ask your agency what they can set up for your store.",
      },
      {
        q: "Are there Italian rules I should know about?",
        a: "Yes. Italy has VAT at 22 percent, strict consumer and privacy rules, and electronic invoicing for business sales. An agency with Italian experience can help you set up the store, but your accountant should confirm the invoicing details.",
      },
    ],
    whyShopify:
      "Italy is known for fashion, food, and design, and many Italian brands use Shopify to sell directly to customers at home and abroad. Agencies in Milan and Rome lead on brand and growth work, and there are strong teams in smaller cities too. Local details include VAT at 22 percent, electronic invoicing rules for businesses, payment methods such as cards, PayPal, PostePay, and Satispay, and carriers such as Poste Italiane, BRT, and GLS. Many agencies also help brands set up multi language, multi currency stores for export.",
    tips: [
      "Look for live stores in your category, since fashion, food, and furniture each have different needs",
      "Ask how the agency handles product photography, variants, and storytelling for premium brands",
      "Check support for Italian payment methods and carriers, and for cash on delivery if you need it",
      "Involve your accountant in invoicing and VAT, since electronic invoicing rules apply to business sales",
      "If you export, ask about multi language setup, duties, and shipping to your target countries",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "netherlands",
    code: "NL",
    name: "Netherlands",
    inPlace: "the Netherlands",
    metaDescription:
      "Browse verified Shopify agencies in the Netherlands, including Amsterdam, Rotterdam, and Eindhoven. Compare Dutch Shopify partners by service, budget, and reviews.",
    intro:
      "The Netherlands has a dense group of Shopify agencies in Amsterdam, Rotterdam, Eindhoven, The Hague, Haarlem, and other cities. Dutch agencies are used to cross border selling into Belgium, Germany, and the rest of the EU, and most teams work comfortably in both Dutch and English.",
    faq: [
      {
        q: "Why does iDEAL matter for a Dutch store?",
        a: "iDEAL is the most used online payment method in the Netherlands, so many Dutch shoppers expect it at checkout. Ask your agency how they will offer it through your payment provider, along with cards and pay later options.",
      },
      {
        q: "Do Dutch agencies work in English?",
        a: "Yes. Dutch teams are usually fluent in English and work with merchants across Europe and beyond, so language is rarely a barrier.",
      },
      {
        q: "Can a Dutch agency help me sell in Belgium and Germany?",
        a: "Often yes. Many Dutch agencies build multi market stores for the Benelux region and Germany, including translations, local payment methods, EU VAT rules, and carriers such as PostNL, DHL, and DPD.",
      },
    ],
    whyShopify:
      "The Netherlands is a compact, highly digital market where shoppers expect fast delivery, easy returns, and local payment methods. Dutch agencies are well placed to build for it and for the neighboring markets of Belgium and Germany. Local details include VAT at 21 percent, iDEAL at checkout, carriers such as PostNL, DHL, and DPD, and consumer trust marks such as Thuiswinkel Waarborg. English is widely used, so working with a Dutch team is easy for international merchants.",
    tips: [
      "Make sure iDEAL is offered at checkout, since many Dutch shoppers expect it",
      "Ask about selling into Belgium and Germany, including translations, VAT, and carriers",
      "Check delivery options and pickup points, since Dutch shoppers expect fast and flexible delivery",
      "Consider a consumer trust mark such as Thuiswinkel Waarborg if you sell mainly in the Netherlands",
      "Ask how the agency handles EU VAT rules for cross border online sales",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "brazil",
    code: "BR",
    name: "Brazil",
    inPlace: "Brazil",
    metaDescription:
      "Find verified Shopify agencies in Brazil, including São Paulo, Rio de Janeiro, and Belo Horizonte. Compare Brazilian Shopify partners by service and reviews.",
    intro:
      "Brazil has a growing Shopify agency community in São Paulo, Rio de Janeiro, Belo Horizonte, Florianópolis, and other cities. Brazilian agencies build stores in Portuguese and know the local payment, tax, and delivery rules that make selling in Brazil different from other markets.",
    faq: [
      {
        q: "What payment methods do Brazilian shoppers use?",
        a: "Pix instant payments are very popular, boleto bancário is still used, and many shoppers pay by card in installments. Ask your agency how they will offer these methods through your payment setup.",
      },
      {
        q: "Is selling in Brazil harder than in other countries?",
        a: "It can be, because of tax rules, invoicing requirements, import costs, and delivery distances. A local agency that has handled these steps before can save you time and mistakes.",
      },
      {
        q: "Do Brazilian agencies build in English?",
        a: "Many do, and some work with merchants outside Brazil. If you need a bilingual team, ask which people will handle your project and how they communicate.",
      },
    ],
    whyShopify:
      "Brazil is the largest ecommerce market in Latin America, and local agencies bring knowledge that is hard to get from outside. They understand Brazilian Portuguese copy, installment payments on cards, Pix, boleto, and the invoicing and tax rules that apply to online sellers. Delivery across a large country is a challenge, so experience with carriers such as Correios and local logistics providers helps. Many agencies in São Paulo, Rio, and other cities also help international brands enter the Brazilian market.",
    tips: [
      "Check that the agency offers Pix, boleto, and installment payments, since shoppers expect them",
      "Ask how they handle Brazilian invoicing and tax, and involve your accountant early",
      "Plan delivery carefully, since distances and costs vary a lot across the country",
      "Insist on natural Brazilian Portuguese copy and not literal translation",
      "If you are an international brand entering Brazil, ask about import costs and local support",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "mexico",
    code: "MX",
    name: "Mexico",
    inPlace: "Mexico",
    metaDescription:
      "Browse verified Shopify agencies in Mexico, including Mexico City, Monterrey, and Mérida. Compare Mexican Shopify partners by service, budget, and reviews.",
    intro:
      "Mexico has Shopify agencies in Mexico City, Monterrey, Mérida, Querétaro, and other cities. Mexican agencies build stores in Spanish and English and help brands sell in Mexico and across the border to the United States.",
    faq: [
      {
        q: "Which payment options matter in Mexico?",
        a: "Cards with installment options are popular, and many shoppers also pay with bank transfers and with cash at convenience stores such as OXXO. Ask your agency how they will offer these options through your payment provider.",
      },
      {
        q: "Can a Mexican agency help me sell in the United States too?",
        a: "Often yes. Many Mexican agencies work with brands that sell on both sides of the border and know dollar and peso pricing, cross border shipping, and the time zone overlap with US teams.",
      },
      {
        q: "What tax details should I know in Mexico?",
        a: "Mexico uses VAT, called IVA, at 16 percent in most cases, and businesses issue electronic invoices known as CFDI. Involve your accountant early and ask your agency how they handle invoicing for online orders.",
      },
    ],
    whyShopify:
      "Mexico is a large and growing ecommerce market, and Mexican agencies combine local market knowledge with strong English and good time zone overlap with the United States. They understand how Mexican shoppers pay, including cards with installments, bank transfers, and cash at stores such as OXXO. Carriers such as Estafeta, DHL, and FedEx are common. Agencies in Mexico City and Monterrey also support cross border brands selling in both pesos and dollars.",
    tips: [
      "Check support for installments, bank transfers, and cash payments such as OXXO",
      "Ask about invoicing and tax, and involve your accountant early",
      "If you sell in the United States too, ask about pricing in pesos and dollars and cross border shipping",
      "Choose an agency with natural Mexican Spanish copy and not literal translation",
      "Confirm carrier options and delivery times for the regions you serve",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "ukraine",
    code: "UA",
    name: "Ukraine",
    inPlace: "Ukraine",
    metaDescription:
      "Find verified Shopify agencies in Ukraine, including Kyiv and Lviv. Compare Ukrainian Shopify partners by service, budget, and client reviews.",
    intro:
      "Ukraine has a strong technical talent pool and a growing group of Shopify agencies in Kyiv, Lviv, and other cities. Many Ukrainian agencies work with merchants in Europe and North America, and combine solid development skills with competitive rates.",
    faq: [
      {
        q: "Do Ukrainian agencies work with international clients?",
        a: "Yes. Many serve clients in Europe and North America, work in English, and are used to remote projects. Eastern European time overlaps well with the European working day and with the US morning.",
      },
      {
        q: "What should I check before hiring an agency in Ukraine?",
        a: "Check live stores, Shopify Partner status, and client reviews, and agree scope, milestones, and payment terms in writing. Ask how the team keeps projects on track and who your backup contact is.",
      },
      {
        q: "How do payments and delivery work for stores inside Ukraine?",
        a: "Local shoppers use cards, mobile wallets, and bank payment services, and Nova Poshta is the most used domestic carrier. If you sell inside Ukraine, ask the agency which payment services and carriers they have connected before.",
      },
    ],
    whyShopify:
      "Ukraine is known for strong engineers, and its Shopify agencies often pair that skill with design and growth work. Teams in Kyiv, Lviv, and other cities build custom themes, apps, and integrations for merchants abroad, and many also help local brands sell within Ukraine and across Europe. For stores selling inside Ukraine, local details include payment services such as LiqPay and Fondy and delivery with Nova Poshta, the most used domestic carrier.",
    tips: [
      "Review live stores and technical depth, especially for custom apps and integrations",
      "Agree a backup contact and clear communication habits at the start of the project",
      "Get scope, milestones, and payment terms in writing before work begins",
      "If you sell inside Ukraine, check experience with local payment services and Nova Poshta",
      "Ask about support after launch and how urgent fixes are handled",
    ],
    relatedPosts: [HOW_TO_CHOOSE, COSTS_BY_COUNTRY, RED_FLAGS],
  },
  {
    slug: "united-arab-emirates",
    code: "AE",
    name: "United Arab Emirates",
    inPlace: "the United Arab Emirates",
    metaDescription:
      "Browse verified Shopify agencies in the United Arab Emirates, including Dubai and Abu Dhabi. Compare UAE Shopify partners by service, budget, and reviews.",
    intro:
      "The United Arab Emirates is a regional hub for ecommerce, with Shopify agencies in Dubai and Abu Dhabi that serve brands across the Gulf. UAE agencies build stores in English and Arabic and know the local payment, delivery, and tax details of the region.",
    faq: [
      {
        q: "Do UAE agencies build Arabic stores?",
        a: "Many do. A good Arabic store needs right to left layout, careful translation, and testing on mobile and not just translated text. Ask for live examples that show the quality of the Arabic version.",
      },
      {
        q: "Which payment options do shoppers in the Gulf use?",
        a: "Cards are common, cash on delivery is still widely used, and pay later services such as Tabby and Tamara are popular. Ask your agency how they will set these up and which are available for your market.",
      },
      {
        q: "Can a UAE agency help me sell in Saudi Arabia and the wider Gulf?",
        a: "Often yes. Many agencies build stores for several Gulf markets, including local currencies, delivery partners, and tax rules. Ask for examples in each country you plan to serve, since rules differ between markets.",
      },
    ],
    whyShopify:
      "The UAE is one of the most connected ecommerce markets in the Middle East, with high smartphone use and shoppers who are comfortable buying online. Agencies in Dubai and Abu Dhabi often serve brands selling across the Gulf, where Arabic and English stores sit side by side. Local details include VAT at 5 percent, delivery with Aramex and other carriers, cash on delivery, and pay later services such as Tabby and Tamara. Strong mobile design and fast delivery matter a great deal.",
    tips: [
      "Ask for live Arabic stores, and check right to left layout and translation quality on a phone",
      "Confirm support for cash on delivery and pay later services such as Tabby and Tamara",
      "If you sell in Saudi Arabia or other Gulf markets, ask about local currencies, carriers, and tax rules",
      "Make sure VAT and pricing display correctly for each market you serve",
      "Prioritize mobile speed and design, since most Gulf shoppers browse and buy on phones",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
  {
    slug: "france",
    code: "FR",
    name: "France",
    inPlace: "France",
    metaDescription:
      "Find verified Shopify agencies in France, including Paris, Lyon, and Bordeaux. Compare French Shopify partners by service, budget, and reviews.",
    intro:
      "France has Shopify agencies in Paris, Lyon, Bordeaux, Nice, and other cities, with strong skills in fashion, beauty, food, and lifestyle brands. French agencies build stores in French and English and know the legal and delivery details that French shoppers expect.",
    faq: [
      {
        q: "What French rules apply to an online store?",
        a: "French law expects product information and legal notices in French, clear withdrawal terms, correct VAT, and privacy and cookie practices that follow GDPR and local guidance. A French agency can set these up, but have the final texts checked by a local adviser.",
      },
      {
        q: "Which delivery options do French shoppers expect?",
        a: "Home delivery with Colissimo or Chronopost is common, and pickup points such as Mondial Relay are very popular. Ask your agency how they will offer pickup point delivery at checkout.",
      },
      {
        q: "Do French agencies work in English?",
        a: "Most do, especially in Paris, and many serve clients across Europe and beyond. If you need French copy, ask who writes it, since natural French matters for trust and sales.",
      },
    ],
    whyShopify:
      "France is a large European ecommerce market with a strong appetite for fashion, beauty, food, and design. French Shopify agencies in Paris, Lyon, Bordeaux, and elsewhere combine brand sensibility with technical skill. Local details include VAT at 20 percent, a legal requirement for product information in French, payments through cards and PayPal, and delivery with Colissimo, Chronopost, and pickup point networks such as Mondial Relay. Cookie and privacy practices follow GDPR and guidance from the French regulator CNIL.",
    tips: [
      "Make sure product pages, legal notices, and checkout text are in natural French",
      "Offer pickup point delivery such as Mondial Relay alongside home delivery",
      "Check that legal notices, withdrawal terms, and VAT follow French rules",
      "Ask how cookie consent and privacy are handled under GDPR and CNIL guidance",
      "If you also sell in Belgium, Switzerland, or Canada, ask about French language and local differences",
    ],
    relatedPosts: [INTERNATIONAL, HOW_TO_CHOOSE, COSTS_BY_COUNTRY],
  },
];

function toSegment(c: CountryEntry): SegmentConfig {
  return {
    slug: c.slug,
    h1: `Shopify Agencies in ${c.inPlace}`,
    metaTitle: `Best Shopify Agencies in ${c.inPlace}`,
    metaDescription: c.metaDescription,
    intro: c.intro,
    breadcrumbLabel: c.name,
    inPlace: c.inPlace,
    relatedSlugs: c.relatedSlugs,
    filter: { country: c.code },
    faq: c.faq,
    industryContent: {
      whyShopify: c.whyShopify,
      tips: c.tips,
      relatedPosts: c.relatedPosts,
    },
  };
}

export const COUNTRY_SEGMENTS: Record<string, SegmentConfig> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, toSegment(c)])
);
