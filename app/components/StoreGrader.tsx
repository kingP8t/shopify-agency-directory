"use client";

import { useActionState } from "react";
import Link from "next/link";
import { gradeStore, type GraderState, type CheckCategory } from "@/app/actions/grader";

const initialState: GraderState = { ok: false };

const CATEGORY_ORDER: CheckCategory[] = [
  "Performance",
  "SEO",
  "Mobile",
  "Apps",
  "Structured Data",
  "Security",
];

function scoreColor(score: number): { bg: string; text: string; ring: string } {
  if (score >= 90) return { bg: "bg-green-50", text: "text-green-700", ring: "ring-green-200" };
  if (score >= 80) return { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" };
  if (score >= 70) return { bg: "bg-yellow-50", text: "text-yellow-700", ring: "ring-yellow-200" };
  if (score >= 60) return { bg: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" };
  return { bg: "bg-red-50", text: "text-red-700", ring: "ring-red-200" };
}

function statusBadge(status: "pass" | "warn" | "fail" | "info") {
  if (status === "pass")
    return (
      <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  if (status === "warn")
    return (
      <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86l-8.4 14.54A1.5 1.5 0 003.2 20.7h16.6a1.5 1.5 0 001.31-2.3L13.7 3.86a1.5 1.5 0 00-2.6 0z" />
        </svg>
      </span>
    );
  if (status === "fail")
    return (
      <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700">
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  return (
    <span className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
  );
}

export default function StoreGrader() {
  const [state, formAction, pending] = useActionState(gradeStore, initialState);

  return (
    <div className="space-y-8">
      {/* Input form */}
      <form
        action={formAction}
        className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
      >
        <label htmlFor="url" className="block text-sm font-semibold text-gray-900">
          Enter a Shopify store URL
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Example: yourstore.com or https://yourstore.com
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            id="url"
            name="url"
            type="text"
            required
            autoComplete="url"
            placeholder="yourstore.com"
            disabled={pending}
            className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                Grading…
              </>
            ) : (
              "Grade my store"
            )}
          </button>
        </div>
        {!state.ok && state.error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        )}
        <p className="mt-4 text-xs text-gray-500">
          We audit your homepage HTML and add a Google Lighthouse test when PageSpeed is available, which can take up to 40 seconds. We do not store your URL or the report. The URL is sent to Google PageSpeed Insights for the Lighthouse test.
        </p>
      </form>

      {/* Report */}
      {state.ok && state.report && (
        <div className="space-y-6">
          {/* Headline score */}
          <div className={`rounded-2xl border bg-white p-6 shadow-sm sm:p-8`}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Audit report
                </p>
                <h2 className="mt-1 break-all text-xl font-bold text-gray-900 sm:text-2xl">
                  {state.report.finalUrl}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{state.report.summary}</p>
                {state.report.isShopify && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Shopify store detected
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-24 w-24 flex-col items-center justify-center rounded-full ${scoreColor(state.report.overallScore).bg} ring-4 ${scoreColor(state.report.overallScore).ring}`}
                >
                  <span className={`text-3xl font-bold ${scoreColor(state.report.overallScore).text}`}>
                    {state.report.grade}
                  </span>
                  <span className={`text-xs font-semibold ${scoreColor(state.report.overallScore).text}`}>
                    {state.report.overallScore}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Category scores */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {CATEGORY_ORDER.map((cat) => {
                const score = state.report!.categoryScores[cat];
                const c = scoreColor(score);
                return (
                  <div
                    key={cat}
                    className={`rounded-xl ${c.bg} px-3 py-3 text-center`}
                  >
                    <p className={`text-xs font-medium ${c.text}`}>{cat}</p>
                    <p className={`mt-0.5 text-lg font-bold ${c.text}`}>{score}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lighthouse scores — real Google PageSpeed data */}
          {state.report.lighthouse && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Google Lighthouse scores
                    <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                      Live
                    </span>
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Real mobile audit from Google PageSpeed Insights
                  </p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <LighthouseScoreBox
                  label="Performance"
                  score={state.report.lighthouse.performance}
                />
                <LighthouseScoreBox
                  label="Accessibility"
                  score={state.report.lighthouse.accessibility}
                />
                <LighthouseScoreBox
                  label="Best Practices"
                  score={state.report.lighthouse.bestPractices}
                />
                <LighthouseScoreBox
                  label="SEO"
                  score={state.report.lighthouse.seo}
                />
              </div>
              {/* Core Web Vitals */}
              {(state.report.lighthouse.lcp ||
                state.report.lighthouse.cls ||
                state.report.lighthouse.fcp ||
                state.report.lighthouse.tbt) && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {state.report.lighthouse.lcp && (
                    <CwvBox label="LCP" value={state.report.lighthouse.lcp} hint="Largest Contentful Paint" />
                  )}
                  {state.report.lighthouse.cls && (
                    <CwvBox label="CLS" value={state.report.lighthouse.cls} hint="Cumulative Layout Shift" />
                  )}
                  {state.report.lighthouse.fcp && (
                    <CwvBox label="FCP" value={state.report.lighthouse.fcp} hint="First Contentful Paint" />
                  )}
                  {state.report.lighthouse.tbt && (
                    <CwvBox label="TBT" value={state.report.lighthouse.tbt} hint="Total Blocking Time" />
                  )}
                </div>
              )}
            </div>
          )}

          {state.report.lighthouseError && !state.report.lighthouse && (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              Note: Live Lighthouse audit unavailable ({state.report.lighthouseError}). Showing heuristic scores from HTML analysis only.
            </div>
          )}

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricBox label="Response time" value={`${state.report.metrics.responseTimeMs}ms`} />
            <MetricBox label="HTML size" value={`${state.report.metrics.htmlSizeKB} KB`} />
            <MetricBox label="Scripts" value={state.report.metrics.scriptCount.toString()} />
            <MetricBox
              label="3rd-party apps"
              value={state.report.metrics.thirdPartyAppDomains.length.toString()}
            />
          </div>

          {/* Per-category checks */}
          <div className="space-y-4">
            {CATEGORY_ORDER.map((cat) => {
              const items = state.report!.checks.filter((c) => c.category === cat);
              if (items.length === 0) return null;
              const score = state.report!.categoryScores[cat];
              const sc = scoreColor(score);
              return (
                <div key={cat} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b px-5 py-4">
                    <h3 className="text-sm font-semibold text-gray-900">{cat}</h3>
                    <span className={`rounded-full ${sc.bg} px-2.5 py-0.5 text-xs font-semibold ${sc.text}`}>
                      {score}/100
                    </span>
                  </div>
                  <ul className="divide-y">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-3 px-5 py-4">
                        {statusBadge(item.status)}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="mt-0.5 text-sm text-gray-600">{item.message}</p>
                          {item.detail && (
                            <p className="mt-1 break-all rounded bg-gray-50 px-2 py-1 font-mono text-xs text-gray-600">
                              {item.detail}
                            </p>
                          )}
                        </div>
                        {item.impact && (
                          <span
                            className={`h-fit whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                              item.impact === "high"
                                ? "bg-red-50 text-red-700"
                                : item.impact === "med"
                                  ? "bg-yellow-50 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.impact} impact
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900">
              Want an agency to fix these issues for you?
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Get matched with 3 vetted Shopify agencies that specialise in
              performance optimisation, SEO, and app bloat audits —
              {" "}
              {state.report.metrics.thirdPartyAppDomains.length > 8
                ? `your store currently loads ${state.report.metrics.thirdPartyAppDomains.length} third-party script domains, which typically costs 1–3s of load time.`
                : state.report.metrics.responseTimeMs > 1500
                  ? `your server response of ${state.report.metrics.responseTimeMs}ms is likely hurting conversion.`
                  : `an expert audit usually uncovers another 10–20 points of score improvement.`}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/get-matched"
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                Get Matched — Free
              </Link>
              <Link
                href="/agencies?specialization=Performance+Optimization"
                className="inline-flex items-center justify-center rounded-lg border border-green-300 bg-white px-6 py-3 text-sm font-semibold text-green-700 hover:border-green-500"
              >
                Browse Performance Specialists
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}

function LighthouseScoreBox({ label, score }: { label: string; score: number | null }) {
  if (score === null) {
    return (
      <div className="rounded-xl border bg-gray-50 p-4 text-center">
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-500">—</p>
      </div>
    );
  }
  const color =
    score >= 90
      ? "text-green-700 bg-green-50 border-green-200"
      : score >= 50
        ? "text-yellow-700 bg-yellow-50 border-yellow-200"
        : "text-red-700 bg-red-50 border-red-200";
  return (
    <div className={`rounded-xl border p-4 text-center ${color}`}>
      <p className="text-xs font-medium opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{score}</p>
    </div>
  );
}

function CwvBox({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500" title={hint}>
        {label}
      </p>
      <p className="mt-0.5 text-base font-bold text-gray-900">{value}</p>
      <p className="mt-0.5 text-[10px] text-gray-500">{hint}</p>
    </div>
  );
}
