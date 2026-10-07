"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// Plan data
// ---------------------------------------------------------------------------

type PlanKey = "basic" | "shopify" | "advanced" | "plus";

interface Plan {
  key: PlanKey;
  name: string;
  monthly: number;          // USD/month (billed annually rate)
  cardRate: number;         // fraction, e.g. 0.029
  cardFixed: number;        // USD per transaction
  transactionFee: number;   // fraction charged when NOT using Shopify Payments
  staffAccounts: number;    // Infinity for Plus
  reports: "basic" | "standard" | "advanced" | "custom";
  badge?: string;
  blurb: string;
}

// Pricing reflects Shopify's public plan pricing.
// These are the annual-billing rates (the most common choice merchants make).
const PLANS: Plan[] = [
  {
    key: "basic",
    name: "Basic",
    monthly: 29,
    cardRate: 0.029,
    cardFixed: 0.3,
    transactionFee: 0.02,
    staffAccounts: 2,
    reports: "basic",
    blurb: "For solo merchants starting out",
  },
  {
    key: "shopify",
    name: "Shopify",
    monthly: 79,
    cardRate: 0.027,
    cardFixed: 0.3,
    transactionFee: 0.01,
    staffAccounts: 5,
    reports: "standard",
    badge: "Most popular",
    blurb: "For small teams scaling sales",
  },
  {
    key: "advanced",
    name: "Advanced",
    monthly: 299,
    cardRate: 0.025,
    cardFixed: 0.3,
    transactionFee: 0.005,
    staffAccounts: 15,
    reports: "advanced",
    blurb: "For growing teams that need reports",
  },
  {
    key: "plus",
    name: "Plus",
    monthly: 2300,
    cardRate: 0.0225,
    cardFixed: 0.3,
    transactionFee: 0.0015,
    staffAccounts: Infinity,
    reports: "custom",
    blurb: "For high-volume & enterprise brands",
  },
];

// ---------------------------------------------------------------------------
// Feature flags — each feature requires at least a given plan
// ---------------------------------------------------------------------------

type FeatureKey =
  | "advancedReports"
  | "calculatedShipping"
  | "b2b"
  | "markets"
  | "checkoutExtensibility"
  | "wholesaleChannel"
  | "expansionStores";

interface FeatureDef {
  key: FeatureKey;
  label: string;
  desc: string;
  minPlan: PlanKey;
}

const FEATURES: FeatureDef[] = [
  {
    key: "advancedReports",
    label: "Advanced reports & custom report builder",
    desc: "Create custom reports and analytics beyond standard dashboards",
    minPlan: "advanced",
  },
  {
    key: "calculatedShipping",
    label: "Third-party calculated shipping rates",
    desc: "Show real-time rates from carriers like UPS, FedEx, DHL at checkout",
    minPlan: "advanced",
  },
  {
    key: "b2b",
    label: "B2B / wholesale on the same store",
    desc: "Company profiles, price lists, and net terms. On every paid plan since April 2026, with caps on companies and price lists",
    minPlan: "basic",
  },
  {
    key: "markets",
    label: "Shopify Markets Pro (advanced international)",
    desc: "Localised pricing, duties & taxes, multi-domain international selling",
    minPlan: "plus",
  },
  {
    key: "checkoutExtensibility",
    label: "Full checkout customisation (UI extensions)",
    desc: "Customise checkout layout, branding & logic — requires Plus for full control",
    minPlan: "plus",
  },
  {
    key: "wholesaleChannel",
    label: "Dedicated wholesale channel",
    desc: "Separate storefront for wholesale buyers",
    minPlan: "plus",
  },
  {
    key: "expansionStores",
    label: "Expansion stores (up to 9 extra)",
    desc: "Multiple storefronts under one Plus contract for regions / brands",
    minPlan: "plus",
  },
];

const PLAN_ORDER: Record<PlanKey, number> = {
  basic: 0,
  shopify: 1,
  advanced: 2,
  plus: 3,
};

function meetsMinPlan(plan: PlanKey, minPlan: PlanKey): boolean {
  return PLAN_ORDER[plan] >= PLAN_ORDER[minPlan];
}

// ---------------------------------------------------------------------------
// Inputs
// ---------------------------------------------------------------------------

interface Inputs {
  monthlyRevenue: number;         // USD
  avgOrderValue: number;          // USD (used to compute txn count)
  useShopifyPayments: boolean;
  staffCount: number;
  featureFlags: Record<FeatureKey, boolean>;
}

const INITIAL_FEATURES = FEATURES.reduce(
  (acc, f) => ({ ...acc, [f.key]: false }),
  {} as Record<FeatureKey, boolean>
);

