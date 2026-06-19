"use client";

import Link from "next/link";
import { GWCard, GWBadge } from "@/components/ui";
import { PARTS_TOTAL } from "../../data";

const PART_STATUS_CFG = {
  on_order: { label: "On Order", className: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300" },
  in_stock: { label: "In Stock", className: "bg-green-50 dark:bg-green-950/40 text-[#03b155] dark:text-green-300"   },
};

export function PartsSummary({ parts }) {
  return (
    <GWCard compact title="Parts Summary">
      <div className="px-4 py-3 flex flex-col gap-2.5">
        {parts.map((part) => (
          <div key={part.id} className="flex items-center gap-2">
            <i className="pi pi-box text-[12px] text-zinc-400 shrink-0" />
            <span className="flex-1 text-[12px] text-zinc-700 dark:text-zinc-300 truncate">{part.name}</span>
            <span className="text-[11px] text-zinc-400 shrink-0">Qty: {part.qty}</span>
            <GWBadge
              label={(PART_STATUS_CFG[part.status] ?? PART_STATUS_CFG.in_stock).label}
              className={(PART_STATUS_CFG[part.status] ?? PART_STATUS_CFG.in_stock).className}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-white/[0.06]">
        <span className="text-[11.5px] text-zinc-500 dark:text-zinc-400">Total Parts Cost</span>
        <span className="text-[13px] font-bold text-zinc-900 dark:text-white">{PARTS_TOTAL}</span>
      </div>

      <div className="px-4 pb-3">
        <Link
          href="#"
          className="text-[11px] font-semibold text-[#03b155] hover:opacity-75 transition-opacity flex items-center gap-1"
        >
          View All Parts <i className="pi pi-chevron-right text-[9px]" />
        </Link>
      </div>
    </GWCard>
  );
}
