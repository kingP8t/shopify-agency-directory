"use client";

import { useActionState, useState } from "react";
import { submitReviewAction } from "@/app/actions/reviews";

interface ReviewFormProps {
  agencyId: string;
  agencyName: string;
}

const initialState = { success: false, error: undefined };

export default function ReviewForm({ agencyId, agencyName }: ReviewFormProps) {
  const [state, formAction, isPending] = useActionState(submitReviewAction, initialState);
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-3xl">⭐</div>
        <p className="mt-2 font-semibold text-gray-900">Thanks for your review!</p>
        <p className="mt-1 text-sm text-gray-500">
          Your review of {agencyName} has been submitted and will appear after approval.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="agency_id" value={agencyId} />
      <input type="hidden" name="rating" value={selected} />

      {/* Star picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setSelected(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="text-3xl transition-transform hover:scale-110 focus:outline-none"
              aria-label={`${star} star`}
            >
              <span className={(hovered || selected) >= star ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            </button>
          ))}
        </div>
        {selected > 0 && (
          <p className="mt-1 text-xs text-gray-500">
            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][selected]}
          </p>
        )}
      </div>

      {/* Reviewer name */}
      <div>
        <label htmlFor="reviewer_name" className="block text-sm font-medium text-gray-700">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="reviewer_name"
          name="reviewer_name"
          type="text"
          required
          placeholder="Jane Smith"
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {/* Review body */}
      <div>
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={4}
          placeholder={`Share your experience working with ${agencyName}...`}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || selected === 0}
        className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>
      <p className="text-center text-xs text-gray-400">
        Reviews are approved before going live.
      </p>
    </form>
  );
}
