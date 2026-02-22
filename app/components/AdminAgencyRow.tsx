"use client";

import { useState } from "react";
import { deleteAgencyAction, toggleStatusAction } from "@/app/actions/agencies";
import AgencyForm from "@/app/components/AgencyForm";
import type { Agency } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AdminAgencyRowProps {
  agency: Agency;
}

export default function AdminAgencyRow({ agency }: AdminAgencyRowProps) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${agency.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteAgencyAction(agency.id);
    router.refresh();
  }

  async function handleToggle() {
    setToggling(true);
    await toggleStatusAction(agency.id, agency.status);
    setToggling(false);
    router.refresh();
  }

  if (editing) {
    return (
      <li className="rounded-xl border bg-gray-50 p-5">
        <p className="mb-4 font-medium text-gray-900">Editing: {agency.name}</p>
        <AgencyForm agency={agency} onClose={() => setEditing(false)} />
      </li>
    );
  }

  return (
    <li className="flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-900">{agency.name}</span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              agency.status === "published"
                ? "bg-green-100 text-green-700"
                : agency.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {agency.status}
          </span>
          {agency.featured && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
              Featured
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          {agency.location && `📍 ${agency.location} · `}
          {agency.slug}
        </p>
        {agency.specializations && agency.specializations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {agency.specializations.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex shrink-0 gap-2">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium disabled:opacity-50 ${
            agency.status === "published"
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          {toggling
            ? "..."
            : agency.status === "published"
            ? "Unpublish"
            : "Publish"}
        </button>
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 disabled:opacity-50"
        >
          {deleting ? "..." : "Delete"}
        </button>
      </div>
    </li>
  );
}
