/**
 * Patch the brief guide post: insert a visual summary table after
 * "The 7 Sections Every Shopify Brief Needs" intro paragraph.
 * Run: node scripts/patch-brief-guide-visual.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function run() {
  // Fetch current content
  const { data, error } = await supabase
    .from("blog_posts")
    .select("content")
    .eq("slug", "how-to-write-shopify-agency-brief")
    .single();

  if (error || !data) {
    console.error("Fetch error:", error);
    process.exit(1);
  }

  const content = data.content;

  // Find the index of "The 7 Sections Every Shopify Brief Needs" h2
  const h2Idx = content.findIndex(
    (b) => b.type === "h2" && b.text.includes("7 Sections")
  );

  if (h2Idx === -1) {
    console.error("Could not find '7 Sections' h2");
    process.exit(1);
  }

  // Find the paragraph right after the h2 (the intro text)
  const introIdx = h2Idx + 1;

  // The summary table to insert after the intro paragraph
  const summaryTable = {
    type: "table",
    headers: ["Section", "What to Include", "Why It Matters"],
    rows: [
      ["1. About Your Business", "Company name, website, industry, platform, revenue", "Helps the agency gauge scale and context"],
      ["2. Project Type", "New build, redesign, migration, Plus upgrade, headless, retainer", "Determines scope and team composition"],
      ["3. Goals & Requirements", "Primary goals, must-have features, nice-to-haves", "Drives accurate scoping and prioritisation"],
      ["4. Design Preferences", "Style direction, example sites, brand guidelines", "Reduces revision rounds and guesswork"],
      ["5. Technical Requirements", "Integrations, catalog size, multi-language, multi-currency", "Biggest impact on cost estimates"],
      ["6. Timeline & Budget", "Launch date, budget range, flexibility", "Prevents mismatched expectations"],
      ["7. Contact Information", "Decision-maker name, email, evaluation process", "Ensures smooth communication"],
    ],
  };

  // Insert the table after the intro paragraph
  content.splice(introIdx + 1, 0, summaryTable);

  // Also add a tip right after the table for scannability
  content.splice(introIdx + 2, 0, {
    type: "tip",
    text: "Bookmark this table as a quick checklist. Each section below explains what to include and common pitfalls to avoid.",
  });

  // Update the post
  const { error: updateErr } = await supabase
    .from("blog_posts")
    .update({ content })
    .eq("slug", "how-to-write-shopify-agency-brief");

  if (updateErr) {
    console.error("Update error:", updateErr);
    process.exit(1);
  }

  console.log("Done! Summary table + tip inserted after the 7 Sections intro.");
}

run();
