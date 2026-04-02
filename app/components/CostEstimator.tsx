"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectType =
  | "new-store-theme"
  | "new-store-custom"
  | "shopify-plus"
  | "enterprise-headless"
  | "migration-woo"
  | "migration-magento"
  | "redesign"
  | "ongoing-retainer";

type Complexity = "basic" | "moderate" | "complex" | "enterprise";
type IntegrationCount = "0" | "1-3" | "4-7" | "8+";
type CatalogSize = "<100" | "100-1000" | "1000-5000" | "5000+";
type AgencyLocation = "us-uk-ca" | "western-eu" | "eastern-eu" | "asia-latam";

interface Selections {
  projectType: ProjectType | null;
  complexity: Complexity | null;
  integrations: IntegrationCount | null;
  catalogSize: CatalogSize | null;
  location: AgencyLocation | null;
}

interface EstimateResult {
  lowCost: number;
  highCost: number;
  timelineLow: string;
  timelineHigh: string;
  inclusions: string[];
  breakdown: { label: string; pct: number }[];
  isMonthly: boolean;
}

// ---------------------------------------------------------------------------
// Pricing data (sourced from published blog posts)
// ---------------------------------------------------------------------------

const BASE_PRICING: Record<
  ProjectType,
  {
    low: number;
    high: number;
    timelineLow: string;
    timelineHigh: string;
    inclusions: string[];
    isMonthly: boolean;
  }
> = {
  "new-store-theme": {
    low: 2000,
    high: 8000,
    timelineLow: "3 weeks",
    timelineHigh: "6 weeks",
    isMonthly: false,
    inclusions: [
      "Premium theme selection and customisation",
      "Homepage, collection, and product page design",
      "App installation and configuration",
      "Basic SEO setup and metadata",
      "Payment and shipping configuration",
      "Mobile responsiveness testing",
      "Launch support and handover",
    ],
  },
  "new-store-custom": {
    low: 8000,
    high: 25000,
    timelineLow: "6 weeks",
    timelineHigh: "12 weeks",
    isMonthly: false,
    inclusions: [
      "Custom UI/UX design from scratch",
      "Bespoke Liquid theme development",
      "Advanced product filtering and search",
      "Third-party integrations (CRM, ERP, email)",
      "Custom checkout experience",
      "Performance optimisation",
      "QA testing and bug fixes",
      "Post-launch support period",
    ],
  },
  "shopify-plus": {
    low: 25000,
    high: 80000,
    timelineLow: "8 weeks",
    timelineHigh: "16 weeks",
    isMonthly: false,
    inclusions: [
      "Shopify Plus setup and configuration",
      "Custom checkout extensibility",
      "Shopify Flow automation setup",
      "B2B / wholesale channel configuration",
      "Multi-store architecture (expansion stores)",
      "Advanced integrations (ERP, PIM, OMS)",
      "Performance and load testing",
      "Dedicated launch engineer coordination",
    ],
  },
  "enterprise-headless": {
    low: 80000,
    high: 200000,
    timelineLow: "4 months",
    timelineHigh: "9 months",
    isMonthly: false,
    inclusions: [
      "Headless frontend (Next.js / Hydrogen)",
      "Custom API layer and middleware",
      "Enterprise integration suite (SAP, NetSuite, Salesforce)",
      "Multi-region, multi-currency architecture",
      "Advanced caching and CDN strategy",
      "CI/CD pipeline and staging environments",
      "Security audit and penetration testing",
      "Ongoing architecture support",
    ],
  },
  "migration-woo": {
    low: 3000,
    high: 15000,
    timelineLow: "4 weeks",
    timelineHigh: "8 weeks",
    isMonthly: false,
    inclusions: [
      "Product and customer data migration",
      "URL mapping and 301 redirects",
      "SEO preservation (metadata, sitemaps)",
      "Theme setup and customisation",
      "App replacement and configuration",
      "Order history migration",
      "Post-migration QA and testing",
    ],
  },
  "migration-magento": {
    low: 10000,
    high: 100000,
    timelineLow: "8 weeks",
    timelineHigh: "24 weeks",
    isMonthly: false,
    inclusions: [
      "Full data migration (products, customers, orders)",
      "Custom functionality recreation",
      "Complex URL structure mapping",
      "Integration rebuilds (ERP, PIM, payment)",
      "Multi-store migration strategy",
      "SEO audit and redirect management",
      "Parallel running period",
      "Phased cutover plan",
    ],
  },
  redesign: {
    low: 5000,
    high: 20000,
    timelineLow: "4 weeks",
    timelineHigh: "10 weeks",
    isMonthly: false,
    inclusions: [
      "UX audit of current store",
      "New visual design and branding",
      "Homepage and key page redesigns",
      "Mobile experience optimisation",
      "Navigation and information architecture",
      "Conversion rate optimisation",
      "A/B testing setup",
    ],
  },
  "ongoing-retainer": {
    low: 500,
    high: 15000,
    timelineLow: "Monthly",
    timelineHigh: "Monthly",
    isMonthly: true,
    inclusions: [
      "Dedicated hours per month (5\u201340+)",
      "Bug fixes and maintenance",
      "New feature development",
      "Performance monitoring",
      "App updates and compatibility checks",
      "Priority support and SLA",
      "Monthly reporting and roadmap review",
    ],
  },
};

