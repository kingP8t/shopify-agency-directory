"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitLeadAction } from "@/app/actions/leads";
import { trackEvent } from "@/lib/analytics";

const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
  "Not sure yet",
];

const PROJECT_TYPES = [
  "New store build",
  "Redesign / theme upgrade",
  "Platform migration",
  "Shopify Plus upgrade",
  "CRO / conversion optimisation",
  "App development",
  "SEO",
  "Ongoing support / retainer",
  "Other",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1\u20133 months",
  "3\u20136 months",
  "Flexible / not urgent",
];

interface LeadFormProps {
  agencyId?: string;
  agencyName?: string;
}

const initialState = { success: false, error: undefined };

// Fix #1: text-gray-900 declared directly on the element via Tailwind utility
// so the colour is always present regardless of CSS cascade resolution.
const inputClass =
  "mt-1 w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 font-semibold transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";

const selectClass =
  "mt-1 w-full appearance-none rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base text-gray-900 font-semibold transition-colors focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100";

const labelClass = "block text-sm font-semibold text-gray-800";

export default function LeadForm({ agencyId, agencyName }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitLeadAction,
    initialState
  );
  const tracked = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && !tracked.current) {
      tracked.current = true;
      trackEvent("lead_submit", {
        ...(agencyName ? { agency_name: agencyName } : {}),
      });
    }
  }, [state.success, agencyName]);

  if (state.success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {agencyName ? "Request sent!" : "Brief received \u2014 we're on it."}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {agencyName
            ? `Your enquiry has been forwarded to ${agencyName}. They'll be in touch shortly.`
            : "We'll review your brief and send you 3 hand-picked agency recommendations within 24 hours."}
        </p>
        {!agencyName && (
          <ul className="mt-5 space-y-2 text-left text-sm text-gray-600">
            {[
              "Check your inbox \u2014 we'll email you to confirm",
              "We review your brief and match it against 900+ agencies",
              "You receive 3 curated introductions within 24 hours",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-xs font-bold text-green-800">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="lead-form space-y-6">
        {/* Hidden agency_id if on an agency page */}
        {agencyId && (
          <input type="hidden" name="agency_id" value={agencyId} />
        )}
        {/* Honeypot */}
        <input
          type="text"
          name="website_url"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: "none" }}
        />

        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@company.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Company + Store URL */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelClass}>
              Company / Store Name <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              placeholder="My Shopify Store"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="store_url" className={labelClass}>
              Current Store URL{" "}
              <span className="text-xs font-normal text-gray-400">
                (if you have one)
              </span>
            </label>
            <input
              id="store_url"
              name="store_url"
              type="text"
              placeholder="https://mystore.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* Project Type + Budget */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="project_type" className={labelClass}>
              Project Type <span className="text-red-500">*</span>
            </label>
            <select
              id="project_type"
              name="project_type"
              required
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled>
                Select project type...
              </option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className={labelClass}>
              Project Budget <span className="text-red-500">*</span>
            </label>
            <select
              id="budget"
              name="budget"
              required
              defaultValue=""
              className={selectClass}
            >
              <option value="" disabled>
                Select a budget range...
              </option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="timeline" className={labelClass}>
            When do you need this done? <span className="text-red-500">*</span>
          </label>
          <select
            id="timeline"
            name="timeline"
            required
            defaultValue=""
            className={selectClass}
          >
            <option value="" disabled>
              Select a timeline...
            </option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Describe your project <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building or improving? Any specific features, integrations, or challenges we should know about?"
            className={inputClass}
          />
        </div>

        {state.error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-green-600 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-green-700 disabled:opacity-60"
        >
          {isPending
            ? "Sending..."
            : agencyName
              ? `Contact ${agencyName}`
              : "Get My Free Matches \u2192"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Free service · Takes 2 minutes · We never share your details without
          permission
        </p>
    </form>
  );
}
