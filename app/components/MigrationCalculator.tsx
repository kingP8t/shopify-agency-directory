"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Platform =
  | "magento"
  | "woocommerce"
  | "bigcommerce"
  | "squarespace"
  | "wix"
  | "custom"
  | "none";

type ProductCount = "<100" | "100-500" | "500-2000" | "2000-10000" | "10000+";
type CustomerCount = "<500" | "500-5000" | "5000-50000" | "50000+";
type OrderHistory = "<1000" | "1000-10000" | "10000-100000" | "100000+";
type AppCount = "0" | "1-3" | "4-7" | "8+";
type IntegrationCount = "0" | "1-3" | "4-7" | "8+";
type PlusNeed = "yes" | "no" | "unsure";
type Urgency = "flexible" | "moderate" | "urgent";

interface Selections {
  platform: Platform | null;
  productCount: ProductCount | null;
  customerCount: CustomerCount | null;
  orderHistory: OrderHistory | null;
  customTheme: boolean | null;
  appCount: AppCount | null;
  customCheckout: boolean | null;
  integrationCount: IntegrationCount | null;
  multiLanguage: boolean | null;
  multiCurrency: boolean | null;
  customData: boolean | null;
  needPlus: PlusNeed | null;
  urgency: Urgency | null;
}

const INITIAL_SELECTIONS: Selections = {
  platform: null,
  productCount: null,
  customerCount: null,
  orderHistory: null,
  customTheme: null,
  appCount: null,
  customCheckout: null,
  integrationCount: null,
  multiLanguage: null,
  multiCurrency: null,
  customData: null,
  needPlus: null,
  urgency: null,
};

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

interface ScoreBreakdown {
  platform: number;
  storeSize: number;
  customizations: number;
  integrations: number;
  requirements: number;
}

type Rating = "low" | "medium" | "high" | "very-high";

interface MigrationResult {
  total: number;
  rating: Rating;
  breakdown: ScoreBreakdown;
  timeline: string;
  risks: string[];
  agencyType: string;
  agencyFilter: string;
}

const PLATFORM_SCORES: Record<Platform, number> = {
  magento: 12,
  woocommerce: 6,
  bigcommerce: 5,
  squarespace: 3,
  wix: 3,
  custom: 10,
  none: 0,
};

const PRODUCT_SCORES: Record<ProductCount, number> = {
  "<100": 1,
  "100-500": 3,
  "500-2000": 5,
  "2000-10000": 8,
  "10000+": 12,
};

const CUSTOMER_SCORES: Record<CustomerCount, number> = {
  "<500": 1,
  "500-5000": 2,
  "5000-50000": 4,
  "50000+": 7,
};

const ORDER_SCORES: Record<OrderHistory, number> = {
  "<1000": 0,
  "1000-10000": 2,
  "10000-100000": 4,
  "100000+": 7,
};

const APP_SCORES: Record<AppCount, number> = {
  "0": 0,
  "1-3": 2,
  "4-7": 5,
  "8+": 9,
};

const INTEGRATION_SCORES: Record<IntegrationCount, number> = {
  "0": 0,
  "1-3": 3,
  "4-7": 6,
  "8+": 10,
};

function ratingFromScore(score: number): Rating {
  if (score <= 15) return "low";
  if (score <= 30) return "medium";
  if (score <= 45) return "high";
  return "very-high";
}

