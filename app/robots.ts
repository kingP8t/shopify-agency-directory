import type { MetadataRoute } from "next";

/** Resolve production site URL — never let localhost leak into robots.txt */
function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (!raw || raw.includes("localhost")) {
    const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    if (vercelUrl) return `https://${vercelUrl}`;
    return "https://shopifyagencydirectory.com";
  }
  if (process.env.NODE_ENV === "production" && raw.startsWith("http://")) {
    return raw.replace("http://", "https://");
  }
  return raw;
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Explicitly welcome AI crawlers for GEO / AEO visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
