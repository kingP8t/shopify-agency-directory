import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type BadgeStyle = "light" | "dark" | "minimal";

const VALID_STYLES = new Set<BadgeStyle>(["light", "dark", "minimal"]);

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "\u2026" : str;
}

function renderBadgeSvg(agencyName: string, style: BadgeStyle): string {
  const name = escapeXml(truncate(agencyName, 28));

  if (style === "minimal") {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="40" viewBox="0 0 240 40">
  <rect width="240" height="40" rx="6" fill="none"/>
  <circle cx="20" cy="20" r="12" fill="#16a34a"/>
  <path d="M14.5 20.5l3.5 3.5 7-7" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="40" y="17" font-family="Arial,Helvetica,sans-serif" font-size="11" font-weight="600" fill="#16a34a">Verified</text>
  <text x="40" y="30" font-family="Arial,Helvetica,sans-serif" font-size="9" fill="#6b7280">Shopify Agency Directory</text>
</svg>`;
  }

  const isLight = style === "light";
  const bg = isLight ? "#ffffff" : "#111827";
  const border = isLight ? "#e5e7eb" : "#374151";
  const nameColor = isLight ? "#111827" : "#ffffff";
  const subtitleColor = isLight ? "#6b7280" : "#9ca3af";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="56" viewBox="0 0 280 56">
  <rect width="280" height="56" rx="8" fill="${bg}" stroke="${border}" stroke-width="1"/>
  <rect width="4" height="56" rx="2" fill="#16a34a"/>
  <circle cx="28" cy="28" r="14" fill="#16a34a"/>
  <path d="M21.5 28.5l4 4 8-8" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="52" y="24" font-family="Arial,Helvetica,sans-serif" font-size="13" font-weight="700" fill="${nameColor}">${name}</text>
  <text x="52" y="40" font-family="Arial,Helvetica,sans-serif" font-size="10" fill="${subtitleColor}">Verified on Shopify Agency Directory</text>
</svg>`;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Validate slug format before hitting the database
  if (!/^[a-z0-9-]{1,100}$/.test(slug)) {
    return new NextResponse("Invalid slug", { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const rawStyle = searchParams.get("style") ?? "light";
  const style: BadgeStyle = VALID_STYLES.has(rawStyle as BadgeStyle)
    ? (rawStyle as BadgeStyle)
    : "light";

  const { data: agency } = await supabase
    .from("agencies")
    .select("name, slug")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!agency) {
    return new NextResponse("Agency not found", { status: 404 });
  }

  const svg = renderBadgeSvg(agency.name, style);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
