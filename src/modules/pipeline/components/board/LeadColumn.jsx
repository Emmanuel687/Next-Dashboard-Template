"use client";

/**
 * LeadColumn — a single stage column in the Acquisition Funnel Kanban board.
 *
 * Features:
 *  - Stage color dot + name + volume count
 *  - Conversion rate from previous stage (→ 33.9%)
 *  - Relative-volume progress bar showing funnel drop-off
 *  - Drag-and-drop target (highlights on dragover)
 *  - Scrollable list of LeadCard components
 *  - "Add Lead" footer button
 *
 * @param {{
 *   column: import("../../data").LeadColumn,
 *   onAddLead: (colId: string) => void,
 *   onMoveLead: (leadId: string, from: string, to: string) => void,
 * }} props
 */

import { useRef, useState } from "react";
import LeadCard from "./LeadCard";

const FMT = new Intl.NumberFormat("en-US");

export default function LeadColumn({ column, onAddLead, onMoveLead }) {
  const { id, label, color, volume, conv, bar, leads } = column;
  const [dragOver, setDragOver] = useState(false);
  const counter = useRef(0);

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function onDragEnter() {
    counter.current++;
    setDragOver(true);
  }

  function onDragLeave() {
    counter.current--;
    if (counter.current === 0) setDragOver(false);
  }

  function onDrop(e) {
    e.preventDefault();
    counter.current = 0;
    setDragOver(false);
    try {
      const { leadId, fromColId } = JSON.parse(
        e.dataTransfer.getData("application/json"),
      );
      if (fromColId !== id) onMoveLead?.(leadId, fromColId, id);
    } catch {}
  }

  const isWon = id === "won";

  return (
    <div
      className={[
        "flex flex-col shrink-0 w-[272px] rounded-2xl transition-colors duration-150",
        "bg-zinc-50 dark:bg-zinc-900/60",
        "border",
        dragOver
          ? "border-[#03b155]/50 bg-[#03b155]/5 dark:bg-[#03b155]/5"
          : "border-zinc-200/60 dark:border-white/6",
      ].join(" ")}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* ── Column header ── */}
      <div className="px-3.5 pt-3.5 pb-2">
        {/* Stage name row */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: color }}
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-bold text-zinc-800 dark:text-zinc-100">
              {label}
            </span>
          </div>
          <span className="text-[12px] font-semibold text-zinc-500 dark:text-zinc-400">
            {FMT.format(volume)}
          </span>
        </div>

        {/* Conversion rate */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 leading-none">
            {isWon ? "Closed won" : "Leads in this stage"}
          </p>
          {conv && (
            <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-zinc-500 dark:text-zinc-400">
              <i className="pi pi-arrow-right text-[8px]" aria-hidden="true" />
              {conv}
            </span>
          )}
        </div>

        {/* Volume bar */}
        <div className="h-1 rounded-full bg-zinc-200 dark:bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${bar * 100}%`, background: color }}
          />
        </div>
      </div>

      {/* ── Cards list ── */}
      <div className="flex-1 overflow-y-auto px-3.5 py-2 flex flex-col gap-2 max-h-[calc(100vh-340px)] min-h-[80px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {leads.length === 0 ? (
          <div className={[
            "flex items-center justify-center h-16 rounded-xl border-2 border-dashed",
            dragOver
              ? "border-[#03b155]/40 bg-[#03b155]/5"
              : "border-zinc-200 dark:border-white/[0.07]",
          ].join(" ")}>
            <p className="text-[11px] text-zinc-300 dark:text-zinc-700">Drop here</p>
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} fromColId={id} />
          ))
        )}
      </div>

      {/* ── Add lead footer ── */}
      <div className="px-3.5 pb-3.5 pt-2">
        <button
          type="button"
          onClick={() => onAddLead?.(id)}
          className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg text-[11.5px] font-semibold text-zinc-400 dark:text-zinc-500 hover:text-[#03b155] hover:bg-white dark:hover:bg-zinc-800 border border-dashed border-zinc-200 dark:border-white/[0.07] hover:border-[#03b155]/40 transition-all"
        >
          <i className="pi pi-plus text-[10px]" aria-hidden="true" />
          Add Lead
        </button>
      </div>
    </div>
  );
}
