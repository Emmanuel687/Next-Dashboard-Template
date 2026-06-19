"use client";

import { GWBadge } from "@/components/ui";
import { ROLE_CFG } from "../../data";

export function RoleBadge({ role }) {
  const cfg = ROLE_CFG[role] ?? { className: "bg-zinc-100 dark:bg-white/[0.07] text-zinc-600" };
  return <GWBadge label={role} className={cfg.className} />;
}
