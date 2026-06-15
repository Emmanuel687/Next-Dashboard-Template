"use client";

/**
 * GWBadge — GreenWheels design-system badge / pill.
 * Wraps PrimeReact <Tag> with unstyled + pt for the "pill" variant.
 * The "chip" variant (priority block) is a plain div — no Tag equivalent.
 *
 * variant="pill"  → compact inline label  (status tags, role tags)
 * variant="chip"  → block pill with icon  (priority badges)
 *
 * className drives the color — pass your cfg.className from module config.
 *
 * Usage:
 *   <GWBadge label="Completed" className="bg-green-50 text-[#03b155]" />
 *   <GWBadge label="High" variant="chip" icon="pi-flag-fill" iconClass="text-red-500" className="bg-red-50" />
 */

import { Tag } from "primereact/tag";

export function GWBadge({
  label,
  icon,
  iconClass = "",
  className = "",
  variant   = "pill",
}) {
  // Chip variant — no PrimeReact Tag needed
  if (variant === "chip") {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl ${className}`}>
        {icon && <i className={`pi ${icon} text-[13px] ${iconClass}`} />}
        <span className={`text-[12px] font-semibold ${iconClass}`}>{label}</span>
      </div>
    );
  }

  // Pill — PrimeReact Tag with unstyled + pt
  return (
    <Tag
      value={label}
      icon={icon ? `pi ${icon}` : undefined}
      unstyled
      pt={{
        root: {
          className: [
            "inline-flex items-center gap-1",
            "text-[11px] font-semibold",
            "px-2.5 py-0.5 rounded-full whitespace-nowrap",
            className,
          ].join(" "),
        },
        icon: { className: `text-[9px] ${iconClass}` },
      }}
    />
  );
}
