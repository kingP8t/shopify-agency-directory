/**
 * Seed blog post: Image SEO for Shopify in the AI Era (2026)
 * Author: Varine Rashford
 * Category: SEO
 * Extends the SEO+GEO cluster to images (Google Images + AI visual answers).
 * Run: node scripts/seed-blog-shopify-image-seo-2026.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const h2 = (text) => ({ type: "h2", text });
const h3 = (text) => ({ type: "h3", text });
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const tip = (text) => ({ type: "tip", text });
const cta = (text, href, label) => ({ type: "cta", text, href, label });
const table = (headers, rows) => ({ type: "table", headers, rows });
const faq = (items) => ({ type: "faq", items });

const post = {
  slug: "shopify-image-seo-ai-2026",
  title:
    "Image SEO for Shopify in the AI Era: Ranking in Google Images and AI Answers (2026)",
  seo_title: "Shopify Image SEO for the AI Era (2026)",
  excerpt:
    "Images are a search channel of their own — and AI engines now read them the same way Google does. Here is how to optimize Shopify images for Google Images and AI visual answers in 2026: alt text, file names, formats, structured data, image sitemaps, and the Shopify-specific settings that matter.",
  category: "SEO",
  tags: [
    "shopify image seo",
    "image seo 2026",
    "alt text seo",
    "product image optimization",
    "webp avif shopify",
    "google images ranking",
    "image structured data",
  ],
  author: "Varine Rashford",
  reading_time: 11,
  status: "published",
  featured: false,
  featured_image: "/blog/covers/shopify-image-seo-ai-2026.svg",
  date: "2026-09-17",
  updated_date: "2026-09-17",
  content: [
    // ── Direct answer for AEO / GEO ────────────────────────────────────
    p(
      "Last reviewed September 2026. Image SEO is the practice of optimizing your images so they rank in Google Images and get surfaced inside AI visual answers. It matters more in 2026 because AI engines — ChatGPT, Perplexity, Google AI Overviews — read the same image signals Google always has: descriptive alt text, keyword-relevant file names, surrounding page text, and structured data. When an AI answer includes a product image, it is leaning on those exact signals. To do it well on Shopify: write context-rich alt text, use descriptive file names, serve modern formats (WebP/AVIF) fast, add image structured data, and submit an image sitemap."
    ),
    p(
      "The work overlaps almost entirely with good page SEO and Core Web Vitals — optimized images load faster and rank better at the same time. This guide covers each lever, with the Shopify-specific settings that actually move the needle."
    ),
    tip(
      "Images are their own search surface. A shopper searching Google Images for \"minimalist oak desk\" is a buyer — and if your product image is well-optimized, that is a click (and increasingly, an AI recommendation) most competitors leave on the table."
    ),

    // ── Section 1: why it matters now ──────────────────────────────────
    h2("Why Image SEO Matters More in the AI Era"),
    p(
      "Two shifts raise the stakes. First, visual and multimodal search keep growing — people search with and for images, not just text. Second, AI answer engines increasingly build richer, more visual responses, and they decide which images to show using the same metadata Google reads. An image an AI cannot understand is an image it will not surface."
    ),
    ul(
      "Google Images is a real referral channel — descriptive images rank and drive buyers who are close to purchase",
      "AI Overviews and generative results pull in images with clear alt text and structured data",
      "Fast images protect Largest Contentful Paint (LCP), a confirmed ranking factor",
      "Rich, correct image metadata reinforces the topical authority of the whole page",
    ),

    // ── Section 2: alt text ────────────────────────────────────────────
    h2("Alt Text: The Highest-Leverage Image Signal"),
    p(
      "Alt text is what both screen readers and search/AI engines use to understand an image. In 2026 the guidance is consistent: aim for roughly 80–140 characters, describe the image in context rather than literally, and never keyword-stuff."
    ),
    ul(
      "Describe why the image exists on the page, not just what is in it — a product's key attributes (material, color, use) beat a generic label",
      "Keep it natural and specific: \"Walnut standing desk with cable tray, raised to standing height\" over \"desk image\"",
      "Include the product or topic keyword once, naturally — do not stuff",
      "Leave purely decorative images with empty alt (alt=\"\") so assistive tech skips them",
    ),
    tip(
      "The same alt text serves accessibility and SEO and AI — write it for a person who cannot see the image, and you will satisfy all three at once."
    ),

    // ── Section 3: file names + context ─────────────────────────────────
    h2("File Names and Surrounding Context"),
    p(
      "Search engines read the image file name and the text around the image as relevance signals. \"walnut-standing-desk.webp\" tells them far more than \"IMG_4821.webp\". On Shopify, set descriptive file names before upload — renaming after the fact is fiddly."
    ),
    ul(
      "Use lowercase, hyphen-separated, descriptive file names that match the product or topic",
      "Place images near relevant text — captions, headings, and body copy give context",
      "Keep one clear primary image per product view rather than many near-duplicates",
    ),

    // ── Section 4: formats + speed ─────────────────────────────────────
    h2("Formats and Speed: WebP, AVIF, and LCP"),
    p(
      "Heavy images are the number-one cause of slow Shopify pages, and slow pages rank and convert worse. Modern formats fix most of it."
    ),
    table(
      ["Format", "Vs JPEG", "Use when"],
      [
        ["WebP", "~25–35% smaller", "Default for most store images in 2026"],
        ["AVIF", "up to ~50% smaller", "When your theme/CDN supports it well"],
        ["JPEG/PNG", "baseline", "Legacy fallback only"],
      ]
    ),
    ul(
      "Upload high-quality source images (around 2048px on the long edge) and let Shopify's CDN generate responsive sizes",
      "Use lossy compression around 80–85% quality — the size savings far outweigh the tiny quality loss",
      "Serve appropriately sized images via srcset so phones do not download desktop-sized files",
      "Lazy-load below-the-fold images, but never lazy-load your LCP (hero/first product) image",
    ),
    cta(
      "Image weight is the most common Core Web Vitals failure on Shopify. Here is how to pass.",
      "/blog/shopify-core-web-vitals-page-speed-2026",
      "Shopify Core Web Vitals: How to Pass in 2026"
    ),

    // ── Section 5: structured data ─────────────────────────────────────
    h2("Structured Data for Images"),
    p(
      "In 2026, three metadata layers make an image discoverable: on-page text signals, embedded file data, and structured schema — and schema now carries more weight than embedded EXIF for ranking in visual and multimodal search. For a store, the practical wins are:"
    ),
    ul(
      "Reference product images in your Product schema (the image property), so search and AI tie the image to the product, price, and rating",
      "Use ImageObject where a standalone image needs describing (with caption/creator where relevant)",
      "Keep the schema image URL consistent with the visible, indexable image on the page",
    ),
    cta(
      "Getting Product and image structured data right (without the penalties) is covered step by step here.",
      "/blog/shopify-schema-markup-structured-data-2026",
      "Shopify Schema Markup: The 2026 Guide"
    ),

    // ── Section 6: image sitemap ───────────────────────────────────────
    h2("Image Sitemaps and Indexation"),
    p(
      "Help crawlers find your images. Ensure your images are included in your sitemap (or a dedicated image sitemap), that none are blocked by robots rules, and that AI crawlers can reach them — the same crawlers you welcome for text also fetch images referenced on allowed pages."
    ),
    cta(
      "Not sure the AI engines can even read your store? Start with the GEO fundamentals.",
      "/blog/shopify-geo-ai-search-2026",
      "GEO for Shopify: Get Cited by AI Search"
    ),

    // ── Section 7: Shopify specifics ───────────────────────────────────
    h2("Shopify-Specific Image Settings"),
    p(
      "Shopify handles a lot automatically, but the defaults are not always optimal. Check these:"
    ),
    ul(
      "Set descriptive alt text on every product and content image in the admin — it is a field, and most stores leave it blank",
      "Name files descriptively before uploading; Shopify keeps the file name in the URL",
      "Confirm your theme serves responsive srcset sizes and WebP — most modern themes do, but verify",
      "Avoid stacking image apps that each add scripts; one good optimization app is plenty",
      "Do not lazy-load the first product image or hero — it is usually your LCP element",
    ),
    cta(
      "Product images are also a conversion and discovery asset. Optimize the whole product page.",
      "/blog/shopify-product-page-seo-ai-shopping-2026",
      "Shopify Product Page SEO for AI Shopping"
    ),

    // ── Section 8: measurement ─────────────────────────────────────────
    h2("How to Measure Image SEO"),
    ul(
      "Google Search Console → Performance → Search type: Image — see impressions and clicks from Google Images",
      "PageSpeed Insights / CrUX — confirm images are not dragging down LCP on key templates",
      "Rich results and Merchant listing reports — check product images are valid in structured data",
      "Spot-check AI answers — do assistants surface your product images for relevant queries?",
    ),
    tip(
      "Prioritize by revenue: optimize the images on your best-selling product and top landing pages first, where better image SEO turns directly into traffic and sales."
    ),

    // ── Section 9: when to call an agency ──────────────────────────────
    h2("When to Bring in an Agency"),
    p(
      "Renaming files and writing alt text is DIY. A specialist earns their fee when image work is structural and at scale:"
    ),
    ul(
      "Bulk alt-text and file-name remediation across a large catalog",
      "Theme-level work to fix srcset, formats, and lazy-loading behavior",
      "Product and image structured data done properly across every template",
      "An image and Core Web Vitals audit tied to rankings and conversion",
    ),
    cta(
      "Want experts to optimize images for search, AI, and speed together? Browse verified Shopify SEO agencies.",
      "/agencies?specialization=SEO",
      "Browse Shopify SEO Agencies"
    ),

    // ── FAQ ─────────────────────────────────────────────────────────────
    faq([
      {
        q: "How long should image alt text be for SEO?",
        a: "Around 80–140 characters is the sweet spot — enough to describe the image in context without overwhelming screen-reader users. Describe why the image exists on the page (a product's material, color, and use), include the keyword once naturally, and never keyword-stuff. Purely decorative images should use empty alt (alt=\"\").",
      },
      {
        q: "Does image SEO help with AI search and AI Overviews?",
        a: "Yes. AI answer engines read the same image signals Google does — alt text, file names, surrounding text, and structured data. When ChatGPT, Perplexity, or Google AI Overviews includes an image, it relies on that metadata to understand it. Clear alt text and image schema make your images eligible to be surfaced.",
      },
      {
        q: "What image format should a Shopify store use in 2026?",
        a: "WebP is the sensible default — about 25–35% smaller than JPEG at similar quality. AVIF is even smaller (up to ~50%) when your theme and CDN support it well. Upload high-quality sources around 2048px, use ~80–85% lossy compression, and let Shopify's CDN serve responsive sizes.",
      },
      {
        q: "Should I lazy-load all my Shopify images?",
        a: "Lazy-load below-the-fold images to speed up initial load, but never lazy-load your LCP element — usually the hero or first product image. Lazy-loading the LCP image delays it and hurts your Core Web Vitals, which is a confirmed ranking factor.",
      },
      {
        q: "Do file names really matter for image SEO?",
        a: "Yes. Search engines read the file name as a relevance signal, so \"walnut-standing-desk.webp\" outperforms \"IMG_4821.webp\". Set descriptive, lowercase, hyphenated file names before uploading to Shopify, since the file name persists in the image URL and is awkward to change later.",
      },
    ]),

    // ── Closing ────────────────────────────────────────────────────────
    h2("The Bottom Line"),
    p(
      "Image SEO is one of the most under-worked channels in ecommerce, which makes it an opportunity. The playbook is not complicated: write context-rich alt text, use descriptive file names, serve modern formats fast, add image structured data, and make sure crawlers can reach everything. Do that and your images earn Google Images traffic, protect your Core Web Vitals, and become eligible for the AI visual answers your customers increasingly rely on."
    ),
    p(
      "Start where the money is — your best-selling products and top landing pages — and work outward. Every optimized image is a small, compounding asset that keeps working across search and AI."
    ),
    cta(
      "Want an expert to optimize your store's images for search and AI? Get matched with a verified Shopify agency.",
      "/get-matched",
      "Get Matched Free"
    ),
  ],
};

async function seed() {
  console.log("Seeding blog post:", post.title);
  const { data, error } = await supabase
    .from("blog_posts")
    .upsert(
      {
        slug: post.slug,
        title: post.title,
        seo_title: post.seo_title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        tags: post.tags,
        author: post.author,
        reading_time: post.reading_time,
        status: post.status,
        featured: post.featured,
        featured_image: post.featured_image,
        date: post.date,
        updated_date: post.updated_date,
      },
      { onConflict: "slug" }
    )
    .select();

  if (error) {
    console.error("Failed to seed:", error);
    process.exit(1);
  }
  console.log("Seeded:", data?.[0]?.slug);
}

seed();
