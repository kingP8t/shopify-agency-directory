import type { Metadata } from "next";
import { adminLoginAction } from "@/app/actions/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login — Shopify Agency Directory",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo / header */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-2xl font-bold text-white">
            S
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-1 text-sm text-gray-500">
            Shopify Agency Directory
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <form action={adminLoginAction} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Admin Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                placeholder="Enter your admin password"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Error message — rendered server-side via searchParams */}
            <ErrorMessage searchParams={searchParams} />

            <button
              type="submit"
              className="w-full rounded-lg bg-green-600 py-2.5 text-sm font-medium text-white hover:bg-green-700 active:bg-green-800"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          <a href="/" className="hover:text-gray-600">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}

// Async sub-component to read searchParams
async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  if (!error) return null;
  return (
    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
      Incorrect password. Please try again.
    </p>
  );
}
