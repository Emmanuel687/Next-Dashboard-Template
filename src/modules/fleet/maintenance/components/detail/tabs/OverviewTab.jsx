"use client";

/**
 * OverviewTab — three-card job detail view inside the detail page.
 *
 * Cards:
 *   1. Job Details      — 8 fields + description
 *   2. Vehicle Information — 6 fields + battery-health progress bar + "View Vehicle"
 *   3. Assigned Technician — avatar, name, role, phone, email, assigned-at
 *
 * Ported from Greenwheels-ERP JobOverview.jsx.
 *
 * @param {{ job: import("../../../data").JOB_DETAIL }} props
 */

import { GWCard, GWAvatar, GWProgressBar, GWButton } from "@/components/ui";

// ─── Shared field row ─────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] uppercase tracking-wide font-semibold text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
      <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
        {children}
      </span>
    </div>
  );
}

// ─── Priority dot ─────────────────────────────────────────────

const PRIORITY_COLOR = {
  critical: "#ef4444",
  high:     "#f97316",
  medium:   "#f59e0b",
  low:      "#3b82f6",
};

// ─── 1. Job Details card ──────────────────────────────────────

function JobDetailsCard({ job }) {
  return (
    <GWCard title="Job Details">
      <div className="px-5 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-5">
          <Field label="Issue Type">{job.issueType}</Field>
          <Field label="Priority">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: PRIORITY_COLOR[job.priority] ?? "#6b7280" }}
                aria-hidden="true"
              />
              {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
            </span>
          </Field>
          <Field label="Job Type">{job.jobType}</Field>
          <Field label="Reported On">{job.reportedOn}</Field>
          <Field label="Reported By">{job.reportedBy}</Field>
          <Field label="Estimated Duration">{job.estimatedDuration}</Field>
          <Field label="Actual Duration">
            <span className="flex items-center gap-2">
              {job.actualDuration}
              <span className="inline-flex items-center h-5 px-2 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300">
                In Progress
              </span>
            </span>
          </Field>
          <Field label="Start Time">{job.startTime}</Field>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-wide font-semibold text-zinc-400 dark:text-zinc-500">
            Description
          </span>
          <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {job.description}
          </p>
        </div>
      </div>
    </GWCard>
  );
}

// ─── 2. Vehicle Information card ──────────────────────────────

function VehicleCard({ vehicle }) {
  return (
    <GWCard
      title="Vehicle Information"
      action={
        <GWButton variant="ghost" icon="pi-arrow-right" label="View Vehicle" size="sm" />
      }
    >
      <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <Field label="Vehicle ID">
          <span className="text-[#03b155] font-mono">{vehicle.id}</span>
        </Field>
        <Field label="Year">{vehicle.year}</Field>
        <Field label="Registration">{vehicle.plate}</Field>
        <Field label="Odometer">{vehicle.odometer}</Field>
        <Field label="Model">{vehicle.model}</Field>
        <Field label="Battery Health">
          <span className="flex flex-col gap-1.5">
            <span>{vehicle.batteryHealth}%</span>
            <GWProgressBar
              value={vehicle.batteryHealth}
              color={vehicle.batteryHealth >= 70 ? "#03b155" : vehicle.batteryHealth >= 40 ? "#f59e0b" : "#ef4444"}
              height={6}
              className="w-32"
            />
          </span>
        </Field>
      </div>
    </GWCard>
  );
}

// ─── 3. Assigned Technician card ──────────────────────────────

function TechnicianCard({ technician }) {
  return (
    <GWCard
      title="Assigned Technician"
      action={
        <GWButton variant="ghost" icon="pi-user-edit" label="Reassign" size="sm" />
      }
    >
      <div className="px-5 pb-5 flex gap-4">
        <GWAvatar name={technician.name} size="xl" color="green" />

        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {/* Name + role + assigned-at */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                {technician.name}
              </p>
              <p className="text-[12px] text-zinc-400 mt-0.5">{technician.role}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Assigned at</p>
              <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">{technician.assignedAt}</p>
            </div>
          </div>

          {/* Contact details */}
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${technician.phone}`}
              className="inline-flex items-center gap-2 text-[12.5px] font-medium text-zinc-700 dark:text-zinc-300 hover:text-[#03b155] dark:hover:text-[#03b155] transition-colors"
            >
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-[#03b155]/10 shrink-0">
                <i className="pi pi-phone text-[11px] text-[#03b155]" aria-hidden="true" />
              </span>
              {technician.phone}
            </a>
            <div className="flex items-center gap-2 text-[12.5px] text-zinc-500 dark:text-zinc-400">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-white/6 shrink-0">
                <i className="pi pi-envelope text-[11px] text-zinc-500" aria-hidden="true" />
              </span>
              {technician.email}
            </div>
          </div>
        </div>
      </div>
    </GWCard>
  );
}

// ─── Page component ───────────────────────────────────────────

export function OverviewTab({ job }) {
  return (
    <div className="flex flex-col gap-4">
      <JobDetailsCard    job={job}              />
      <VehicleCard       vehicle={job.vehicle}  />
      <TechnicianCard    technician={job.technician} />
    </div>
  );
}
