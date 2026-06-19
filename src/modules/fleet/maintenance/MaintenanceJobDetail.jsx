"use client";

/**
 * MaintenanceJobDetail — job detail page with tabs + right sidebar.
 *
 * Main column (left):
 *   JobHeader → JobSummaryBar → GWTabs
 *     Overview  : job details, vehicle info, assigned technician
 *     Timeline  : activity feed (ActivityTimeline)
 *     Parts     : required parts, alert banner, parts history
 *     Notes     : technician/engineer notes
 *     History   : full audit log
 *
 * Right sidebar:
 *   StatusTimeline → PartsSummary → EtaProgress → NotesPanel
 *
 * @param {{ jobId?: string }} props  — jobId reserved for future API fetch
 */

import { useState }           from "react";
import { GWTabs }             from "@/components/ui/GWTabs";

import { JobHeader }          from "./components/detail/JobHeader";
import { JobSummaryBar }      from "./components/detail/JobSummaryBar";

import { OverviewTab }        from "./components/detail/tabs/OverviewTab";
import { ActivityTimeline }   from "./components/detail/tabs/ActivityTimeline";
import { PartsTab }           from "./components/detail/tabs/PartsTab";
import { NotesTab }           from "./components/detail/tabs/NotesTab";
import { HistoryTab }         from "./components/detail/tabs/HistoryTab";

import { StatusTimeline }     from "./components/sidebar/StatusTimeline";
import { PartsSummary }       from "./components/sidebar/PartsSummary";
import { EtaProgress }        from "./components/sidebar/EtaProgress";
import { NotesPanel }         from "./components/sidebar/NotesPanel";

import {
  JOB_DETAIL,
  AUDIT_LOG,
  JOB_PARTS,
  PARTS_ALERT,
  PARTS_HISTORY,
  JOB_NOTES,
  STATUS_TIMELINE,
} from "./data";

export default function MaintenanceJobDetail() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label:   "Overview",
      icon:    "pi-list",
      content: <OverviewTab job={JOB_DETAIL} />,
    },
    {
      label:   "Timeline",
      icon:    "pi-clock",
      content: <ActivityTimeline events={JOB_DETAIL.activity} />,
    },
    {
      label:   "Parts",
      icon:    "pi-box",
      content: (
        <PartsTab
          parts={JOB_PARTS}
          partsAlert={PARTS_ALERT}
          partsHistory={PARTS_HISTORY}
          vehicleId={JOB_DETAIL.vehicle.id}
        />
      ),
    },
    {
      label:   "Notes",
      icon:    "pi-comment",
      badge:   JOB_NOTES.length,
      content: <NotesTab notes={JOB_NOTES} />,
    },
    {
      label:   "History",
      icon:    "pi-history",
      badge:   AUDIT_LOG.length,
      content: <HistoryTab auditLog={AUDIT_LOG} />,
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start">

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
        <JobHeader    job={JOB_DETAIL} />
        <JobSummaryBar job={JOB_DETAIL} />

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
          <GWTabs
            tabs={tabs}
            activeIndex={activeTab}
            onTabChange={setActiveTab}
            contentClass="p-5"
          />
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div className="w-full xl:w-74 shrink-0 flex flex-col gap-4">
        <StatusTimeline steps={STATUS_TIMELINE} />
        <PartsSummary   parts={JOB_PARTS} />
        <EtaProgress    job={JOB_DETAIL} />
        <NotesPanel     notes={JOB_NOTES} onAddNote={() => setActiveTab(3)} />
      </div>

    </div>
  );
}
