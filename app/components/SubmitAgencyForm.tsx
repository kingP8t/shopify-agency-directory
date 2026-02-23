"use client";

import { useActionState } from "react";
import { submitAgencyAction } from "@/app/actions/submit-agency";

const SPECIALIZATION_OPTIONS = [
  "Shopify Plus",
  "Theme Development",
  "Migrations",
  "CRO",
  "Headless",
  "App Development",
  "SEO",
  "Marketing",
  "UX Design",
  "B2B Commerce",
  "Internationalisation",
  "Strategy",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
];

const TEAM_SIZES = ["1-10", "11-50", "50-100", "100-200", "200+"];

const initialState = { success: false, error: undefined };

export default function SubmitAgencyForm() {
  const [state, formAction, isPending] = useActionState(
    submitAgencyAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <div className="text-5xl">🎉</div>
        <h3 className="mt-4 text-xl font-bold text-gray-900">
          Submission Received!
        </h3>
        <p className="mt-2 text-gray-600">
          Thanks for submitting your agency. Our team will review your listing
          within <strong>1–2 business days</strong> and publish it to the
          directory.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          We&apos;ll contact you at your email address once it&apos;s live.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
        >
          Back to Homepage
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Honeypot — hidden from real users, bots fill this in and get silently blocked */}
      <input
        type="text"
        name="website_url"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
      />
      {/* Agency basics */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Agency Details</h2>
        <div className="mt-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agency Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              required
              placeholder="e.g. Acme Shopify Agency"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              required
              rows={3}
              minLength={50}
              placeholder="Describe your agency in 1-3 sentences. What makes you different? Who do you serve? (min. 50 characters)"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website URL
            </label>
            <input
              name="website"
              type="url"
              placeholder="https://youragency.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              placeholder="e.g. London, UK or New York, NY"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Services & Size</h2>
        <div className="mt-4 space-y-4">
          {/* Specializations */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Specializations{" "}
              <span className="font-normal text-gray-400">
                (select all that apply)
              </span>
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SPECIALIZATION_OPTIONS.map((spec) => (
                <label
                  key={spec}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm has-[:checked]:border-green-500 has-[:checked]:bg-green-50 has-[:checked]:text-green-700"
                >
                  <input
                    type="checkbox"
                    name="specialization_check"
                    value={spec}
                    className="hidden"
                    onChange={(e) => {
                      // Update hidden comma-separated field
                      const form = e.target.form!;
                      const checked = Array.from(
                        form.querySelectorAll(
                          'input[name="specialization_check"]:checked'
                        )
                      ).map((el) => (el as HTMLInputElement).value);
                      (
                        form.querySelector(
                          'input[name="specializations"]'
                        ) as HTMLInputElement
                      ).value = checked.join(",");
                    }}
                  />
                  {spec}
                </label>
              ))}
            </div>
            <input type="hidden" name="specializations" defaultValue="" />
          </div>

          {/* Team size + Budget */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Team Size
              </label>
              <select
                name="team_size"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select...</option>
                {TEAM_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} people
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Typical Project Budget
              </label>
              <select
                name="budget_range"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select...</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-gray-900">Contact Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Used to notify you when your listing goes live. Not shown publicly.
        </p>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="hello@youragency.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Error */}
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isPending ? "Submitting..." : "Submit Your Agency →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        All submissions are reviewed by our team before going live. We aim to
        review within 1–2 business days.
      </p>
    </form>
  );
}
