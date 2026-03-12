import type { Lead } from "@/lib/supabase";

interface AdminLeadsTableProps {
  leads: Lead[];
}

export default function AdminLeadsTable({ leads }: AdminLeadsTableProps) {
  if (leads.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border-2 border-dashed border-gray-200 bg-white p-10 text-center text-gray-400">
        No lead enquiries yet. They&apos;ll appear here when merchants submit the Get Matched form.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Name / Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{lead.name}</p>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-xs text-green-600 hover:underline"
                  >
                    {lead.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {lead.company ?? <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3">
                  {lead.budget ? (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                      {lead.budget}
                    </span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="max-w-xs px-4 py-3 text-gray-600">
                  <p className="line-clamp-2">{lead.message}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-400">
                  {lead.created_at
                    ? new Date(lead.created_at).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
