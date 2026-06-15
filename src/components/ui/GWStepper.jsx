"use client";

/**
 * GWStepper — GreenWheels design-system vertical stepper.
 *
 * Step shape:
 *   { label, state: "done" | "active" | "pending", date?, by? }
 *
 * Usage:
 *   <GWStepper title="Status Timeline" steps={STATUS_TIMELINE} />
 *   <GWStepper title="Incident Progress" steps={incidentSteps} />
 *   <GWStepper title="Acquisition Pipeline" steps={pipelineSteps} showCard={false} />
 */

const STATE_CFG = {
  done:    {
    dot:  "border-[#03b155] bg-[#03b155]",
    icon: "pi-check text-white",
    line: "bg-[#03b155]",
  },
  active:  {
    dot:  "border-amber-400 bg-amber-400",
    icon: "pi-spinner animate-spin text-white",
    line: "bg-zinc-200 dark:bg-white/[0.1]",
  },
  pending: {
    dot:  "border-zinc-200 dark:border-white/[0.1] bg-transparent",
    icon: "",
    line: "bg-zinc-200 dark:bg-white/[0.1]",
  },
};

function StepList({ steps }) {
  return (
    <div className="px-4 py-4">
      {steps.map((step, i) => {
        const cfg  = STATE_CFG[step.state] ?? STATE_CFG.pending;
        const last = i === steps.length - 1;

        return (
          <div key={`${step.label}-${i}`} className="flex gap-3">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${cfg.dot}`}>
                {cfg.icon && <i className={`pi ${cfg.icon} text-[8px]`} />}
              </div>
              {!last && <div className={`w-0.5 flex-1 min-h-[20px] mt-0.5 ${cfg.line}`} />}
            </div>

            {/* Label + meta */}
            <div className={`flex-1 ${last ? "pb-0" : "pb-4"}`}>
              <p className={`text-[12px] font-semibold leading-tight ${
                step.state === "active"
                  ? "text-amber-600 dark:text-amber-400"
                  : step.state === "done"
                  ? "text-zinc-800 dark:text-zinc-200"
                  : "text-zinc-400 dark:text-zinc-600"
              }`}>
                {step.label}
              </p>
              {step.date && step.date !== "Pending" ? (
                <>
                  <p className="text-[10.5px] text-zinc-400 dark:text-zinc-500 mt-0.5">{step.date}</p>
                  {step.by && (
                    <p className="text-[10.5px] text-zinc-400 dark:text-zinc-600">by {step.by}</p>
                  )}
                </>
              ) : (
                <p className="text-[10.5px] text-zinc-300 dark:text-zinc-700 mt-0.5">Pending</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function GWStepper({ title, steps = [], showCard = true }) {
  if (!showCard) {
    return <StepList steps={steps} />;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">
      {title && (
        <div className="px-4 py-3.5 border-b border-zinc-100 dark:border-white/[0.06]">
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
      )}
      <StepList steps={steps} />
    </div>
  );
}
