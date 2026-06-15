// ─── Maintenance jobs list ────────────────────────────────────
export const MAINTENANCE_JOBS = [
  { id: "MJ-2041", title: "Battery Diagnostics",      vehicle: "GW-203", plate: "KDA 453X", model: "Super Soco TC",     technician: "James Kariuki",  priority: "critical", status: "in_progress",   eta: "May 29, 02:30 PM", progress: 62,  created: "May 29, 2026" },
  { id: "MJ-2040", title: "Brake Pad Replacement",    vehicle: "GW-187", plate: "KDB 221Y", model: "Super Soco TC Max", technician: "Erick Kiplagat", priority: "high",     status: "waiting_parts", eta: "May 30, 10:00 AM", progress: 45,  created: "May 29, 2026" },
  { id: "MJ-2039", title: "Tire Rotation & Check",    vehicle: "GW-142", plate: "KDA 884Z", model: "Roam Air",          technician: "Grace Achieng",  priority: "medium",   status: "assigned",      eta: "May 29, 04:00 PM", progress: 10,  created: "May 28, 2026" },
  { id: "MJ-2038", title: "Motor Controller Fault",   vehicle: "GW-098", plate: "KCB 553W", model: "Super Soco TC",     technician: "Daniel Mwangi",  priority: "critical", status: "new",           eta: "TBD",              progress: 0,   created: "May 28, 2026" },
  { id: "MJ-2037", title: "Full Inspection",          vehicle: "GW-201", plate: "KDA 901A", model: "Roam Air",          technician: "James Kariuki",  priority: "low",      status: "qa_review",     eta: "May 29, 12:00 PM", progress: 90,  created: "May 27, 2026" },
  { id: "MJ-2036", title: "Battery Pack Swap",        vehicle: "GW-155", plate: "KDB 332X", model: "Super Soco TC Max", technician: "Erick Kiplagat", priority: "high",     status: "completed",     eta: "Completed",        progress: 100, created: "May 27, 2026" },
  { id: "MJ-2035", title: "Cable Harness Check",      vehicle: "GW-167", plate: "KDA 228Q", model: "Super Soco TC",     technician: "Grace Achieng",  priority: "medium",   status: "in_progress",   eta: "May 29, 03:00 PM", progress: 55,  created: "May 27, 2026" },
  { id: "MJ-2034", title: "Charger Port Cleaning",    vehicle: "GW-110", plate: "KCB 771J", model: "Roam Air",          technician: "Daniel Mwangi",  priority: "low",      status: "completed",     eta: "Completed",        progress: 100, created: "May 26, 2026" },
];

// ─── Single job detail (MJ-2041) ─────────────────────────────
export const JOB_DETAIL = {
  id: "MJ-2041",
  title: "Battery Diagnostics",
  status: "in_progress",
  priority: "critical",
  vehicle: { id: "GW-203", plate: "KDA 453X", model: "Super Soco TC" },
  technician: { name: "James Kariuki", role: "Technician", initials: "JK" },
  progress: 62,
  timeInWorkshop: "2h 34m",
  startTime: "May 29, 2026, 09:42 AM",
  eta: "May 29, 2026, 02:30 PM",
  queuePosition: "3 of 42",
};

// ─── Audit log ────────────────────────────────────────────────
export const AUDIT_LOG = [
  { id: 1, timestamp: "May 29  10:45 AM", action: "Note Added",          changedBy: "James Kariuki", role: "Technician", before: "—",            after: "Note #3 added"        },
  { id: 2, timestamp: "May 29  10:05 AM", action: "Status Changed",      changedBy: "James Kariuki", role: "Technician", before: "Assigned",      after: "Diagnosis In Progress" },
  { id: 3, timestamp: "May 29  09:42 AM", action: "Job Started",         changedBy: "James Kariuki", role: "Technician", before: "—",            after: "Work commenced"        },
  { id: 4, timestamp: "May 29  09:15 AM", action: "Note Added",          changedBy: "Erick Kiplagat", role: "Engineer",  before: "—",            after: "Note #2 added"         },
  { id: 5, timestamp: "May 29  09:10 AM", action: "Technician Assigned", changedBy: "System",         role: "Auto",      before: "Unassigned",    after: "James Kariuki"         },
  { id: 6, timestamp: "May 29  09:05 AM", action: "Part Requested",      changedBy: "James Kariuki", role: "Technician", before: "—",            after: "BN-2045 On Order"      },
  { id: 7, timestamp: "May 29  08:30 AM", action: "Job Created",         changedBy: "John Otieno",   role: "Operations", before: "—",            after: "Status: New"           },
  { id: 8, timestamp: "May 29  08:15 AM", action: "Vehicle Checked In",  changedBy: "Erick Kiplagat", role: "Engineer",  before: "—",            after: "Odometer: 81,245 km"   },
];

