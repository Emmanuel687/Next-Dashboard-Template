"use client";

import { Card } from "primereact/card";

export function GWCard({
  title,
  subtitle,
  action,
  children,
  compact   = false,
  className = "",
}) {
  const hasHeader = title || subtitle || action;
  const hPad     = compact ? "px-4 py-3.5" : "px-5 py-4";

  const headerTemplate = hasHeader ? (
    <div className={`flex items-center justify-between gap-3 border-b border-zinc-100 dark:border-white/6 ${hPad}`}>
      {(title || subtitle) && (
        <div className="min-w-0">
          {title    && <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>}
          {subtitle && <p  className="text-[11px] text-zinc-400 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ) : undefined;

  return (
    <Card
      header={headerTemplate}
      unstyled
      pt={{
        root:    { className: ["bg-white dark:bg-zinc-900", "border border-zinc-200/60 dark:border-white/6", "rounded-2xl overflow-hidden", className].join(" ") },
        body:    { className: "" },
        content: { className: "" },
      }}
    >
      {children}
    </Card>
  );
}
