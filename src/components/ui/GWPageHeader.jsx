"use client";

/**
 * GWPageHeader — GreenWheels design-system page header.
 *
 * Renders the standard title + subtitle block with an optional
 * right-side action slot (pass any ReactNode — usually a GWButton).
 *
 * Example:
 *   <GWPageHeader
 *     title="Maintenance Jobs"
 *     subtitle="8 total jobs across the fleet"
 *     action={<GWButton variant="primary" icon="pi-plus">New Job</GWButton>}
 *   />
 */

export function GWPageHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#03b155] mb-1">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[20px] font-bold text-[#03b155] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
