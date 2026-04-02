"use client";

import { useState } from "react";

type BadgeStyle = "light" | "dark" | "minimal";

interface BadgePreviewProps {
  agencySlug: string;
  agencyName: string;
}

const STYLES: { value: BadgeStyle; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "minimal", label: "Minimal" },
];

export default function BadgePreview({ agencySlug, agencyName }: BadgePreviewProps) {
  const [style, setStyle] = useState<BadgeStyle>("light");
  const [copied, setCopied] = useState(false);

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopifyagencydirectory.com"
  ).replace(/\/$/, "");

  const badgeSrc = `${siteUrl}/api/badge/${agencySlug}?style=${style}`;
  const profileUrl = `${siteUrl}/agencies/${agencySlug}`;

  const embedCode = `<a href="${profileUrl}" target="_blank" rel="noopener">\n  <img src="${badgeSrc}" alt="${agencyName} - Verified on Shopify Agency Directory" height="${style === "minimal" ? 40 : 56}" />\n</a>`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = embedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="space-y-4">
      {/* Style picker */}
      <div className="flex gap-2">
        {STYLES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStyle(s.value)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              style === s.value
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Badge preview */}
      <div
        className={`flex items-center justify-center rounded-lg border p-6 ${
          style === "dark" ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={badgeSrc}
          alt={`${agencyName} badge preview`}
          height={style === "minimal" ? 40 : 56}
        />
      </div>

      {/* Embed code */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Embed Code
        </label>
        <div className="relative">
          <pre className="overflow-x-auto rounded-lg border bg-gray-50 p-3 text-xs text-gray-700">
            <code>{embedCode}</code>
          </pre>
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded-md bg-white px-2.5 py-1 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
