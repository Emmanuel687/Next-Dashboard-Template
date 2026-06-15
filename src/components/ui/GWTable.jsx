"use client";

/**
 * GWTable — GreenWheels design-system table.
 * Fully Tailwind-native, no PrimeReact internals.
 *
 * Column definition:
 *   { key, header, sortable?, width?, minWidth?, render?(row) => ReactNode }
 */

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────
function clx(...parts) {
  return parts.filter(Boolean).join(" ");
}

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current - 1, current, current + 1].filter((p) => p >= 1 && p <= total));
  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}

// ─── Sort icon ────────────────────────────────────────────────
function SortIndicator({ active, dir }) {
  const base = "ml-1.5 shrink-0";
  if (!active) return <ArrowUpDown size={10} className={clx(base, "text-zinc-300 dark:text-zinc-700")} />;
  return dir === "asc"
    ? <ArrowUp   size={10} className={clx(base, "text-[#03b155]")} />
    : <ArrowDown size={10} className={clx(base, "text-[#03b155]")} />;
}

// ─── Main component ───────────────────────────────────────────
export function GWTable({
  data          = [],
  columns       = [],
  onRowClick,
  emptyMessage  = "No records found.",
  defaultRows   = 10,
  rowKey        = "id",
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage]       = useState(1);
  const [perPage, setPerPage] = useState(defaultRows);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  // Paginate
  const total      = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage   = Math.min(page, totalPages);
  const from       = (safePage - 1) * perPage;
  const rows       = sorted.slice(from, from + perPage);

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  function goPage(p) {
    if (typeof p === "number") setPage(Math.max(1, Math.min(totalPages, p)));
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-white/[0.06]">
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                return (
                  <th
                    key={col.key ?? col.header}
                    onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                    style={col.width ? { width: col.width } : col.minWidth ? { minWidth: col.minWidth } : undefined}
                    className={clx(
                      "px-4 py-3 text-left whitespace-nowrap",
                      "bg-zinc-50/70 dark:bg-white/[0.015]",
                      "text-[11px] font-semibold uppercase tracking-[0.05em]",
                      isSorted ? "text-[#03b155]" : "text-zinc-400 dark:text-zinc-500",
                      col.sortable && "cursor-pointer select-none hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors",
                    )}
                  >
                    <span className="inline-flex items-center leading-none">
                      {col.header}
                      {col.sortable && <SortIndicator active={isSorted} dir={sortDir} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-14 text-center text-[13px] text-zinc-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row[rowKey] ?? i}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  className={clx(
                    "border-b border-zinc-50 dark:border-white/[0.03] transition-colors",
                    onRowClick && "cursor-pointer hover:bg-zinc-50/80 dark:hover:bg-white/[0.025]",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key ?? col.header}
                      className="px-4 py-3.5 align-middle"
                    >
                      {col.render ? col.render(row) : (
                        <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300">
                          {row[col.key] ?? "—"}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Paginator ── */}
      {total > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 border-t border-zinc-100 dark:border-white/[0.06]">

          {/* Summary */}
          <span className="text-[11px] text-zinc-400 dark:text-zinc-600 shrink-0 text-center sm:text-left">
            Showing {from + 1}–{Math.min(from + perPage, total)} of {total} records
          </span>

          {/* Page buttons */}
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => goPage(safePage - 1)}
              disabled={safePage === 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={13} />
            </button>

            {getPages(safePage, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={`e-${i}`} className="w-7 flex items-center justify-center text-[11px] text-zinc-400">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => goPage(p)}
                  className={clx(
                    "w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-medium transition-colors",
                    safePage === p
                      ? "bg-[#03b155] text-white font-semibold shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07]",
                  )}
                >
                  {p}
                </button>
              )
            )}

            <button
              onClick={() => goPage(safePage + 1)}
              disabled={safePage === totalPages}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Rows per page */}
          <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">Rows</span>
            <select
              value={perPage}
              onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="h-7 px-2 pr-5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.1] rounded-lg outline-none focus:ring-1 focus:ring-[#03b155]/30 cursor-pointer appearance-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 6px center" }}
            >
              {[5, 10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
