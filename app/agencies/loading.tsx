// Route segment loading UI — shown automatically by Next.js while
// app/agencies/page.tsx is fetching data (React Suspense boundary).

function SkeletonCard() {
  return (
    <div className="flex gap-5 rounded-2xl border bg-white p-6 shadow-sm">
      {/* Logo placeholder */}
      <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200" />
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="space-y-1.5 text-right">
            <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="flex gap-1.5 pt-1">
          {[60, 80, 70].map((w) => (
            <div
              key={w}
              style={{ width: w }}
              className="h-5 animate-pulse rounded-full bg-gray-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AgenciesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav placeholder */}
      <div className="h-16 border-b bg-white" />

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        {/* Sidebar skeleton */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
                  <div
                    className="h-3 animate-pulse rounded bg-gray-100"
                    style={{ width: `${60 + (i % 3) * 20}px` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Agency cards skeleton */}
        <main className="min-w-0 flex-1 space-y-4">
          {/* Results header */}
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </main>
      </div>
    </div>
  );
}
