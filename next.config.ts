import type { NextConfig } from "next";
import path from "path";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

// Content-Security-Policy — tighten per environment
const cspHeader = [
  "default-src 'self'",
  // Scripts: same-origin + Google Tag Manager for GA4
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
  // Styles: same-origin + inline (Tailwind injects inline styles)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + Supabase storage + data URIs + Google favicon service
  `img-src 'self' data: https://${supabaseHost} https://www.google.com`,
  // Fonts: same-origin
  "font-src 'self'",
  // API/data fetches: same-origin + Supabase + Google Analytics
  `connect-src 'self' https://${supabaseHost} https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com`,
  // No plugins, objects, or frames from external sources
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Force HTTPS upgrades for mixed content
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to THIS project directory.
  // Prevents Next.js picking up a package.json at C:\Users\USER\ as the root,
  // which would cause Tailwind CSS to fail to resolve.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      // Allow Supabase storage images
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Allow Google's favicon service (used by AgencyLogo)
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/s2/favicons",
      },
    ],
  },
  async headers() {
    return [
      // Crawler-accessible files — lightweight caching, no restrictive headers
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
          { key: "X-Robots-Tag", value: "nosnippet" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
          { key: "X-Robots-Tag", value: "nosnippet" },
        ],
      },
      // All other routes — full security headers
      {
        source: "/((?!robots\\.txt|sitemap\\.xml).*)",
        headers: [
          // Existing headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // New: Content Security Policy
          { key: "Content-Security-Policy", value: cspHeader },
          // New: HSTS — tell browsers to always use HTTPS (1 year)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // New: prevent browsers from guessing MIME types
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
