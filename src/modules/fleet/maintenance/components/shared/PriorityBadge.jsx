"use client";

import { GWBadge } from "@/components/ui";
import { PRIORITY_CFG } from "../../data";

export function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CFG[priority] ?? PRIORITY_CFG.medium;
  return (
    <GWBadge
      variant="chip"
      label={cfg.label}
      icon={cfg.icon}
      iconClass={cfg.color}
      className={cfg.bg}
    />
  );
}
