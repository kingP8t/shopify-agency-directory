import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
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

      {/* 404 content */}
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="text-center">
          <p className="text-6xl font-bold text-green-600">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Page not found
          </h1>
          <p className="mt-3 text-gray-500">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
            <br />
            The agency may have moved or the link may be incorrect.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/agencies"
              className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-700"
            >
              Browse Agencies
            </Link>
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
