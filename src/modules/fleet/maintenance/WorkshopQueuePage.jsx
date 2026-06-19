"use client";

/**
 * WorkshopQueuePage — live view of all active and pending maintenance jobs.
 *
 * Layout:
 *   Page header (eyebrow / title / subtitle / actions)
 *   ↳ QueueStatsStrip (4 KPI cards)
 *   ↳ GWCard: status filter pills + search + WorkshopQueueTable
 *
 * Ported from Greenwheels-ERP WorkshopQueueView.
 */

import { useState } from "react";
import { GWButton, GWCard, GWSearchInput } from "@/components/ui";
import { QueueStatsStrip }     from "./components/list/QueueStatsStrip";
import { WorkshopQueueTable }  from "./components/list/WorkshopQueueTable";
import { WORKSHOP_QUEUE, QUEUE_STATS } from "./data";

// ─── Filter config ────────────────────────────────────────────

const FILTERS = ["All", "In Progress", "Waiting Parts", "QA Review", "Completed", "On Hold"];

const FILTER_KEY_MAP = {
  "All":           null,
  "In Progress":   "in_progress",
  "Waiting Parts": "waiting_parts",
  "QA Review":     "qa_review",
  "Completed":     "completed",
  "On Hold":       "on_hold",
};

// ─── Component ────────────────────────────────────────────────

export default function WorkshopQueuePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = WORKSHOP_QUEUE.filter((job) => {
    const matchStatus = !FILTER_KEY_MAP[filter] || job.status === FILTER_KEY_MAP[filter];
    const q           = search.toLowerCase();
    const matchSearch =
      !q ||
      job.id.toLowerCase().includes(q) ||
      job.title.toLowerCase().includes(q) ||
      job.vehicle.toLowerCase().includes(q) ||
      job.technician.name.toLowerCase().includes(q) ||
      job.bay.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#03b155] mb-1">
            Maintenance
          </p>
          <h1 className="text-[22px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            Workshop Queue
          </h1>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Live view of all active and pending maintenance jobs.
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:mt-1">
          <GWButton variant="secondary" icon="pi-filter" label="Filter" />
          <GWButton variant="primary"   icon="pi-plus"   label="New Job" />
        </div>
      </div>

      {/* ── KPI strip ── */}
      <QueueStatsStrip stats={QUEUE_STATS} />

      {/* ── Jobs table ── */}
      <GWCard>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-b border-zinc-100 dark:border-white/[0.06]">
          {/* Status filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 sm:pb-0 sm:flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
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

          {/* Search */}
          <GWSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search jobs, vehicles, techs…"
            className="w-full sm:w-60"
          />
        </div>

        <WorkshopQueueTable jobs={filtered} />
      </GWCard>
    </div>
  );
}
