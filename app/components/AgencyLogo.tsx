"use client";

import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractDomain(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const url = new URL(
      website.startsWith("http") ? website : `https://${website}`
    );
    return url.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// ─── Size variants ────────────────────────────────────────────────────────────

const SIZE = {
  sm: { box: "h-10 w-10", text: "text-base" },
  md: { box: "h-16 w-16", text: "text-xl" },
  lg: { box: "h-20 w-20", text: "text-2xl" },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

interface AgencyLogoProps {
  name: string;
  website?: string | null;
  size?: keyof typeof SIZE;
  className?: string;
}

/**
 * Shows the agency's favicon/logo (via Google's favicon service) with a
 * graceful letter-initial fallback for agencies without a website or icon.
 *
 * Strategy: the letter initial is always rendered as the base layer.
 * The logo image loads invisibly (opacity-0) and fades in on top only
 * when it has loaded successfully — so there is never a broken-image flash.
 */
export default function AgencyLogo({
  name,
  website,
  size = "md",
  className = "",
}: AgencyLogoProps) {
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const domain = extractDomain(website);
  // Google's favicon service: reliable, free, no auth, follows redirects automatically.
  // Returns the site's actual icon at the requested size.
  const logoUrl = domain && !logoFailed
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;

  const { box, text } = SIZE[size];
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className={`${box} relative shrink-0 overflow-hidden rounded-xl ${className}`}
    >
      {/* Base layer: coloured initial — always visible */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-green-100 ${text} font-bold text-green-700`}
      >
        {initial}
      </div>

      {/* Logo layer: loads invisibly, fades in on success, disappears on error */}
      {logoUrl && (
        <img
          src={logoUrl}
          alt=""
          aria-hidden="true"
          width={80}
          height={80}
          className={`absolute inset-0 h-full w-full bg-white object-contain p-1.5 transition-opacity duration-300 ${
            logoLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLogoLoaded(true)}
          onError={() => setLogoFailed(true)}
        />
      )}
    </div>
  );
}
