"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Simple nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="text-lg font-bold text-gray-900">
            Shopify Agency Directory
          </Link>
        </div>
      </nav>

      {/* Error content */}
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="text-center">
          <p className="text-6xl font-bold text-red-400">500</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>
          <p className="mt-3 text-gray-500">
            We hit an unexpected error. Our team has been notified.
            <br />
            Please try again or go back to the homepage.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-lg border bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Shopify Agency Directory
      </footer>
    </div>
  );
}
