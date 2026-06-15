"use client";

import { GWCard, GWButton, GWAvatar } from "@/components/ui";
import { RoleBadge } from "../shared/RoleBadge";

export function NotesPanel({ notes, onAddNote }) {
  return (
    <GWCard
      compact
      title="Notes"
      action={
        <GWButton variant="link" onClick={onAddNote}>
          + Add Note
        </GWButton>
      }
    >
      <div className="divide-y divide-zinc-50 dark:divide-white/[0.03]">
        {notes.map((note) => (
          <div key={note.id} className="flex gap-2.5 px-4 py-3.5">
            <GWAvatar name={note.initials} size="sm" color="green" className="mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-100">{note.author}</span>
                <RoleBadge role={note.role} />
              </div>
              <p className="text-[10.5px] text-zinc-400 dark:text-zinc-600 mt-0.5">{note.date}</p>
              <p className="text-[11.5px] text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                {note.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </GWCard>
  );
}
