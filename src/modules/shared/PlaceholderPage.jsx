"use client";

/**
 * PlaceholderPage — standard coming-soon shell for unimplemented sections.
 *
 * Layout (top → bottom):
 *   1. Page header  — green eyebrow · title · subtitle | action buttons
 *   2. Stats strip  — 4 KPI cards (value · label · optional delta)
 *   3. Empty-state  — GWCard with icon + "Coming Soon" + description + CTA
 *
 * Props:
 *   eyebrow         string    — small uppercase label above the title
 *   title           string    — page title
 *   subtitle        string    — one-line description below the title
 *   icon            string    — PrimeIcon class for the empty-state (e.g. "pi-car")
 *   stats           Stat[]    — array of exactly 4 stat objects (see typedef)
 *   description     string    — body text inside the empty-state card
 *   primaryAction   { label, icon }  — green primary button
 *   secondaryAction { label, icon }  — secondary ghost button (optional)
 *
 * @typedef {{ value: string, label: string, delta?: { type: 'up'|'down'|'warn', text: string } }} Stat
 */

import { GWButton, GWCard } from "@/components/ui";

// ─── Stat card ────────────────────────────────────────────────

function StatCard({ stat }) {
  const { value, label, delta } = stat;

  const colorClass =
    delta?.type === "up"   ? "text-[#03b155]" :
    delta?.type === "down" ? "text-red-500"    :
    delta?.type === "warn" ? "text-amber-500"  :
                             "text-zinc-400";

  const iconClass =
    delta?.type === "up"   ? "pi-arrow-up"          :
    delta?.type === "down" ? "pi-arrow-down"         :
    delta?.type === "warn" ? "pi-exclamation-circle" :
                             null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-xl px-5 py-4">
      <p className="text-[26px] font-bold text-zinc-900 dark:text-zinc-50 leading-none tracking-tight">
        {value}
      </p>
      <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5">
        {label}
      </p>
      {delta && (
        <p className={`flex items-center gap-1 text-[11px] font-semibold mt-2 ${colorClass}`}>
          {iconClass && <i className={`pi ${iconClass} text-[9px]`} aria-hidden="true" />}
          {delta.text}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function PlaceholderPage({
  eyebrow,
  title,
  subtitle,
  icon        = "pi-inbox",
  stats,
  description = "This section is being built. Check back soon.",
  primaryAction,
  secondaryAction,
}) {
  return (
    <div className="flex flex-col gap-5">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#03b155] mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="text-[22px] font-bold text-[#0f1f18] dark:text-zinc-50 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0 sm:mt-1">
            {secondaryAction && (
              <GWButton
                variant="secondary"
                icon={secondaryAction.icon}
                label={secondaryAction.label}
              />
            )}
            {primaryAction && (
              <GWButton
                variant="primary"
                icon={primaryAction.icon}
                label={primaryAction.label}
              />
            )}
          </div>
        )}
      </div>

      {/* ── Stats strip ── */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>
      )}

      {/* ── Empty-state card ── */}
      <GWCard>
        <div className="flex flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-16">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[#03b155]/10 mb-5">
            <i className={`pi ${icon} text-[28px] text-[#03b155]`} aria-hidden="true" />
          </div>
          <h2 className="text-[15px] font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            Coming Soon
          </h2>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-100 leading-relaxed">
            {description}
          </p>
          {primaryAction && (
            <div className="mt-6">
              <GWButton
                variant="primary"
                icon={primaryAction.icon}
                label={primaryAction.label}
                size="md"
              />
            </div>
          )}
        </div>
      </GWCard>

    </div>
  );
}
