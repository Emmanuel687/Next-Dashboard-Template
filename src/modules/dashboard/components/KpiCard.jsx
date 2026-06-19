"use client";

/**
 * KpiCard — ERP-style KPI metric card.
 *
 * Renders an icon, headline value, and a colour-coded delta pill that
 * communicates trend direction (up / down / warn).
 *
 * @param {{ card: import('../erpData').KpiCard }} props
 *
 * @example
 *   <KpiCard card={KPI_CARDS[0]} />
 */

import { ArrowUp, ArrowDown, AlertTriangle } from "lucide-react";

/** Delta type → icon + colour config */
const DELTA_CFG = {
  up:   { Icon: ArrowUp,       textCls: "text-[#03b155]",  bgCls: "bg-green-50  dark:bg-green-950/40"  },
  down: { Icon: ArrowDown,     textCls: "text-red-500",    bgCls: "bg-red-50    dark:bg-red-950/40"    },
  warn: { Icon: AlertTriangle, textCls: "text-amber-500",  bgCls: "bg-amber-50  dark:bg-amber-950/40"  },
};

export function KpiCard({ card }) {
  const CardIcon = card.icon;
  const cfg      = DELTA_CFG[card.delta.type] ?? DELTA_CFG.up;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">

      {/* Label + icon */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 leading-snug">
          {card.label}
        </p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
          <CardIcon size={16} className={card.iconColor} />
        </div>
      </div>

      {/* Headline value */}
      <p className="text-[28px] font-extrabold leading-none tracking-tight text-zinc-900 dark:text-white">
        {card.value}
      </p>

      {/* Delta pill */}
      <div className={`inline-flex items-center gap-1.5 self-start px-2 py-1 rounded-lg ${cfg.bgCls}`}>
        <cfg.Icon size={11} className={cfg.textCls} />
        <span className={`text-[11px] font-semibold ${cfg.textCls}`}>{card.delta.text}</span>
        <span className="text-[10px] text-zinc-400 dark:text-zinc-600">{card.vsLabel}</span>
      </div>
    </div>
  );
}
