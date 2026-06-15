"use client";

/**
 * GWTabs — GreenWheels design-system tab component.
 * Fully Tailwind-native, no PrimeReact internals.
 *
 * Tab definition:
 *   { label, icon?, badge?, content }
 *
 * Controlled:   pass activeIndex + onTabChange
 * Uncontrolled: pass defaultIndex only
 */

import { useState } from "react";

function clx(...parts) {
  return parts.filter(Boolean).join(" ");
}

export function GWTabs({
  tabs          = [],
  defaultIndex  = 0,
  activeIndex,
  onTabChange,
  contentClass  = "p-5",
}) {
  const [internal, setInternal] = useState(defaultIndex);
  const active = activeIndex ?? internal;

  function handleTab(i) {
    setInternal(i);
    onTabChange?.(i);
  }

  return (
    <div className="flex flex-col">

      {/* ── Tab strip ── */}
      <div className="flex items-end border-b border-zinc-100 dark:border-white/[0.06] overflow-x-auto scrollbar-none">
        {tabs.map((tab, i) => {
          const isActive = active === i;
          return (
            <button
              key={tab.label}
              onClick={() => handleTab(i)}
              className={clx(
                "relative flex items-center gap-1.5 h-10 px-4 shrink-0",
                "text-[13px] whitespace-nowrap transition-colors",
                "border-b-2 -mb-px",
                isActive
                  ? "border-[#03b155] text-[#03b155] font-semibold"
                  : "border-transparent text-zinc-500 dark:text-zinc-400 font-medium hover:text-zinc-700 dark:hover:text-zinc-200",
              )}
            >
              {tab.icon && (
                <i className={clx("pi", tab.icon, "text-[11px]")} />
              )}
              {tab.label}
              {tab.badge != null && (
                <span
                  className={clx(
                    "min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold",
                    "flex items-center justify-center",
                    isActive
                      ? "bg-[#03b155] text-white"
                      : "bg-zinc-100 dark:bg-white/[0.08] text-zinc-500 dark:text-zinc-400",
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Active tab content ── */}
      <div className={contentClass}>
        {tabs[active]?.content}
      </div>
    </div>
  );
}
