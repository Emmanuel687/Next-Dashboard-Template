// ─── Maintenance jobs list (used by Maintenance Jobs page) ────
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

// ─── Workshop Queue (used by Workshop Queue page) ─────────────
/** @typedef {{ id: string, title: string, vehicle: string, model: string, priority: string, status: string, technician: { name: string, initials: string }, progress: number, time: string, bay: string }} QueueJob */

/** @type {QueueJob[]} */
export const WORKSHOP_QUEUE = [
  { id: "MJ-2041", title: "Battery Diagnostics",       vehicle: "GW-203 · KDA 453X", model: "Super Soco TC",     priority: "critical", status: "in_progress",   technician: { name: "James Kariuki",   initials: "JK" }, progress: 62,  time: "2h 34m", bay: "Bay 3" },
  { id: "MJ-2040", title: "Tyre Replacement",           vehicle: "GW-189 · KCB 872Y", model: "Super Soco CPx",    priority: "high",     status: "waiting_parts", technician: { name: "Erick Kiplagat",  initials: "EK" }, progress: 35,  time: "1h 12m", bay: "Bay 1" },
  { id: "MJ-2039", title: "Brake Pad Service",          vehicle: "GW-201 · KDC 221A", model: "Super Soco TC Max", priority: "medium",   status: "in_progress",   technician: { name: "Samuel Mwangi",   initials: "SM" }, progress: 78,  time: "3h 05m", bay: "Bay 5" },
  { id: "MJ-2038", title: "Controller Firmware Update", vehicle: "GW-155 · KBF 304Z", model: "Super Soco CPx",    priority: "low",      status: "qa_review",     technician: { name: "Grace Odhiambo",  initials: "GO" }, progress: 95,  time: "45m",    bay: "Bay 2" },
  { id: "MJ-2037", title: "Charger Port Inspection",    vehicle: "GW-178 · KDD 514B", model: "Super Soco TC",     priority: "high",     status: "in_progress",   technician: { name: "James Kariuki",   initials: "JK" }, progress: 50,  time: "1h 50m", bay: "Bay 4" },
  { id: "MJ-2036", title: "Rear Suspension Overhaul",   vehicle: "GW-142 · KAB 612C", model: "Super Soco TS",     priority: "critical", status: "waiting_parts", technician: { name: "Erick Kiplagat",  initials: "EK" }, progress: 20,  time: "4h 10m", bay: "Bay 6" },
  { id: "MJ-2035", title: "Motor Bearing Replacement",  vehicle: "GW-167 · KCG 903D", model: "Super Soco TC Max", priority: "medium",   status: "qa_review",     technician: { name: "Samuel Mwangi",   initials: "SM" }, progress: 90,  time: "2h 20m", bay: "Bay 3" },
  { id: "MJ-2034", title: "Software Diagnostics",       vehicle: "GW-198 · KDE 441E", model: "Super Soco CPx",    priority: "low",      status: "completed",     technician: { name: "Grace Odhiambo",  initials: "GO" }, progress: 100, time: "1h 00m", bay: "Bay 2" },
  { id: "MJ-2033", title: "Chain & Sprocket Service",   vehicle: "GW-211 · KDF 118F", model: "Super Soco TS",     priority: "medium",   status: "in_progress",   technician: { name: "Mary Wanjiku",    initials: "MW" }, progress: 45,  time: "2h 00m", bay: "Bay 7" },
  { id: "MJ-2032", title: "Headlight Assembly Repair",  vehicle: "GW-174 · KCH 532G", model: "Super Soco TC",     priority: "low",      status: "on_hold",       technician: { name: "David Ochieng",   initials: "DO" }, progress: 10,  time: "30m",    bay: "Bay 1" },
  { id: "MJ-2031", title: "Battery Cell Balancing",     vehicle: "GW-220 · KDG 774H", model: "Super Soco CPx",    priority: "high",     status: "in_progress",   technician: { name: "James Kariuki",   initials: "JK" }, progress: 55,  time: "1h 40m", bay: "Bay 3" },
  { id: "MJ-2030", title: "Throttle Cable Replacement", vehicle: "GW-163 · KBJ 209I", model: "Super Soco TC Max", priority: "high",     status: "qa_review",     technician: { name: "Erick Kiplagat",  initials: "EK" }, progress: 88,  time: "1h 15m", bay: "Bay 2" },
  { id: "MJ-2029", title: "Front Fork Seal Leak",       vehicle: "GW-188 · KDA 641J", model: "Super Soco TS",     priority: "critical", status: "waiting_parts", technician: { name: "Samuel Mwangi",   initials: "SM" }, progress: 30,  time: "3h 30m", bay: "Bay 5" },
  { id: "MJ-2028", title: "Display Panel Replacement",  vehicle: "GW-145 · KCC 382K", model: "Super Soco TC",     priority: "medium",   status: "completed",     technician: { name: "Grace Odhiambo",  initials: "GO" }, progress: 100, time: "2h 10m", bay: "Bay 4" },
  { id: "MJ-2027", title: "Motor Cooling Fan Check",    vehicle: "GW-232 · KDE 055L", model: "Super Soco CPx",    priority: "low",      status: "completed",     technician: { name: "Mary Wanjiku",    initials: "MW" }, progress: 100, time: "55m",    bay: "Bay 6" },
  { id: "MJ-2026", title: "Side Stand Spring Repair",   vehicle: "GW-159 · KCF 747M", model: "Super Soco TC Max", priority: "low",      status: "completed",     technician: { name: "David Ochieng",   initials: "DO" }, progress: 100, time: "40m",    bay: "Bay 2" },
];

