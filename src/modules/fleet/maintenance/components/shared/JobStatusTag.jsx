"use client";

import { GWBadge } from "@/components/ui";
import { STATUS_CFG } from "../../data";

export function JobStatusTag({ status }) {
  const cfg = STATUS_CFG[status] ?? { label: status, className: "bg-zinc-100 text-zinc-600" };
  return <GWBadge label={cfg.label} className={cfg.className} />;
}
