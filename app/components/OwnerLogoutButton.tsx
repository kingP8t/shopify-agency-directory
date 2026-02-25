"use client";

import { ownerLogoutAction } from "@/app/actions/claim";

export default function OwnerLogoutButton({ slug }: { slug: string }) {
  return (
    <button
      onClick={() => ownerLogoutAction(slug)}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
    >
      Sign Out
    </button>
  );
}
