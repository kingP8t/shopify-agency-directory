"use server";

// Shopify Store Health Grader — server-side audit
// Fetches a URL and extracts performance/SEO/mobile/structured-data/app-bloat signals.

import { headers as requestHeaders } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";
import {
  UnsafeUrlError,
  assertPublicHost,
  parsePublicUrl,
  safeFetchHtml,
} from "@/lib/safe-fetch";

export type CheckStatus = "pass" | "warn" | "fail" | "info";
export type Impact = "low" | "med" | "high";
export type CheckCategory =
  | "Performance"
  | "SEO"
  | "Mobile"
  | "Structured Data"
  | "Apps"
  | "Security";

export interface GraderCheck {
  category: CheckCategory;
  name: string;
  status: CheckStatus;
  message: string;
  impact?: Impact;
  detail?: string;
}

export interface GraderMetrics {
  responseTimeMs: number;
  htmlSizeKB: number;
  scriptCount: number;
  externalScriptDomains: number;
  stylesheetCount: number;
  imageCount: number;
  imagesWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  thirdPartyAppDomains: string[];
}

export interface LighthouseScores {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  lcp: string | null;
  cls: string | null;
  fcp: string | null;
  tbt: string | null;
  speedIndex: string | null;
  strategy: "mobile" | "desktop";
  source: "pagespeed-insights";
}

export interface GraderReport {
  url: string;
  finalUrl: string;
  fetchedAt: string;
  isShopify: boolean;
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  categoryScores: Record<CheckCategory, number>;
  checks: GraderCheck[];
  metrics: GraderMetrics;
  summary: string;
  lighthouse?: LighthouseScores;
  lighthouseError?: string;
}

export interface GraderState {
  ok: boolean;
  error?: string;
  report?: GraderReport;
}

const SHOPIFY_SIGNALS = [
  "cdn.shopify.com",
  "cdn.shopifycdn.com",
  "shopify.theme",
  "window.Shopify",
  "shopify-section",
  "/cdn/shop/",
  "x-shopify",
];

const COMMON_SHOPIFY_APP_DOMAINS = new Set([
  "cdn.shopify.com",
  "cdn.shopifycdn.com",
  "shopify.com",
  "shop.app",
  "shopifycloud.com",
  "shopifyapps.com",
  "shopifysvc.com",
]);

// Each audit fetches a site and spends PageSpeed quota, so cap it per visitor.
const GRADER_MAX = 6;
const GRADER_WINDOW_MS = 10 * 60_000;

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(withProto);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

function countMatches(html: string, re: RegExp): number {
  const m = html.match(re);
  return m ? m.length : 0;
}

function extractAttr(tag: string, attr: string): string | null {
  const re = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i");
  const m = tag.match(re);
  return m ? m[1] : null;
}

function extractMetaContent(html: string, name: string, useProperty = false): string | null {
  const attr = useProperty ? "property" : "name";
  const re = new RegExp(
    `<meta[^>]*${attr}\\s*=\\s*["']${name}["'][^>]*>`,
    "i"
  );
  const m = html.match(re);
  if (!m) return null;
  return extractAttr(m[0], "content");
}

function extractTitle(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : null;
}

function extractCanonical(html: string): string | null {
  const m = html.match(/<link[^>]*rel\s*=\s*["']canonical["'][^>]*>/i);
  if (!m) return null;
  return extractAttr(m[0], "href");
}

function extractHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function letterGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

interface PsiAudit {
  displayValue?: string;
  numericValue?: number;
}

interface PsiResult {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number | null };
      accessibility?: { score?: number | null };
      "best-practices"?: { score?: number | null };
      seo?: { score?: number | null };
    };
    audits?: Record<string, PsiAudit>;
  };
}

