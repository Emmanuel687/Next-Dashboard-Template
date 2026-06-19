"use client";

/**
 * OperationsDashboard — GreenWheels Operations view.
 *
 * Port of the Greenwheels-ERP dashboard to OS2, built with:
 *   - PrimeReact (via GW design-system wrappers)
 *   - Recharts (LineChart, PieChart)
 *   - Tailwind CSS for layout
 *   - Lucide React for icons
 *
 * Layout (top → bottom):
 *   1. Page header  — eyebrow / title / subtitle | PeriodTabs + action buttons
 *   2. KPI grid     — 4 cards (Revenue, Leases, Utilization, Arrears)
 *   3. Charts row   — Revenue & Cost line | Department Spend bars
 *   4. Bottom row   — Purchase Orders table | Fleet Status donut
 *
 * Data lives in `./erpData.js`. Swap the imports for React Query hooks when
 * the API layer is ready — component props are intentionally data-agnostic.
 */

import { useState } from "react";

import { GWButton } from "@/components/ui";

import { KpiCard }             from "./components/KpiCard";
import { PeriodTabs }          from "./components/PeriodTabs";
import { RevenueChart }        from "./components/RevenueChart";
import { DeptSpendChart }      from "./components/DeptSpendChart";
import { PurchaseOrdersTable } from "./components/PurchaseOrdersTable";
import { FleetStatusDonut }    from "./components/FleetStatusDonut";

import {
  KPI_CARDS,
  REVENUE_DATA, REVENUE_LINES,
  DEPT_SPEND,
  PURCHASE_ORDERS, BADGE_STYLES,
  FLEET_STATUS, FLEET_TOTAL,
  PERIOD_TABS,
} from "./erpData";

export default function OperationsDashboard() {
  const [period, setPeriod] = useState("Month");

  return (
    <div className="flex flex-col gap-5">

      {/* ── Page header ───────────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#03b155] mb-1">
            Operations
          </p>
          <h1 className="text-[20px] font-bold text-[#0f1f18] leading-tight">
            Operations Dashboard
          </h1>
          <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            June 2026 · Refreshed 2 min ago
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <PeriodTabs tabs={PERIOD_TABS} active={period} onChange={setPeriod} />
          <GWButton variant="ghost" size="sm" icon="pi-download"  label="Export"           />
          <GWButton variant="ghost" size="sm" icon="pi-calendar"  label="Schedule Report"  />
          <GWButton variant="primary" size="sm" icon="pi-plus"    label="New Purchase Order" />
        </div>
      </div>

      {/* ── KPI grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {KPI_CARDS.map((card) => (
          <KpiCard key={card.id} card={card} />
        ))}
      </div>

      {/* ── Charts row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RevenueChart data={REVENUE_DATA} lines={REVENUE_LINES} />
        <DeptSpendChart data={DEPT_SPEND} />
      </div>

      {/* ── Bottom row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
        <PurchaseOrdersTable
          orders={PURCHASE_ORDERS}
          badges={BADGE_STYLES}
        />
        <FleetStatusDonut data={FLEET_STATUS} total={FLEET_TOTAL} />
      </div>

    </div>
  );
}
