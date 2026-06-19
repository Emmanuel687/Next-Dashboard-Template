"use client";

import { useState } from "react";
import { GWButton, GWCard, GWPageHeader, GWSearchInput } from "@/components/ui";
import { MaintenanceTable } from "./components/list/MaintenanceTable";
import { MAINTENANCE_JOBS } from "./data";

const STATUS_FILTERS = ["All", "New", "Assigned", "In Progress", "Waiting Parts", "QA Review", "Completed"];

const STATUS_KEY_MAP = {
  "All":           null,
  "New":           "new",
  "Assigned":      "assigned",
  "In Progress":   "in_progress",
  "Waiting Parts": "waiting_parts",
  "QA Review":     "qa_review",
  "Completed":     "completed",
};

export default function MaintenancePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = MAINTENANCE_JOBS.filter((j) => {
    const matchStatus = !STATUS_KEY_MAP[filter] || j.status === STATUS_KEY_MAP[filter];
    const q           = search.toLowerCase();
    const matchSearch = !q || j.id.toLowerCase().includes(q) || j.title.toLowerCase().includes(q) || j.vehicle.toLowerCase().includes(q) || j.technician.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5">

      <GWPageHeader
        title="Maintenance Jobs"
        subtitle={`${MAINTENANCE_JOBS.length} total jobs across the fleet`}
        action={
          <GWButton variant="primary" icon="pi-plus">
            New Job
          </GWButton>
        }
      />

      <GWCard>
        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-b border-zinc-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 sm:pb-0 sm:flex-wrap">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 h-7 px-3 rounded-full text-[11.5px] font-semibold transition-colors ${
                  filter === f
                    ? "bg-[#03b155] text-white"
                    : "bg-zinc-100 dark:bg-white/[0.07] text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/[0.1]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <GWSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search jobs..."
            className="w-full sm:w-52"
          />
        </div>

        <MaintenanceTable jobs={filtered} />
      </GWCard>
    </div>
  );
}
