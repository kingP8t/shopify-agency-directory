import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : "*.supabase.co";

// Content-Security-Policy — tighten per environment
const cspHeader = [
  "default-src 'self'",
  // Scripts: only same-origin (Next.js inline scripts use nonces in prod, but we keep unsafe-inline for now)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  // Styles: same-origin + inline (Tailwind injects inline styles)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + Supabase storage + data URIs
  `img-src 'self' data: https://${supabaseHost}`,
  // Fonts: same-origin
  "font-src 'self'",
  // API/data fetches: same-origin + Supabase
  `connect-src 'self' https://${supabaseHost}`,
  // No plugins, objects, or frames from external sources
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Force HTTPS upgrades for mixed content
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow Supabase storage images
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
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
