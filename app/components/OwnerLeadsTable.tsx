interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  budget: string | null;
  message: string;
  created_at: string;
}

interface OwnerLeadsTableProps {
  leads: Lead[];
}

export default function OwnerLeadsTable({ leads }: OwnerLeadsTableProps) {
  if (leads.length === 0) {
    return (
      <p className="mt-4 text-sm text-gray-400">
        No leads yet. They&apos;ll appear here when someone contacts you.
      </p>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs font-medium uppercase tracking-wide text-gray-500">
            <th className="pb-3 pr-4">Name</th>
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Company</th>
            <th className="pb-3 pr-4">Budget</th>
            <th className="pb-3 pr-4">Message</th>
            <th className="pb-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="align-top">
              <td className="py-3 pr-4 font-medium text-gray-900">
                {lead.name}
              </td>
              <td className="py-3 pr-4">
                <a
                  href={`mailto:${lead.email}`}
                  className="text-green-600 hover:underline"
                >
                  {lead.email}
                </a>
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {lead.company ?? "—"}
              </td>
              <td className="py-3 pr-4 text-gray-600">
                {lead.budget ?? "—"}
              </td>
              <td className="max-w-xs py-3 pr-4 text-gray-600">
                <p className="line-clamp-2">{lead.message}</p>
              </td>
              <td className="py-3 text-xs text-gray-400 whitespace-nowrap">
                {new Date(lead.created_at).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
