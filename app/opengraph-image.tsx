import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Shopify Agency Directory — Find Top Shopify Experts";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #14532d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle dot-grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 16,
            background: "rgba(255,255,255,0.15)",
            marginBottom: 28,
            fontSize: 36,
          }}
        >
          🛍️
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Shopify Agency Directory
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.80)",
            marginTop: 20,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Find &amp; compare the best Shopify agencies and experts worldwide
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
          {["1,000+ Agencies", "Verified Partners", "Free to Search"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.18)",
                  color: "white",
                  borderRadius: 100,
                  padding: "10px 24px",
                  fontSize: 20,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
