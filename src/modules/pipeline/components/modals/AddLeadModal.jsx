"use client";

/**
 * AddLeadModal — PrimeReact Dialog form for adding a new lead.
 *
 * PrimeReact usage:
 *   - Dialog          (modal wrapper, mask, header, footer, close button)
 *   - InputText       (all single-line text / tel / email inputs)
 *   - InputTextarea   (notes field)
 *   - Dropdown        (lead source selector)
 *
 * Required: Full Name, Phone, Date of Birth, Lead Source
 * Optional: Email, National ID, Location, Referred By, Notes
 */

import { useState, useEffect, useRef } from "react";
import { Dialog }        from "primereact/dialog";
import { InputText }     from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown }      from "primereact/dropdown";
import { LEAD_SOURCES }  from "../../data";

const EMPTY = {
  fullName: "", phone: "", email: "", dob: "",
  nationalId: "", location: "", source: "", referredBy: "", notes: "",
};

// ─── Shared class builders ────────────────────────────────────

function inputCls(hasError) {
  return [
    "h-9 w-full px-3 rounded-lg text-[13px]",
    "bg-zinc-50 dark:bg-zinc-800/60",
    "text-zinc-800 dark:text-zinc-200",
    "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
    "outline-none focus:ring-2 transition-all",
    hasError
      ? "border border-red-400 focus:ring-red-300/30"
      : "border border-zinc-200 dark:border-white/10 focus:ring-[#03b155]/25 focus:border-[#03b155]",
  ].join(" ");
}

function dropdownCls(hasError) {
  return [
    "flex items-center h-9 w-full px-3 rounded-lg text-[13px] cursor-pointer",
    "bg-zinc-50 dark:bg-zinc-800/60",
    hasError
      ? "border border-red-400"
      : "border border-zinc-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-[#03b155]/25 focus-within:border-[#03b155]",
  ].join(" ");
}

// ─── Field wrapper ─────────────────────────────────────────────

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11.5px] font-semibold text-zinc-600 dark:text-zinc-400">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

// ─── Section label ────────────────────────────────────────────