// ─── Queue KPI stats strip ────────────────────────────────────
/** @typedef {{ label: string, value: string, delta: string, up: boolean|null }} QueueStat */

/** @type {QueueStat[]} */
export const QUEUE_STATS = [
  { label: "Active Jobs",     value: "42",   delta: "+3 today",           up: true  },
  { label: "Critical",        value: "6",    delta: "2 overdue",          up: false },
  { label: "Avg. Resolution", value: "3.2h", delta: "-0.4h vs last week", up: true  },
  { label: "Parts On Order",  value: "14",   delta: "3 arriving today",   up: null  },
];

// ─── Single job detail (MJ-2041) — full structure ─────────────
export const JOB_DETAIL = {
  id:             "MJ-2041",
  title:          "Battery Diagnostics",
  status:         "in_progress",
  priority:       "critical",

  vehicle: {
    id:            "GW-203",
    plate:         "KDA 453X",
    model:         "Super Soco TC",
    year:          2023,
    odometer:      "81,245 km",
    batteryHealth: 87,
  },

  technician: {
    name:       "James Kariuki",
    initials:   "JK",
    role:       "Senior Technician",
    phone:      "+254 712 345 678",
    email:      "james.kariuki@greenwheels.co.ke",
    assignedAt: "May 29, 2026, 09:10 AM",
  },

  issueType:         "Battery Diagnostics",
  jobType:           "Preventive",
  reportedOn:        "May 29, 2026, 08:30 AM",
  reportedBy:        "John Otieno",
  estimatedDuration: "3h 00m",
  actualDuration:    "2h 34m",
  startTime:         "May 29, 2026, 09:42 AM",
  description:       "Battery pack showing cell imbalance in module 4. Voltage drop detected during load test.",

  progress:       62,
  timeInWorkshop: "2h 34m",
  eta:            "May 29, 2026, 02:30 PM",
  queuePosition:  "3 of 42",

  // Activity feed (Timeline tab)
  activity: [
    {
      id: 1, title: "Diagnosis In Progress", isCurrent: true,
      date: "May 29, 2026", time: "10:05 AM",
      actor: { name: "James Kariuki", initials: "JK" }, role: "Technician",
      description: "Battery diagnostics running. Cell 4 voltage imbalance confirmed under load testing.",
    },
    {
      id: 2, title: "Job Started", isCurrent: false,
      date: "May 29, 2026", time: "09:42 AM",
      actor: { name: "James Kariuki", initials: "JK" }, role: "Technician",
      description: "Work commenced on vehicle. Initial visual inspection complete.",
    },
    {
      id: 3, title: "Assigned to Technician", isCurrent: false,
      date: "May 29, 2026", time: "09:10 AM",
      actor: { name: "System", initials: "S" }, role: "Auto",
      description: "Assigned to James Kariuki based on availability and skill match.",
    },
    {
      id: 4, title: "Parts Requested", isCurrent: false,
      date: "May 29, 2026", time: "09:05 AM",
      actor: { name: "James Kariuki", initials: "JK" }, role: "Technician",
      description: "Battery Module BN-2045 requested from Parts Inventory. Marked as On Order.",
    },
    {
      id: 5, title: "Job Created", isCurrent: false,
      date: "May 29, 2026", time: "08:30 AM",
      actor: { name: "John Otieno", initials: "JO" }, role: "Operations",
      description: "Job created from driver report. Vehicle GW-203 moved to Workshop Bay 3.",
    },
    {
      id: 6, title: "Vehicle Checked In", isCurrent: false,
      date: "May 29, 2026", time: "08:15 AM",
      actor: { name: "Erick Kiplagat", initials: "EK" }, role: "Engineer",
      description: "Vehicle received at workshop. Odometer reading 81,245 km logged.",
    },
    {
      id: 7, title: "Incident Reported", isCurrent: false,
      date: "May 29, 2026", time: "08:00 AM",
      actor: { name: "Driver (John Otieno)", initials: "JO" }, role: "Driver",
      description: "Driver reported reduced range and slow charging. Ticket raised via Driver Portal.",
    },
  ],
};

