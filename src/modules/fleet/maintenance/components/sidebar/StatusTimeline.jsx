"use client";

import { GWStepper } from "@/components/ui/GWStepper";
import { STATUS_TIMELINE } from "../../data";

export function StatusTimeline({ steps = STATUS_TIMELINE }) {
  return <GWStepper title="Status Timeline" steps={steps} />;
}
