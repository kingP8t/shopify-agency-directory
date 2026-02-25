import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getOwnerSession } from "@/lib/owner-session";
import { getAdminClient } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import SiteNav from "@/app/components/SiteNav";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import OwnerAgencyForm from "@/app/components/OwnerAgencyForm";
import OwnerLeadsTable from "@/app/components/OwnerLeadsTable";
import OwnerReviewList from "@/app/components/OwnerReviewList";
import OwnerLogoutButton from "@/app/components/OwnerLogoutButton";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

interface OwnerReview {
  id: string;
  reviewer_name: string;
  body: string;
  rating: number;
  approved: boolean;
  owner_reply: string | null;
  owner_replied_at: string | null;
  created_at: string;
}

interface OwnerLead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  created_at: string;
}

export default async function OwnerDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Auth check — must come before any data fetching
  const session = await getOwnerSession(slug);
  if (!session) {
    redirect(`/agencies/${slug}/claim`);
  }

  const db = getAdminClient();

  const [agencyResult, reviewsResult, leadsResult] = await Promise.all([
    db.from("agencies").select("*").eq("id", session.agencyId).single(),
    db
      .from("reviews")
      .select(
        "id, reviewer_name, body, rating, approved, owner_reply, owner_replied_at, created_at"
      )
      .eq("agency_id", session.agencyId)
      .order("created_at", { ascending: false }),
    db
      .from("leads")
      .select("id, name, email, company, budget, message, created_at")
      .eq("agency_id", session.agencyId)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  if (!agencyResult.data) notFound();

  const agency = agencyResult.data as Agency;
  const reviews = (reviewsResult.data ?? []) as OwnerReview[];
  const leads = (leadsResult.data ?? []) as OwnerLead[];

  const approvedReviews = reviews.filter((r) => r.approved);
  const unansweredCount = approvedReviews.filter((r) => !r.owner_reply).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Agencies", href: "/agencies" },
            { name: agency.name, href: `/agencies/${agency.slug}` },
            {
              name: "Owner Dashboard",
              href: `/agencies/${agency.slug}/owner`,
            },
          ]}
        />

        {/* Header */}
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {agency.name} — Owner Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Signed in as{" "}
              <span className="font-medium text-gray-700">{session.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`/agencies/${slug}`}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              View Listing ↗
            </a>
            <OwnerLogoutButton slug={slug} />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total Leads",
              value: leads.length,
              color: "bg-blue-50 text-blue-800 border-blue-100",
            },
            {
              label: "Total Reviews",
              value: reviews.length,
              color: "bg-yellow-50 text-yellow-800 border-yellow-100",
            },
            {
              label: "Unanswered Reviews",
              value: unansweredCount,
              color:
                unansweredCount > 0
                  ? "bg-orange-50 text-orange-800 border-orange-100"
                  : "bg-green-50 text-green-800 border-green-100",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border p-5 ${stat.color}`}
            >
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-medium opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Edit listing */}
        <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Edit Your Listing
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Changes go live immediately. Contact the directory admin to update
            your agency name, rating, or featured status.
          </p>
          <div className="mt-6">
            <OwnerAgencyForm agency={agency} slug={slug} />
          </div>
        </div>

        {/* Leads */}
        <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Lead Enquiries{" "}
            <span className="text-sm font-normal text-gray-400">
              ({leads.length})
            </span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Showing the last 50 enquiries sent to your listing.
          </p>
          <OwnerLeadsTable leads={leads} />
        </div>

        {/* Reviews */}
        <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Reviews{" "}
            <span className="text-sm font-normal text-gray-400">
              ({reviews.length})
            </span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Respond publicly to approved reviews. Pending reviews are visible
            only to you until approved by an admin.
          </p>
          <OwnerReviewList reviews={reviews} slug={slug} />
        </div>
      </main>
    </div>
  );
}
