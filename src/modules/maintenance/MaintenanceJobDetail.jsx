"use client";

import { useState } from "react";
import { GWTabs } from "@/components/ui/GWTabs";

import { JobHeader }      from "./components/detail/JobHeader";
import { JobSummaryBar }  from "./components/detail/JobSummaryBar";
import { OverviewTab }    from "./components/detail/tabs/OverviewTab";
import { HistoryTab }     from "./components/detail/tabs/HistoryTab";
import { PartsTab }       from "./components/detail/tabs/PartsTab";
import { NotesTab }       from "./components/detail/tabs/NotesTab";

import { StatusTimeline } from "./components/sidebar/StatusTimeline";
import { PartsSummary }   from "./components/sidebar/PartsSummary";
import { EtaProgress }    from "./components/sidebar/EtaProgress";
import { NotesPanel }     from "./components/sidebar/NotesPanel";

import {
  JOB_DETAIL, AUDIT_LOG, JOB_PARTS, JOB_NOTES, STATUS_TIMELINE,
} from "./data";

const TABS = [
  {
    label:   "Overview",
    icon:    "pi-list",
    content: <OverviewTab job={JOB_DETAIL} />,
  },
  {
    label:   "Timeline",
    icon:    "pi-clock",
    content: <StatusTimeline steps={STATUS_TIMELINE} />,
  },
  {
    label:   "Parts",
    icon:    "pi-box",
    content: <PartsTab parts={JOB_PARTS} />,
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

export default function MaintenanceJobDetail() {
  const [activeTab, setActiveTab] = useState(4); // History open by default

  return (
    <div className="flex flex-col xl:flex-row gap-5 items-start">

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
        <JobHeader    job={JOB_DETAIL} />
        <JobSummaryBar job={JOB_DETAIL} />

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/6 rounded-2xl overflow-hidden">
          <GWTabs
            tabs={TABS}
            activeIndex={activeTab}
            onTabChange={setActiveTab}
            contentClass="p-5"
          />
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div className="w-full xl:w-[296px] shrink-0 flex flex-col gap-4">
        <StatusTimeline steps={STATUS_TIMELINE} />
        <PartsSummary   parts={JOB_PARTS}       />
        <EtaProgress    job={JOB_DETAIL}         />
        <NotesPanel     notes={JOB_NOTES}  onAddNote={() => setActiveTab(3)} />
      </div>
    </div>
  );
}
