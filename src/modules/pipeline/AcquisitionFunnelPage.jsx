"use client";

/**
 * AcquisitionFunnelPage — Greenwheels OS2 Acquisition Funnel.
 *
 * Layout:
 *   Page header (eyebrow / title / period tabs / Export / Add Lead)
 *   ↳ FunnelKpiStrip (4 KPI cards)
 *   ↳ Controls row (filter chips · assignee pills · view toggle)
 *   ↳ Board view  — horizontal Kanban with drag-and-drop (default)
 *      List view  — flat GWTable of all leads
 *
 * Ported from Greenwheels-ERP AcquisitionView.jsx.
 */

import { useState }         from "react";
import { GWButton, GWTable } from "@/components/ui";
import { FunnelKpiStrip }   from "./components/FunnelKpiStrip";
import LeadColumn            from "./components/board/LeadColumn";
import { AddLeadModal }      from "./components/modals/AddLeadModal";
import {
  FUNNEL_KPIS, INITIAL_COLUMNS, ASSIGNEES, SOURCE_ICONS, assigneeColor, tileFor,
} from "./data";

// ─── Period tabs ──────────────────────────────────────────────

const PERIODS = ["Today", "Week", "Month", "Quarter"];

function PeriodTabs({ active, onChange }) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-zinc-100 dark:bg-white/[0.06]">
      {PERIODS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={[
            "h-7 px-3 rounded-md text-[12px] font-semibold transition-all",
            active === p
              ? "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 shadow-sm"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
          ].join(" ")}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

// ─── Filter chip ──────────────────────────────────────────────

function FilterChip({ icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold border transition-all",
        active
          ? "bg-[#03b155]/10 border-[#03b155]/30 text-[#03b155]"
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-white/[0.12]",
      ].join(" ")}
    >
      <i className={`pi ${icon} text-[10px]`} aria-hidden="true" />
      {label}
    </button>
  );
}

// ─── List view (flat table of all leads) ─────────────────────

function buildListColumns() {
  return [
    {
      key: "customer", header: "Customer", sortable: true, minWidth: "160px",
      render: (row) => {
        const tile = tileFor(row.customer);
        return (
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0"
              style={{ background: tile.bg, color: tile.fg }}
            >
              {row.customer[0]}
            </div>
            <div>
              <p className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">{row.customer}</p>
              <p className="text-[11px] text-zinc-400">{row.contact}</p>
            </div>
          </div>
        );
      },
    },
    {
      key: "source", header: "Source", sortable: true, width: "130px",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 text-[12px] text-zinc-500 dark:text-zinc-400">
          <i className={`pi ${SOURCE_ICONS[row.source] ?? "pi-user"} text-[10px]`} />
          {row.source}
        </span>
      ),
    },
    {
      key: "stage", header: "Stage", sortable: true, width: "115px",
      render: (row) => (
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: row.stageColor }} />
          <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">{row.stageLabel}</span>
        </span>
      ),
    },
    {
      key: "owner", header: "Owner", width: "80px",
      render: (row) => {
        const a = assigneeColor(row.owner);
        return (
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
            style={{ background: a.bg, color: a.color }}
          >
            {row.owner}
          </div>
        );
      },
    },
    {
      key: "days", header: "Age", sortable: true, width: "72px",
      render: (row) => row.won
        ? <span className="text-[11px] font-bold text-[#03b155]">Won</span>
        : <span className="text-[12px] text-zinc-500 dark:text-zinc-400">{row.days}</span>,
    },
  ];
}

// ─── Page ─────────────────────────────────────────────────────

