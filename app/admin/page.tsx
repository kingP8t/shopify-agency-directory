import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import type { Agency } from "@/lib/supabase";
import AdminAgencyRow from "@/app/components/AdminAgencyRow";
import AddAgencyModal from "@/app/components/AddAgencyModal";
import AdminLogoutButton from "@/app/components/AdminLogoutButton";

export const metadata: Metadata = {
  title: "Admin — Shopify Agency Directory",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getAllAgencies(): Promise<Agency[]> {
  const { data, error } = await supabase
    .from("agencies")
    .select("*")
    .order("status", { ascending: true }) // pending first
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data as Agency[]) ?? [];
}

async function getLeadCount(): Promise<number> {
  const { count } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });
  return count ?? 0;
}

export default async function AdminPage() {
  const [agencies, leadCount] = await Promise.all([
    getAllAgencies(),
    getLeadCount(),
  ]);

  const published = agencies.filter((a) => a.status === "published").length;
  const drafts = agencies.filter((a) => a.status === "draft").length;
  const pending = agencies.filter((a) => a.status === "pending");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-lg font-bold text-gray-900">
              Shopify Agency Directory
            </a>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/" className="text-gray-500 hover:text-gray-900">
              View Site ↗
            </a>
            <AdminLogoutButton />
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard</h1>
          <AddAgencyModal />
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-4">
          {[
            { label: "Total Agencies", value: agencies.length, color: "bg-gray-100 text-gray-900" },
            { label: "Published", value: published, color: "bg-green-100 text-green-800" },
            { label: "Pending Review", value: pending.length, color: pending.length > 0 ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-600" },
            { label: "Lead Enquiries", value: leadCount, color: "bg-blue-100 text-blue-800" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-5 ${stat.color}`}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-medium opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── Pending submissions — action required ── */}
        {pending.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                ⏳ Pending Review ({pending.length})
              </h2>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                Action required
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              These agencies submitted themselves via the public form. Review, edit if needed, then publish.
            </p>
            <ul className="mt-3 space-y-3">
              {pending.map((agency) => (
                <AdminAgencyRow key={agency.id} agency={agency} />
              ))}
            </ul>
          </div>
        )}

        {/* ── All other agencies ── */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            All Agencies ({agencies.length})
          </h2>

          {agencies.length === 0 ? (
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
        </div>

        {/* Leads */}
        <div className="mt-10 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Lead Enquiries</h2>
          <p className="mt-1 text-sm text-gray-500">
            {leadCount} contact{leadCount !== 1 ? "s" : ""} received from merchants via the Get Matched form.
          </p>
          <a
            href="https://supabase.com/dashboard/project/xsvdnqqddspzmokcnzyv/editor"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            View in Supabase → leads table ↗
          </a>
        </div>
      </main>
    </div>
  );
}
