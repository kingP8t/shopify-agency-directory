import type { Metadata } from "next";
import Link from "next/link";
import { getAdminClient } from "@/lib/supabase";
import type { Agency, Lead, BlogPostDB } from "@/lib/supabase";
import AdminAgencyRow from "@/app/components/AdminAgencyRow";
import AddAgencyModal from "@/app/components/AddAgencyModal";
import AdminLogoutButton from "@/app/components/AdminLogoutButton";
import AdminLeadsTable from "@/app/components/AdminLeadsTable";
import AdminBlogRow from "@/app/components/AdminBlogRow";
import AddBlogPostModal from "@/app/components/AddBlogPostModal";
import AdminReviewRow, { type AdminReview } from "@/app/components/AdminReviewRow";

export const metadata: Metadata = {
  title: "Admin — Shopify Agency Directory",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// Build the Supabase dashboard URL from the project URL env var (no hardcoded project ID)
function getSupabaseDashboardUrl(table: string): string | null {
  const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!projectUrl) return null;
  try {
    const projectId = new URL(projectUrl).hostname.split(".")[0];
    return `https://supabase.com/dashboard/project/${projectId}/editor?table=${table}`;
  } catch {
    return null;
  }
}

const AGENCIES_PAGE_SIZE = 50;

async function getAgenciesPage(
  page: number
): Promise<{ agencies: Agency[]; total: number }> {
  const db = getAdminClient();
  const from = (page - 1) * AGENCIES_PAGE_SIZE;
  const to = from + AGENCIES_PAGE_SIZE - 1;

  const { data, error, count } = await db
    .from("agencies")
    .select("*", { count: "exact" })
    .order("status", { ascending: true })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { agencies: [], total: 0 };
  return { agencies: (data as Agency[]) ?? [], total: count ?? 0 };
}

async function getPendingAgencies(): Promise<Agency[]> {
  const db = getAdminClient();
  const { data, error } = await db
    .from("agencies")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as Agency[]) ?? [];
}

async function getAgencyCounts(): Promise<{
  total: number;
  published: number;
}> {
  const db = getAdminClient();
  const [totalRes, publishedRes] = await Promise.all([
    db.from("agencies").select("*", { count: "exact", head: true }),
    db
      .from("agencies")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
  ]);
  return {
    total: totalRes.count ?? 0,
    published: publishedRes.count ?? 0,
  };
}

const LEADS_PAGE_SIZE = 50;

async function getLeads(page: number): Promise<{ leads: Lead[]; total: number }> {
  const db = getAdminClient();
  const from = (page - 1) * LEADS_PAGE_SIZE;
  const to = from + LEADS_PAGE_SIZE - 1;

  const { data, error, count } = await db
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) return { leads: [], total: 0 };
  return { leads: (data as Lead[]) ?? [], total: count ?? 0 };
}

async function getAllBlogPostsAdmin(): Promise<BlogPostDB[]> {
  const db = getAdminClient();
  const { data, error } = await db
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) return [];
  return (data as BlogPostDB[]) ?? [];
}