export default function AcquisitionFunnelPage() {
  const [columns,       setColumns]       = useState(() =>
    INITIAL_COLUMNS.map((c) => ({ ...c, leads: c.leads.map((l) => ({ ...l })) })),
  );
  const [addLeadCol,    setAddLeadCol]    = useState(null);
  const [period,        setPeriod]        = useState("Month");
  const [activeFilter,  setActiveFilter]  = useState("owners");
  const [boardView,     setBoardView]     = useState("board");

  // ── Move lead between columns ──────────────────────────────
  function moveLead(leadId, fromId, toId) {
    setColumns((prev) => {
      const lead = prev.find((c) => c.id === fromId)?.leads.find((l) => l.id === leadId);
      if (!lead) return prev;
      const updated = toId === "won"
        ? { ...lead, won: true,  wonDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) }
        : { ...lead, won: false, wonDate: undefined };
      return prev.map((col) => {
        if (col.id === fromId) return { ...col, volume: col.volume - 1, leads: col.leads.filter((l) => l.id !== leadId) };
        if (col.id === toId)   return { ...col, volume: col.volume + 1, leads: [updated, ...col.leads] };
        return col;
      });
    });
  }

  // ── Add lead ───────────────────────────────────────────────
  function handleAddLead(formData, colId) {
    const target = colId ?? "new-lead";
    const newLead = {
      id:       `lead-${Date.now()}`,
      customer: formData.fullName,
      contact:  formData.location || formData.phone || "—",
      source:   formData.source,
      owner:    "MM",
      days:     "0d",
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === target
          ? { ...col, volume: col.volume + 1, leads: [newLead, ...col.leads] }
          : col,
      ),
    );
  }

  // ── Flatten leads for list view ────────────────────────────
  const flatLeads = columns.flatMap((col) =>
    col.leads.map((l) => ({
      ...l,
      stage:      col.id,
      stageLabel: col.label,
      stageColor: col.color,
    })),
  );

  const listColumns = buildListColumns();

  return (
    <div className="flex flex-col gap-5">

      {/* ── Page header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#03b155] mb-1">
            Customer Acquisition
          </p>
          <h1 className="text-[22px] font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
            Acquisition Funnel
          </h1>
          <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Track leads from first contact to closed deal.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          <PeriodTabs active={period} onChange={setPeriod} />
          <GWButton variant="secondary" icon="pi-download" label="Export" />
          <GWButton variant="primary"   icon="pi-plus"     label="Add Lead" onClick={() => setAddLeadCol("new-lead")} />
        </div>
      </div>

      {/* ── KPI strip ── */}
      <FunnelKpiStrip kpis={FUNNEL_KPIS} />

      {/* ── Controls row ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Filter chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <FilterChip icon="pi-filter"   label="Owners"  active={activeFilter === "owners"}  onClick={() => setActiveFilter("owners")}  />
          <FilterChip icon="pi-share-alt" label="Sources" active={activeFilter === "sources"} onClick={() => setActiveFilter("sources")} />
          <FilterChip icon="pi-calendar" label="Date"    active={activeFilter === "date"}    onClick={() => setActiveFilter("date")}    />
        </div>

        <div className="flex items-center gap-3">
          {/* Assignee pills */}
          <div className="flex items-center gap-1">
            {ASSIGNEES.map((a) => (
              <div
                key={a.initials}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer hover:ring-2 hover:ring-[#03b155]/40 transition-all"
                style={{ background: a.bg, color: a.color }}
                title={a.initials}
              >
                {a.initials}
              </div>
            ))}
            <button
              type="button"
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-zinc-100 dark:bg-white/[0.07] text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/[0.12] transition-colors border border-dashed border-zinc-300 dark:border-white/[0.12]"
              title="Add assignee"
            >
              <i className="pi pi-plus text-[9px]" />
            </button>
          </div>

          {/* Board / List toggle */}
          <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-zinc-100 dark:bg-white/[0.06]">
            {[
              { key: "board", icon: "pi-th-large",  title: "Board view" },
              { key: "list",  icon: "pi-list",       title: "List view"  },
            ].map(({ key, icon, title }) => (
              <button
                key={key}
                type="button"
                onClick={() => setBoardView(key)}
                title={title}
                className={[
                  "w-7 h-7 flex items-center justify-center rounded-md transition-all",
                  boardView === key
                    ? "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm"
                    : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300",
                ].join(" ")}
              >
                <i className={`pi ${icon} text-[12px]`} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Board view ── */}
      {boardView === "board" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {columns.map((col) => (
              <LeadColumn
                key={col.id}
                column={col}
                onAddLead={(id) => setAddLeadCol(id)}
                onMoveLead={moveLead}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── List view ── */}
      {boardView === "list" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-100 dark:border-white/6">
            <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">All Leads</h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">{flatLeads.length} leads across all stages</p>
          </div>
          <GWTable
            data={flatLeads}
            columns={listColumns}
            emptyMessage="No leads found."
            defaultRows={10}
          />
        </div>
      )}

      {/* ── Add Lead modal ── */}
      <AddLeadModal
        visible={addLeadCol !== null}
        columnId={addLeadCol ?? "new-lead"}
        onSubmit={handleAddLead}
        onClose={() => setAddLeadCol(null)}
      />
    </div>
  );
}
