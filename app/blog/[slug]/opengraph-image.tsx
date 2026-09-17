import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

// Auto-generates a branded 1200x630 PNG OpenGraph card for every blog post.
// Next.js wires this into each post's og:image / twitter:image automatically
// whenever the page's metadata does not set an explicit image — so new posts
// get a proper raster social/AI card with zero manual work.

export const alt = "Shopify Agency Directory — blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-generate for known posts; new ones render on demand (dynamicParams).
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post?.title ?? "Shopify Agency Directory";
  const eyebrow = (post?.category ?? "Blog").toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #064e3b 0%, #047857 55%, #059669 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div
            style={{
              color: "#6ee7b7",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.12,
              marginTop: 24,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div style={{ color: "#a7f3d0", fontSize: 30, fontWeight: 700 }}>
            ★ Shopify Agency Directory
          </div>
          <div style={{ color: "#d1fae5", fontSize: 22, marginTop: 6 }}>
            shopifyagencydirectory.com/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
