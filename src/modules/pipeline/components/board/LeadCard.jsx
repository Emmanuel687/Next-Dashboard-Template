"use client";

/**
 * LeadCard — individual draggable card in the Kanban board.
 *
 * Displays:
 *  - Customer monogram tile (deterministic color from name)
 *  - Customer name + contact (role · area)
 *  - Lead source with PrimeIcon
 *  - Owner initials chip
 *  - Days in stage OR "Won" chip + date
 *
 * HTML5 drag-and-drop: sets dataTransfer JSON payload on dragstart
 * so LeadColumn can handle the drop.
 *
 * @param {{ lead: import("../../data").Lead, fromColId: string }} props
 */

import { memo, useState } from "react";
import { tileFor, assigneeColor, SOURCE_ICONS } from "../../data";

const LeadCard = memo(function LeadCard({ lead, fromColId }) {
  const { customer, contact, source, owner, days, won, wonDate } = lead;
  const [dragging, setDragging] = useState(false);

  const tile   = tileFor(customer);
  const ownerA = assigneeColor(owner);
  const srcIcon = SOURCE_ICONS[source] ?? "pi-user";

  function onDragStart(e) {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ leadId: lead.id, fromColId }),
    );
    e.dataTransfer.effectAllowed = "move";
    setDragging(true);
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={() => setDragging(false)}
      tabIndex={0}
      className={[
        "bg-white dark:bg-zinc-800/80 border rounded-xl p-3 cursor-grab active:cursor-grabbing select-none",
        "transition-all duration-150",
        won
          ? "border-[#03b155]/30 dark:border-[#03b155]/20"
          : "border-zinc-200/80 dark:border-white/[0.08]",
        dragging
          ? "opacity-40 ring-2 ring-[#03b155]/30 shadow-sm"
          : "hover:shadow-md hover:border-zinc-300 dark:hover:border-white/[0.14]",
      ].join(" ")}
    >
      {/* Customer row */}
      <div className="flex items-start gap-2.5 mb-2.5">
        {/* Monogram tile */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[13px] font-bold"
          style={{ background: tile.bg, color: tile.fg }}
          aria-hidden="true"
        >
          {customer[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
            {customer}
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
            {contact}
          </p>
        </div>
      </div>

      {/* Source */}
      <div className="flex items-center gap-1.5 mb-3">
        <i className={`pi ${srcIcon} text-[10px] text-zinc-400`} aria-hidden="true" />
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{source}</span>
      </div>

      {/* Footer: owner + days/won */}
      <div className="flex items-center justify-between gap-2">
        {/* Owner chip */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{ background: ownerA.bg, color: ownerA.color }}
          title={`Owner: ${owner}`}
        >
          {owner}
        </div>

        {won ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full text-[10px] font-bold bg-[#03b155]/10 text-[#03b155]">
              <i className="pi pi-check-circle text-[9px]" aria-hidden="true" />
              Won
            </span>
            <span className="text-[10.5px] text-zinc-400 dark:text-zinc-500">{wonDate}</span>
          </div>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500">
            <i className="pi pi-clock text-[10px]" aria-hidden="true" />
            {days}
          </span>
        )}
      </div>
    </div>
  );
});

export default LeadCard;
