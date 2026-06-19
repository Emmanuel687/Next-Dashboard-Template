"use client";

/**
 * FunnelKpiStrip — 4 KPI cards for the Acquisition Funnel page.
 *
 * The first (hero) card is larger and uses the brand accent background.
 * The remaining 3 cards use the standard white/border style.
 *
 * @param {{ kpis: import("../data").FunnelKpi[] }} props
 */

export function FunnelKpiStrip({ kpis }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        kpi.hero ? <HeroCard key={kpi.id} kpi={kpi} /> : <StatCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}

function HeroCard({ kpi }) {
  return (
    <div className="col-span-2 lg:col-span-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-xl px-5 py-4">
      <p className="text-[32px] font-extrabold text-zinc-900 dark:text-zinc-50 leading-none tracking-tight">{kpi.value}</p>
      <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5">{kpi.label}</p>
      <DeltaBadge type={kpi.delta.type} text={kpi.delta.text} />
    </div>
  );
}

function StatCard({ kpi }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-xl px-5 py-4">
      <p className="text-[26px] font-bold text-zinc-900 dark:text-zinc-50 leading-none">{kpi.value}</p>
      <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5">{kpi.label}</p>
      <DeltaBadge type={kpi.delta.type} text={kpi.delta.text} />
    </div>
  );
}

function DeltaBadge({ type, text, onGreen = false }) {
  const base = onGreen ? "text-white/70" : "";
  const up   = onGreen ? "text-white"    : "text-[#03b155]";
  const down = onGreen ? "text-white/60" : "text-red-500";

  const colorClass =
    type === "up"   ? up   :
    type === "down" ? down :
                      base;

  const icon =
    type === "up"   ? "pi-arrow-up"   :
    type === "down" ? "pi-arrow-down" :
                      null;

  return (
    <p className={`flex items-center gap-1 text-[11px] font-semibold mt-2 ${colorClass}`}>
      {icon && <i className={`pi ${icon} text-[9px]`} aria-hidden="true" />}
      {text}
    </p>
  );
}