// ─── Audit log ────────────────────────────────────────────────
export const AUDIT_LOG = [
  { id: 1, timestamp: "May 29  10:45 AM", action: "Note Added",          changedBy: "James Kariuki",  role: "Technician", before: "—",            after: "Note #3 added"         },
  { id: 2, timestamp: "May 29  10:05 AM", action: "Status Changed",      changedBy: "James Kariuki",  role: "Technician", before: "Assigned",      after: "Diagnosis In Progress"  },
  { id: 3, timestamp: "May 29  09:42 AM", action: "Job Started",         changedBy: "James Kariuki",  role: "Technician", before: "—",            after: "Work commenced"         },
  { id: 4, timestamp: "May 29  09:15 AM", action: "Note Added",          changedBy: "Erick Kiplagat", role: "Engineer",   before: "—",            after: "Note #2 added"          },
  { id: 5, timestamp: "May 29  09:10 AM", action: "Technician Assigned", changedBy: "System",         role: "Auto",       before: "Unassigned",    after: "James Kariuki"          },
  { id: 6, timestamp: "May 29  09:05 AM", action: "Part Requested",      changedBy: "James Kariuki",  role: "Technician", before: "—",            after: "BN-2045 On Order"       },
  { id: 7, timestamp: "May 29  08:30 AM", action: "Job Created",         changedBy: "John Otieno",    role: "Operations", before: "—",            after: "Status: New"            },
  { id: 8, timestamp: "May 29  08:15 AM", action: "Vehicle Checked In",  changedBy: "Erick Kiplagat", role: "Engineer",   before: "—",            after: "Odometer: 81,245 km"    },
];

// ─── Status timeline steps ────────────────────────────────────
export const STATUS_TIMELINE = [
  { label: "Job Created",            date: "May 29, 2026, 08:30 AM", by: "John Otieno",   state: "done"    },
  { label: "Assigned to Technician", date: "May 29, 2026, 09:10 AM", by: "System",        state: "done"    },
  { label: "Job Started",            date: "May 29, 2026, 09:42 AM", by: "James Kariuki", state: "done"    },
  { label: "Diagnosis In Progress",  date: "May 29, 2026, 10:05 AM", by: "James Kariuki", state: "active"  },
  { label: "Waiting for Parts",      date: "Pending",                 by: "",              state: "pending" },
  { label: "Parts Received",         date: "Pending",                 by: "",              state: "pending" },
  { label: "QA Review",              date: "Pending",                 by: "",              state: "pending" },
  { label: "Completed",              date: "Pending",                 by: "",              state: "pending" },
];

// ─── Parts for the job ────────────────────────────────────────
export const JOB_PARTS = [
  { id: 1, name: "Battery Module BN-2045", partNumber: "BN-2045-GW", qty: 1, unitCost: "KES 8,500", totalCost: "KES 8,500", status: "on_order" },
  { id: 2, name: "Brake Fluid 500ml",      partNumber: "BF-500-STD", qty: 2, unitCost: "KES 450",   totalCost: "KES 900",   status: "in_stock" },
  { id: 3, name: "Cable Connector Type-B", partNumber: "CC-TB-01",   qty: 3, unitCost: "KES 120",   totalCost: "KES 360",   status: "in_stock" },
];
export const PARTS_TOTAL = "KES 9,760";

