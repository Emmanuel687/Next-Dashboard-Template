"use client";

/**
 * DeptSpendChart — Department spend horizontal progress bars.
 *
 * Each row shows a department name, a colour-coded progress track,
 * and the formatted KSh spend amount. Uses GWProgressBar so the
 * track/fill styling is consistent with the rest of the design system.
 *
 * @param {{ data: import('../erpData').DeptSpend[] }} props
 *
 * @example
 *   <DeptSpendChart data={DEPT_SPEND} />
 */

import { GWCard, GWProgressBar } from "@/components/ui";

export function DeptSpendChart({ data }) {
  return (
    <GWCard
      title="Department Spend"
      subtitle="Budget utilisation by department — MTD"
    >
      <div className="px-5 py-4 flex flex-col gap-4">
        {data.map((dept) => (
          <div key={dept.id} className="flex flex-col gap-1.5">

            {/* Row header: name + amount */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
                {dept.label}
              </span>
              <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 shrink-0 tabular-nums">
                {dept.amount}
              </span>
            </div>

            {/* Progress bar */}
            <GWProgressBar value={dept.pct} color={dept.color} height={7} />
          </div>
        ))}
      </div>
    </GWCard>
  );
}
