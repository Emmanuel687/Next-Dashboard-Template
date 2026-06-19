"use client";

import { Timeline } from "primereact/timeline";

const STATE_CFG = {
  done:    { dot: "border-[#03b155] bg-[#03b155]",               icon: "pi-check text-white",          line: "bg-[#03b155]" },
  active:  { dot: "border-amber-400 bg-amber-400",               icon: "pi-spinner animate-spin text-white", line: "bg-zinc-200 dark:bg-white/10" },
  pending: { dot: "border-zinc-200 dark:border-white/10 bg-transparent", icon: "",                     line: "bg-zinc-200 dark:bg-white/10" },
};

function labelColor(state) {
  if (state === "active")  return "text-amber-600 dark:text-amber-400";
  if (state === "done")    return "text-zinc-800 dark:text-zinc-200";
  return "text-zinc-400 dark:text-zinc-600";
}

export function GWStepper({ title, steps = [], showCard = true }) {
  const markerTemplate = (step) => {
    const cfg = STATE_CFG[step.state] ?? STATE_CFG.pending;
    return (
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${cfg.dot}`}>
        {cfg.icon && <i className={`pi ${cfg.icon} text-[8px]`} />}
      </div>
    );
  };

  const contentTemplate = (step) => (
    <div className="pb-4">
      <p className={`text-[12px] font-semibold leading-tight ${labelColor(step.state)}`}>
        {step.label}
      </p>
      {step.date && step.date !== "Pending" ? (
        <>
          <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5">{step.date}</p>
          {step.by && <p className="text-[10.5px] text-zinc-400 dark:text-zinc-600">by {step.by}</p>}
        </>
      ) : (
        <p className="text-[10.5px] text-zinc-300 dark:text-zinc-700 mt-0.5">Pending</p>
      )}
    </div>
  );

  const connectorTemplate = (step) => {
    const cfg = STATE_CFG[step.state] ?? STATE_CFG.pending;
    return <div className={`w-0.5 flex-1 min-h-5 mt-0.5 ${cfg.line}`} />;
  };

  const timeline = (
    <Timeline
      value={steps}
      marker={markerTemplate}
      content={contentTemplate}
      connector={connectorTemplate}
      unstyled
      pt={{
        root:      { className: "px-4 py-4" },
        event:     { className: "flex gap-3" },
        opposite:  { className: "hidden" },
        separator: { className: "flex flex-col items-center" },
        content:   { className: "flex-1 min-w-0" },
      }}
    />
  );

  if (!showCard) return timeline;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
      {title && (
        <div className="px-4 py-3.5 border-b border-zinc-100 dark:border-white/6">
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
      )}
      {timeline}
    </div>
  );
}
