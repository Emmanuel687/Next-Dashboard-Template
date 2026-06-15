"use client";

/**
 * GWCard — GreenWheels design-system card shell.
 *
 * Optional header: title + subtitle (left) + action slot (right).
 * compact prop shrinks header padding for sidebar / dense layouts.
 * Children manage their own internal padding.
 */

export function GWCard({
  title,
  subtitle,
  action,
  children,
  compact   = false,
  className = "",
}) {
  const hasHeader  = title || subtitle || action;
  const headerPad  = compact ? "px-4 py-3.5" : "px-5 py-4";

  return (
    <div
      className={[
        "bg-white dark:bg-zinc-900",
        "border border-zinc-200/60 dark:border-white/[0.06]",
        "rounded-2xl overflow-hidden",
        className,
      ].join(" ")}
    >
      {hasHeader && (
        <div className={`flex items-center justify-between gap-3 border-b border-zinc-100 dark:border-white/[0.06] ${headerPad}`}>
          {(title || subtitle) && (
            <div className="min-w-0">
              {title    && <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>}
              {subtitle && <p  className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>}
            </div>
          )}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
