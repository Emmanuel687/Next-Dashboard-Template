"use client";

import { GWCard, GWAvatar } from "@/components/ui";
import { PriorityBadge } from "../shared/PriorityBadge";

function CircularProgress({ value, size = 56, stroke = 5 }) {
  const r   = (size - stroke) / 2;
  const c   = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} className="dark:stroke-zinc-700" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#03b155" strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-zinc-800 dark:text-zinc-100">
        {value}%
      </span>
    </div>
  );
}

export function JobSummaryBar({ job }) {
  return (
    <GWCard>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-zinc-100 dark:divide-white/[0.06]">

        {/* Priority */}
        <div className="flex items-center gap-3 px-5 py-4">
          <PriorityBadge priority={job.priority} />
        </div>

        {/* Technician */}
        <div className="flex items-center gap-3 px-5 py-4">
          <GWAvatar name={job.technician.name} size="md" color="green" />
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100 leading-tight truncate">
              {job.technician.name}
            </p>
            <p className="text-[11px] text-zinc-400 mt-0.5">Assigned Tech</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 px-5 py-4">
          <CircularProgress value={job.progress} />
          <div>
            <p className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100 leading-tight">Job Progress</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">{job.progress < 100 ? "In progress" : "Complete"}</p>
          </div>
        </div>

        {/* Time in Workshop */}
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="w-9 h-9 rounded-full bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center shrink-0">
            <i className="pi pi-clock text-[14px] text-amber-500" />
          </div>
          <div>
            <p className="text-[18px] font-bold text-zinc-800 dark:text-zinc-100 leading-tight">{job.timeInWorkshop}</p>
            <p className="text-[11px] text-zinc-400 mt-0.5">In Workshop</p>
          </div>
        </div>

      </div>
    </GWCard>
  );
}
