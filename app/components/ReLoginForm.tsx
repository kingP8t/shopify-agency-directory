"use client";

import { useActionState } from "react";
import { requestReLoginAction, type ClaimState } from "@/app/actions/claim";

interface ReLoginFormProps {
  slug: string;
  agencyName: string;
}

const initialState: ClaimState = { success: false };

export default function ReLoginForm({ slug, agencyName }: ReLoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    requestReLoginAction,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <div className="text-4xl">📧</div>
        <p className="mt-3 font-semibold text-gray-900">Check your inbox</p>
        <p className="mt-2 text-sm text-gray-600">
          We sent a login link to your email. Click it to access your
          dashboard for <strong>{agencyName}</strong>.
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
          htmlFor="relogin-email"
          className="block text-sm font-medium text-gray-700"
        >
          Your Claimed Email <span className="text-red-500">*</span>
        </label>
        <input
          id="relogin-email"
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
        {isPending ? "Sending..." : "Send Login Link →"}
      </button>

      <p className="text-center text-xs text-gray-400">
        We&apos;ll email you a secure link to access your owner dashboard.
      </p>
    </form>
  );
}
