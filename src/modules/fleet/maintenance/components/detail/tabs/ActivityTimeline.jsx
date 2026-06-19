"use client";

/**
 * ActivityTimeline — Timeline tab for a maintenance job.
 *
 * Renders a vertical list of activity events, newest first:
 *  - Current step: pulsing green dot + "Current Step" chip
 *  - Past steps:   green check-circle dot
 *  - Each event:   actor avatar + name + role badge + date/time + description
 *
 * Ported from Greenwheels-ERP ActivityTimeline.jsx.
 *
 * @param {{ events: import("../../../data").JOB_DETAIL["activity"] }} props
 */

import { GWAvatar } from "@/components/ui";
import { ROLE_CFG } from "../../../data";

// ─── Event dot ────────────────────────────────────────────────

function EventDot({ isCurrent }) {
  if (isCurrent) {
    return (
      <div className="relative flex items-center justify-center w-7 h-7 shrink-0">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#03b155]/20 animate-ping" />
        <span className="w-3.5 h-3.5 rounded-full bg-[#03b155] border-2 border-white dark:border-zinc-900 shadow-sm z-10" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 shrink-0 flex items-center justify-center rounded-full bg-[#03b155]/10 dark:bg-[#03b155]/15">
      <i className="pi pi-check text-[10px] text-[#03b155]" aria-hidden="true" />
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────

function RoleBadge({ role }) {
  const cfg = ROLE_CFG[role] ?? ROLE_CFG.Auto;
  return (
    <span className={`inline-flex items-center h-5 px-2 rounded-full text-[10px] font-semibold ${cfg.className}`}>
      {role}
    </span>
  );
}

// ─── Single event ─────────────────────────────────────────────

function EventItem({ event, isLast }) {
  return (
    <li className="relative flex gap-4">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-3.5 top-7 bottom-0 w-px bg-zinc-100 dark:bg-white/[0.06]" />
      )}

      {/* Dot */}
      <EventDot isCurrent={event.isCurrent} />

      {/* Body */}
      <div className="flex-1 min-w-0 pb-6">
        {/* Title row */}
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-[13px] font-semibold text-zinc-800 dark:text-zinc-100">
            {event.title}
          </span>
          {event.isCurrent && (
            <span className="inline-flex items-center h-5 px-2 rounded-full text-[10px] font-bold bg-[#03b155]/10 text-[#03b155]">
              Current Step
            </span>
          )}
        </div>

        {/* Meta: date · actor · role */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11.5px] text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            {event.date} {event.time}
          </span>
          <span className="text-zinc-200 dark:text-zinc-700">·</span>
          <GWAvatar name={event.actor.name} size="xs" color="green" />
          <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
            {event.actor.name}
          </span>
          <RoleBadge role={event.role} />
        </div>

        {/* Description */}
        <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {event.description}
        </p>
      </div>
    </li>
  );
}

// ─── Component ────────────────────────────────────────────────

export function ActivityTimeline({ events }) {
  const lastUpdated = events[0]?.time ?? "";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <div>
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
            Job Activity Timeline
          </h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {events.length} events · Last updated {lastUpdated}
          </p>
        </div>
        <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-white/[0.07] text-zinc-600 dark:text-zinc-300">
          {events.length} Events
        </span>
      </div>

      {/* Events list */}
      <ol className="px-5 pt-5" aria-label="Job activity">
        {events.map((event, i) => (
          <EventItem
            key={event.id}
            event={event}
            isLast={i === events.length - 1}
          />
        ))}
      </ol>
    </div>
  );
}
