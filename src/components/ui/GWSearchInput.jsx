"use client";

/**
 * GWSearchInput — GreenWheels design-system search field.
 * Wraps PrimeReact <InputText> with unstyled + pt.
 * onChange receives the raw string value, not the event.
 *
 * Usage:
 *   <GWSearchInput value={search} onChange={setSearch} placeholder="Search jobs..." />
 *   <GWSearchInput value={q} onChange={setQ} className="w-full sm:w-52" />
 */

import { InputText } from "primereact/inputtext";

export function GWSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className   = "",
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[12px] pointer-events-none z-10" />
      <InputText
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        unstyled
        pt={{
          root: {
            className: [
              "h-8 pl-8 pr-3 w-full",
              "text-[12.5px] rounded-lg",
              "border border-zinc-200 dark:border-white/[0.1]",
              "bg-zinc-50 dark:bg-white/[0.04]",
              "text-zinc-800 dark:text-zinc-200",
              "placeholder:text-zinc-400",
              "outline-none focus:ring-1 focus:ring-[#03b155]/40",
              "transition-all",
            ].join(" "),
          },
        }}
      />
    </div>
  );
}