// Multipliers
const COMPLEXITY_MULT: Record<Complexity, number> = {
  basic: 0.8,
  moderate: 1.0,
  complex: 1.3,
  enterprise: 1.7,
};

const INTEGRATION_MULT: Record<IntegrationCount, number> = {
  "0": 1.0,
  "1-3": 1.1,
  "4-7": 1.25,
  "8+": 1.4,
};

const CATALOG_MULT: Record<CatalogSize, number> = {
  "<100": 1.0,
  "100-1000": 1.05,
  "1000-5000": 1.12,
  "5000+": 1.22,
};

const LOCATION_MULT: Record<AgencyLocation, number> = {
  "us-uk-ca": 1.0,
  "western-eu": 0.85,
  "eastern-eu": 0.5,
  "asia-latam": 0.4,
};

// ---------------------------------------------------------------------------
// Step option definitions
// ---------------------------------------------------------------------------

interface Option<T extends string> {
  value: T;
  icon: string;
  label: string;
  desc: string;
}

const PROJECT_OPTIONS: Option<ProjectType>[] = [
  { value: "new-store-theme", icon: "\uD83D\uDED2", label: "New Store (Theme)", desc: "Build on a premium theme" },
  { value: "new-store-custom", icon: "\uD83C\uDFA8", label: "New Store (Custom)", desc: "Fully custom design & dev" },
  { value: "shopify-plus", icon: "\u2B50", label: "Shopify Plus", desc: "Enterprise-tier build" },
  { value: "enterprise-headless", icon: "\uD83D\uDCBB", label: "Headless / Enterprise", desc: "Custom frontend + API" },
  { value: "migration-woo", icon: "\uD83D\uDD04", label: "WooCommerce Migration", desc: "Move from WooCommerce" },
  { value: "migration-magento", icon: "\uD83D\uDD04", label: "Magento Migration", desc: "Move from Magento" },
  { value: "redesign", icon: "\u2728", label: "Redesign", desc: "Refresh existing store" },
  { value: "ongoing-retainer", icon: "\uD83D\uDCC5", label: "Ongoing Retainer", desc: "Monthly dev & support" },
];

const COMPLEXITY_OPTIONS: Option<Complexity>[] = [
  { value: "basic", icon: "\uD83D\uDFE2", label: "Basic", desc: "Straightforward, minimal custom work" },
  { value: "moderate", icon: "\uD83D\uDFE1", label: "Moderate", desc: "Some custom features & design" },
  { value: "complex", icon: "\uD83D\uDFE0", label: "Complex", desc: "Significant custom functionality" },
  { value: "enterprise", icon: "\uD83D\uDD34", label: "Enterprise", desc: "Large-scale, highly custom" },
];

const INTEGRATION_OPTIONS: Option<IntegrationCount>[] = [
  { value: "0", icon: "\u26A1", label: "None", desc: "No third-party integrations" },
  { value: "1-3", icon: "\uD83D\uDD17", label: "1\u20133 Integrations", desc: "E.g. email + reviews + loyalty" },
  { value: "4-7", icon: "\uD83D\uDD17", label: "4\u20137 Integrations", desc: "E.g. ERP + PIM + email + more" },
  { value: "8+", icon: "\uD83C\uDF10", label: "8+ Integrations", desc: "Complex integration ecosystem" },
];

const CATALOG_OPTIONS: Option<CatalogSize>[] = [
  { value: "<100", icon: "\uD83D\uDCE6", label: "Under 100 SKUs", desc: "Small product catalog" },
  { value: "100-1000", icon: "\uD83D\uDCE6", label: "100\u20131,000 SKUs", desc: "Medium catalog" },
  { value: "1000-5000", icon: "\uD83D\uDCE6", label: "1,000\u20135,000 SKUs", desc: "Large catalog" },
  { value: "5000+", icon: "\uD83C\uDFED", label: "5,000+ SKUs", desc: "Very large catalog" },
];

