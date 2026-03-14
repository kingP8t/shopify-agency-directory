"use client";

import { useActionState, useEffect, useRef } from "react";
import { requestClaimAction, type ClaimState } from "@/app/actions/claim";
import { trackEvent } from "@/lib/analytics";

interface ClaimFormProps {
  slug: string;
  agencyName: string;
}

const initialState: ClaimState = { success: false };

export default function ClaimForm({ slug, agencyName }: ClaimFormProps) {
  const [state, formAction, isPending] = useActionState(
    requestClaimAction,
    initialState
  );
  const tracked = useRef(false);

  useEffect(() => {
    if (state.success && !tracked.current) {
      tracked.current = true;
      trackEvent("claim_request", { agency_slug: slug });
    }
  }, [state.success, slug]);

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-4xl">📧</div>
        <p className="mt-3 font-semibold text-gray-900">Check your inbox</p>
        <p className="mt-2 text-sm text-gray-600">
          We sent a verification link to your email. Click it to verify your
          ownership of <strong>{agencyName}</strong>.
        </p>
        <p className="mt-2 text-xs text-gray-400">The link expires in 24 hours.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <div>
        <label
          htmlFor="claim-email"
          className="block text-sm font-medium text-gray-700"
        >
          Business Email <span className="text-red-500">*</span>
        </label>
        <input
          id="claim-email"
          name="email"
          type="email"
          required
          placeholder="hello@youragency.com"
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
        {isPending ? "Sending..." : "Send Verification Link →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        We verify ownership by email. Your email won&apos;t be shown publicly.
      </p>
    </form>
  );
}
