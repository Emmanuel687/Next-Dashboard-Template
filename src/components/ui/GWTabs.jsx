"use client";

import { TabView, TabPanel } from "primereact/tabview";

export function GWTabs({
  tabs         = [],
  defaultIndex = 0,
  activeIndex,
  onTabChange,
  contentClass = "p-5",
}) {
  const headerTemplate = (tab, options) => (
    <button
      type="button"
      onClick={options.onClick}
      className={[
        "relative flex items-center gap-1.5 h-10 px-4 shrink-0",
        "text-[13px] whitespace-nowrap transition-colors border-b-2 -mb-px",
        options.selected
          ? "border-[#03b155] text-[#03b155] font-semibold"
          : "border-transparent text-zinc-500 dark:text-zinc-400 font-medium hover:text-zinc-700 dark:hover:text-zinc-200",
      ].join(" ")}
    >
      {tab.icon && <i className={`pi ${tab.icon} text-[11px]`} />}
      {tab.label}
      {tab.badge != null && (
        <span className={[
          "min-w-4.5 h-4.5 px-1 rounded-full text-[10px] font-bold",
          "flex items-center justify-center",
          options.selected
            ? "bg-[#03b155] text-white"
            : "bg-zinc-100 dark:bg-white/8 text-zinc-500 dark:text-zinc-400",
        ].join(" ")}>
          {tab.badge}
        </span>
      )}
    </button>
  );

  return (
    <TabView
      activeIndex={activeIndex ?? defaultIndex}
      onTabChange={(e) => onTabChange?.(e.index)}
      unstyled
      pt={{
        root:           { className: "flex flex-col" },
        navContainer:   { className: "border-b border-zinc-100 dark:border-white/6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" },
        nav:            { className: "flex items-end list-none m-0 p-0" },
        navItem:        { className: "shrink-0" },
        headerAction:   { className: "" },
        panelContainer: { className: "" },
        content:        { className: contentClass },
      }}
    >
      {tabs.map((tab) => (
        <TabPanel
          key={tab.label}
          headerTemplate={(options) => headerTemplate(tab, options)}
          pt={{ content: { className: contentClass } }}
        >
          {tab.content}
        </TabPanel>
      ))}
    </TabView>
  );
}
