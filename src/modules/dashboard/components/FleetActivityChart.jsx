"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { BRAND } from "../data";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg px-3 py-2.5">
      <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-200 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-zinc-500 dark:text-zinc-400 capitalize">{p.name}</span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100 ml-auto pl-3">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function FleetActivityChart({ data }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <div>
          <h2 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Fleet Activity</h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">Jobs opened vs. completed — last 7 days</p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3">
          {[
            { label: "Completed", color: BRAND     },
            { label: "Opened",    color: "#60a5fa" },
            { label: "Critical",  color: "#f87171" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="px-2 pt-4 pb-2" style={{ height: 196 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={10} barGap={3} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              width={28}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)", radius: 4 }} />
            <Bar dataKey="completed" fill={BRAND}     radius={[4, 4, 0, 0]} />
            <Bar dataKey="opened"    fill="#60a5fa"   radius={[4, 4, 0, 0]} />
            <Bar dataKey="critical"  fill="#f87171"   radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
