"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { GWButton, GWPageHeader } from "@/components/ui";

import { StatCard }           from "./components/StatCard";
import { FleetActivityChart } from "./components/FleetActivityChart";
import { RecentActivity }     from "./components/RecentActivity";
import { WorkshopSummary }    from "./components/WorkshopSummary";
import { TopIssues }          from "./components/TopIssues";

import {
  STATS, FLEET_ACTIVITY, WORKSHOP_STATUS, TOP_ISSUES,
  SEED_EVENTS, NEW_EVENT_LABELS, EVENT_TYPES, BRAND,
} from "./data";

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FleetDashboard() {
  const [events, setEvents]       = useState(SEED_EVENTS);
  const [live, setLive]           = useState(true);
  const [lastRefresh, setRefresh] = useState(null);

  const hour     = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => { setRefresh(new Date()); }, []);

  useEffect(() => {
    if (!live) return;
    const timer = setTimeout(() => {
      const prefixes = ["MC", "CR", "IR"];
      const ref      = `GW-${randItem(prefixes)}-${String(Math.floor(Math.random() * 2000)).padStart(4, "0")}`;
      setEvents((prev) => [
        { id: Date.now(), type: randItem(EVENT_TYPES), label: randItem(NEW_EVENT_LABELS), ref, ago: "just now" },
        ...prev.slice(0, 7),
      ]);
      setRefresh(new Date());
    }, 8000);
    return () => clearTimeout(timer);
  }, [events, live]);

  const refreshStr = lastRefresh
    ? lastRefresh.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--";

  return (
    <div className="flex flex-col gap-5">

      <GWPageHeader
        title="Fleet Dashboard"
        subtitle={`${greeting}. Here's today's fleet status.`}
        action={
          <>
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600">
              <RefreshCw size={10} />
              {refreshStr}
            </span>
            <GWButton
              variant="primary"
              icon="pi-arrow-right"
              iconPos="right"
              className="hidden sm:inline-flex"
              onClick={() => window.location.assign("/fleet/vehicles")}
            >
              View Fleet
            </GWButton>
          </>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {STATS.map((s) => <StatCard key={s.key} stat={s} />)}
      </div>

      {/* Fleet activity chart */}
      <FleetActivityChart data={FLEET_ACTIVITY} />

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_356px] gap-4">
        <RecentActivity
          events={events}
          live={live}
          onToggleLive={() => setLive((p) => !p)}
        />
        <div className="flex flex-col gap-4">
          <WorkshopSummary statuses={WORKSHOP_STATUS} />
          <TopIssues issues={TOP_ISSUES} />
        </div>
      </div>
    </div>
  );
}
