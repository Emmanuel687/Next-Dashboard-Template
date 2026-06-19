"use client";

/**
 * QueueStatsStrip — 4 KPI cards shown above the Workshop Queue table.
 * Displays value, label, and a delta indicator (up/down/neutral).
 *
 * @param {{ stats: import("../../data").QueueStat[] }} props
 */
export function QueueStatsStrip({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

function StatCard({ stat }) {
  const { label, value, delta, up } = stat;

  const deltaColor =
    up === true  ? "text-[#03b155]" :
    up === false ? "text-red-500"   :
                   "text-zinc-400 dark:text-zinc-500";

  const DeltaIcon =
    up === true  ? <i className="pi pi-arrow-up text-[9px]" aria-hidden="true" />  :
    up === false ? <i className="pi pi-arrow-down text-[9px]" aria-hidden="true" /> :
                   null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-xl px-5 py-4">
      <p className="text-[26px] font-bold text-zinc-900 dark:text-zinc-50 leading-none">{value}</p>
      <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5">{label}</p>
      <p className={`flex items-center gap-1 text-[11px] font-semibold mt-2 ${deltaColor}`}>
        {DeltaIcon}
        {delta}
      </p>
    </div>
  );
}
