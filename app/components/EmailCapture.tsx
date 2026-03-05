"use client";

import { useActionState } from "react";
import { subscribeEmail, type SubscribeState } from "@/app/actions/subscribe";

const initial: SubscribeState = { success: false };

export default function EmailCapture({ source = "footer" }: { source?: string }) {
  const [state, action, pending] = useActionState(subscribeEmail, initial);

  if (state.success) {
    return (
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
          ✓
        </span>
        <div>
          <p className="font-medium text-white">You&apos;re on the list!</p>
          <p className="text-sm text-green-200">
            We&apos;ll send the checklist to your inbox shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="source" value={source} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 rounded-lg border border-green-500 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-green-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send me the guide →"}
        </button>
      </div>
      {state.error && (
        <p className="mt-2 text-sm text-red-300">{state.error}</p>
      )}
      <p className="mt-2 text-xs text-green-300">
        Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
