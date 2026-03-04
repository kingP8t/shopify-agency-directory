/**
 * Patch the CTA href/label on blog posts that link to generic /agencies.
 * Run: node scripts/patch-blog-cta-links.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const patches = [
  {
    slug: "shopify-agency-red-flags",
    cta: {
      href: "/get-matched",
      label: "Get Matched with a Verified Agency →",
    },
  },
  {
    slug: "how-to-brief-a-shopify-agency",
    cta: {
      href: "/get-matched",
      label: "Get Matched — Free →",
    },
  },
  {
    slug: "questions-to-ask-before-hiring-a-shopify-developer",
    cta: {
      href: "/agencies?specialization=Store+Build",
      label: "Browse Vetted Shopify Developers →",
    },
  },
  {
    slug: "shopify-developer-interview-questions-what-answers-reveal",
    cta: {
      href: "/agencies?specialization=Store+Build",
      label: "Browse Verified Shopify Developers →",
    },
  },
];

async function main() {
  for (const { slug, cta } of patches) {
    // Fetch current content
    const { data, error: fetchErr } = await supabase
      .from("blog_posts")
      .select("content")
      .eq("slug", slug)
      .single();

    if (fetchErr || !data) {
      console.error(`  ✗ Could not fetch: ${slug}`);
      continue;
    }

    // Replace the last CTA block href + label
    const content = data.content.map((block) => {
      if (block.type === "cta") {
        return { ...block, href: cta.href, label: cta.label };
      }
      return block;
    });

    const { error: updateErr } = await supabase
      .from("blog_posts")
      .update({ content })
      .eq("slug", slug);

    if (updateErr) {
      console.error(`  ✗ Failed to update: ${slug}`, updateErr.message);
    } else {
      console.log(`  ✓ Patched: ${slug}`);
      console.log(`      → ${cta.href}`);
    }
  }

  console.log("\nDone.");
}

main();
