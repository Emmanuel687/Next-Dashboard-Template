// Shared PrimeReact DataTable passThrough — import anywhere a DataTable is used.
// The `gw-table` class on the root element activates the CSS overrides in global.scss.

export const TABLE_PT = {
  root:    { className: "gw-table w-full" },
  wrapper: { className: "overflow-x-auto" },
  table:   { className: "w-full" },

  // ── Header ────────────────────────────────────────────────────
  thead:     {},
  headerRow: { className: "border-b border-zinc-100 dark:border-white/[0.06]" },
  headerCell: ({ context }) => ({
    className: [
      "px-4 py-3 text-left whitespace-nowrap",
      "bg-zinc-50/70 dark:bg-white/[0.02]",
      context?.sorted
        ? "text-[#03b155]"
        : "text-zinc-500 dark:text-zinc-400",
    ].join(" "),
  }),
  columnTitle: {
    className: "text-[11px] font-semibold uppercase tracking-[0.05em] align-middle",
  },
  // sortIcon hidden via global.scss; we render our own inside the header template

  // ── Body ──────────────────────────────────────────────────────
  tbody:   {},
  bodyRow: {
    className:
      "border-b border-zinc-50 dark:border-white/[0.03] " +
      "hover:bg-zinc-50/80 dark:hover:bg-white/[0.025] " +
      "transition-colors cursor-pointer",
  },
  bodyCell: {
    className: "px-4 py-3.5 align-middle text-[12.5px] text-zinc-700 dark:text-zinc-300",
  },

  // ── Empty ─────────────────────────────────────────────────────
  emptyMessage:     {},
  emptyMessageCell: {
    className: "px-4 py-14 text-center text-[13px] text-zinc-400",
  },

  // ── Paginator (passed to <Paginator> component) ──────────────
  paginator: {
    root: {
      className:
        "flex items-center justify-between px-5 py-3 " +
        "border-t border-zinc-100 dark:border-white/[0.06] " +
        "bg-white dark:bg-zinc-900",
    },
    // Left slot
    currentPageReport: {
      className: "text-[11px] text-zinc-400 dark:text-zinc-600",
    },
    // Centre nav group
    pages: { className: "flex items-center gap-1" },
    previousPageButton: ({ context }) => ({
      className: [
        "w-7 h-7 flex items-center justify-center rounded-lg text-[12px] transition-colors",
        context?.disabled
          ? "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07] cursor-pointer",
      ].join(" "),
    }),
    nextPageButton: ({ context }) => ({
      className: [
        "w-7 h-7 flex items-center justify-center rounded-lg text-[12px] transition-colors",
        context?.disabled
          ? "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07] cursor-pointer",
      ].join(" "),
    }),
    pageButton: ({ context }) => ({
      className: [
        "w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-medium transition-colors",
        context?.active
          ? "bg-[#03b155] text-white font-semibold"
          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.07]",
      ].join(" "),
    }),
    // Right slot — rows-per-page (styled via global.scss .gw-table overrides)
    rowsPerPageDropdown: {},
  },
};
