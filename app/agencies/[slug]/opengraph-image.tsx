import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: agency } = await supabase
    .from("agencies")
    .select("name, description, location, rating, review_count, specializations")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  const name = agency?.name ?? "Shopify Agency";
  const location = agency?.location ?? "";
  const rating = agency?.rating;
  const specs = (agency?.specializations ?? []).slice(0, 3).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
        }}
      >
        {/* Green top bar */}
        <div style={{ background: "#16a34a", height: 12, width: "100%" }} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          {/* Logo placeholder */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "#dcfce7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#16a34a",
              marginBottom: 32,
            }}
          >
            {name.charAt(0)}
          </div>

          <div style={{ fontSize: 56, fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>
            {name}
          </div>

          {location && (
            <div style={{ fontSize: 24, color: "#6b7280", marginTop: 12 }}>
              📍 {location}
            </div>
          )}

          {specs && (
            <div style={{ fontSize: 20, color: "#16a34a", marginTop: 16, fontWeight: 600 }}>
              {specs}
            </div>
          )}

          {rating && (
            <div style={{ fontSize: 22, color: "#374151", marginTop: 20 }}>
              ⭐ {rating} · {agency?.review_count} reviews
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
            padding: "20px 80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 18, color: "#6b7280" }}>Shopify Agency Directory</div>
          <div style={{ fontSize: 18, color: "#16a34a", fontWeight: 600 }}>
            shopifyagencydirectory.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
