"use client";

/**
 * GWAvatar — GreenWheels design-system avatar.
 * Wraps PrimeReact <Avatar> with unstyled + pt.
 * Derives initials from the name prop. Swap to image prop when real photos are available.
 *
 * Sizes:  xs (24px) | sm (28px) | md (36px) | lg (44px)
 * Colors: green | blue | amber | zinc
 *
 * Usage:
 *   <GWAvatar name="John Kamau" size="md" color="green" />
 *   <GWAvatar name="Grace W."   size="sm" color="zinc"  />
 */

import { Avatar } from "primereact/avatar";

const SIZES = {
  xs: { outer: "!w-6 !h-6 !min-w-6",   text: "text-[8px]"  },
  sm: { outer: "!w-7 !h-7 !min-w-7",   text: "text-[9px]"  },
  md: { outer: "!w-9 !h-9 !min-w-9",   text: "text-[11px]" },
  lg: { outer: "!w-11 !h-11 !min-w-11", text: "text-[13px]" },
};

const COLORS = {
  green: { bg: "bg-[#03b155]/10 dark:bg-[#03b155]/15", text: "text-[#03b155]" },
  blue:  { bg: "bg-blue-50 dark:bg-blue-950/40",        text: "text-blue-500"  },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/40",      text: "text-amber-500" },
  zinc:  { bg: "bg-zinc-100 dark:bg-white/[0.07]",      text: "text-zinc-500"  },
};

export function GWAvatar({
  name      = "",
  size      = "sm",
  color     = "green",
  className = "",
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const s = SIZES[size]   ?? SIZES.sm;
  const c = COLORS[color] ?? COLORS.green;

  return (
    <Avatar
      label={initials}
      shape="circle"
      unstyled
      pt={{
        root: {
          className: [
            s.outer,
            "rounded-full flex items-center justify-center shrink-0 font-bold",
            s.text,
            c.bg,
            c.text,
            className,
          ].join(" "),
        },
      }}
    />
  );
}
