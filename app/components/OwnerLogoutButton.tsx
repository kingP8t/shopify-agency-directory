"use client";

import { useTransition } from "react";
import { ownerLogoutAction } from "@/app/actions/claim";

export default function OwnerLogoutButton({ slug }: { slug: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => ownerLogoutAction(slug))}
      disabled={isPending}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-60"
    >
      {isPending ? "Signing out…" : "Sign Out"}
    </button>
  );
}