const INITIAL_INPUTS: Inputs = {
  monthlyRevenue: 25000,
  avgOrderValue: 80,
  useShopifyPayments: true,
  staffCount: 2,
  featureFlags: INITIAL_FEATURES,
};

// ---------------------------------------------------------------------------
// Cost calculation
// ---------------------------------------------------------------------------

interface PlanCost {
  planFee: number;
  cardFees: number;
  txnFees: number;         // Only > 0 when NOT using Shopify Payments
  total: number;
  meetsStaff: boolean;
  missingFeatures: FeatureDef[];
  eligible: boolean;
}

function computeCost(plan: Plan, inputs: Inputs): PlanCost {
  const txnCount =
    inputs.avgOrderValue > 0
      ? inputs.monthlyRevenue / inputs.avgOrderValue
      : 0;

  const cardFees =
    inputs.monthlyRevenue * plan.cardRate + txnCount * plan.cardFixed;

  const txnFees = inputs.useShopifyPayments
    ? 0
    : inputs.monthlyRevenue * plan.transactionFee;

  const planFee = plan.monthly;
  const total = planFee + cardFees + txnFees;

  const meetsStaff = inputs.staffCount <= plan.staffAccounts;

  const missingFeatures = FEATURES.filter(
    (f) => inputs.featureFlags[f.key] && !meetsMinPlan(plan.key, f.minPlan)
  );

  const eligible = meetsStaff && missingFeatures.length === 0;

  return { planFee, cardFees, txnFees, total, meetsStaff, missingFeatures, eligible };
}

function recommendPlan(
  inputs: Inputs,
  costs: Record<PlanKey, PlanCost>
): PlanKey {
  // Of the eligible plans, pick the one with the lowest total monthly cost.
  // If none are eligible (shouldn't happen — Plus covers everything), fall back
  // to Plus.
  const eligible = PLANS.filter((p) => costs[p.key].eligible);
  if (eligible.length === 0) return "plus";
  return eligible.reduce((best, p) =>
    costs[p.key].total < costs[best.key].total ? p : best
  ).key;
}

// ---------------------------------------------------------------------------
// Formatters
// ---------------------------------------------------------------------------

