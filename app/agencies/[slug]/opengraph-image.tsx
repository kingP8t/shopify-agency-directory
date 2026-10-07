import type { ReactElement } from "react";
import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabase";
import { getSegment } from "@/lib/segments";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLUMN = { display: "flex", flexDirection: "column" } as const;

// Shared card chrome: green top bar, centred body, footer with the site name.
// Satori lays a fragment out as a row, so callers pass one column wrapper div.
function frame(body: ReactElement): ReactElement {
  return (
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
          width: "100%",
        }}
      >
        {body}
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#f9fafb",
          borderTop: "1px solid #e5e7eb",
          padding: "20px 80px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ fontSize: 18, color: "#6b7280" }}>Shopify Agency Directory</div>
        <div style={{ fontSize: 18, color: "#16a34a", fontWeight: 600 }}>
          shopifyagencydirectory.com
        </div>
      </div>
    </div>
  );
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // /agencies/london and the other segment pages share this route with agency
  // profiles. Show the segment's own title, not a placeholder agency card.
  const segment = getSegment(slug);
  if (segment) {
    // Titles run from about 25 to 70 characters. Step the type size down so the
    // longest still wrap onto two lines and stay inside the frame.
    const len = segment.metaTitle.length;
    const titleSize = len > 56 ? 52 : len > 44 ? 60 : 72;

    return new ImageResponse(
      frame(
        <div style={COLUMN}>
          <div style={{ fontSize: 24, color: "#16a34a", fontWeight: 700 }}>
            Verified Shopify agencies
          </div>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.1,
              marginTop: 20,
            }}
          >
            {segment.metaTitle}
          </div>
          <div style={{ fontSize: 26, color: "#6b7280", marginTop: 28 }}>
            Compare ratings, specializations and budgets
          </div>
        </div>
      ),
      size
    );
  }

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
    frame(
      <div style={COLUMN}>
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
            {`${location}`}
          </div>
        )}

        {specs && (
          <div style={{ fontSize: 20, color: "#16a34a", marginTop: 16, fontWeight: 600 }}>
            {specs}
          </div>
        )}

        {rating && (
          <div style={{ fontSize: 22, color: "#374151", marginTop: 20 }}>
            {`${rating} stars · ${agency?.review_count ?? 0} reviews`}
          </div>
        )}
      </div>
    ),
    size
  );
}