async function getAllReviews(): Promise<AdminReview[]> {
  const db = getAdminClient();
  const { data, error } = await db
    .from("reviews")
    .select("id, reviewer_name, rating, body, approved, created_at, agency_id, agencies(name, slug)")
    .order("approved", { ascending: true }) // pending first
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return [];

  return ((data as unknown[]) ?? []).map((row) => {
    const r = row as {
      id: string;
      reviewer_name: string;
      rating: number;
      body: string | null;
      approved: boolean;
      created_at: string;
      agency_id: string;
      agencies: { name: string; slug: string } | { name: string; slug: string }[] | null;
    };
    const agencyData = Array.isArray(r.agencies) ? r.agencies[0] : r.agencies;
    return {
      id: r.id,
      reviewer_name: r.reviewer_name,
      rating: r.rating,
      body: r.body,
      approved: r.approved,
      created_at: r.created_at,
      agency_id: r.agency_id,
      agency_name: agencyData?.name ?? "Unknown",
      agency_slug: agencyData?.slug ?? "",
    };
  });
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ leadsPage?: string; agenciesPage?: string }>;
}) {
  const { leadsPage, agenciesPage } = await searchParams;
  const currentLeadsPage = Math.max(1, parseInt(leadsPage ?? "1", 10) || 1);
  const currentAgenciesPage = Math.max(
    1,
    parseInt(agenciesPage ?? "1", 10) || 1
  );

  const [
    { agencies, total: agenciesTotal },
    agencyCounts,
    pendingAgencies,
    { leads, total: leadsTotal },
    blogPosts,
    reviews,
  ] = await Promise.all([
    getAgenciesPage(currentAgenciesPage),
    getAgencyCounts(),
    getPendingAgencies(),
    getLeads(currentLeadsPage),
    getAllBlogPostsAdmin(),
    getAllReviews(),
  ]);

  const totalAgenciesPages = Math.ceil(agenciesTotal / AGENCIES_PAGE_SIZE);
  const totalLeadsPages = Math.ceil(leadsTotal / LEADS_PAGE_SIZE);
  const leadsTableUrl = getSupabaseDashboardUrl("leads");

  const publishedPosts = blogPosts.filter((p) => p.status === "published").length;
  const pendingReviews = reviews.filter((r) => !r.approved);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg font-bold text-gray-900">
              Shopify Agency Directory
            </Link>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-900">
              View Site ↗
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <AddAgencyModal />
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Total Agencies", value: agencyCounts.total, color: "bg-gray-100 text-gray-900" },
            { label: "Published", value: agencyCounts.published, color: "bg-green-100 text-green-800" },
            { label: "Pending Agencies", value: pendingAgencies.length, color: pendingAgencies.length > 0 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-600" },
            { label: "Pending Reviews", value: pendingReviews.length, color: pendingReviews.length > 0 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600" },
            { label: "Lead Enquiries", value: leadsTotal, color: "bg-blue-100 text-blue-800" },
            { label: "Blog Posts", value: `${publishedPosts}/${blogPosts.length}`, color: "bg-purple-100 text-purple-800" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-5 ${stat.color}`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-medium opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Pending agency submissions ── */}
        {pendingAgencies.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                ⏳ Pending Agencies ({pendingAgencies.length})
              </h2>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                Action required
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              These agencies submitted themselves via the public form. Review, edit if needed, then publish.
            </p>
            <ul className="mt-3 space-y-3">
              {pendingAgencies.map((agency) => (
                <AdminAgencyRow key={agency.id} agency={agency} />
              ))}
            </ul>
          </div>
        )}

        {/* ── Pending reviews ── */}
        {pendingReviews.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
                ⭐ Pending Reviews ({pendingReviews.length})
              </h2>
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                Action required
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Approve reviews to publish them on the agency profile. Delete spam or invalid submissions.
            </p>
            <ul className="mt-3 space-y-3">
              {pendingReviews.map((review) => (
                <AdminReviewRow key={review.id} review={review} />
              ))}
            </ul>
          </div>
        )}

        {/* ── All agencies ── */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                All Agencies ({agencyCounts.total})
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Showing {agencies.length} of {agenciesTotal} — page{" "}
                {currentAgenciesPage} of {totalAgenciesPages || 1}
              </p>
            </div>
          </div>

          {agenciesTotal === 0 ? (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center text-gray-400">
              No agencies yet. Click &ldquo;+ Add Agency&rdquo; to get started.
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {agencies.map((agency) => (
                <AdminAgencyRow key={agency.id} agency={agency} />
              ))}
            </ul>
          )}

          {/* Agencies pagination */}
          {totalAgenciesPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={
                  currentAgenciesPage > 1
                    ? `?agenciesPage=${currentAgenciesPage - 1}${leadsPage ? `&leadsPage=${leadsPage}` : ""}`
                    : "#"
                }
                className={`rounded-lg border px-4 py-2 text-sm ${
                  currentAgenciesPage <= 1
                    ? "pointer-events-none text-gray-300"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                ← Previous
              </Link>
              <span className="text-sm text-gray-500">
                Page {currentAgenciesPage} of {totalAgenciesPages}
              </span>
              <Link
                href={
                  currentAgenciesPage < totalAgenciesPages
                    ? `?agenciesPage=${currentAgenciesPage + 1}${leadsPage ? `&leadsPage=${leadsPage}` : ""}`
                    : "#"
                }
                className={`rounded-lg border px-4 py-2 text-sm ${
                  currentAgenciesPage >= totalAgenciesPages
                    ? "pointer-events-none text-gray-300"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Next →
              </Link>
            </div>
          )}
        </div>

        {/* ── All reviews ── */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            All Reviews ({reviews.length})
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {reviews.filter((r) => r.approved).length} approved ·{" "}
            {pendingReviews.length} pending
          </p>
          {reviews.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400">No reviews yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {reviews.map((review) => (
                <AdminReviewRow key={review.id} review={review} />
              ))}
            </ul>
          )}
        </div>

        {/* ── Lead Enquiries ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Lead Enquiries ({leadsTotal})
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Showing {leads.length} of {leadsTotal} — page {currentLeadsPage} of {totalLeadsPages || 1}
              </p>
            </div>
            {leadsTableUrl && (
              <a
                href={leadsTableUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50"
              >
                Open in Supabase ↗
              </a>
            )}
          </div>
          <AdminLeadsTable leads={leads} />
          {/* Pagination */}
          {totalLeadsPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <Link
                href={
                  currentLeadsPage > 1
                    ? `?leadsPage=${currentLeadsPage - 1}${agenciesPage ? `&agenciesPage=${agenciesPage}` : ""}`
                    : "#"
                }
                className={`rounded-lg border px-4 py-2 text-sm ${
                  currentLeadsPage <= 1
                    ? "pointer-events-none text-gray-300"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                ← Previous
              </Link>
              <span className="text-sm text-gray-500">
                Page {currentLeadsPage} of {totalLeadsPages}
              </span>
              <Link
                href={
                  currentLeadsPage < totalLeadsPages
                    ? `?leadsPage=${currentLeadsPage + 1}${agenciesPage ? `&agenciesPage=${agenciesPage}` : ""}`
                    : "#"
                }
                className={`rounded-lg border px-4 py-2 text-sm ${
                  currentLeadsPage >= totalLeadsPages
                    ? "pointer-events-none text-gray-300"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Next →
              </Link>
            </div>
          )}
        </div>

        {/* ── Blog Posts ── */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Blog Posts ({blogPosts.length})
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                {publishedPosts} published · {blogPosts.length - publishedPosts} draft
              </p>
            </div>
            <AddBlogPostModal />
          </div>

          {blogPosts.length === 0 ? (
            <div className="mt-4 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center text-gray-400">
              No blog posts yet. Click &ldquo;+ New Post&rdquo; to write your first article.
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {blogPosts.map((post) => (
                <AdminBlogRow key={post.id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
