/**
 * Add featured_image column and set image for brief guide post
 * Run: node scripts/add-featured-image.js
 */
require("dotenv").config({ path: ".env.local" });
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function run() {
  // 1. Add column (safe if already exists)
  const { error: alterErr } = await supabase.rpc("exec_sql", {
    sql: "ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;",
  });

  // rpc might not exist — try raw SQL via postgrest
  if (alterErr) {
    console.log("rpc exec_sql not available, trying direct SQL...");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sql: "ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;",
        }),
      }
    );
    if (!res.ok) {
      console.log("Direct SQL also failed. Please run in Supabase SQL Editor:");
      console.log("  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;");
      console.log("Continuing to update the post...");
    }
  } else {
    console.log("Column added successfully.");
  }

  // 2. Update the post
  const { error: updateErr } = await supabase
    .from("blog_posts")
    .update({ featured_image: "/blog/how-to-write-shopify-agency-brief.png" })
    .eq("slug", "how-to-write-shopify-agency-brief");

  if (updateErr) {
    console.error("Update error:", updateErr.message);
    if (updateErr.message.includes("featured_image")) {
      console.log("\nThe column doesn't exist yet. Please run in Supabase SQL Editor:");
      console.log("  ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;");
      console.log("\nThen re-run this script.");
    }
  } else {
    console.log("Blog post updated with featured image.");
  }
}

run();
