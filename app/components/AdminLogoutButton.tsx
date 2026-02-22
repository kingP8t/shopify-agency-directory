"use client";

import { adminLogoutAction } from "@/app/actions/admin-auth";

export default function AdminLogoutButton() {
  return (
    <form action={adminLogoutAction}>
      <button
        type="submit"
        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        Sign out
      </button>
    </form>
  );
}
