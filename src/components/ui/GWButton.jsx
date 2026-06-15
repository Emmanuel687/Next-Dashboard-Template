"use client";

/**
 * GWButton — GreenWheels design-system button.
 * Wraps PrimeReact <Button> with unstyled + pt.
 * PT is written once here — no module ever touches it again.
 *
 * Variants: primary | secondary | ghost | danger | link
 * Sizes:    sm (h-8) | md (h-9) | icon (w-8 h-8, no label)
 *
 * Usage:
 *   <GWButton variant="primary" icon="pi-plus" label="New Job" />
 *   <GWButton variant="secondary" icon="pi-user-edit" label="Reassign" labelClass="hidden sm:inline" />
 *   <GWButton variant="ghost" icon="pi-chevron-right" />           ← icon-only
 *   <GWButton variant="link" label="+ Add Note" onClick={fn} />
 *
 * String children are forwarded as label (backward compat):
 *   <GWButton variant="primary">New Job</GWButton>
 */

import { Button } from "primereact/button";

const VARIANTS = {
  primary:   "bg-[#03b155] text-white hover:opacity-90",
  secondary: "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/[0.1] hover:bg-zinc-50 dark:hover:bg-white/[0.04]",
  ghost:     "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.06] hover:text-zinc-800 dark:hover:text-zinc-200",
  danger:    "text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
  link:      "text-[#03b155] hover:opacity-75 !px-0",
};

const SIZES = {
  sm:   "h-8 px-3 text-[12px]",
  md:   "h-9 px-4 text-[13px]",
  icon: "w-8 h-8 !px-0 text-[13px]",
};

export function GWButton({
  variant    = "secondary",
  size       = "sm",
  icon,
  iconPos    = "left",
  iconSize   = "text-[11px]",
  label,
  labelClass = "",
  children,
  className  = "",
  disabled,
  onClick,
  type       = "button",
  title,
}) {
  // Accept string children as label (JSX children are not supported — use label prop)
  const resolvedLabel = label !== undefined
    ? label
    : (typeof children === "string" ? children.trim() : undefined);

  const isIconOnly = !resolvedLabel && !!icon;
  const sizeClass  = isIconOnly ? SIZES.icon : (SIZES[size] ?? SIZES.sm);

  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      label={resolvedLabel}
      icon={icon ? `pi ${icon}` : undefined}
      iconPos={iconPos}
      unstyled
      pt={{
        root: {
          className: [
            "inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold",
            "transition-all cursor-pointer shrink-0",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            sizeClass,
            VARIANTS[variant] ?? VARIANTS.secondary,
            className,
          ].filter(Boolean).join(" "),
        },
        label: { className: labelClass || undefined },
        icon:  { className: iconSize },
      }}
    />
  );
}
