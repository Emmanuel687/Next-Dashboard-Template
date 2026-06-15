"use client";

import Link from "next/link";
import { Badge } from "primereact/badge";
import { ChevronRight } from "lucide-react";

export function TopIssues({ issues }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <h2 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Top Issues Today</h2>
        <p className="text-[11px] text-zinc-400 mt-0.5">Most reported fault categories</p>
      </div>

      {/* Issue rows */}
      <div className="divide-y divide-zinc-50 dark:divide-white/[0.03]">
        {issues.map((issue, i) => {
          const IssueIcon = issue.icon;
          return (
            <Link
              key={issue.label}
              href={issue.href}
              className="flex items-center gap-3 px-5 py-3 hover:bg-zinc-50/80 dark:hover:bg-white/[0.02] transition-colors group"
            >
              {/* Rank */}
              <span className="text-[11px] font-bold text-zinc-300 dark:text-zinc-700 w-4 shrink-0 text-center">
                {i + 1}
              </span>

              {/* Icon */}
              <div className="w-7 h-7 rounded-lg bg-green-50 dark:bg-[#03b155]/10 flex items-center justify-center shrink-0">
                <IssueIcon size={13} className="text-[#03b155]" />
              </div>

              {/* Label */}
              <span className="flex-1 text-[12px] font-medium text-zinc-700 dark:text-zinc-300 truncate">
                {issue.label}
              </span>

              {/* PrimeReact Badge for count */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Badge
                  value={issue.count}
                  unstyled
                  pt={{
                    root: {
                      className:
                        "min-w-[26px] text-center text-[11px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.07] text-zinc-700 dark:text-zinc-200",
                    },
                  }}
                />
                <ChevronRight
                  size={13}
                  className="text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
