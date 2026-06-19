"use client";

import { useRef } from "react";
import { Menu } from "primereact/menu";
import { GWCard, GWButton, GWTable } from "@/components/ui";
import { RoleBadge } from "../../shared/RoleBadge";

function AfterCell({ after }) {
  const isStatus = after.includes("In Progress") || after.includes("Assigned") || after.includes("On Order");
  if (isStatus) {
    const colorMap = {
      "Diagnosis In Progress": "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300",
      "Assigned":              "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300",
      "BN-2045 On Order":      "bg-orange-50 dark:bg-orange-950/40 text-orange-600",
    };
    const cls = colorMap[after] ?? "bg-zinc-100 dark:bg-white/[0.07] text-zinc-600";
    return (
      <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>
        {after}
      </span>
    );
  }
  return <span className="text-[12.5px] text-zinc-600 dark:text-zinc-400">{after}</span>;
}

function RowMenu() {
  const menu = useRef(null);
  const items = [
    { label: "View Details", icon: "pi pi-eye"      },
    { label: "Copy Entry",   icon: "pi pi-copy"     },
    { separator: true },
    { label: "Export Row",   icon: "pi pi-download" },
  ];
  return (
    <>
      <Menu
        model={items}
        popup
        ref={menu}
        pt={{
          root:      { className: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.1] rounded-xl shadow-xl py-1 text-[12.5px] min-w-[160px]" },
          menuitem:  { className: "flex items-center gap-2 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer" },
          separator: { className: "border-t border-zinc-100 dark:border-white/[0.06] my-1" },
          icon:      { className: "text-zinc-400 text-[12px]" },
        }}
      />
      <GWButton
        variant="ghost"
        icon="pi-ellipsis-v"
        iconSize="text-[12px]"
        onClick={(e) => menu.current?.toggle(e)}
      />
    </>
  );
}

const COLUMNS = [
  {
    key: "timestamp", header: "Timestamp", sortable: true, minWidth: "160px",
    render: (row) => (
      <span className="text-[12px] font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{row.timestamp}</span>
    ),
  },
  {
    key: "action", header: "Action", sortable: true, minWidth: "180px",
    render: (row) => (
      <span className="text-[12.5px] font-medium text-zinc-800 dark:text-zinc-200">{row.action}</span>
    ),
  },
  {
    key: "changedBy", header: "Changed By", sortable: true, minWidth: "140px",
    render: (row) => (
      <span className="text-[12.5px] text-zinc-700 dark:text-zinc-300">{row.changedBy}</span>
    ),
  },
  {
    key: "role", header: "Role", minWidth: "130px",
    render: (row) => <RoleBadge role={row.role} />,
  },
  {
    key: "before", header: "Before", minWidth: "120px",
    render: (row) => (
      <span className="text-[12px] text-zinc-400 dark:text-zinc-500">{row.before}</span>
    ),
  },
  {
    key: "after", header: "After", minWidth: "160px",
    render: (row) => <AfterCell after={row.after} />,
  },
  {
    key: "_menu", header: "", width: "48px",
    render: () => <RowMenu />,
  },
];

export function HistoryTab({ auditLog }) {
  return (
    <GWCard
      title="Audit History"
      subtitle="Complete record of all changes to this job."
      action={
        <GWButton variant="secondary" icon="pi-download">Export</GWButton>
      }
    >
      <GWTable
        data={auditLog}
        columns={COLUMNS}
        emptyMessage="No audit records found."
        defaultRows={10}
        rowKey="timestamp"
      />
    </GWCard>
  );
}