async function fetchLighthouse(
  targetUrl: string,
  strategy: "mobile" | "desktop" = "mobile"
): Promise<{ scores?: LighthouseScores; error?: string }> {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const params = new URLSearchParams({
    url: targetUrl,
    strategy,
  });
  ["performance", "accessibility", "best-practices", "seo"].forEach((c) =>
    params.append("category", c)
  );
  if (apiKey) params.set("key", apiKey);

  const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(psiUrl, { signal: controller.signal });
    if (!res.ok) {
      return { error: `PageSpeed API returned ${res.status}` };
    }
    const data = (await res.json()) as PsiResult;
    const cats = data.lighthouseResult?.categories;
    const audits = data.lighthouseResult?.audits ?? {};
    if (!cats) return { error: "No Lighthouse result returned" };
    const toPct = (v: number | null | undefined): number | null =>
      typeof v === "number" ? Math.round(v * 100) : null;
    return {
      scores: {
        performance: toPct(cats.performance?.score),
        accessibility: toPct(cats.accessibility?.score),
        bestPractices: toPct(cats["best-practices"]?.score),
        seo: toPct(cats.seo?.score),
        lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
        cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
        fcp: audits["first-contentful-paint"]?.displayValue ?? null,
        tbt: audits["total-blocking-time"]?.displayValue ?? null,
        speedIndex: audits["speed-index"]?.displayValue ?? null,
        strategy,
        source: "pagespeed-insights",
      },
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return {
      error: msg.includes("abort")
        ? "PageSpeed audit timed out"
        : `PageSpeed audit failed: ${msg}`,
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function gradeStore(
  _prev: GraderState,
  formData: FormData
): Promise<GraderState> {
  const raw = String(formData.get("url") ?? "");
  const url = normalizeUrl(raw);
  if (!url) {
    return { ok: false, error: "Please enter a valid URL (e.g. yourstore.com)." };
  }

  // Limit audits per visitor before doing any work.
  const headersList = await requestHeaders();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";
  if (await isRateLimited(`grader:${ip}`, GRADER_MAX, GRADER_WINDOW_MS)) {
    return {
      ok: false,
      error:
        "You have run several audits in a short time. Please wait a few minutes and try again.",
    };
  }

  // Refuse anything that is not a public website before any request is made.
  // This blocks localhost, private networks, and cloud metadata addresses.
  try {
    await assertPublicHost(parsePublicUrl(url).hostname);
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof UnsafeUrlError
          ? err.message
          : "Could not look up that address. Check the URL and try again.",
    };
  }

  let html = "";
  let finalUrl = url;
  let responseTimeMs = 0;
  let status = 0;
  let headers: Headers | null = null;

  const start = Date.now();

  // Fire Lighthouse in parallel. It is slow (15-40s), so do not block on it.
  // It starts only after the URL passed the checks above.
  const lighthousePromise = fetchLighthouse(url, "mobile");

  try {
    // safeFetchHtml re-checks every redirect, validates the address at connect
    // time, and caps both the response size and the total time.
    const res = await safeFetchHtml(url, { timeoutMs: 12000 });
    responseTimeMs = Date.now() - start;
    status = res.status;
    finalUrl = res.finalUrl;
    headers = res.headers;
    html = res.html;
  } catch (err) {
    if (err instanceof UnsafeUrlError) {
      return { ok: false, error: err.message };
    }
    const msg = err instanceof Error ? err.message : "Request failed";
    return {
      ok: false,
      error: msg.includes("abort")
        ? "Request timed out after 12 seconds. The site may be slow or blocking bots."
        : `Could not fetch the site: ${msg}`,
    };
  }

  if (status >= 400) {
    return {
      ok: false,
      error: `Site returned HTTP ${status}. Check the URL and try again.`,
    };
  }

  const htmlSizeKB = Math.round((html.length / 1024) * 10) / 10;
  const host = extractHostname(finalUrl);

  // Detect Shopify
  const lowerHtml = html.toLowerCase();
  const isShopify =
    SHOPIFY_SIGNALS.some((s) => lowerHtml.includes(s.toLowerCase())) ||
    !!headers?.get("x-shopid") ||
    !!headers?.get("x-shopify-stage");

  // Parse scripts
  const scriptTags = html.match(/<script\b[^>]*>/gi) ?? [];
  const externalScripts: string[] = [];
  for (const tag of scriptTags) {
    const src = extractAttr(tag, "src");
    if (src) {
      try {
        const absolute = src.startsWith("//")
          ? `https:${src}`
          : src.startsWith("http")
            ? src
            : new URL(src, finalUrl).toString();
        externalScripts.push(absolute);
      } catch {
        /* ignore */
      }
    }
  }
  const scriptDomains = new Set<string>();
  const thirdPartyAppDomainsSet = new Set<string>();
  for (const s of externalScripts) {
    const h = extractHostname(s);
    if (!h) continue;
    scriptDomains.add(h);
    // Third-party "apps" = scripts loaded from a domain that isn't the store or Shopify
    const isOwn = h === host || h.endsWith(`.${host}`);
    const isShopifyCore = [...COMMON_SHOPIFY_APP_DOMAINS].some(
      (d) => h === d || h.endsWith(`.${d}`)
    );
    if (!isOwn && !isShopifyCore) thirdPartyAppDomainsSet.add(h);
  }
  const thirdPartyAppDomains = [...thirdPartyAppDomainsSet].sort();

  // Stylesheets
  const stylesheetCount = countMatches(
    html,
    /<link[^>]*rel\s*=\s*["']stylesheet["'][^>]*>/gi
  );

  // Images + alt coverage
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imageCount = imgTags.length;
  let imagesWithoutAlt = 0;
  for (const tag of imgTags) {
    const alt = extractAttr(tag, "alt");
    if (alt === null || alt.trim() === "") imagesWithoutAlt++;
  }

  // Links
  const anchorTags = html.match(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi) ?? [];
  let internalLinks = 0;
  let externalLinks = 0;
  for (const tag of anchorTags) {
    const href = extractAttr(tag, "href");
    if (!href) continue;
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const u = new URL(href, finalUrl);
      const h = u.hostname.replace(/^www\./, "");
      if (h === host) internalLinks++;
      else externalLinks++;
    } catch {
      /* ignore */
    }
  }

  // SEO signals
  const title = extractTitle(html);
  const description = extractMetaContent(html, "description");
  const canonical = extractCanonical(html);
  const viewport = extractMetaContent(html, "viewport");
  const ogTitle =
    extractMetaContent(html, "og:title", true) ?? extractMetaContent(html, "og:title");
  const ogImage =
    extractMetaContent(html, "og:image", true) ?? extractMetaContent(html, "og:image");
  const twitterCard = extractMetaContent(html, "twitter:card");
  const robotsMeta = extractMetaContent(html, "robots");
  const hasJsonLd = /<script[^>]*type\s*=\s*["']application\/ld\+json["']/i.test(html);
  const jsonLdBlocks = countMatches(html, /<script[^>]*type\s*=\s*["']application\/ld\+json["']/gi);
  const hasFavicon = /<link[^>]*rel\s*=\s*["'](?:icon|shortcut icon|apple-touch-icon)["']/i.test(html);

  const h1Count = countMatches(html, /<h1\b[^>]*>/gi);

  const isHttps = finalUrl.startsWith("https://");

  // ---------- Build checks ----------
  const checks: GraderCheck[] = [];

  // Performance
  if (responseTimeMs < 800) {
    checks.push({
      category: "Performance",
      name: "Server response time",
      status: "pass",
      message: `Fast server response (${responseTimeMs}ms).`,
      impact: "high",
    });
  } else if (responseTimeMs < 2000) {
    checks.push({
      category: "Performance",
      name: "Server response time",
      status: "warn",
      message: `Moderate server response (${responseTimeMs}ms). Aim for under 800ms.`,
      impact: "high",
    });
  } else {
    checks.push({
      category: "Performance",
      name: "Server response time",
      status: "fail",
      message: `Slow server response (${responseTimeMs}ms). This hurts Core Web Vitals and conversion.`,
      impact: "high",
    });
  }

  if (htmlSizeKB < 150) {
    checks.push({
      category: "Performance",
      name: "HTML document size",
      status: "pass",
      message: `HTML is lean (${htmlSizeKB} KB).`,
    });
  } else if (htmlSizeKB < 400) {
    checks.push({
      category: "Performance",
      name: "HTML document size",
      status: "warn",
      message: `HTML is heavy (${htmlSizeKB} KB). Consider code-splitting or lazy sections.`,
      impact: "med",
    });
  } else {
    checks.push({
      category: "Performance",
      name: "HTML document size",
      status: "fail",
      message: `HTML is very heavy (${htmlSizeKB} KB). This slows first paint significantly.`,
      impact: "high",
    });
  }

  if (scriptTags.length < 20) {
    checks.push({
      category: "Performance",
      name: "Script count",
      status: "pass",
      message: `${scriptTags.length} script tags detected.`,
    });
  } else if (scriptTags.length < 40) {
    checks.push({
      category: "Performance",
      name: "Script count",
      status: "warn",
      message: `${scriptTags.length} script tags — getting heavy. Audit for duplicated trackers.`,
      impact: "med",
    });
  } else {
    checks.push({
      category: "Performance",
      name: "Script count",
      status: "fail",
      message: `${scriptTags.length} script tags — excessive. Almost always a sign of app bloat.`,
      impact: "high",
    });
  }

  // Apps / bloat
  if (thirdPartyAppDomains.length === 0) {
    checks.push({
      category: "Apps",
      name: "Third-party app scripts",
      status: "pass",
      message: "No third-party app scripts detected on the homepage.",
    });
  } else if (thirdPartyAppDomains.length <= 5) {
    checks.push({
      category: "Apps",
      name: "Third-party app scripts",
      status: "pass",
      message: `${thirdPartyAppDomains.length} third-party domains loading scripts — healthy.`,
      detail: thirdPartyAppDomains.join(", "),
    });
  } else if (thirdPartyAppDomains.length <= 12) {
    checks.push({
      category: "Apps",
      name: "Third-party app scripts",
      status: "warn",
      message: `${thirdPartyAppDomains.length} third-party script domains. Review which apps are still earning their weight.`,
      detail: thirdPartyAppDomains.join(", "),
      impact: "med",
    });
  } else {
    checks.push({
      category: "Apps",
      name: "Third-party app scripts",
      status: "fail",
      message: `${thirdPartyAppDomains.length} third-party script domains — significant app bloat. An agency audit can typically reclaim 1–3s of load time.`,
      detail: thirdPartyAppDomains.join(", "),
      impact: "high",
    });
  }

  // Mobile
  if (viewport && /width\s*=\s*device-width/i.test(viewport)) {
    checks.push({
      category: "Mobile",
      name: "Responsive viewport meta",
      status: "pass",
      message: "Correct responsive viewport meta tag present.",
    });
  } else if (viewport) {
    checks.push({
      category: "Mobile",
      name: "Responsive viewport meta",
      status: "warn",
      message: `Viewport tag exists but is non-standard: "${viewport}".`,
      impact: "med",
    });
  } else {
    checks.push({
      category: "Mobile",
      name: "Responsive viewport meta",
      status: "fail",
      message: "Missing viewport meta tag — site will not render correctly on mobile.",
      impact: "high",
    });
  }

  // SEO — Title
  if (!title) {
    checks.push({
      category: "SEO",
      name: "Meta title",
      status: "fail",
      message: "No <title> tag found. This is critical for search rankings.",
      impact: "high",
    });
  } else if (title.length < 20) {
    checks.push({
      category: "SEO",
      name: "Meta title",
      status: "warn",
      message: `Title is short (${title.length} chars). Aim for 50–60.`,
      detail: title,
      impact: "med",
    });
  } else if (title.length > 70) {
    checks.push({
      category: "SEO",
      name: "Meta title",
      status: "warn",
      message: `Title is too long (${title.length} chars). Google will truncate.`,
      detail: title,
      impact: "med",
    });
  } else {
    checks.push({
      category: "SEO",
      name: "Meta title",
      status: "pass",
      message: `Good title length (${title.length} chars).`,
      detail: title,
    });
  }

  // SEO — Description
  if (!description) {
    checks.push({
      category: "SEO",
      name: "Meta description",
      status: "fail",
      message: "No meta description. Google may pick random snippet text.",
      impact: "med",
    });
  } else if (description.length < 70 || description.length > 170) {
    checks.push({
      category: "SEO",
      name: "Meta description",
      status: "warn",
      message: `Description is ${description.length} chars. Aim for 120–160.`,
      impact: "low",
    });
  } else {
    checks.push({
      category: "SEO",
      name: "Meta description",
      status: "pass",
      message: `Good description length (${description.length} chars).`,
    });
  }

  // SEO — Canonical
  if (canonical) {
    checks.push({
      category: "SEO",
      name: "Canonical tag",
      status: "pass",
      message: "Canonical URL defined.",
      detail: canonical,
    });
  } else {
    checks.push({
      category: "SEO",
      name: "Canonical tag",
      status: "warn",
      message: "No canonical tag — risks duplicate-content issues with Shopify URL variants.",
      impact: "med",
    });
  }

  // SEO — H1
  if (h1Count === 1) {
    checks.push({
      category: "SEO",
      name: "H1 heading",
      status: "pass",
      message: "Exactly one H1 on the page.",
    });
  } else if (h1Count === 0) {
    checks.push({
      category: "SEO",
      name: "H1 heading",
      status: "warn",
      message: "No H1 heading found on the homepage.",
      impact: "med",
    });
  } else {
    checks.push({
      category: "SEO",
      name: "H1 heading",
      status: "warn",
      message: `${h1Count} H1 headings on one page — consolidate to one.`,
      impact: "low",
    });
  }

  // SEO — Robots
  if (robotsMeta && /noindex/i.test(robotsMeta)) {
    checks.push({
      category: "SEO",
      name: "Robots directive",
      status: "fail",
      message: `Homepage is set to "${robotsMeta}" — blocked from Google.`,
      impact: "high",
    });
  } else {
    checks.push({
      category: "SEO",
      name: "Robots directive",
      status: "pass",
      message: "Homepage is indexable.",
    });
  }

  // Image alt coverage
  if (imageCount > 0) {
    const missingPct = Math.round((imagesWithoutAlt / imageCount) * 100);
    if (missingPct === 0) {
      checks.push({
        category: "SEO",
        name: "Image alt text",
        status: "pass",
        message: `All ${imageCount} images have alt text.`,
      });
    } else if (missingPct < 25) {
      checks.push({
        category: "SEO",
        name: "Image alt text",
        status: "warn",
        message: `${imagesWithoutAlt}/${imageCount} images missing alt text (${missingPct}%).`,
        impact: "low",
      });
    } else {
      checks.push({
        category: "SEO",
        name: "Image alt text",
        status: "fail",
        message: `${imagesWithoutAlt}/${imageCount} images missing alt text (${missingPct}%) — hurts accessibility and image SEO.`,
        impact: "med",
      });
    }
  }

  // Structured Data
  if (hasJsonLd) {
    checks.push({
      category: "Structured Data",
      name: "JSON-LD schema",
      status: "pass",
      message: `${jsonLdBlocks} JSON-LD block${jsonLdBlocks === 1 ? "" : "s"} detected. Helps rich results.`,
    });
  } else {
    checks.push({
      category: "Structured Data",
      name: "JSON-LD schema",
      status: "fail",
      message: "No JSON-LD structured data found. Missing Product/Organization schemas costs rich results.",
      impact: "med",
    });
  }

  if (ogTitle && ogImage) {
    checks.push({
      category: "Structured Data",
      name: "Open Graph tags",
      status: "pass",
      message: "Open Graph title and image defined — good social previews.",
    });
  } else {
    checks.push({
      category: "Structured Data",
      name: "Open Graph tags",
      status: "warn",
      message: "Incomplete Open Graph tags — social shares will look bare.",
      impact: "low",
    });
  }

  if (twitterCard) {
    checks.push({
      category: "Structured Data",
      name: "Twitter card",
      status: "pass",
      message: `Twitter card set to "${twitterCard}".`,
    });
  } else {
    checks.push({
      category: "Structured Data",
      name: "Twitter card",
      status: "warn",
      message: "No twitter:card meta tag.",
      impact: "low",
    });
  }

  if (hasFavicon) {
    checks.push({
      category: "Structured Data",
      name: "Favicon / app icon",
      status: "pass",
      message: "Favicon declared.",
    });
  } else {
    checks.push({
      category: "Structured Data",
      name: "Favicon / app icon",
      status: "warn",
      message: "No favicon link tag detected.",
      impact: "low",
    });
  }

  // Security
  if (isHttps) {
    checks.push({
      category: "Security",
      name: "HTTPS",
      status: "pass",
      message: "Site served over HTTPS.",
    });
  } else {
    checks.push({
      category: "Security",
      name: "HTTPS",
      status: "fail",
      message: "Site is not served over HTTPS.",
      impact: "high",
    });
  }

  // ---------- Scoring ----------
  const impactWeight = (c: GraderCheck): number => {
    const base = c.impact === "high" ? 3 : c.impact === "med" ? 2 : 1;
    return base;
  };
  const statusPoints = (s: CheckStatus): number =>
    s === "pass" ? 1 : s === "warn" ? 0.5 : s === "fail" ? 0 : 1;

  const categoryScores: Record<CheckCategory, number> = {
    Performance: 100,
    SEO: 100,
    Mobile: 100,
    "Structured Data": 100,
    Apps: 100,
    Security: 100,
  };

  for (const cat of Object.keys(categoryScores) as CheckCategory[]) {
    const items = checks.filter((c) => c.category === cat);
    if (items.length === 0) continue;
    const total = items.reduce((sum, c) => sum + impactWeight(c), 0);
    const earned = items.reduce(
      (sum, c) => sum + impactWeight(c) * statusPoints(c.status),
      0
    );
    categoryScores[cat] = Math.round((earned / total) * 100);
  }

  const weights: Record<CheckCategory, number> = {
    Performance: 0.3,
    SEO: 0.25,
    Mobile: 0.15,
    "Structured Data": 0.1,
    Apps: 0.15,
    Security: 0.05,
  };
  // Wait for Lighthouse — it's been running in parallel
  const lighthouseResult = await lighthousePromise;
  const lighthouse = lighthouseResult.scores;
  const lighthouseError = lighthouseResult.error;

  // If we got a real Lighthouse performance score, use it (more authoritative than heuristics)
  if (lighthouse?.performance !== null && lighthouse?.performance !== undefined) {
    categoryScores.Performance = lighthouse.performance;
    // Add a Lighthouse-sourced check at the top of the Performance bucket
    const lhCheck: GraderCheck = {
      category: "Performance",
      name: "Lighthouse Performance",
      status:
        lighthouse.performance >= 90
          ? "pass"
          : lighthouse.performance >= 50
            ? "warn"
            : "fail",
      message: `Real Lighthouse mobile performance score: ${lighthouse.performance}/100${
        lighthouse.lcp ? ` · LCP ${lighthouse.lcp}` : ""
      }${lighthouse.cls ? ` · CLS ${lighthouse.cls}` : ""}${
        lighthouse.tbt ? ` · TBT ${lighthouse.tbt}` : ""
      }`,
      impact: "high",
    };
    checks.unshift(lhCheck);
  }

  // If we got a real Lighthouse SEO score, blend it with our heuristic SEO
  if (lighthouse?.seo !== null && lighthouse?.seo !== undefined) {
    categoryScores.SEO = Math.round((categoryScores.SEO + lighthouse.seo) / 2);
  }

  let overallScore = 0;
  for (const cat of Object.keys(weights) as CheckCategory[]) {
    overallScore += categoryScores[cat] * weights[cat];
  }
  overallScore = Math.round(overallScore);

  const grade = letterGrade(overallScore);

  // Summary sentence
  const failingCount = checks.filter((c) => c.status === "fail").length;
  const warningCount = checks.filter((c) => c.status === "warn").length;
  let summary = "";
  if (grade === "A") {
    summary = `Strong store health. ${warningCount} minor refinement${warningCount === 1 ? "" : "s"} identified.`;
  } else if (grade === "B") {
    summary = `Solid foundation with ${failingCount} critical and ${warningCount} moderate issue${warningCount === 1 ? "" : "s"} to address.`;
  } else if (grade === "C") {
    summary = `Average health. ${failingCount} critical issue${failingCount === 1 ? "" : "s"} are likely costing conversions.`;
  } else {
    summary = `Significant issues found — ${failingCount} critical failure${failingCount === 1 ? "" : "s"}. An agency audit is strongly recommended.`;
  }

  const report: GraderReport = {
    url,
    finalUrl,
    fetchedAt: new Date().toISOString(),
    isShopify,
    overallScore,
    grade,
    categoryScores,
    checks,
    metrics: {
      responseTimeMs,
      htmlSizeKB,
      scriptCount: scriptTags.length,
      externalScriptDomains: scriptDomains.size,
      stylesheetCount,
      imageCount,
      imagesWithoutAlt,
      internalLinks,
      externalLinks,
      thirdPartyAppDomains,
    },
    summary,
    lighthouse,
    lighthouseError,
  };

  return { ok: true, report };
}
