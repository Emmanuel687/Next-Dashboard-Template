"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EVENT_CFG } from "../data";

export function RecentActivity({ events, live, onToggleLive }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden flex flex-col">

      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <div>
          <h2 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Recent Activity</h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">Last 8 operational events</p>
        </div>

        {/* PrimeReact-styled live toggle using a custom pill button */}
        <button
          onClick={onToggleLive}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
            live
              ? "bg-[#03b155]/10 text-[#03b155] border-[#03b155]/20"
              : "bg-zinc-100 dark:bg-white/[0.07] text-zinc-400 border-zinc-200 dark:border-white/[0.08]"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              live ? "bg-[#03b155] animate-pulse" : "bg-zinc-400"
            }`}
          />
          <i className={`pi pi-${live ? "wifi" : "pause"} text-[9px]`} />
          {live ? "Live" : "Paused"}
        </button>
      </div>

      {/* Event list */}
      <div className="flex-1 divide-y divide-zinc-50 dark:divide-white/[0.03]">
        {events.map((event) => {
          const cfg  = EVENT_CFG[event.type] ?? EVENT_CFG.info;
          const Icon = cfg.icon;
          return (
            <div
              key={event.id}
              className="flex items-center gap-3.5 px-5 py-3 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-colors"
            >
              {/* Status dot */}
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />

              {/* Icon badge */}
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
                <Icon size={13} className={cfg.iconColor} />
              </div>

              {/* Label */}
              <span className="flex-1 text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300 truncate">
                {event.label}
              </span>

              {/* Job ref */}
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0 hidden sm:block">
                {event.ref}
              </span>

              {/* Time ago */}
              <span className="text-[10.5px] text-zinc-400 dark:text-zinc-600 shrink-0 w-[68px] text-right">
                {event.ago}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      <div className="px-5 py-3 border-t border-zinc-100 dark:border-white/[0.05]">
        <Link
          href="/fleet/vehicles"
          className="flex items-center gap-1 text-[11px] font-semibold text-[#03b155] hover:opacity-75 transition-opacity w-fit"
        >
          View all activity <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}
