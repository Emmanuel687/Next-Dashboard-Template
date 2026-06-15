"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { TABLE_PT } from "../../../utils/tablePt";
import { PARTS_TOTAL } from "../../../data";

const PART_STATUS = {
  on_order: { label: "On Order", className: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300" },
  in_stock: { label: "In Stock", className: "bg-green-50  dark:bg-green-950/40  text-[#03b155]  dark:text-green-300"  },
  ordered:  { label: "Ordered",  className: "bg-blue-50   dark:bg-blue-950/40   text-blue-600   dark:text-blue-300"   },
};

function PartStatusTag({ status }) {
  const cfg = PART_STATUS[status] ?? PART_STATUS.in_stock;
  return (
    <Tag
      value={cfg.label}
      unstyled
      pt={{ root: { className: `inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.className}` } }}
    />
  );
}

export function PartsTab({ parts }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <div>
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Parts Used</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">Parts requested and consumed for this job.</p>
        </div>
        <Button
          label="Request Part"
          icon="pi pi-plus"
          unstyled
          pt={{
            root: { className: "flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90", style: { background: "#03b155" } },
            icon: { className: "text-[11px]" },
          }}
        />
      </div>

      <DataTable
        value={parts}
        unstyled
        pt={TABLE_PT}
        emptyMessage="No parts added yet."
      >
        <Column field="name" header="Part Name" body={(row) => (
          <span className="text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">{row.name}</span>
        )} />
        <Column field="qty" header="Qty" body={(row) => (
          <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">× {row.qty}</span>
        )} style={{ width: "64px" }} />
        <Column field="unitCost" header="Unit Cost" body={(row) => (
          <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">{row.unitCost}</span>
        )} />
        <Column field="status" header="Status" body={(row) => (
          <PartStatusTag status={row.status} />
        )} />
      </DataTable>

      {/* Total row */}
      <div className="flex items-center justify-end gap-4 px-5 py-3 border-t border-zinc-100 dark:border-white/[0.06]">
        <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Total Parts Cost</span>
        <span className="text-[14px] font-bold text-zinc-900 dark:text-white">{PARTS_TOTAL}</span>
      </div>
    </div>
  );
}
