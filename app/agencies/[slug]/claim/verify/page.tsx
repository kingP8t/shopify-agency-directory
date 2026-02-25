import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyClaimAction } from "@/app/actions/claim";
import SiteNav from "@/app/components/SiteNav";

export const metadata: Metadata = {
  title: "Verifying your claim...",
  robots: { index: false, follow: false },
};

// Must be dynamic — reads searchParams and sets a cookie
export const dynamic = "force-dynamic";

export default async function ClaimVerifyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const { slug } = await params;
  const { token, email } = await searchParams;

  if (!token || !email) {
    return (
      <VerifyError
        message="Invalid verification link. Token or email is missing."
        slug={slug}
      />
    );
  }

  const result = await verifyClaimAction({ slug, token, email });

  if (!result.success) {
    return <VerifyError message={result.error} slug={slug} />;
  }

  // Cookie set inside verifyClaimAction — redirect to owner dashboard
  redirect(`/agencies/${slug}/owner`);
}

function VerifyError({
  message,
  slug,
}: {
  message?: string;
  slug: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNav />
      <main className="mx-auto max-w-lg px-6 py-20">
        <div className="rounded-2xl border bg-white p-10 shadow-sm text-center">
          <div className="text-5xl">❌</div>
          <h1 className="mt-5 text-xl font-semibold text-gray-900">
            Verification Failed
          </h1>
          <p className="mt-3 text-sm text-gray-500">{message}</p>
          <a
            href={`/agencies/${slug}/claim`}
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700"
          >
            Request a new link →
          </a>
        </div>
      </main>
    </div>
  );
}
