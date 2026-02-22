"use client";

import { useActionState } from "react";
import { upsertAgencyAction } from "@/app/actions/agencies";
import type { Agency } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TEAM_SIZES = ["1-10", "11-50", "50-100", "100-200", "200+"];
const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 - $25,000",
  "$25,000 - $100,000",
  "$100,000+",
];

interface AgencyFormProps {
  agency?: Agency;
  onClose?: () => void;
}

const initialState = { success: false, error: undefined };

export default function AgencyForm({ agency, onClose }: AgencyFormProps) {
  const [state, formAction, isPending] = useActionState(
    upsertAgencyAction,
    initialState
  );
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
      onClose?.();
    }
  }, [state.success, router, onClose]);

  return (
    <form action={formAction} className="space-y-5">
      {agency?.id && <input type="hidden" name="id" value={agency.id} />}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Agency Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          required
          defaultValue={agency?.name}
          placeholder="e.g. Elite Shopify Partners"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Short description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={2}
          defaultValue={agency?.description}
          placeholder="One or two sentences describing the agency..."
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Long description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Description
        </label>
        <textarea
          name="long_description"
          rows={5}
          defaultValue={agency?.long_description ?? ""}
          placeholder="Detailed about section shown on the agency profile page..."
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Location + Country */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            name="location"
            defaultValue={agency?.location ?? ""}
            placeholder="New York, NY"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country Code
          </label>
          <input
            name="country"
            defaultValue={agency?.country ?? ""}
            placeholder="US"
            maxLength={2}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Website + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Website
          </label>
          <input
            name="website"
            type="url"
            defaultValue={agency?.website ?? ""}
            placeholder="https://agency.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            name="email"
            type="email"
            defaultValue={agency?.email ?? ""}
            placeholder="hello@agency.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
      </div>

      {/* Founded + Team Size + Budget */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Founded (year)
          </label>
          <input
            name="founded"
            type="number"
            min={1990}
            max={new Date().getFullYear()}
            defaultValue={agency?.founded ?? ""}
            placeholder="2015"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Team Size
          </label>
          <select
            name="team_size"
            defaultValue={agency?.team_size ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select...</option>
            {TEAM_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <select
            name="budget_range"
            defaultValue={agency?.budget_range ?? ""}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select...</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Specializations */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specializations{" "}
          <span className="font-normal text-gray-400">(comma-separated)</span>
        </label>
        <input
          name="specializations"
          defaultValue={agency?.specializations?.join(", ") ?? ""}
          placeholder="Shopify Plus, Theme Development, CRO, Migrations"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tags{" "}
          <span className="font-normal text-gray-400">(comma-separated)</span>
        </label>
        <input
          name="tags"
          defaultValue={agency?.tags?.join(", ") ?? ""}
          placeholder="shopify, dtc, ecommerce"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Rating + Status + Featured */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating (1–5)
          </label>
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            step={0.1}
            defaultValue={agency?.rating ?? ""}
            placeholder="4.8"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            defaultValue={agency?.status ?? "draft"}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured
          </label>
          <select
            name="featured"
            defaultValue={agency?.featured ? "true" : "false"}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
        >
          {isPending
            ? "Saving..."
            : agency
            ? "Update Agency"
            : "Add Agency"}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
