"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
  children?: { href: string; label: string; desc: string }[];
}

const NAV_LINKS: NavLink[] = [
  { href: "/agencies", label: "Browse Agencies" },
  {
    href: "/tools",
    label: "Free Tools",
    children: [
      { href: "/tools/cost-estimator", label: "Cost Estimator", desc: "Estimate project costs in 60 seconds" },
      { href: "/tools/brief-generator", label: "Brief Generator", desc: "Create a professional project brief" },
      { href: "/tools/migration-calculator", label: "Migration Calculator", desc: "Assess your migration complexity" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/submit", label: "List Your Agency" },
  { href: "/get-matched", label: "Get Matched", highlight: true },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    if (toolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [toolsOpen]);

  return (
    <nav className="border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold text-gray-900">
          Shopify Agency Directory
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 text-sm sm:flex">
          {NAV_LINKS.map((link) => {
            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
                >
                  {link.label}
                </Link>
              );
            }

            if (link.children) {
              return (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setToolsOpen((o) => !o)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {toolsOpen && (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border bg-white p-2 shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-lg px-3 py-2.5 hover:bg-gray-50"
                          onClick={() => setToolsOpen(false)}
                        >
                          <span className="text-sm font-medium text-gray-900">{child.label}</span>
                          <span className="mt-0.5 block text-xs text-gray-500">{child.desc}</span>
                        </Link>
                      ))}
                      <div className="mt-1 border-t pt-1">
                        <Link
                          href={link.href}
                          className="block rounded-lg px-3 py-2 text-xs font-medium text-green-600 hover:bg-green-50"
                          onClick={() => setToolsOpen(false)}
                        >
                          View all tools &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-gray-600 hover:bg-gray-100 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-auto mt-3 max-w-6xl space-y-1 border-t pt-3 sm:hidden">
          {NAV_LINKS.map((link) => {
            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }

            if (link.children) {
              return (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <div className="ml-4 space-y-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        onClick={() => setOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