function SectionLabel({ icon, label }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <div className="w-5 h-5 rounded-md flex items-center justify-center bg-zinc-100 dark:bg-white/6">
        <i className={`pi ${icon} text-[10px] text-zinc-400`} aria-hidden="true" />
      </div>
      <span className="text-[10.5px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
        {label}
      </span>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────

export function AddLeadModal({ visible, columnId, onSubmit, onClose }) {
  const [form,   setForm]   = useState({ ...EMPTY });
  const [errors, setErrors] = useState({});
  const firstRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setForm({ ...EMPTY });
      setErrors({});
      setTimeout(() => firstRef.current?.focus(), 60);
    }
  }, [visible]);

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim())    e.phone    = "Phone number is required";
    if (!form.dob)             e.dob      = "Date of birth is required";
    if (!form.source)          e.source   = "Lead source is required";
    return e;
  }

  function handleSubmit(ev) {
    ev?.preventDefault?.();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit(form, columnId);
    onClose();
  }

  const sourceOptions = LEAD_SOURCES.map((s) => ({ label: s, value: s }));

  const header = (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#03b155]/10 shrink-0">
        <i className="pi pi-user-plus text-[14px] text-[#03b155]" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">Add New Lead</h2>
        <p className="text-[11.5px] text-zinc-400">Enter the lead&apos;s details to add them to the funnel.</p>
      </div>
    </div>
  );

  const footer = (
    <div className="flex items-center justify-end gap-2 px-4 py-4 sm:px-6 border-t border-zinc-100 dark:border-white/6">
      <button
        type="button"
        onClick={onClose}
        className="h-9 px-4 rounded-lg text-[13px] font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/6 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSubmit}
        className="h-9 px-5 rounded-lg text-[13px] font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
        style={{ background: "#03b155" }}
      >
        <i className="pi pi-plus text-[11px]" aria-hidden="true" />
        Add Lead
      </button>
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      header={header}
      footer={footer}
      modal
      closable
      closeOnEscape
      draggable={false}
      resizable={false}
      unstyled
      pt={{
        // root = the whole dialog box → must carry bg, border, shadow
        root: {
          className: [
            "w-full max-w-[520px] flex flex-col",
            "bg-white dark:bg-zinc-900",
            "border border-zinc-200/60 dark:border-white/8",
            "rounded-2xl shadow-2xl overflow-hidden",
          ].join(" "),
        },
        // mask = the full-screen backdrop behind the dialog
        mask: {
          className: "fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4",
        },
        header: {
          className: "flex items-start justify-between gap-4 px-4 py-4 sm:px-6 border-b border-zinc-100 dark:border-white/6 shrink-0",
        },
        headerTitle: { className: "flex-1 min-w-0" },
        closeButton: {
          className: [
            "w-7 h-7 flex items-center justify-center rounded-lg shrink-0 transition-colors",
            "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200",
            "hover:bg-zinc-100 dark:hover:bg-white/6",
          ].join(" "),
        },
        closeButtonIcon: { className: "text-[12px]" },
        // content = scrollable body area between header and footer
        content: { className: "flex-1 overflow-y-auto" },
        footer:  { className: "shrink-0" },
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="px-4 py-4 sm:px-6 flex flex-col gap-4 max-h-[60vh] overflow-y-auto"
      >
        <SectionLabel icon="pi-user-circle" label="Personal Information" />

        {/* Full Name */}
        <Field label="Full Name" required error={errors.fullName}>
          <InputText
            ref={firstRef}
            value={form.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="e.g. James Mwangi"
            unstyled
            pt={{ root: { className: inputCls(!!errors.fullName) } }}
          />
        </Field>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Phone" required error={errors.phone}>
            <InputText
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+254 7XX XXX XXX"
              unstyled
              pt={{ root: { className: inputCls(!!errors.phone) } }}
            />
          </Field>
          <Field label="Email">
            <InputText
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="james@example.com"
              unstyled
              pt={{ root: { className: inputCls(false) } }}
            />
          </Field>
        </div>

        {/* DOB + National ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Date of Birth" required error={errors.dob}>
            {/* native date — PrimeReact Calendar adds heavy stylesheet deps */}
            <input
              type="date"
              value={form.dob}
              onChange={(e) => set("dob", e.target.value)}
              className={inputCls(!!errors.dob)}
            />
          </Field>
          <Field label="National ID / Passport">
            <InputText
              value={form.nationalId}
              onChange={(e) => set("nationalId", e.target.value)}
              placeholder="ID number"
              unstyled
              pt={{ root: { className: inputCls(false) } }}
            />
          </Field>
        </div>

        {/* Location */}
        <Field label="Location / Town">
          <InputText
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Nairobi CBD"
            unstyled
            pt={{ root: { className: inputCls(false) } }}
          />
        </Field>

        <SectionLabel icon="pi-chart-bar" label="Acquisition Info" />

        {/* Source — PrimeReact Dropdown */}
        <Field label="Lead Source" required error={errors.source}>
          <Dropdown
            value={form.source}
            options={sourceOptions}
            onChange={(e) => set("source", e.value)}
            placeholder="Select source…"
            unstyled
            pt={{
              root:    { className: dropdownCls(!!errors.source) },
              input:   { className: "flex-1 text-[13px] text-zinc-800 dark:text-zinc-200 bg-transparent outline-none cursor-pointer truncate" },
              trigger: { className: "flex items-center justify-center text-zinc-400 shrink-0 ml-1" },
              panel:   {
                className: [
                  "absolute z-[1100] mt-1 min-w-full",
                  "bg-white dark:bg-zinc-900",
                  "border border-zinc-200 dark:border-white/10",
                  "rounded-xl shadow-xl overflow-hidden",
                ].join(" "),
              },
              wrapper:      { className: "max-h-48 overflow-y-auto" },
              list:         { className: "py-1" },
              item:         {
                className: "px-3 py-2 text-[13px] cursor-pointer text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors",
              },
              emptyMessage: { className: "px-3 py-2 text-[12px] text-zinc-400" },
            }}
          />
        </Field>

        {/* Referred By */}
        <Field label="Referred By">
          <InputText
            value={form.referredBy}
            onChange={(e) => set("referredBy", e.target.value)}
            placeholder="Agent / Driver name"
            unstyled
            pt={{ root: { className: inputCls(false) } }}
          />
        </Field>

        {/* Notes — PrimeReact InputTextarea */}
        <Field label="Notes">
          <InputTextarea
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Any additional context about this lead…"
            rows={3}
            autoResize={false}
            unstyled
            pt={{ root: { className: inputCls(false) + " h-auto py-2 resize-none" } }}
          />
        </Field>
      </form>
    </Dialog>
  );
}
