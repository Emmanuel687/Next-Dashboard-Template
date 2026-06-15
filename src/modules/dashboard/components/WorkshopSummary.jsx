"use client";

import Link from "next/link";
import { GWCard, GWProgressBar } from "@/components/ui";

export function WorkshopSummary({ statuses }) {
  const total = statuses.reduce((s, r) => s + r.count, 0);

  return (
    <GWCard
      title="Workshop Summary"
      subtitle={`${total} total jobs · by status`}
      action={
        <Link
          href="/fleet/workshop"
          className="text-[11px] font-semibold text-[#03b155] hover:opacity-75 transition-opacity"
        >
          View all →
        </Link>
      }
    >
      <div className="px-5 py-4 flex flex-col gap-3.5">
        {statuses.map((row) => {
          const pct = Math.round((row.count / total) * 100);
          return (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: row.color }} />
              <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400 w-[96px] shrink-0">
                {row.label}
              </span>
              <GWProgressBar value={pct} color={row.color} height={6} className="flex-1" />
              <span className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200 w-6 text-right shrink-0">
                {row.count}
              </span>
            </div>
          );
        })}
      </div>
    </GWCard>
  );
}