const RATING_CONFIG: Record<Rating, { label: string; color: string; bg: string; border: string }> = {
  low: { label: "Low Complexity", color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  medium: { label: "Medium Complexity", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200" },
  high: { label: "High Complexity", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  "very-high": { label: "Very High Complexity", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const BAR_COLORS: Record<Rating, string> = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  "very-high": "bg-red-500",
};

function calculateMigration(s: Selections): MigrationResult {
  const platform = PLATFORM_SCORES[s.platform!];
  const storeSize =
    PRODUCT_SCORES[s.productCount!] +
    CUSTOMER_SCORES[s.customerCount!] +
    ORDER_SCORES[s.orderHistory!];
  const customizations =
    (s.customTheme ? 3 : 0) +
    APP_SCORES[s.appCount!] +
    (s.customCheckout ? 5 : 0);
  const integrations =
    INTEGRATION_SCORES[s.integrationCount!] +
    (s.multiLanguage ? 3 : 0) +
    (s.multiCurrency ? 3 : 0) +
    (s.customData ? 4 : 0);
  const requirements =
    (s.needPlus === "yes" ? 4 : s.needPlus === "unsure" ? 2 : 0) +
    (s.urgency === "urgent" ? 4 : s.urgency === "moderate" ? 2 : 0);

  const total = platform + storeSize + customizations + integrations + requirements;
  const rating = ratingFromScore(total);

  // Timeline
  const timelines: Record<Rating, string> = {
    low: "2 \u2013 4 weeks",
    medium: "4 \u2013 8 weeks",
    high: "8 \u2013 16 weeks",
    "very-high": "16 \u2013 24+ weeks",
  };

  // Risks
  const risks: string[] = [];
  if (s.platform === "magento") risks.push("Magento migrations require significant data mapping and custom functionality recreation");
  if (s.platform === "custom") risks.push("Custom platform migrations may need bespoke data export tooling");
  if (s.productCount === "10000+") risks.push("Large catalogs (10K+ products) need batch migration tooling and thorough QA");
  if (s.orderHistory === "100000+") risks.push("Extensive order history may require phased migration or archival strategy");
  if (s.customCheckout) risks.push("Custom checkout logic needs to be rebuilt using Shopify Checkout Extensibility");
  if (s.appCount === "8+") risks.push("Many custom apps/functions will need Shopify equivalents or custom rebuilds");
  if (s.integrationCount === "8+" || s.integrationCount === "4-7")
    risks.push("Multiple integrations need individual testing and potential API reconfiguration");
  if (s.multiLanguage && s.multiCurrency)
    risks.push("Multi-language + multi-currency setups require Shopify Markets or expansion stores");
  if (s.customData) risks.push("Custom data structures will need mapping to Shopify metafields/metaobjects");
  if (s.urgency === "urgent") risks.push("Tight timelines increase risk of data issues and insufficient QA");
  if (risks.length === 0) risks.push("No major risk factors identified — straightforward migration expected");

  // Agency recommendation
  let agencyType: string;
  let agencyFilter: string;
  if (rating === "very-high" || rating === "high") {
    agencyType = "Enterprise Migration Specialist";
    agencyFilter = "/agencies?specialization=Migration";
  } else if (rating === "medium") {
    agencyType = "Experienced Shopify Agency";
    agencyFilter = "/agencies?specialization=Migration";
  } else {
    agencyType = "Any Verified Shopify Agency";
    agencyFilter = "/agencies";
  }

  return {
    total,
    rating,
    breakdown: { platform, storeSize, customizations, integrations, requirements },
    timeline: timelines[rating],
    risks,
    agencyType,
    agencyFilter,
  };
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

const PARAM_KEYS = [
  "pl", "pc", "cc", "oh", "ct", "ac", "ck", "ic", "ml", "mc", "cd", "np", "ur",
] as const;

const SELECTION_KEYS: (keyof Selections)[] = [
  "platform", "productCount", "customerCount", "orderHistory",
  "customTheme", "appCount", "customCheckout",
  "integrationCount", "multiLanguage", "multiCurrency", "customData",
  "needPlus", "urgency",
];

function selectionsToParams(s: Selections): string {
  const p = new URLSearchParams();
  PARAM_KEYS.forEach((key, i) => {
    const val = s[SELECTION_KEYS[i]];
    if (val !== null && val !== undefined) p.set(key, String(val));
  });
  return p.toString();
}

function paramsToSelections(search: string): Selections | null {
  const p = new URLSearchParams(search);
  if (!p.get("pl")) return null;
  try {
    return {
      platform: p.get("pl") as Platform,
      productCount: p.get("pc") as ProductCount,
      customerCount: p.get("cc") as CustomerCount,
      orderHistory: p.get("oh") as OrderHistory,
      customTheme: p.get("ct") === "true",
      appCount: p.get("ac") as AppCount,
      customCheckout: p.get("ck") === "true",
      integrationCount: p.get("ic") as IntegrationCount,
      multiLanguage: p.get("ml") === "true",
      multiCurrency: p.get("mc") === "true",
      customData: p.get("cd") === "true",
      needPlus: p.get("np") as PlusNeed,
      urgency: p.get("ur") as Urgency,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Step option definitions
// ---------------------------------------------------------------------------

interface Option<T extends string> {
  value: T;
  icon: string;
  label: string;
  desc: string;
}

const PLATFORM_OPTIONS: Option<Platform>[] = [
  { value: "magento", icon: "\uD83D\uDFE5", label: "Magento", desc: "Adobe Commerce / Magento 1 or 2" },
  { value: "woocommerce", icon: "\uD83D\uDFE3", label: "WooCommerce", desc: "WordPress + WooCommerce" },
  { value: "bigcommerce", icon: "\uD83D\uDFE6", label: "BigCommerce", desc: "BigCommerce hosted store" },
  { value: "squarespace", icon: "\u2B1B", label: "Squarespace", desc: "Squarespace Commerce" },
  { value: "wix", icon: "\uD83D\uDFE8", label: "Wix", desc: "Wix eCommerce" },
  { value: "custom", icon: "\u2699\uFE0F", label: "Custom / Other", desc: "Bespoke platform or other" },
  { value: "none", icon: "\u2728", label: "No Existing Store", desc: "Starting fresh on Shopify" },
];

const PRODUCT_OPTIONS: Option<ProductCount>[] = [
  { value: "<100", icon: "\uD83D\uDCE6", label: "Under 100", desc: "Small product catalog" },
  { value: "100-500", icon: "\uD83D\uDCE6", label: "100 \u2013 500", desc: "Medium catalog" },
  { value: "500-2000", icon: "\uD83D\uDCE6", label: "500 \u2013 2,000", desc: "Large catalog" },
  { value: "2000-10000", icon: "\uD83C\uDFED", label: "2,000 \u2013 10,000", desc: "Very large catalog" },
  { value: "10000+", icon: "\uD83C\uDFED", label: "10,000+", desc: "Enterprise-scale catalog" },
];

const CUSTOMER_OPTIONS: Option<CustomerCount>[] = [
  { value: "<500", icon: "\uD83D\uDC64", label: "Under 500", desc: "Small customer base" },
  { value: "500-5000", icon: "\uD83D\uDC65", label: "500 \u2013 5,000", desc: "Medium customer base" },
  { value: "5000-50000", icon: "\uD83D\uDC65", label: "5,000 \u2013 50,000", desc: "Large customer base" },
  { value: "50000+", icon: "\uD83C\uDF10", label: "50,000+", desc: "Enterprise customer base" },
];

const ORDER_OPTIONS: Option<OrderHistory>[] = [
  { value: "<1000", icon: "\uD83D\uDCCB", label: "Under 1,000", desc: "Minimal order history" },
  { value: "1000-10000", icon: "\uD83D\uDCCB", label: "1,000 \u2013 10,000", desc: "Moderate history" },
  { value: "10000-100000", icon: "\uD83D\uDCCA", label: "10,000 \u2013 100,000", desc: "Significant history" },
  { value: "100000+", icon: "\uD83D\uDCCA", label: "100,000+", desc: "Extensive order archive" },
];

const APP_OPTIONS: Option<AppCount>[] = [
  { value: "0", icon: "\u26A1", label: "None", desc: "No custom apps or plugins" },
  { value: "1-3", icon: "\uD83D\uDD27", label: "1 \u2013 3", desc: "A few custom additions" },
  { value: "4-7", icon: "\uD83D\uDD27", label: "4 \u2013 7", desc: "Several custom features" },
  { value: "8+", icon: "\uD83C\uDF10", label: "8+", desc: "Heavily customized" },
];

const INTEGRATION_OPTIONS: Option<IntegrationCount>[] = [
  { value: "0", icon: "\u26A1", label: "None", desc: "No third-party integrations" },
  { value: "1-3", icon: "\uD83D\uDD17", label: "1 \u2013 3", desc: "E.g. email + reviews + loyalty" },
  { value: "4-7", icon: "\uD83D\uDD17", label: "4 \u2013 7", desc: "E.g. ERP + PIM + email + more" },
  { value: "8+", icon: "\uD83C\uDF10", label: "8+", desc: "Complex integration ecosystem" },
];

const PLUS_OPTIONS: Option<PlusNeed>[] = [
  { value: "yes", icon: "\u2B50", label: "Yes", desc: "We need Shopify Plus features" },
  { value: "no", icon: "\uD83D\uDED2", label: "No", desc: "Standard Shopify is fine" },
  { value: "unsure", icon: "\uD83E\uDD14", label: "Not Sure", desc: "Need advice on this" },
];

const URGENCY_OPTIONS: Option<Urgency>[] = [
  { value: "flexible", icon: "\uD83D\uDFE2", label: "Flexible", desc: "No hard deadline" },
  { value: "moderate", icon: "\uD83D\uDFE1", label: "Moderate", desc: "Within a few months" },
  { value: "urgent", icon: "\uD83D\uDD34", label: "Urgent", desc: "ASAP or hard deadline" },
];

// ---------------------------------------------------------------------------
// Boolean toggle helper
// ---------------------------------------------------------------------------

interface BoolOption {
  value: "true" | "false";
  icon: string;
  label: string;
  desc: string;
}

const YES_NO: BoolOption[] = [
  { value: "true", icon: "\u2705", label: "Yes", desc: "" },
  { value: "false", icon: "\u274C", label: "No", desc: "" },
];

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

interface WizardStep {
  key: string;
  title: string;
  subtitle?: string;
  fields: WizardField[];
}

type WizardField =
  | { type: "select"; key: keyof Selections; label: string; options: Option<string>[]; cols?: number }
  | { type: "bool"; key: keyof Selections; label: string };

const WIZARD_STEPS: WizardStep[] = [
  {
    key: "platform",
    title: "What platform are you migrating from?",
    subtitle: "This is the biggest factor in migration complexity.",
    fields: [
      { type: "select", key: "platform", label: "", options: PLATFORM_OPTIONS as Option<string>[], cols: 4 },
    ],
  },
  {
    key: "store-size",
    title: "How large is your store?",
    subtitle: "Product count, customers, and order history all affect data migration effort.",
    fields: [
      { type: "select", key: "productCount", label: "Products (SKUs)", options: PRODUCT_OPTIONS as Option<string>[] },
      { type: "select", key: "customerCount", label: "Customer Accounts", options: CUSTOMER_OPTIONS as Option<string>[] },
      { type: "select", key: "orderHistory", label: "Historic Orders", options: ORDER_OPTIONS as Option<string>[] },
    ],
  },
  {
    key: "customizations",
    title: "How customized is your current store?",
    subtitle: "Custom themes, apps, and checkout logic add migration complexity.",
    fields: [
      { type: "bool", key: "customTheme", label: "Do you have a custom (non-stock) theme?" },
      { type: "select", key: "appCount", label: "Custom Apps / Plugins", options: APP_OPTIONS as Option<string>[] },
      { type: "bool", key: "customCheckout", label: "Do you have a customized checkout flow?" },
    ],
  },
  {
    key: "integrations",
    title: "What integrations and data complexity do you have?",
    subtitle: "Integrations, multi-language, and custom data structures affect migration scope.",
    fields: [
      { type: "select", key: "integrationCount", label: "Third-Party Integrations (ERP, POS, CRM, etc.)", options: INTEGRATION_OPTIONS as Option<string>[] },
      { type: "bool", key: "multiLanguage", label: "Multi-language store?" },
      { type: "bool", key: "multiCurrency", label: "Multi-currency store?" },
      { type: "bool", key: "customData", label: "Custom data structures (metafields, custom tables)?" },
    ],
  },
  {
    key: "requirements",
    title: "Final details",
    subtitle: "Shopify Plus needs and timeline urgency.",
    fields: [
      { type: "select", key: "needPlus", label: "Do you need Shopify Plus?", options: PLUS_OPTIONS as Option<string>[] },
      { type: "select", key: "urgency", label: "How urgent is your timeline?", options: URGENCY_OPTIONS as Option<string>[] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Completeness check per step
// ---------------------------------------------------------------------------

function isStepComplete(stepIndex: number, s: Selections): boolean {
  const step = WIZARD_STEPS[stepIndex];
  return step.fields.every((f) => s[f.key] !== null);
}

// ---------------------------------------------------------------------------
// Label helpers
// ---------------------------------------------------------------------------

function labelFor(options: Option<string>[], value: string | null): string {
  return options.find((o) => o.value === value)?.label ?? "";
}

const PLATFORM_LABEL: Record<Platform, string> = {
  magento: "Magento",
  woocommerce: "WooCommerce",
  bigcommerce: "BigCommerce",
  squarespace: "Squarespace",
  wix: "Wix",
  custom: "Custom / Other",
  none: "No Existing Store",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MigrationCalculator() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [showResults, setShowResults] = useState(false);
  const [fade, setFade] = useState(false);

  // Restore from URL on mount
  useEffect(() => {
    const restored = paramsToSelections(window.location.search);
    if (restored) {
      setSelections(restored);
      setShowResults(true);
    }
  }, []);

  const goToStep = useCallback((n: number) => {
    setShowResults(false);
    setFade(true);
    setTimeout(() => {
      setStep(n);
      setFade(false);
    }, 150);
  }, []);

  function updateField(key: keyof Selections, value: string | boolean) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  function handleNext() {
    if (step < WIZARD_STEPS.length - 1) {
      setFade(true);
      setTimeout(() => {
        setStep(step + 1);
        setFade(false);
      }, 150);
    } else {
      // Show results
      const qs = selectionsToParams(selections);
      window.history.replaceState({}, "", `?${qs}`);
      setShowResults(true);

      const result = calculateMigration(selections);
      trackEvent("migration_calc_complete", {
        platform: selections.platform ?? "",
        product_count: selections.productCount ?? "",
        rating: result.rating,
        score: result.total,
      });
    }
  }

  function reset() {
    setSelections(INITIAL_SELECTIONS);
    setShowResults(false);
    setStep(0);
    window.history.replaceState({}, "", window.location.pathname);
  }

  // ── Results view ─────────────────────────────────────────────────────────
  if (showResults) {
    const result = calculateMigration(selections);
    const cfg = RATING_CONFIG[result.rating];
    const barColor = BAR_COLORS[result.rating];
    const maxCategoryScore = Math.max(
      result.breakdown.platform,
      result.breakdown.storeSize,
      result.breakdown.customizations,
      result.breakdown.integrations,
      result.breakdown.requirements,
      1,
    );

    const breakdownItems = [
      { label: "Source Platform", score: result.breakdown.platform },
      { label: "Store Size & Data", score: result.breakdown.storeSize },
      { label: "Customizations", score: result.breakdown.customizations },
      { label: "Integrations & Data", score: result.breakdown.integrations },
      { label: "Requirements", score: result.breakdown.requirements },
    ];

    return (
      <div className="space-y-6">
        {/* Score hero card */}
        <div className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-8 text-center shadow-sm`}>
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Migration Complexity Score
          </p>
          <p className={`mt-3 text-5xl font-bold ${cfg.color}`}>
            {result.total}
          </p>
          <p className={`mt-2 text-lg font-semibold ${cfg.color}`}>
            {cfg.label}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {selections.platform !== "none"
              ? `Migrating from ${PLATFORM_LABEL[selections.platform!]} to Shopify`
              : "New Shopify store setup"}
          </p>
        </div>

        {/* Timeline + Agency */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Estimated Timeline
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {result.timeline}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Recommended Agency Type
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {result.agencyType}
            </p>
          </div>
        </div>

        {/* Score breakdown bars */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Complexity Breakdown
          </h3>
          <div className="mt-5 space-y-4">
            {breakdownItems.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{b.label}</span>
                  <span className="text-gray-500">{b.score} pts</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${barColor} transition-all duration-700`}
                    style={{
                      width: `${Math.max((b.score / maxCategoryScore) * 100, b.score > 0 ? 8 : 0)}%`,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk factors */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Key Risk Factors
          </h3>
          <ul className="mt-4 space-y-3">
            {result.risks.map((risk) => (
              <li
                key={risk}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                {risk}
              </li>
            ))}
          </ul>
        </div>

        {/* Selection summary chips */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Your Selections
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {WIZARD_STEPS.map((ws, i) => (
              <button
                key={ws.key}
                onClick={() => goToStep(i)}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700"
              >
                {ws.key === "platform" ? PLATFORM_LABEL[selections.platform!] : ws.title.replace("?", "")}
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={result.agencyFilter}
            className="flex-1 rounded-lg bg-green-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Find Migration Agencies
          </Link>
          <Link
            href="/get-matched"
            className="flex-1 rounded-lg border-2 border-green-600 px-6 py-3.5 text-center text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            Get Matched Free
          </Link>
        </div>

        {/* Cross-links */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              Want to estimate the cost?
            </p>
            <Link
              href="/tools/cost-estimator"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              Cost Estimator
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-center">
            <p className="text-sm font-semibold text-gray-900">
              Ready to reach out to agencies?
            </p>
            <Link
              href="/tools/brief-generator"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              Create a Project Brief
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <button
          onClick={reset}
          className="mx-auto block text-sm text-gray-400 hover:text-gray-600"
        >
          Start over with different options
        </button>
      </div>
    );
  }

  // ── Wizard view ──────────────────────────────────────────────────────────
  const currentStep = WIZARD_STEPS[step];
  const canAdvance = isStepComplete(step, selections);

  return (
    <div>
      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
        <span>
          Step {step + 1} of {WIZARD_STEPS.length}
        </span>
        {step > 0 && (
          <button
            onClick={() => goToStep(step - 1)}
            className="text-green-600 hover:text-green-700"
          >
            &larr; Back
          </button>
        )}
      </div>
      <div
        className="mb-8 h-2 overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={WIZARD_STEPS.length}
      >
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${((step + 1) / WIZARD_STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div
        className={`transition-opacity duration-150 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {currentStep.title}
        </h2>
        {currentStep.subtitle && (
          <p className="mt-1 text-sm text-gray-500">{currentStep.subtitle}</p>
        )}

        <div className="mt-6 space-y-8">
          {currentStep.fields.map((field) => {
            if (field.type === "select") {
              return (
                <div key={field.key}>
                  {field.label && (
                    <p className="mb-3 text-sm font-semibold text-gray-700">
                      {field.label}
                    </p>
                  )}
                  <div
                    className={`grid gap-3 ${
                      (field.cols ?? field.options.length) > 4
                        ? "sm:grid-cols-2 lg:grid-cols-4"
                        : field.options.length === 3
                          ? "sm:grid-cols-3"
                          : "sm:grid-cols-2"
                    }`}
                  >
                    {field.options.map((opt) => {
                      const selected = selections[field.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => updateField(field.key, opt.value)}
                          className={`flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all ${
                            selected
                              ? "border-green-600 bg-green-50 ring-2 ring-green-100"
                              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <span className="text-2xl" aria-hidden="true">
                            {opt.icon}
                          </span>
                          <span className="mt-2 text-sm font-semibold text-gray-900">
                            {opt.label}
                          </span>
                          {opt.desc && (
                            <span className="mt-0.5 text-xs text-gray-500">
                              {opt.desc}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Boolean field
            return (
              <div key={field.key}>
                <p className="mb-3 text-sm font-semibold text-gray-700">
                  {field.label}
                </p>
                <div className="flex gap-3">
                  {YES_NO.map((opt) => {
                    const boolVal = opt.value === "true";
                    const selected = selections[field.key] === boolVal;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => updateField(field.key, boolVal)}
                        className={`flex items-center gap-2 rounded-xl border-2 px-6 py-3 text-left transition-all ${
                          selected
                            ? "border-green-600 bg-green-50 ring-2 ring-green-100"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-lg" aria-hidden="true">
                          {opt.icon}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Next / Calculate button */}
        <div className="mt-8">
          <button
            onClick={handleNext}
            disabled={!canAdvance}
            className={`w-full rounded-lg px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors sm:w-auto ${
              canAdvance
                ? "bg-green-600 hover:bg-green-700"
                : "cursor-not-allowed bg-gray-300"
            }`}
          >
            {step < WIZARD_STEPS.length - 1 ? "Next Step" : "Calculate Complexity"}
          </button>
        </div>
      </div>
    </div>
  );
}
