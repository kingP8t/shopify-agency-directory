"use client";

import { useEffect, useRef, useActionState } from "react";
import {
  updateAgencyOwnerAction,
  type OwnerUpdateState,
} from "@/app/actions/claim";
import type { Agency } from "@/lib/supabase";

const TEAM_SIZES = ["1-10", "11-50", "50-100", "100-200", "200+"];
const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
];

interface OwnerAgencyFormProps {
  agency: Agency;
  slug: string;
}

const initialState: OwnerUpdateState = { success: false };

export default function OwnerAgencyForm({ agency, slug }: OwnerAgencyFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateAgencyOwnerAction,
    initialState
  );

  // Auto-dismiss success banner after 4 seconds
  const successRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!state.success) return;
    const timer = setTimeout(() => {
      successRef.current?.classList.add("hidden");
    }, 4000);
    return () => clearTimeout(timer);
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="slug" value={slug} />

      {state.success && (
        <p
          ref={successRef}
          role="status"
          className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          Changes saved successfully.
        </p>
      )}
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      {/* Short description */}
      <div>
        <label htmlFor="owner-description" className="block text-sm font-medium text-gray-700">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="owner-description"
          name="description"
          required
          rows={2}
          maxLength={500}
          defaultValue={agency.description}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Long description */}
      <div>
        <label htmlFor="owner-long-description" className="block text-sm font-medium text-gray-700">
          Full Description
        </label>
        <textarea
          id="owner-long-description"
          name="long_description"
          rows={6}
          maxLength={5000}
          defaultValue={agency.long_description ?? ""}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Location + Country */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="owner-location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            id="owner-location"
            name="location"
            defaultValue={agency.location ?? ""}
            placeholder="New York, NY"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="owner-country" className="block text-sm font-medium text-gray-700">
            Country Code
          </label>
          <input
            id="owner-country"
            name="country"
            defaultValue={agency.country ?? ""}
            placeholder="US"
            maxLength={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Website + Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="owner-website" className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            id="owner-website"
            name="website"
            type="url"
            defaultValue={agency.website ?? ""}
            placeholder="https://youragency.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="owner-phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="owner-phone"
            name="phone"
            type="tel"
            defaultValue={agency.phone ?? ""}
            placeholder="+1 (555) 000-0000"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Logo URL */}
      <div>
        <label htmlFor="owner-logo-url" className="block text-sm font-medium text-gray-700">
          Logo URL
        </label>
        <input
          id="owner-logo-url"
          name="logo_url"
          type="url"
          defaultValue={agency.logo_url ?? ""}
          placeholder="https://youragency.com/logo.png"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <p className="mt-1 text-xs text-gray-400">Direct link to your logo image (PNG, JPG, or SVG).</p>
      </div>

      {/* Founded + Team Size + Budget */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="owner-founded" className="block text-sm font-medium text-gray-700">
            Founded
          </label>
          <input
            id="owner-founded"
            name="founded"
            type="number"
            min={1990}
            max={new Date().getFullYear()}
            defaultValue={agency.founded ?? ""}
            placeholder="2018"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label htmlFor="owner-team-size" className="block text-sm font-medium text-gray-700">
            Team Size
          </label>
          <select
            id="owner-team-size"
            name="team_size"
            defaultValue={agency.team_size ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select...</option>
            {TEAM_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="owner-budget-range" className="block text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <select
            id="owner-budget-range"
            name="budget_range"
            defaultValue={agency.budget_range ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
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

      {/* Specializations */}
      <div>
        <label htmlFor="owner-specializations" className="block text-sm font-medium text-gray-700">
          Specializations{" "}
          <span className="font-normal text-gray-400">(comma-separated)</span>
        </label>
        <input
          id="owner-specializations"
          name="specializations"
          defaultValue={agency.specializations?.join(", ") ?? ""}
          placeholder="Shopify Plus, Theme Development, CRO"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="owner-tags" className="block text-sm font-medium text-gray-700">
          Tags{" "}
          <span className="font-normal text-gray-400">(comma-separated)</span>
        </label>
        <input
          id="owner-tags"
          name="tags"
          defaultValue={agency.tags?.join(", ") ?? ""}
          placeholder="shopify, dtc, ecommerce"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
