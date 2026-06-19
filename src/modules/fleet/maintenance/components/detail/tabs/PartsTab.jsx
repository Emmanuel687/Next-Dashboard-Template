"use client";

/**
 * PartsTab — full parts management view for a maintenance job.
 *
 * Sections:
 *   1. Required Parts — DataTable with Part Number, Qty, Unit/Total Cost,
 *      Status badge, and contextual action (Track Order / Issue)
 *   2. Alert banner   — shown when any part is On Order
 *   3. Request Additional Part button
 *   4. Parts History  — last 5 parts used on this vehicle
 *
 * Ported from Greenwheels-ERP JobParts.jsx.
 *
 * @param {{ parts: import("../../../data").JOB_PARTS, partsAlert: object, partsHistory: array, vehicleId: string }} props
 */

import { DataTable } from "primereact/datatable";
import { Column }    from "primereact/column";
import { Button }    from "primereact/button";
import { TABLE_PT }  from "../../../utils/tablePt";
import { PARTS_TOTAL } from "../../../data";

// ─── Part status badge ────────────────────────────────────────

const PART_STATUS = {
  on_order: { label: "On Order", className: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300" },
  in_stock: { label: "In Stock", className: "bg-green-50  dark:bg-green-950/40  text-[#03b155] dark:text-green-300"  },
  ordered:  { label: "Ordered",  className: "bg-blue-50   dark:bg-blue-950/40   text-blue-600  dark:text-blue-300"   },
};

function PartStatusBadge({ status }) {
  const cfg = PART_STATUS[status] ?? PART_STATUS.in_stock;
  return (
    <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

// ─── Required Parts table ─────────────────────────────────────

function RequiredPartsCard({ parts }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/6">
        <div>
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Required Parts</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">{parts.length} part{parts.length !== 1 ? "s" : ""} for this job</p>
        </div>
      </div>

      <DataTable value={parts} unstyled pt={TABLE_PT} emptyMessage="No parts added yet.">
        <Column
          field="name" header="Part Name"
          body={(row) => (
            <span className="text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">{row.name}</span>
          )}
        />
        <Column
          field="partNumber" header="Part Number"
          body={(row) => (
            <span className="font-mono text-[12px] text-zinc-500 dark:text-zinc-400">{row.partNumber}</span>
          )}
          style={{ width: "130px" }}
        />
        <Column
          field="qty" header="Qty"
          body={(row) => (
            <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">× {row.qty}</span>
          )}
          style={{ width: "60px" }}
        />
        <Column
          field="unitCost" header="Unit Cost"
          body={(row) => (
            <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">{row.unitCost}</span>
          )}
          style={{ width: "110px" }}
        />
        <Column
          field="totalCost" header="Total Cost"
          body={(row) => (
            <span className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-200">{row.totalCost}</span>
          )}
          style={{ width: "110px" }}
        />
        <Column
          field="status" header="Status"
          body={(row) => <PartStatusBadge status={row.status} />}
          style={{ width: "115px" }}
        />
        <Column
          header="Actions"
          body={(row) =>
            row.status === "on_order" ? (
              <Button
                label="Track Order"
                icon="pi pi-map-marker"
                unstyled
                pt={{
                  root: { className: "flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11.5px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:opacity-80 transition-opacity" },
                  icon: { className: "text-[11px]" },
                }}
              />
            ) : (
              <Button
                label="Issue"
                icon="pi pi-send"
                unstyled
                pt={{
                  root: { className: "flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11.5px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/6 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors" },
                  icon: { className: "text-[11px]" },
                }}
              />
            )
          }
          style={{ width: "110px" }}
        />
      </DataTable>

      {/* Total cost footer */}
      <div className="flex items-center justify-end gap-4 px-5 py-3.5 border-t border-zinc-100 dark:border-white/6">
        <span className="text-[12px] text-zinc-500 dark:text-zinc-400">Total Parts Cost</span>
        <span className="text-[15px] font-bold text-zinc-900 dark:text-white">{PARTS_TOTAL}</span>
      </div>
    </div>
  );
}

// ─── Alert banner ─────────────────────────────────────────────

function PartsAlertBanner({ alert }) {
  if (!alert) return null;
  return (
    <div className="flex gap-3 px-4 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40">
      <i className="pi pi-exclamation-triangle text-amber-500 text-[15px] mt-0.5 shrink-0" aria-hidden="true" />
      <div className="flex flex-col gap-0.5">
        <p className="text-[12.5px] font-semibold text-amber-800 dark:text-amber-300">{alert.line1}</p>
        <p className="text-[12px] text-amber-700 dark:text-amber-400">{alert.line2}</p>
      </div>
    </div>
  );
}

// ─── Parts History table ──────────────────────────────────────

function PartsHistoryCard({ history, vehicleId }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-white/6">
        <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
          Parts History — Vehicle {vehicleId} (Last 5 Jobs)
        </h3>
        <p className="text-[11px] text-zinc-400 mt-0.5">Historical parts usage for this vehicle</p>
      </div>

      <DataTable value={history} unstyled pt={TABLE_PT} emptyMessage="No history found.">
        <Column
          field="jobId" header="Job ID"
          body={(row) => (
            <span className="font-mono text-[12px] font-bold text-[#03b155]">{row.jobId}</span>
          )}
          style={{ width: "96px" }}
        />
        <Column
          field="partName" header="Part Name"
          body={(row) => (
            <span className="text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">{row.partName}</span>
          )}
        />
        <Column
          field="dateUsed" header="Date Used"
          body={(row) => (
            <span className="text-[12px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{row.dateUsed}</span>
          )}
          style={{ width: "130px" }}
        />
        <Column
          field="qty" header="Qty"
          body={(row) => (
            <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">× {row.qty}</span>
          )}
          style={{ width: "60px" }}
        />
        <Column
          field="cost" header="Cost"
          body={(row) => (
            <span className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-200">{row.cost}</span>
          )}
          style={{ width: "110px" }}
        />
        <Column
          field="technician" header="Technician"
          body={(row) => (
            <span className="text-[12px] text-zinc-600 dark:text-zinc-400">{row.technician}</span>
          )}
          style={{ width: "145px" }}
        />
      </DataTable>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────

export function PartsTab({ parts, partsAlert, partsHistory, vehicleId }) {
  return (
    <div className="flex flex-col gap-4">
      <RequiredPartsCard parts={parts} />

      <PartsAlertBanner alert={partsAlert} />

      {/* Request additional part */}
      <button
        type="button"
        className="self-start flex items-center gap-2 h-9 px-4 rounded-lg border border-dashed border-zinc-300 dark:border-white/10 text-[12.5px] font-semibold text-zinc-500 dark:text-zinc-400 hover:border-[#03b155] hover:text-[#03b155] dark:hover:text-[#03b155] transition-colors"
      >
        <i className="pi pi-plus text-[11px]" aria-hidden="true" />
        Request Additional Part
      </button>

      <PartsHistoryCard history={partsHistory} vehicleId={vehicleId} />
    </div>
  );
}
