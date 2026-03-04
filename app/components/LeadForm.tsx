"use client";

import { useActionState } from "react";
import { submitLeadAction } from "@/app/actions/leads";

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
  "1–3 months",
  "3–6 months",
  "Flexible / not urgent",
];

interface LeadFormProps {
  agencyId?: string;
  agencyName?: string;
}

const initialState = { success: false, error: undefined };

export default function LeadForm({ agencyId, agencyName }: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitLeadAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">
          {agencyName ? "Request sent!" : "Brief received — we're on it."}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          {agencyName
            ? `Your enquiry has been forwarded to ${agencyName}. They'll be in touch shortly.`
            : "We'll review your brief and send you 3 hand-picked agency recommendations within 24 hours."}
        </p>
        {!agencyName && (
          <ul className="mt-5 space-y-2 text-left text-sm text-gray-600">
            {[
              "Check your inbox — we'll email you to confirm",
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
    <form action={formAction} className="space-y-5">
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name" name="name" type="text" required
            placeholder="Jane Smith"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email" name="email" type="email" required
            placeholder="jane@company.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Company + Store URL */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700">
            Company / Store Name <span className="text-red-500">*</span>
          </label>
          <input
            id="company" name="company" type="text" required
            placeholder="My Shopify Store"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="store_url" className="block text-sm font-medium text-gray-700">
            Current Store URL
            <span className="ml-1 text-xs font-normal text-gray-400">(if you have one)</span>
          </label>
          <input
            id="store_url" name="store_url" type="url"
            placeholder="https://mystore.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Project Type + Budget */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="project_type" className="block text-sm font-medium text-gray-700">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="project_type" name="project_type" required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select project type...</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
            Project Budget <span className="text-red-500">*</span>
          </label>
          <select
            id="budget" name="budget" required
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select a budget range...</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
          When do you need this done? <span className="text-red-500">*</span>
        </label>
        <select
          id="timeline" name="timeline" required
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <option value="">Select a timeline...</option>
          {TIMELINE_OPTIONS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Describe your project <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message" name="message" required rows={4}
          placeholder="What are you building or improving? Any specific features, integrations, or challenges we should know about?"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
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
        className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isPending
          ? "Sending..."
          : agencyName
          ? `Contact ${agencyName}`
          : "Get My Free Matches →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        Free service · Takes 2 minutes · We never share your details without permission
      </p>
    </form>
  );
}