// Parts alert banner (shown when any part is on_order)
export const PARTS_ALERT = {
  line1: "Battery Module BN-2045 is on order from supplier. Expected delivery May 30, 2026, 09:00 AM.",
  line2: "Job status will auto-update to Parts Received on delivery confirmation.",
};

// Parts history — last 5 jobs on this vehicle
export const PARTS_HISTORY = [
  { jobId: "MJ-1987", partName: "Brake Pads Set",        dateUsed: "May 15, 2026", qty: 1, cost: "KES 1,200",  technician: "James Kariuki"  },
  { jobId: "MJ-1923", partName: "Tyre 100/80-17",        dateUsed: "Apr 28, 2026", qty: 2, cost: "KES 6,000",  technician: "Mary Wanjiku"   },
  { jobId: "MJ-1864", partName: "Controller Unit",        dateUsed: "Apr 05, 2026", qty: 1, cost: "KES 12,500", technician: "David Ochieng"  },
  { jobId: "MJ-1789", partName: "Brake Fluid 500ml",      dateUsed: "Mar 20, 2026", qty: 1, cost: "KES 450",    technician: "Erick Kiplagat" },
  { jobId: "MJ-1711", partName: "Cable Connector Type-A", dateUsed: "Mar 02, 2026", qty: 2, cost: "KES 240",    technician: "John Otieno"    },
];

// ─── Notes ───────────────────────────────────────────────────
export const JOB_NOTES = [
  { id: 1, author: "James Kariuki",  role: "Technician", initials: "JK", date: "May 29, 2026, 10:05 AM", text: "Initial diagnostic complete. Battery module 4 showing imbalance. Recommend full module replacement." },
  { id: 2, author: "Erick Kiplagat", role: "Engineer",   initials: "EK", date: "May 29, 2026, 09:15 AM", text: "Initial inspection complete. Voltage drop confirmed across cell group 3–5. Flagged for escalation." },
];

// ─── Status config (used by JobStatusTag) ────────────────────
export const STATUS_CFG = {
  new:           { label: "New",           className: "bg-zinc-100  dark:bg-white/[0.07]   text-zinc-600  dark:text-zinc-300"   },
  assigned:      { label: "Assigned",      className: "bg-blue-50   dark:bg-blue-950/40    text-blue-600  dark:text-blue-300"   },
  in_progress:   { label: "In Progress",   className: "bg-amber-50  dark:bg-amber-950/40   text-amber-600 dark:text-amber-300"  },
  waiting_parts: { label: "Waiting Parts", className: "bg-orange-50 dark:bg-orange-950/40  text-orange-600 dark:text-orange-300"},
  qa_review:     { label: "QA Review",     className: "bg-violet-50 dark:bg-violet-950/40  text-violet-600 dark:text-violet-300"},
  completed:     { label: "Completed",     className: "bg-green-50  dark:bg-green-950/40   text-[#03b155] dark:text-green-300"  },
  on_hold:       { label: "On Hold",       className: "bg-red-50    dark:bg-red-950/40     text-red-600   dark:text-red-300"    },
};

// ─── Priority config ──────────────────────────────────────────
export const PRIORITY_CFG = {
  critical: { label: "Critical Priority", icon: "pi-exclamation-circle", color: "text-red-500",    bg: "bg-red-50    dark:bg-red-950/40"    },
  high:     { label: "High Priority",     icon: "pi-angle-double-up",    color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/40" },
  medium:   { label: "Medium Priority",   icon: "pi-minus",              color: "text-amber-500",  bg: "bg-amber-50  dark:bg-amber-950/40"  },
  low:      { label: "Low Priority",      icon: "pi-angle-down",         color: "text-blue-500",   bg: "bg-blue-50   dark:bg-blue-950/40"   },
};

// ─── Role badge config ────────────────────────────────────────
export const ROLE_CFG = {
  Technician: { className: "bg-green-50  dark:bg-green-950/40  text-[#03b155]"  },
  Engineer:   { className: "bg-blue-50   dark:bg-blue-950/40   text-blue-600"   },
  Operations: { className: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600" },
  Auto:       { className: "bg-zinc-100  dark:bg-white/[0.07]  text-zinc-500"   },
  Driver:     { className: "bg-purple-50 dark:bg-purple-950/40 text-purple-600" },
  System:     { className: "bg-zinc-100  dark:bg-white/[0.07]  text-zinc-500"   },
};
