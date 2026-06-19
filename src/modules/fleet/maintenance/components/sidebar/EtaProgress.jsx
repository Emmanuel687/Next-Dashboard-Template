"use client";

import { GWCard, GWProgressBar } from "@/components/ui";

export function EtaProgress({ job }) {
  const rows = [
    { label: "Start Time",       value: job.startTime },
    { label: "ETA Completion",   value: job.eta },
    { label: "Time In Workshop", value: job.timeInWorkshop },
    { label: "Queue Position",   value: `#${job.queuePosition}` },
  ];

  return (
    <GWCard compact title="ETA & Progress">
      <div className="px-4 py-3 flex flex-col gap-2.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500 shrink-0">{row.label}</span>
            <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200 text-right">{row.value}</span>
          </div>
        ))}

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500">Progress</span>
            <span className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200">{job.progress}%</span>
          </div>
          <GWProgressBar value={job.progress} />
        </div>
      </div>
    </GWCard>
  );
}
