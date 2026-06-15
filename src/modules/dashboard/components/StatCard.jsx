"use client";

import { Tag } from "primereact/tag";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const TREND_ICON = { up: TrendingUp, down: TrendingDown, neutral: Minus };

// Maps trend → PrimeReact Tag severity
const SEVERITY_CLASS = {
  success:   "!bg-green-50  dark:!bg-green-950/40  !text-[#03b155] !border-0",
  danger:    "!bg-red-50    dark:!bg-red-950/40    !text-red-500   !border-0",
  secondary: "!bg-zinc-100  dark:!bg-white/[0.07]  !text-zinc-500  !border-0",
};

export function StatCard({ stat }) {
  const Icon      = stat.icon;
  const TrendIcon = TREND_ICON[stat.trend] ?? Minus;
  const sparkPts  = stat.spark.map((v) => ({ v }));

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">

      {/* Icon + Trend */}
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.bg}`}>
          <Icon size={16} className={stat.iconColor} />
        </div>

        <Tag
          value={stat.trendLabel}
          severity={stat.trendSeverity}
          icon={<TrendIcon size={9} className="mr-0.5" />}
          pt={{
            root: {
              className: `flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${SEVERITY_CLASS[stat.trendSeverity]}`,
            },
          }}
          unstyled
        />
      </div>

      {/* Value + labels */}
      <div>
        <p className="text-[28px] font-extrabold leading-none tracking-tight text-zinc-900 dark:text-white">
          {stat.value}
        </p>
        <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 mt-1">{stat.label}</p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-600">{stat.sub}</p>
      </div>

      {/* Recharts AreaChart sparkline */}
      <div className="-mx-1 -mb-1">
        <ResponsiveContainer width="100%" height={36}>
          <AreaChart data={sparkPts} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`sg-${stat.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={stat.sparkColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={stat.sparkColor} stopOpacity={0}    />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={stat.sparkColor}
              strokeWidth={1.8}
              fill={`url(#sg-${stat.key})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
