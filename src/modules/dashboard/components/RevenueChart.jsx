"use client";

/**
 * RevenueChart — Revenue & Cost line chart.
 *
 * Renders three time-series lines over 6 months using Recharts LineChart:
 *   - Lease Revenue  (solid green  #03b155)
 *   - Fleet Cost     (dashed yellow #FFDB4B)
 *   - Net Margin     (solid teal   #399180)
 *
 * The Y-axis ticks mirror the ERP design (8M / 16M / 23M / 31M).
 * A custom tooltip shows all three values for the hovered month.
 *
 * @param {{
 *   data:  import('../erpData').RevenuePoint[],
 *   lines: typeof import('../erpData').REVENUE_LINES,
 * }} props
 *
 * @example
 *   <RevenueChart data={REVENUE_DATA} lines={REVENUE_LINES} />
 */

import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { GWCard } from "@/components/ui";

// ─── Custom tooltip ───────────────────────────────────────────

function ChartTooltip({ active, payload, label, lines }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg px-3 py-2.5 min-w-[160px]">
      <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-200 mb-2">{label} 2026</p>
      {payload.map((p) => {
        const line = lines.find((l) => l.key === p.dataKey);
        return (
          <div key={p.dataKey} className="flex items-center gap-2 text-[11px] mb-0.5">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="text-zinc-500 dark:text-zinc-400">{line?.label ?? p.dataKey}</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-100 ml-auto pl-3">
              KSh {p.value}M
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Legend item ──────────────────────────────────────────────

function LegendItem({ line }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
      {line.dashed ? (
        /* Dashed indicator — two short segments */
        <span className="flex items-center gap-0.5">
          <span className="w-2 h-[2px] rounded-full" style={{ background: line.color }} />
          <span className="w-2 h-[2px] rounded-full" style={{ background: line.color }} />
        </span>
      ) : (
        <span className="w-4 h-[2px] rounded-full" style={{ background: line.color }} />
      )}
      {line.label}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────

export function RevenueChart({ data, lines }) {
  return (
    <GWCard
      title="Revenue & Cost"
      subtitle="Lease revenue, fleet cost, and net margin — Jan–Jun 2026"
      action={
        <div className="flex items-center gap-3 flex-wrap">
          {lines.map((l) => <LegendItem key={l.key} line={l} />)}
        </div>
      }
    >
      <div className="px-2 pt-4 pb-2" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(0,0,0,0.05)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              width={38}
              tickFormatter={(v) => `${v}M`}
              domain={[6, 32]}
              ticks={[8, 16, 23, 31]}
            />
            <Tooltip
              content={(props) => <ChartTooltip {...props} lines={lines} />}
              cursor={{ stroke: "rgba(0,0,0,0.05)", strokeWidth: 1 }}
            />
            {lines.map((l) => (
              <Line
                key={l.key}
                type="monotone"
                dataKey={l.key}
                stroke={l.color}
                strokeWidth={2.5}
                strokeDasharray={l.dashed ? "6 4" : undefined}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GWCard>
  );
}
