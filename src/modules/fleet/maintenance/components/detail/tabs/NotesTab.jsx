"use client";

import { useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { RoleBadge } from "../../shared/RoleBadge";

export function NotesTab({ notes }) {
  const [draft, setDraft]       = useState("");
  const [adding, setAdding]     = useState(false);
  const [list, setList]         = useState(notes);

  function handleSubmit() {
    if (!draft.trim()) return;
    setList((prev) => [
      {
        id: Date.now(),
        author: "User",
        role: "Operations",
        initials: "EM",
        date: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
        text: draft.trim(),
      },
      ...prev,
    ]);
    setDraft("");
    setAdding(false);
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06]">
        <div>
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Notes</h3>
          <p className="text-[11px] text-zinc-400 mt-0.5">{list.length} note{list.length !== 1 ? "s" : ""} on this job</p>
        </div>
        <Button
          label="Add Note"
          icon="pi pi-plus"
          unstyled
          onClick={() => setAdding((p) => !p)}
          pt={{
            root: { className: "flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90", style: { background: "#03b155" } },
            icon: { className: "text-[11px]" },
          }}
        />
      </div>

      {/* Compose area */}
      {adding && (
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-white/[0.06] bg-zinc-50/60 dark:bg-white/[0.02]">
          <InputTextarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write your note..."
            rows={3}
            autoResize
            unstyled
            pt={{
              root: {
                className:
                  "w-full text-[13px] text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/[0.1] rounded-xl px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#03b155]/40 resize-none placeholder:text-zinc-400",
              },
            }}
          />
          <div className="flex items-center justify-end gap-2 mt-2.5">
            <Button
              label="Cancel"
              unstyled
              onClick={() => { setAdding(false); setDraft(""); }}
              pt={{ root: { className: "h-8 px-3 rounded-lg text-[12px] font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors" } }}
            />
            <Button
              label="Save Note"
              unstyled
              onClick={handleSubmit}
              pt={{ root: { className: "flex items-center h-8 px-3 rounded-lg text-[12px] font-semibold text-white transition-opacity hover:opacity-90", style: { background: "#03b155" } } }}
            />
          </div>
        </div>
      )}

      {/* Notes list */}
      <div className="divide-y divide-zinc-50 dark:divide-white/[0.03]">
        {list.map((note) => (
          <div key={note.id} className="flex gap-3 px-5 py-4">
            <div className="w-8 h-8 rounded-full bg-[#03b155]/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-[#03b155]">{note.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[12.5px] font-semibold text-zinc-800 dark:text-zinc-100">{note.author}</span>
                <RoleBadge role={note.role} />
                <span className="text-[11px] text-zinc-400 dark:text-zinc-600 ml-auto">{note.date}</span>
              </div>
              <p className="text-[12.5px] text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">{note.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
