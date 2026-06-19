"use client";

import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column }    from "primereact/column";

// Shared Tailwind class strings
const thCls   = "px-4 py-3 text-left whitespace-nowrap bg-zinc-50/70 dark:bg-white/[0.015] text-[11px] font-semibold uppercase tracking-[0.05em] text-zinc-400 dark:text-zinc-500 select-none";
const thSortCls = thCls + " cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors";
const tdCls   = "px-4 py-3.5 align-middle text-[12.5px] text-zinc-700 dark:text-zinc-300";

export function GWTable({
  data          = [],
  columns       = [],
  onRowClick,
  emptyMessage  = "No records found.",
  defaultRows   = 10,
  rowKey        = "id",
}) {
  const [first, setFirst] = useState(0);
  const [rows,  setRows]  = useState(defaultRows);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(1);

  return (
    <DataTable
      value={data}
      dataKey={rowKey}
      onRowClick={onRowClick ? (e) => onRowClick(e.data) : undefined}
      rowClassName={() => onRowClick
        ? "border-b border-zinc-50 dark:border-white/[0.03] cursor-pointer hover:bg-zinc-50/80 dark:hover:bg-white/[0.025] transition-colors"
        : "border-b border-zinc-50 dark:border-white/[0.03]"
      }
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={(e) => { setSortField(e.sortField); setSortOrder(e.sortOrder); }}
      removableSort
      paginator
      rows={rows}
      first={first}
      onPage={(e) => { setFirst(e.first); setRows(e.rows); }}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
      currentPageReportTemplate="Showing {first}–{last} of {totalRecords} records"
      emptyMessage={emptyMessage}
      unstyled
      pt={{
        root:            { className: "flex flex-col w-full" },
        wrapper:         { className: "overflow-x-auto" },
        table:           { className: "w-full min-w-max border-collapse" },
        thead:           { className: "" },
        headerRow:       { className: "border-b border-zinc-100 dark:border-white/6" },
        tbody:           { className: "" },
        emptyMessage:    { className: "" },
        footer:          { className: "" },
        paginator: {
          root: {
            className: "flex flex-wrap items-center justify-center sm:justify-end gap-1 px-4 py-3 border-t border-zinc-100 dark:border-white/6 text-[11px] text-zinc-400",
          },
          pages: { className: "flex items-center gap-1" },
          firstPageButton: { className: "w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/7 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" },
          prevPageButton: { className: "w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/7 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" },
          nextPageButton: { className: "w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/7 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" },
          lastPageButton: { className: "w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/7 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" },
          pageButton: ({ context }) => ({
            className: [
              "w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-medium transition-colors",
              context?.active
                ? "bg-[#03b155] text-white font-semibold"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/7",
            ].join(" "),
          }),
          current: { className: "text-[11px] text-zinc-400 dark:text-zinc-600 shrink-0 sm:ml-2" },
          RPPDropdown: {
            root: { className: "h-7 min-w-14 ml-1 inline-flex items-center text-[11px] font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg outline-none focus-within:border-[#03b155] focus-within:ring-2 focus-within:ring-[#03b155]/15 cursor-pointer transition-colors" },
            input: { className: "flex-1 px-2 leading-none cursor-pointer" },
            trigger: { className: "w-6 h-full inline-flex items-center justify-center text-zinc-400" },
            panel: { className: "mt-1 overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-lg shadow-lg shadow-zinc-900/10 dark:shadow-black/30" },
            wrapper: { className: "max-h-48 overflow-y-auto p-1" },
            list: { className: "m-0 p-0 list-none" },
            item: ({ context }) => ({
              className: [
                "flex items-center min-w-14 px-2.5 py-1.5 rounded-md text-[11px] cursor-pointer transition-colors",
                context?.selected
                  ? "bg-[#03b155]/10 text-[#03b155] font-semibold"
                  : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/7",
              ].join(" "),
            }),
          },
        },
      }}
    >
      {columns.map((col) => (
        <Column
          key={col.key ?? col.header}
          field={col.key}
          header={col.header}
          sortable={col.sortable}
          body={col.render ? (row) => col.render(row) : undefined}
          style={col.width ? { width: col.width } : col.minWidth ? { minWidth: col.minWidth } : undefined}
          pt={{
            headerCell:        { className: col.sortable ? thSortCls : thCls },
            headerCellContent: { className: "inline-flex items-center leading-none gap-1" },
            sortIcon:          { className: "text-[10px] text-zinc-300 dark:text-zinc-700" },
            bodyCell:          { className: tdCls },
          }}
        />
      ))}
    </DataTable>
  );
}
