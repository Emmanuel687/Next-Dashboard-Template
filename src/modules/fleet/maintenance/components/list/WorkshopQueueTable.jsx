"use client";

/**
 * WorkshopQueueTable — displays the live workshop queue.
 *
 * Columns: Job ID · Vehicle · Description · Priority · Status ·
 *          Technician · Progress · Time · Bay · (action)
 *
 * Uses GWTable (OS2 native table) for sort + pagination.
 *
 * @param {{ jobs: import("../../data").QueueJob[], onNavigate: (id: string) => void }} props
 */

import { useRouter }     from "next/navigation";
import { GWTable, GWButton, GWProgressBar, GWAvatar } from "@/components/ui";
import { JobStatusTag }  from "../shared/JobStatusTag";
import { PriorityBadge } from "../shared/PriorityBadge";

// ─── Cell helpers ─────────────────────────────────────────────

function JobIdCell({ id }) {
  return (
    <span className="font-mono text-[12px] font-bold text-[#03b155] tracking-tight whitespace-nowrap">
      {id}
    </span>
  );
}

function VehicleCell({ vehicle, model }) {
  return (
    <div>
      <p className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-100 leading-snug whitespace-nowrap">{vehicle}</p>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{model}</p>
    </div>
  );
}

function TechnicianCell({ technician }) {
  return (
    <div className="flex items-center gap-2">
      <GWAvatar name={technician.name} size="xs" color="green" />
      <span className="text-[12px] text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{technician.name}</span>
    </div>
  );
}

function ProgressCell({ value, status }) {
  if (status === "new") {
    return <span className="text-[12px] text-zinc-300 dark:text-zinc-700">—</span>;
  }
  return (
    <GWProgressBar
      value={value}
      showLabel
      labelClass={`text-[11px] font-semibold shrink-0 w-9 text-right ${value === 100 ? "text-[#03b155]" : "text-zinc-500 dark:text-zinc-400"}`}
      className="w-[120px]"
    />
  );
}

function BayTag({ bay }) {
  return (
    <span className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-semibold bg-zinc-100 dark:bg-white/[0.07] text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
      {bay}
    </span>
  );
}

// ─── Column definitions ───────────────────────────────────────

function buildColumns(onNavigate) {
  return [
    {
      key: "id", header: "Job ID", sortable: true, width: "96px",
      render: (row) => <JobIdCell id={row.id} />,
    },
    {
      key: "vehicle", header: "Vehicle", minWidth: "175px",
      render: (row) => <VehicleCell vehicle={row.vehicle} model={row.model} />,
    },
    {
      key: "title", header: "Description", sortable: true, minWidth: "180px",
      render: (row) => (
        <span className="text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300">{row.title}</span>
      ),
    },
    {
      key: "priority", header: "Priority", sortable: true, minWidth: "150px",
      render: (row) => <PriorityBadge priority={row.priority} />,
    },
    {
      key: "status", header: "Status", sortable: true, minWidth: "135px",
      render: (row) => <JobStatusTag status={row.status} />,
    },
    {
      key: "technician", header: "Technician", minWidth: "155px",
      render: (row) => <TechnicianCell technician={row.technician} />,
    },
    {
      key: "progress", header: "Progress", minWidth: "155px",
      render: (row) => <ProgressCell value={row.progress} status={row.status} />,
    },
    {
      key: "time", header: "Time", sortable: true, width: "80px",
      render: (row) => (
        <span className="text-[12px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{row.time}</span>
      ),
    },
    {
      key: "bay", header: "Bay", sortable: true, width: "84px",
      render: (row) => <BayTag bay={row.bay} />,
    },
    {
      key: "_action", header: "", width: "48px",
      render: (row) => (
        <GWButton
          variant="ghost"
          icon="pi-chevron-right"
          iconSize="text-[12px]"
          onClick={(e) => { e.stopPropagation(); onNavigate(row.id); }}
        />
      ),
    },
  ];
}

// ─── Component ────────────────────────────────────────────────

export function WorkshopQueueTable({ jobs }) {
  const router  = useRouter();
  const columns = buildColumns((id) => router.push(`/fleet/maintenance/${id}`));

  return (
    <GWTable
      data={jobs}
      columns={columns}
      onRowClick={(row) => router.push(`/fleet/maintenance/${row.id}`)}
      emptyMessage="No jobs in the workshop queue."
      defaultRows={10}
    />
  );
}
