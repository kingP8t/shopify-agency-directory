import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ClaimForm from "@/app/components/ClaimForm";

export const metadata: Metadata = {
  title: "Claim Your Listing",
  robots: { index: false, follow: false },
};

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: agency } = await supabase
    .from("agencies")
    .select("id, name, slug, claimed_at")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!agency) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNav />
      <main className="mx-auto max-w-lg px-6 py-12">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Agencies", href: "/agencies" },
            { name: agency.name, href: `/agencies/${agency.slug}` },
            {
              name: "Claim Listing",
              href: `/agencies/${agency.slug}/claim`,
            },
          ]}
        />

        <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
            {agency.name.charAt(0)}
          </div>
          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Claim {agency.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your business email to verify you own this listing. We&apos;ll
            send you a one-time verification link.
          </p>

          {agency.claimed_at ? (
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-800">
              <p className="font-medium">This listing has already been claimed.</p>
              <p className="mt-1 text-amber-700">
                If you believe this is an error, please{" "}
                <a href="/get-matched" className="underline hover:text-amber-900">
                  contact us
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="mt-6">
              <ClaimForm slug={slug} agencyName={agency.name} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
