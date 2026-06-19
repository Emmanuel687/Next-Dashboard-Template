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
      className="flex items-center bg-zinc-100 dark:bg-white/[0.06] rounded-lg p-0.5 gap-0.5"
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
              "h-7 px-3 rounded-md text-[12px] font-semibold transition-all",
              isActive
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
