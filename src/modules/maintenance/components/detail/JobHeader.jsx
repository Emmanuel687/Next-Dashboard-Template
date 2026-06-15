"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SplitButton } from "primereact/splitbutton";
import { GWCard, GWButton } from "@/components/ui";
import { JobStatusTag } from "../shared/JobStatusTag";

const STATUS_ACTIONS = [
  { label: "Mark Assigned",     icon: "pi pi-user",         command: () => {} },
  { label: "Start Job",         icon: "pi pi-play",         command: () => {} },
  { label: "Waiting for Parts", icon: "pi pi-clock",        command: () => {} },
  { label: "Mark QA Review",    icon: "pi pi-check-circle", command: () => {} },
  { label: "Mark Completed",    icon: "pi pi-check",        command: () => {} },
];

export function JobHeader({ job }) {
  const router = useRouter();

  return (
    <GWCard>
      <div className="px-5 py-4 flex flex-col gap-3">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11.5px] text-zinc-400">
          <Link href="/fleet/maintenance" className="hover:text-[#03b155] transition-colors">
            Maintenance
          </Link>
          <i className="pi pi-chevron-right text-[9px]" />
          <Link href="/fleet/workshop" className="hover:text-[#03b155] transition-colors">
            Workshop Queue
          </Link>
          <i className="pi pi-chevron-right text-[9px]" />
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{job.id}</span>
        </nav>

        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[22px] font-bold text-zinc-900 dark:text-white leading-tight">
                {job.id}
              </h1>
              <JobStatusTag status={job.status} />
            </div>
            <p className="text-[14px] font-semibold text-zinc-500 dark:text-zinc-400">{job.title}</p>
            <p className="text-[12px] text-zinc-400 dark:text-zinc-500">
              {job.vehicle.id}
              <span className="mx-1.5">·</span>
              {job.vehicle.plate}
              <span className="mx-1.5">·</span>
              {job.vehicle.model}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center flex-wrap gap-2">
            {/* PrimeReact SplitButton — no native equivalent */}
            <SplitButton
              label="Update Status"
              icon="pi pi-pencil"
              model={STATUS_ACTIONS}
              unstyled
              pt={{
                root:       { className: "flex items-center" },
                button:     { root: { className: "flex items-center gap-2 h-8 pl-3 pr-2 rounded-l-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90", style: { background: "#03b155" } }, icon: { className: "text-[12px]" }, label: { className: "hidden sm:inline" } },
                menuButton: { root: { className: "flex items-center justify-center w-8 h-8 rounded-r-lg border-l border-white/20 text-white transition-opacity hover:opacity-80", style: { background: "#03b155" } }, icon: { className: "text-[11px]" } },
                menu:       { root: { className: "mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.1] rounded-xl shadow-xl py-1 min-w-[180px] z-50" }, menuItem: { className: "flex items-center gap-2 px-3 py-2 text-[12.5px] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer" } },
              }}
            />

            <GWButton variant="secondary" icon="pi-user-edit" label="Reassign" labelClass="hidden sm:inline" />

            <GWButton variant="secondary" icon="pi-ellipsis-v" />
          </div>
        </div>
      </div>
    </GWCard>
  );
}
