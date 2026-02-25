import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shopify Agency Directory — Find the best Shopify agencies";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#bbf7d0",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          shopifyagencydirectory.com
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Find the Perfect Shopify Agency
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#bbf7d0",
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Browse 100+ verified Shopify experts by specialization, budget &amp; location
        </div>
      </div>
    ),
    size
  );
}
