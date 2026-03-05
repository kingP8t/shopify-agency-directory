// Route segment loading UI — shown automatically by Next.js while
// app/blog/page.tsx is fetching data (React Suspense boundary).

function SkeletonPostCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="h-32 animate-pulse bg-gray-200" />
      <div className="flex flex-1 flex-col p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
        </div>
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-24 animate-pulse rounded bg-gray-100 mt-auto pt-2" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav placeholder */}
      <div className="h-16 border-b bg-white" />

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Breadcrumb placeholder */}
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />

        {/* Page title */}
        <div className="mb-6 mt-4 space-y-2">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-96 animate-pulse rounded bg-gray-100" />
        </div>

        {/* Category nav */}
        <div className="mb-8 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-7 animate-pulse rounded-full bg-gray-200"
              style={{ width: `${70 + (i % 3) * 20}px` }}
            />
          ))}
        </div>

        {/* Featured post skeleton */}
        <div className="mb-10 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm sm:flex-row">
          <div className="h-48 w-full shrink-0 animate-pulse bg-gray-200 sm:h-auto sm:w-72" />
          <div className="flex flex-col justify-center gap-3 p-6">
            <div className="flex gap-2">
              <div className="h-5 w-28 animate-pulse rounded-full bg-gray-200" />
              <div className="h-5 w-20 animate-pulse rounded-full bg-gray-100" />
            </div>
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
          </div>
        </div>

        {/* Post grid skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonPostCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
