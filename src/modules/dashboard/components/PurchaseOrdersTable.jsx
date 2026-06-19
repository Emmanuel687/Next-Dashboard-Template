"use client";

/**
 * PurchaseOrdersTable — Recent Purchase Orders card.
 *
 * Uses the GWTable design-system component (native table, no PrimeReact DataTable)
 * so sorting, pagination, and row-click handling are all built in.
 *
 * Status badges use GWBadge with variant="pill" — colour driven by the
 * `badge` key on each order, resolved against the `badges` style map.
 *
 * @param {{
 *   orders:   import('../erpData').PurchaseOrder[],
 *   badges:   Record<string, string>,
 *   onViewAll?: () => void,
 * }} props
 *
 * @example
 *   <PurchaseOrdersTable
 *     orders={PURCHASE_ORDERS}
 *     badges={BADGE_STYLES}
 *     onViewAll={() => router.push('/procurement')}
 *   />
 */

import { GWCard, GWButton, GWTable, GWBadge } from "@/components/ui";

// ─── Column definitions ───────────────────────────────────────

function buildColumns(badges) {
  return [
    {
      key:      "id",
      header:   "PO Number",
      sortable: true,
      width:    "140px",
      render:   (row) => (
        <span className="font-mono text-[11px] font-bold text-[#03b155] tracking-tight">
          {row.id}
        </span>
      ),
    },
    {
      key:      "supplier",
      header:   "Supplier",
      sortable: true,
      render:   (row) => (
        <span className="text-[12px] text-zinc-800 dark:text-zinc-200">{row.supplier}</span>
      ),
    },
    {
      key:    "date",
      header: "Requested",
      render: (row) => (
        <span className="text-[12px] text-zinc-400 dark:text-zinc-500 tabular-nums">{row.date}</span>
      ),
    },
    {
      key:      "value",
      header:   "Value",
      sortable: true,
      render:   (row) => (
        <span className="text-[12px] font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
          {row.value}
        </span>
      ),
    },
    {
      key:    "status",
      header: "Status",
      render: (row) => (
        <GWBadge label={row.status} className={badges[row.badge] ?? ""} />
      ),
    },
  ];
}

// ─── Component ────────────────────────────────────────────────

export function PurchaseOrdersTable({ orders, badges, onViewAll }) {
  const columns = buildColumns(badges);

  return (
    <GWCard
      title="Recent Purchase Orders"
      subtitle="Last 30 days · 47 total open"
      action={
        onViewAll && (
          <GWButton
            variant="ghost"
            size="sm"
            icon="pi-arrow-right"
            iconPos="right"
            label="View all"
            onClick={onViewAll}
          />
        )
      }
    >
      <GWTable
        data={orders}
        columns={columns}
        defaultRows={5}
        emptyMessage="No purchase orders found."
      />
    </GWCard>
  );
}
