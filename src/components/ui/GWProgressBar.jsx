"use client";

/**
 * GWProgressBar — GreenWheels design-system progress bar.
 * Wraps PrimeReact <ProgressBar> with unstyled + pt.
 * Color and height are controlled via props — no module writes PT again.
 *
 * Usage:
 *   <GWProgressBar value={75} />
 *   <GWProgressBar value={75} color={row.color} height={6} className="flex-1" />
 *   <GWProgressBar value={75} showLabel />
 *   <GWProgressBar value={100} labelClass="text-[#03b155] font-bold" showLabel />
 */

import { ProgressBar } from "primereact/progressbar";

export function GWProgressBar({
  value      = 0,
  color      = "#03b155",
  height     = 6,
  trackClass = "bg-zinc-100 dark:bg-white/[0.08]",
  showLabel  = false,
  labelClass = "text-[11px] font-semibold text-zinc-500 dark:text-zinc-400",
  className  = "",
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <ProgressBar
        value={clamped}
        showValue={false}
        unstyled
        pt={{
          root: {
            className: `flex-1 rounded-full overflow-hidden ${trackClass}`,
            style: { height },
          },
          value: {
            className: "h-full rounded-full transition-all duration-700",
            style: { background: color },
          },
        }}
      />
      {showLabel && (
        <span className={`shrink-0 w-9 text-right ${labelClass}`}>
          {clamped}%
        </span>
      )}
    </div>
  );
}
