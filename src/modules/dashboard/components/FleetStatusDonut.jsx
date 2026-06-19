"use client";

/**
 * FleetStatusDonut — Fleet status breakdown as a donut chart.
 *
 * Uses Recharts PieChart with a hole (innerRadius) to create the donut.
 * The total bike count is overlaid at the centre via absolute positioning —
 * Recharts SVG text-inside-donut requires hacks that break across themes,
 * so a CSS overlay is the cleaner approach here.
 *
 * The legend below mirrors the ERP design: name + count + percentage.
 *
 * @param {{
 *   data:  import('../erpData').FleetSegment[],
 *   total: number,
 * }} props
 *
 * @example
 *   <FleetStatusDonut data={FLEET_STATUS} total={FLEET_TOTAL} />
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { GWCard } from "@/components/ui";

export function FleetStatusDonut({ data, total }) {
  return (
    <GWCard
      title="Fleet Status"
      subtitle={`${total.toLocaleString()} e-bikes across 3 hubs`}
    >
      <div className="px-5 pb-5 pt-2 flex flex-col items-center gap-5">

        {/* Donut + centre label */}
        <div className="relative w-full" style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={52}
                outerRadius={76}
                startAngle={90}
                endAngle={-270}
                stroke="transparent"
                isAnimationActive={false}
              >
                {data.map((seg) => (
                  <Cell key={seg.id} fill={seg.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centre text — overlaid so it works in both light and dark mode */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-bold text-zinc-900 dark:text-white leading-none">
              {total.toLocaleString()}
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">
              Total Bikes
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full flex flex-col gap-2">
          {data.map((seg) => (
            <div key={seg.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: seg.color }}
                />
                <span className="text-[12px] text-zinc-600 dark:text-zinc-400">
                  {seg.label}
                </span>
              </div>
              <div className="text-right tabular-nums">
                <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100">
                  {seg.value.toLocaleString()}
                </span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600 ml-1.5">
                  ({seg.pct}%)
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </GWCard>
  );
}
