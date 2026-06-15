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

export function GWPageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-[20px] font-bold text-zinc-900 dark:text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2 shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
