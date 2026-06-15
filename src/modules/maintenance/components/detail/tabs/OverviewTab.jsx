"use client";

import { GWCard } from "@/components/ui";

export function OverviewTab({ job }) {
  const fields = [
    { label: "Job ID",         value: job.id },
    { label: "Vehicle",        value: `${job.vehicle.id} · ${job.vehicle.plate}` },
    { label: "Model",          value: job.vehicle.model },
    { label: "Technician",     value: job.technician.name },
    { label: "Start Time",     value: job.startTime },
    { label: "ETA",            value: job.eta },
    { label: "Queue Position", value: job.queuePosition },
  ];

  return (
    <GWCard title="Job Overview" subtitle="Summary details for this maintenance job.">
      <dl className="divide-y divide-zinc-50 dark:divide-white/[0.03]">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center gap-4 px-5 py-3.5">
            <dt className="text-[12px] text-zinc-400 dark:text-zinc-500 w-36 shrink-0">{f.label}</dt>
            <dd className="text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">{f.value}</dd>
          </div>
        ))}
      </dl>
    </GWCard>
  );
}
