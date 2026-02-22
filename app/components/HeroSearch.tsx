"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const POPULAR_SEARCHES = [
  "Shopify Plus",
  "CRO",
  "Migrations",
  "Headless",
  "Theme Development",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/agencies?search=${encodeURIComponent(q)}`);
    } else {
      router.push("/agencies");
    }
  }

  function handlePopular(term: string) {
    router.push(`/agencies?specialization=${encodeURIComponent(term)}`);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-xl">
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search agencies, specializations, locations..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 active:bg-green-800"
        >
          Search
        </button>
      </form>

      {/* Popular searches */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-gray-400">Popular:</span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            key={term}
            onClick={() => handlePopular(term)}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-green-100 hover:text-green-700"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