// ─── Status timeline steps ────────────────────────────────────
export const STATUS_TIMELINE = [
  { label: "Job Created",           date: "May 29, 2026, 08:30 AM", by: "John Otieno",    state: "done"    },
  { label: "Assigned to Technician",date: "May 29, 2026, 09:10 AM", by: "System",         state: "done"    },
  { label: "Job Started",           date: "May 29, 2026, 09:42 AM", by: "James Kariuki",  state: "done"    },
  { label: "Diagnosis In Progress", date: "May 29, 2026, 10:05 AM", by: "James Kariuki",  state: "active"  },
  { label: "Waiting for Parts",     date: "Pending",                 by: "",               state: "pending" },
  { label: "Parts Received",        date: "Pending",                 by: "",               state: "pending" },
  { label: "QA Review",             date: "Pending",                 by: "",               state: "pending" },
  { label: "Completed",             date: "Pending",                 by: "",               state: "pending" },
];

// ─── Parts for the job ────────────────────────────────────────
export const JOB_PARTS = [
  { id: 1, name: "Battery Module BN-2045",  qty: 1, unitCost: "KES 5,200", status: "on_order"  },
  { id: 2, name: "Brake Fluid 500ml",        qty: 2, unitCost: "KES 850",   status: "in_stock"  },
  { id: 3, name: "Cable Connector Type-B",   qty: 3, unitCost: "KES 620",   status: "in_stock"  },
];
export const PARTS_TOTAL = "KES 9,710";

// ─── Notes ───────────────────────────────────────────────────
export const JOB_NOTES = [
  { id: 1, author: "James Kariuki",  role: "Technician", initials: "JK", date: "May 29, 2026, 10:05 AM", text: "Initial diagnostic complete. Battery module 4 showing imbalance. Recommend full module replacement." },
  { id: 2, author: "Erick Kiplagat", role: "Engineer",   initials: "EK", date: "May 29, 2026, 09:15 AM", text: "Initial inspection complete. Voltage drop confirmed across cell group 3–5. Flagged for escalation." },
];

// ─── Status config (used by JobStatusTag everywhere) ─────────
export const STATUS_CFG = {
  new:           { label: "New",            className: "bg-zinc-100   dark:bg-white/[0.07]  text-zinc-600  dark:text-zinc-300"  },
  assigned:      { label: "Assigned",       className: "bg-blue-50    dark:bg-blue-950/40   text-blue-600  dark:text-blue-300"  },
  in_progress:   { label: "In Progress",    className: "bg-amber-50   dark:bg-amber-950/40  text-amber-600 dark:text-amber-300" },
  waiting_parts: { label: "Waiting Parts",  className: "bg-orange-50  dark:bg-orange-950/40 text-orange-600 dark:text-orange-300" },
  qa_review:     { label: "QA Review",      className: "bg-violet-50  dark:bg-violet-950/40 text-violet-600 dark:text-violet-300" },
  completed:     { label: "Completed",      className: "bg-green-50   dark:bg-green-950/40  text-[#03b155] dark:text-green-300" },
};

// ─── Priority config ──────────────────────────────────────────
export const PRIORITY_CFG = {
  critical: { label: "Critical Priority", icon: "pi-exclamation-circle", color: "text-red-500",    bg: "bg-red-50    dark:bg-red-950/40"    },
  high:     { label: "High Priority",     icon: "pi-angle-double-up",    color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
  medium:   { label: "Medium Priority",   icon: "pi-minus",               color: "text-amber-500",  bg: "bg-amber-50  dark:bg-amber-950/40"  },
  low:      { label: "Low Priority",      icon: "pi-angle-down",          color: "text-blue-500",   bg: "bg-blue-50   dark:bg-blue-950/40"   },
};

// ─── Role badge config ────────────────────────────────────────
export const ROLE_CFG = {
  Technician: { className: "bg-green-50  dark:bg-green-950/40  text-[#03b155]" },
  Engineer:   { className: "bg-blue-50   dark:bg-blue-950/40   text-blue-600"  },
  Operations: { className: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600"},
  Auto:       { className: "bg-zinc-100  dark:bg-white/[0.07]  text-zinc-600"  },
};
