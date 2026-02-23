"use client";

import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { href: "/agencies", label: "Browse Agencies" },
  { href: "/blog", label: "Blog" },
  { href: "/submit", label: "List Your Agency" },
  { href: "/get-matched", label: "Get Matched", highlight: true },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-lg font-bold text-gray-900">
          Shopify Agency Directory
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 text-sm sm:flex">
          {NAV_LINKS.map((link) =>
            link.highlight ? (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            // X icon
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-auto mt-3 max-w-6xl space-y-1 border-t pt-3 sm:hidden">
          {NAV_LINKS.map((link) =>
            link.highlight ? (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
}