function fmtUSD(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function fmtUSDcents(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const labelClass = "block text-sm font-semibold text-gray-800";
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 font-semibold transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";

export default function PlanComparisonCalculator() {
  const [inputs, setInputs] = useState<Inputs>(INITIAL_INPUTS);
  const [tracked, setTracked] = useState(false);

  const costs = useMemo<Record<PlanKey, PlanCost>>(() => {
    return PLANS.reduce(
      (acc, p) => ({ ...acc, [p.key]: computeCost(p, inputs) }),
      {} as Record<PlanKey, PlanCost>
    );
  }, [inputs]);

  const recommended = useMemo(() => recommendPlan(inputs, costs), [inputs, costs]);

  // Transaction-fee savings vs Basic when NOT using Shopify Payments
  const txnFeeSavings = useMemo(() => {
    if (inputs.useShopifyPayments) return 0;
    return costs.basic.txnFees - costs[recommended].txnFees;
  }, [costs, recommended, inputs.useShopifyPayments]);

  function update<K extends keyof Inputs>(key: K, value: Inputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (!tracked) {
      setTracked(true);
      trackEvent("plan_calc_input");
    }
  }

  function toggleFeature(key: FeatureKey) {
    setInputs((prev) => ({
      ...prev,
      featureFlags: { ...prev.featureFlags, [key]: !prev.featureFlags[key] },
    }));
    if (!tracked) {
      setTracked(true);
      trackEvent("plan_calc_input");
    }
  }

  const recommendedPlan = PLANS.find((p) => p.key === recommended)!;
  const recommendedCost = costs[recommended];

  return (
    <div className="space-y-10">
      {/* -------- Inputs card -------- */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-gray-900">
          Tell us about your store
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          We&apos;ll compare all 4 Shopify plans side-by-side and recommend the
          most cost-effective one for you.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="revenue" className={labelClass}>
              Monthly revenue (USD)
            </label>
            <input
              id="revenue"
              type="number"
              inputMode="numeric"
              min={0}
              step={100}
              value={inputs.monthlyRevenue}
              onChange={(e) =>
                update("monthlyRevenue", Math.max(0, Number(e.target.value) || 0))
              }
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              Gross sales per month across all channels
            </p>
          </div>

          <div>
            <label htmlFor="aov" className={labelClass}>
              Average order value (USD)
            </label>
            <input
              id="aov"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={inputs.avgOrderValue}
              onChange={(e) =>
                update("avgOrderValue", Math.max(1, Number(e.target.value) || 1))
              }
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              Used to estimate transaction count (revenue ÷ AOV)
            </p>
          </div>

          <div>
            <label htmlFor="staff" className={labelClass}>
              Staff accounts needed
            </label>
            <input
              id="staff"
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              step={1}
              value={inputs.staffCount}
              onChange={(e) =>
                update("staffCount", Math.max(1, Number(e.target.value) || 1))
              }
              className={inputClass}
            />
            <p className="mt-1 text-xs text-gray-500">
              Basic: 2 · Shopify: 5 · Advanced: 15 · Plus: unlimited
            </p>
          </div>

          <div>
            <label className={labelClass}>Payment processor</label>
            <div className="mt-1 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => update("useShopifyPayments", true)}
                className={`rounded-lg border-2 px-3 py-3 text-sm font-semibold transition-colors ${
                  inputs.useShopifyPayments
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                Shopify Payments
              </button>
              <button
                type="button"
                onClick={() => update("useShopifyPayments", false)}
                className={`rounded-lg border-2 px-3 py-3 text-sm font-semibold transition-colors ${
                  !inputs.useShopifyPayments
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                Third-party gateway
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Shopify adds a transaction fee (0.15%–2%) when not using Shopify
              Payments
            </p>
          </div>
        </div>

        {/* Feature checklist */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-800">
            Features you need
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Tick the features your store requires — we&apos;ll mark any plan
            that doesn&apos;t include them.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => {
              const checked = inputs.featureFlags[f.key];
              return (
                <label
                  key={f.key}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition-colors ${
                    checked
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFeature(f.key)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {f.label}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600">{f.desc}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* -------- Recommendation card -------- */}
      <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-green-700">
          Recommended plan
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-3xl font-bold text-gray-900">
            Shopify {recommendedPlan.name}
          </h2>
          <p className="text-lg font-semibold text-gray-700">
            {fmtUSD(recommendedCost.total)}
            <span className="text-sm font-normal text-gray-500">
              {" "}/month total
            </span>
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-700">{recommendedPlan.blurb}</p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4">
            <dt className="text-xs font-medium text-gray-500">Plan fee</dt>
            <dd className="mt-1 text-lg font-bold text-gray-900">
              {fmtUSD(recommendedCost.planFee)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </dd>
          </div>
          <div className="rounded-lg bg-white p-4">
            <dt className="text-xs font-medium text-gray-500">
              Est. card processing
            </dt>
            <dd className="mt-1 text-lg font-bold text-gray-900">
              {fmtUSD(recommendedCost.cardFees)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </dd>
          </div>
          <div className="rounded-lg bg-white p-4">
            <dt className="text-xs font-medium text-gray-500">
              {inputs.useShopifyPayments
                ? "Shopify transaction fee"
                : "Third-party transaction fee"}
            </dt>
            <dd className="mt-1 text-lg font-bold text-gray-900">
              {fmtUSD(recommendedCost.txnFees)}
              <span className="text-xs font-normal text-gray-500">/mo</span>
            </dd>
          </div>
        </dl>

        {!inputs.useShopifyPayments && txnFeeSavings > 0 && (
          <p className="mt-4 rounded-lg bg-white px-4 py-3 text-sm text-gray-700">
            <span className="font-semibold text-green-700">
              {fmtUSD(txnFeeSavings)}/mo saved in transaction fees
            </span>{" "}
            by upgrading to {recommendedPlan.name} vs Basic (because of the
            lower third-party gateway fee).
          </p>
        )}
      </div>

      {/* -------- Comparison table -------- */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-gray-900">All plans compared</h2>
        <p className="mt-1 text-sm text-gray-600">
          Based on your inputs ({fmtUSD(inputs.monthlyRevenue)} monthly revenue
          · {fmtUSD(inputs.avgOrderValue)} AOV ·{" "}
          {inputs.useShopifyPayments
            ? "Shopify Payments"
            : "Third-party gateway"}
          ).
        </p>

        <p className="mt-2 text-xs text-gray-500">
          Estimates use US list prices with annual billing and standard online
          card rates. Prices, rates, and features differ by country and change
          over time, so confirm them on the Shopify pricing page before you
          decide.
        </p>

        {/* Mobile: stacked cards */}
        <div className="mt-6 space-y-4 sm:hidden">
          {PLANS.map((p) => {
            const c = costs[p.key];
            const isRecommended = p.key === recommended;
            return (
              <div
                key={p.key}
                className={`rounded-xl border-2 p-4 ${
                  isRecommended
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">Shopify {p.name}</p>
                    <p className="text-xs text-gray-500">{p.blurb}</p>
                  </div>
                  {isRecommended && (
                    <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      Pick
                    </span>
                  )}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <dt className="text-gray-500">Plan</dt>
                    <dd className="font-semibold text-gray-900">
                      {fmtUSD(c.planFee)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Card processing</dt>
                    <dd className="font-semibold text-gray-900">
                      {fmtUSD(c.cardFees)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Txn fee</dt>
                    <dd className="font-semibold text-gray-900">
                      {fmtUSD(c.txnFees)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Total / mo</dt>
                    <dd className="font-bold text-gray-900">
                      {fmtUSD(c.total)}
                    </dd>
                  </div>
                </dl>
                {(!c.meetsStaff || c.missingFeatures.length > 0) && (
                  <ul className="mt-3 space-y-1 text-xs text-red-700">
                    {!c.meetsStaff && (
                      <li>
                        · Only {p.staffAccounts === Infinity
                          ? "unlimited"
                          : p.staffAccounts}{" "}
                        staff accounts (you need {inputs.staffCount})
                      </li>
                    )}
                    {c.missingFeatures.map((f) => (
                      <li key={f.key}>· Missing: {f.label}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: table */}
        <div className="mt-6 hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider text-gray-500">
                <th className="py-3 pr-4 font-semibold">Plan</th>
                <th className="py-3 pr-4 text-right font-semibold">
                  Plan fee
                </th>
                <th className="py-3 pr-4 text-right font-semibold">
                  Card processing
                </th>
                <th className="py-3 pr-4 text-right font-semibold">
                  Txn fee
                </th>
                <th className="py-3 pr-4 text-right font-semibold">
                  Total / mo
                </th>
                <th className="py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p) => {
                const c = costs[p.key];
                const isRecommended = p.key === recommended;
                return (
                  <tr
                    key={p.key}
                    className={`border-b last:border-0 ${
                      isRecommended ? "bg-green-50" : ""
                    }`}
                  >
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="font-bold text-gray-900">
                            Shopify {p.name}
                          </p>
                          <p className="text-xs text-gray-500">{p.blurb}</p>
                        </div>
                        {isRecommended && (
                          <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                            Pick
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-right text-gray-900">
                      {fmtUSD(c.planFee)}
                    </td>
                    <td className="py-4 pr-4 text-right text-gray-900">
                      {fmtUSD(c.cardFees)}
                      <p className="text-[10px] text-gray-500">
                        {(p.cardRate * 100).toFixed(2)}% +{" "}
                        {fmtUSDcents(p.cardFixed)}
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-right text-gray-900">
                      {fmtUSD(c.txnFees)}
                      <p className="text-[10px] text-gray-500">
                        {(p.transactionFee * 100).toFixed(2)}%
                      </p>
                    </td>
                    <td className="py-4 pr-4 text-right font-bold text-gray-900">
                      {fmtUSD(c.total)}
                    </td>
                    <td className="py-4">
                      {c.eligible ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          ✓ Fits
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                          ✕{" "}
                          {!c.meetsStaff
                            ? `${p.staffAccounts === Infinity ? "∞" : p.staffAccounts} staff max`
                            : `missing ${c.missingFeatures.length} feature${c.missingFeatures.length === 1 ? "" : "s"}`}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- CTA -------- */}
      <div className="rounded-2xl border bg-white p-6 text-center shadow-sm sm:p-8">
        <h3 className="text-xl font-bold text-gray-900">
          Need help upgrading your plan?
        </h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
          An experienced Shopify agency can handle the upgrade, migrate
          settings, and optimise checkout &mdash; especially important when
          moving to Plus.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/get-matched"
            onClick={() =>
              trackEvent("plan_calc_cta", { plan: recommended })
            }
            className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Get matched with an agency &rarr;
          </Link>
          <Link
            href={
              recommended === "plus"
                ? "/agencies?specialization=Shopify+Plus"
                : "/agencies"
            }
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300"
          >
            Browse{" "}
            {recommended === "plus" ? "Plus partners" : "Shopify agencies"}
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500">
        Pricing reflects Shopify&apos;s public plan rates (annual billing).
        Shopify Plus pricing varies by contract &mdash; $2,300/mo is the
        starting price. Card processing rates are for online transactions in
        the US; rates differ by region. This calculator is an estimate; confirm
        pricing with Shopify before committing.
      </p>
    </div>
  );
}
