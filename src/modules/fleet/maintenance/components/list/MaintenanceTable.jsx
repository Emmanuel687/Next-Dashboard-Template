"use client";

import { useRouter } from "next/navigation";
import { GWTable, GWButton, GWProgressBar, GWAvatar } from "@/components/ui";
import { JobStatusTag }  from "../shared/JobStatusTag";
import { PriorityBadge } from "../shared/PriorityBadge";

// ─── Cell renderers ───────────────────────────────────────────
function JobIdCell({ id }) {
  return (
    <span className="font-mono text-[12px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
      {id}
    </span>
  );
}

function VehicleCell({ vehicle, plate, model }) {
  return (
    <div>
      <p className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-100 leading-snug">{vehicle}</p>
      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">{plate} · {model}</p>
    </div>
  );
}

function TechnicianCell({ name }) {
  return (
    <div className="flex items-center gap-2">
      <GWAvatar name={name} size="xs" color="green" />
      <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300">{name}</span>
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
      className="w-[130px]"
    />
  );
}

function EtaCell({ eta }) {
  if (eta === "Completed") return <span className="text-[11.5px] font-semibold text-[#03b155]">Completed</span>;
  if (eta === "TBD")       return <span className="text-[11.5px] text-zinc-400 dark:text-zinc-600">TBD</span>;
  return <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{eta}</span>;
}

// ─── Column definitions ───────────────────────────────────────
function useColumns(onNavigate) {
  return [
    {
      key: "id", header: "Job ID", sortable: true, width: "110px",
      render: (row) => <JobIdCell id={row.id} />,
    },
    {
      key: "title", header: "Title", sortable: true, minWidth: "160px",
      render: (row) => <span className="text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300">{row.title}</span>,
    },
    {
      key: "vehicle", header: "Vehicle", minWidth: "170px",
      render: (row) => <VehicleCell vehicle={row.vehicle} plate={row.plate} model={row.model} />,
    },
    {
      key: "technician", header: "Technician", sortable: true, minWidth: "155px",
      render: (row) => <TechnicianCell name={row.technician} />,
    },
    {
      key: "priority", header: "Priority", sortable: true, minWidth: "145px",
      render: (row) => <PriorityBadge priority={row.priority} />,
    },
    {
      key: "status", header: "Status", sortable: true, minWidth: "130px",
      render: (row) => <JobStatusTag status={row.status} />,
    },
    {
      key: "progress", header: "Progress", minWidth: "155px",
      render: (row) => <ProgressCell value={row.progress} status={row.status} />,
    },
    {
      key: "eta", header: "ETA", sortable: true, minWidth: "135px",
      render: (row) => <EtaCell eta={row.eta} />,
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

export function MaintenanceTable({ jobs }) {
  const router  = useRouter();
  const columns = useColumns((id) => router.push(`/fleet/maintenance/${id}`));

  return (
    <GWTable
      data={jobs}
      columns={columns}
      onRowClick={(row) => router.push(`/fleet/maintenance/${row.id}`)}
      emptyMessage="No maintenance jobs found."
      defaultRows={10}
    />
  );
}
