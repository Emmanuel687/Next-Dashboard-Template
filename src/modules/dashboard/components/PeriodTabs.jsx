"use client";

/**
 * PeriodTabs — Pill-style time-period selector.
 *
 * Renders a segment-button strip where only one period is active at a time.
 * Fully controlled: the parent owns `active` and `onChange`.
 *
 * @param {{
 *   tabs:     string[],
 *   active:   string,
 *   onChange: (tab: string) => void,
 * }} props
 *
 * @example
 *   const [period, setPeriod] = useState("Month");
 *   <PeriodTabs tabs={PERIOD_TABS} active={period} onChange={setPeriod} />
 */

export function PeriodTabs({ tabs, active, onChange }) {
  return (
    <div
      role="group"
      aria-label="Time period"
      className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-lg border border-zinc-200/80 bg-zinc-200/70 p-0.5 [scrollbar-width:none] dark:border-transparent dark:bg-white/[0.06] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            aria-pressed={isActive}
            className={[
              "h-7 shrink-0 px-3 rounded-md text-[12px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#03b155]/30",
              isActive
                ? "bg-[#03b155] text-white shadow-sm shadow-[#03b155]/20"
                : "text-zinc-600 hover:bg-white/45 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-transparent dark:hover:text-zinc-200",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