const LOCATION_OPTIONS: Option<AgencyLocation>[] = [
  { value: "us-uk-ca", icon: "\uD83C\uDDFA\uD83C\uDDF8", label: "US / UK / Canada / AU", desc: "Premium market rates" },
  { value: "western-eu", icon: "\uD83C\uDDEA\uD83C\uDDFA", label: "Western Europe", desc: "DE, FR, NL, ES, etc." },
  { value: "eastern-eu", icon: "\uD83C\uDDF5\uD83C\uDDF1", label: "Eastern Europe", desc: "PL, UA, RO, etc." },
  { value: "asia-latam", icon: "\uD83C\uDF0F", label: "Asia / Latin America", desc: "IN, PH, BR, MX, etc." },
];

const STEPS = [
  { key: "projectType" as const, title: "What type of project?", options: PROJECT_OPTIONS },
  { key: "complexity" as const, title: "How complex is it?", options: COMPLEXITY_OPTIONS },
  { key: "integrations" as const, title: "How many integrations?", options: INTEGRATION_OPTIONS },
  { key: "catalogSize" as const, title: "How large is your catalog?", options: CATALOG_OPTIONS },
  { key: "location" as const, title: "Preferred agency location?", options: LOCATION_OPTIONS },
];

// ---------------------------------------------------------------------------
// Calculation
// ---------------------------------------------------------------------------

function round100(n: number): number {
  return Math.round(n / 100) * 100;
}

function calculate(s: Selections): EstimateResult {
  const base = BASE_PRICING[s.projectType!];
  const mult =
    COMPLEXITY_MULT[s.complexity!] *
    INTEGRATION_MULT[s.integrations!] *
    CATALOG_MULT[s.catalogSize!] *
    LOCATION_MULT[s.location!];

  const lowCost = round100(base.low * mult);
  const highCost = round100(base.high * mult);

  const integPct = s.integrations === "0" ? 5 : s.integrations === "1-3" ? 10 : s.integrations === "4-7" ? 18 : 25;
  const breakdown = [
    { label: "Development", pct: 45 - Math.floor(integPct / 3) },
    { label: "Design / UX", pct: 20 },
    { label: "Integrations", pct: integPct },
    { label: "QA & Testing", pct: 10 },
    { label: "Project Management", pct: 25 - 20 + Math.floor(integPct / 3) },
  ];

  return {
    lowCost,
    highCost,
    timelineLow: base.timelineLow,
    timelineHigh: base.timelineHigh,
    inclusions: base.inclusions,
    breakdown,
    isMonthly: base.isMonthly,
  };
}

// ---------------------------------------------------------------------------
// URL param helpers
// ---------------------------------------------------------------------------

const PARAM_KEYS = ["pt", "cx", "ig", "cs", "loc"] as const;
const SELECTION_KEYS: (keyof Selections)[] = [
  "projectType",
  "complexity",
  "integrations",
  "catalogSize",
  "location",
];

const VALID_VALUES: Record<string, string[]> = {
  pt: PROJECT_OPTIONS.map((o) => o.value),
  cx: COMPLEXITY_OPTIONS.map((o) => o.value),
  ig: INTEGRATION_OPTIONS.map((o) => o.value),
  cs: CATALOG_OPTIONS.map((o) => o.value),
  loc: LOCATION_OPTIONS.map((o) => o.value),
};

function selectionsToParams(s: Selections): string {
  const p = new URLSearchParams();
  PARAM_KEYS.forEach((key, i) => {
    const val = s[SELECTION_KEYS[i]];
    if (val) p.set(key, val);
  });
  return p.toString();
}

function paramsToSelections(search: string): Selections | null {
  const p = new URLSearchParams(search);
  const vals = PARAM_KEYS.map((key) => {
    const v = p.get(key);
    return v && VALID_VALUES[key].includes(v) ? v : null;
  });
  if (vals.some((v) => v === null)) return null;
  return {
    projectType: vals[0] as ProjectType,
    complexity: vals[1] as Complexity,
    integrations: vals[2] as IntegrationCount,
    catalogSize: vals[3] as CatalogSize,
    location: vals[4] as AgencyLocation,
  };
}

