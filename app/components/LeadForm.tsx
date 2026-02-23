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
        <div className="text-4xl">✅</div>
        <h3 className="mt-3 text-lg font-semibold text-gray-900">
          Request Sent!
        </h3>
        <p className="mt-2 text-gray-600">
          {agencyName
            ? `We've forwarded your request to ${agencyName}. They'll be in touch shortly.`
            : "We've received your request and will match you with the right agency shortly."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden agency_id if on an agency page */}
      {agencyId && (
        <input type="hidden" name="agency_id" value={agencyId} />
      )}
      {/* Honeypot — hidden from real users, bots fill this in and get silently blocked */}
      <input
        type="text"
        name="website_url"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company / Store Name
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="My Shopify Store"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-gray-700"
        >
          Project Budget
        </label>
        <select
          id="budget"
          name="budget"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        >
          <option value="">Select a budget range...</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Tell us about your project <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What do you need help with? What's your timeline? Any specific requirements?"
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
        className="w-full rounded-lg bg-green-600 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isPending ? "Sending..." : agencyName ? `Contact ${agencyName}` : "Get Matched"}
      </button>

      <p className="text-center text-xs text-gray-400">
        We&apos;ll only use your info to connect you with the right agency.
      </p>
    </form>
  );
}