// Budget filter param for directory link
function budgetParam(high: number, isMonthly: boolean): string {
  if (isMonthly) return "";
  if (high <= 5000) return "Under+%245%2C000";
  if (high <= 25000) return "%245%2C000+-+%2425%2C000";
  if (high <= 100000) return "%2425%2C000+-+%24100%2C000";
  return "%24100%2C000%2B";
}

// Label lookup helpers
function labelFor<T extends string>(options: Option<T>[], value: T | null): string {
  return options.find((o) => o.value === value)?.label ?? "";
}

// ---------------------------------------------------------------------------
// Format currency
// ---------------------------------------------------------------------------

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CostEstimator() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<Selections>({
    projectType: null,
    complexity: null,
    integrations: null,
    catalogSize: null,
    location: null,
  });
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

  function selectOption(key: keyof Selections, value: string) {
    const next = { ...selections, [key]: value } as Selections;
    setSelections(next);

    if (step < 5) {
      setFade(true);
      setTimeout(() => {
        setStep(step + 1);
        setFade(false);
      }, 150);
    } else {
      // Final step — show results
      const qs = selectionsToParams(next);
      window.history.replaceState({}, "", `?${qs}`);
      setShowResults(true);

      const result = calculate(next);
      trackEvent("cost_estimate_complete", {
        project_type: next.projectType ?? "",
        complexity: next.complexity ?? "",
        integrations: next.integrations ?? "",
        catalog_size: next.catalogSize ?? "",
        location: next.location ?? "",
        estimated_low: result.lowCost,
        estimated_high: result.highCost,
      });
    }
  }

  function reset() {
    setSelections({
      projectType: null,
      complexity: null,
      integrations: null,
      catalogSize: null,
      location: null,
    });
    setShowResults(false);
    setStep(1);
    window.history.replaceState({}, "", window.location.pathname);
  }

  // ── Results view ─────────────────────────────────────────────────────────
  if (showResults) {
    const result = calculate(selections);
    const bp = budgetParam(result.highCost, result.isMonthly);

    return (
      <div className="space-y-6">
        {/* Cost hero card */}
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
            Estimated Cost
          </p>
          <p className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            {fmt(result.lowCost)} &ndash; {fmt(result.highCost)}
            {result.isMonthly && (
              <span className="text-2xl font-medium text-gray-400">/month</span>
            )}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Based on {labelFor(LOCATION_OPTIONS, selections.location)} agency rates
          </p>
        </div>

        {/* Timeline + data source */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Estimated Timeline
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              {result.timelineLow === result.timelineHigh
                ? result.timelineLow
                : `${result.timelineLow} \u2013 ${result.timelineHigh}`}
            </p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Data Source
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              900+ Verified Agencies
            </p>
          </div>
        </div>

        {/* Cost breakdown bars */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            Cost Breakdown
          </h3>
          <div className="mt-5 space-y-4">
            {result.breakdown.map((b, i) => (
              <div key={b.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{b.label}</span>
                  <span className="text-gray-500">{b.pct}%</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-green-500 transition-all duration-700"
                    style={{
                      width: `${b.pct}%`,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">
            What&apos;s Typically Included
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {result.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
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
            {STEPS.map((s, i) => {
              const val = selections[s.key];
              return (
                <button
                  key={s.key}
                  onClick={() => goToStep(i + 1)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                >
                  {labelFor(s.options as Option<string>[], val)}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {bp && (
            <Link
              href={`/agencies?budget=${bp}`}
              className="flex-1 rounded-lg bg-green-600 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              Find Agencies in This Budget
            </Link>
          )}
          <Link
            href="/get-matched"
            className="flex-1 rounded-lg border-2 border-green-600 px-6 py-3.5 text-center text-sm font-semibold text-green-600 hover:bg-green-50"
          >
            Get Matched Free
          </Link>
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
  const currentStep = STEPS[step - 1];

  return (
    <div>
      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
        <span>
          Step {step} of 5
        </span>
        {step > 1 && (
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
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={5}
      >
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      {/* Step content */}
      <div
        className={`transition-opacity duration-150 ${fade ? "opacity-0" : "opacity-100"}`}
      >
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          {currentStep.title}
        </h2>

        <div
          className={`mt-6 grid gap-3 ${
            currentStep.options.length > 4
              ? "sm:grid-cols-2 lg:grid-cols-4"
              : "sm:grid-cols-2"
          }`}
        >
          {currentStep.options.map((opt) => {
            const selected =
              selections[currentStep.key] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() =>
                  selectOption(currentStep.key, opt.value)
                }
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
                <span className="mt-0.5 text-xs text-gray-500">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
