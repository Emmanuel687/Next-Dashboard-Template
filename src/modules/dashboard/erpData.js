/**
 * @module erpData
 * @description Static data for the Operations Dashboard.
 *
 * All monetary amounts are in KSh. Percentages are plain numbers (0–100).
 * Labels are co-located with their data — no i18n layer yet.
 *
 * To wire real data: replace the exported constants with React Query hooks
 * in a sibling `useOperationsData.js` file; the component imports stay the same.
 */

import {
  DollarSign,
  FileText,
  BarChart2,
  Clock,
} from "lucide-react";

// ─── Brand palette (mirrors ERP design tokens) ────────────────
export const BRAND   = "#03b155";
export const YELLOW  = "#FFDB4B";
export const ECO     = "#399180";
export const FOREST  = "#398E69";
export const RED     = "#d94f3d";

// ─── KPI cards ────────────────────────────────────────────────
/**
 * @typedef {Object} KpiCard
 * @property {string}   id        - Unique card identifier
 * @property {string}   label     - Display label
 * @property {string}   value     - Formatted headline value
 * @property {string}   vsLabel   - Contextual comparison label (e.g. "vs last month")
 * @property {{ type: 'up'|'down'|'warn', text: string }} delta - Trend data
 * @property {React.ElementType} icon      - Lucide icon component
 * @property {string}   iconBg    - Tailwind bg class for icon wrapper
 * @property {string}   iconColor - Tailwind text class for icon
 */
export const KPI_CARDS = [
  {
    id:       "revenue",
    label:    "Revenue (MTD)",
    value:    "KSh 27.9M",
    vsLabel:  "vs last month",
    delta:    { type: "up",   text: "+8.4%" },
    icon:     DollarSign,
    iconBg:   "bg-[#e6f2ec] dark:bg-green-950/40",
    iconColor:"text-[#03b155]",
  },
  {
    id:       "leases",
    label:    "Active Leases",
    value:    "1,327",
    vsLabel:  "new this month",
    delta:    { type: "up",   text: "+112" },
    icon:     FileText,
    iconBg:   "bg-emerald-50 dark:bg-emerald-950/40",
    iconColor:"text-emerald-600 dark:text-emerald-400",
  },
  {
    id:       "utilization",
    label:    "Fleet Utilization",
    value:    "86%",
    vsLabel:  "vs last month",
    delta:    { type: "up",   text: "+3.2pp" },
    icon:     BarChart2,
    iconBg:   "bg-teal-50 dark:bg-teal-950/40",
    iconColor:"text-teal-600 dark:text-teal-400",
  },
  {
    id:       "arrears",
    label:    "Repayments in Arrears",
    value:    "38",
    vsLabel:  "over 7 days",
    delta:    { type: "warn", text: "+11" },
    icon:     Clock,
    iconBg:   "bg-amber-50 dark:bg-amber-950/40",
    iconColor:"text-amber-500",
  },
];

// ─── Revenue & Cost line chart — Jan–Jun 2026 ─────────────────
/**
 * @typedef {Object} RevenuePoint
 * @property {string} month      - Short month label ("Jan", "Feb", …)
 * @property {number} revenue    - Lease revenue in millions
 * @property {number} fleetCost  - Fleet operating cost in millions
 * @property {number} netMargin  - Net margin in millions
 */
export const REVENUE_DATA = [
  { month: "Jan", revenue: 18.4, fleetCost: 14.2, netMargin: 10.8 },
  { month: "Feb", revenue: 20.1, fleetCost: 15.1, netMargin: 11.9 },
  { month: "Mar", revenue: 22.3, fleetCost: 16.0, netMargin: 13.1 },
  { month: "Apr", revenue: 23.8, fleetCost: 16.8, netMargin: 14.2 },
  { month: "May", revenue: 25.6, fleetCost: 17.9, netMargin: 15.5 },
  { month: "Jun", revenue: 27.9, fleetCost: 19.2, netMargin: 16.8 },
];

/** Line series config — order matches the legend */
export const REVENUE_LINES = [
  { key: "revenue",   label: "Lease Revenue", color: BRAND,   dashed: false },
  { key: "fleetCost", label: "Fleet Cost",    color: YELLOW,  dashed: true  },
  { key: "netMargin", label: "Net Margin",    color: ECO,     dashed: false },
];

// ─── Department spend horizontal bars ─────────────────────────
/**
 * @typedef {Object} DeptSpend
 * @property {string} id     - Unique department identifier
 * @property {string} label  - Display name
 * @property {number} pct    - Budget utilisation percentage (0–100)
 * @property {string} amount - Formatted KSh amount
 * @property {string} color  - CSS colour for the progress fill
 */
export const DEPT_SPEND = [
  { id: "fleet",       label: "Fleet & OEM",          pct: 78, amount: "KSh 14.6M", color: BRAND  },
  { id: "battery",     label: "Battery & Energy",     pct: 52, amount: "KSh 9.6M",  color: ECO    },
  { id: "service",     label: "Service & Maintenance", pct: 34, amount: "KSh 6.3M",  color: YELLOW },
  { id: "acquisition", label: "Rider Acquisition",    pct: 22, amount: "KSh 4.1M",  color: FOREST },
  { id: "tech",        label: "Tech & Platform",      pct: 12, amount: "KSh 2.3M",  color: "#80CCA0" },
];

// ─── Purchase orders table ─────────────────────────────────────
/**
 * @typedef {'warn'|'success'|'eco'|'forest'|'danger'} BadgeVariant
 *
 * @typedef {Object} PurchaseOrder
 * @property {string}       id       - PO number
 * @property {string}       supplier - Supplier name
 * @property {string}       date     - Requested date (display string)
 * @property {string}       value    - Formatted KSh amount
 * @property {string}       status   - Status label text
 * @property {BadgeVariant} badge    - Key into BADGE_STYLES
 */
export const PURCHASE_ORDERS = [
  { id: "PO-2026-0847", supplier: "Roam Motors (OEM)",    date: "12 Jun 2026", value: "KSh 2,392,000", status: "Pending",    badge: "warn"    },
  { id: "PO-2026-0846", supplier: "CATL Battery Systems", date: "11 Jun 2026", value: "KSh 676,000",   status: "Approved",   badge: "success" },
  { id: "PO-2026-0845", supplier: "Bosch eBike Systems",  date: "10 Jun 2026", value: "KSh 4,257,500", status: "In Transit", badge: "eco"     },
  { id: "PO-2026-0844", supplier: "Spiro Components",     date: "09 Jun 2026", value: "KSh 1,284,400", status: "Received",   badge: "forest"  },
  { id: "PO-2026-0843", supplier: "Watu Spare Parts",     date: "07 Jun 2026", value: "KSh 273,000",   status: "Overdue",    badge: "danger"  },
];

/** Tailwind classes for each badge variant */
export const BADGE_STYLES = {
  warn:    "bg-amber-50   dark:bg-amber-950/40   text-amber-600  dark:text-amber-400",
  success: "bg-green-50   dark:bg-green-950/40   text-[#03b155]",
  eco:     "bg-teal-50    dark:bg-teal-950/40    text-teal-700   dark:text-teal-400",
  forest:  "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  danger:  "bg-red-50     dark:bg-red-950/40     text-red-500",
};

// ─── Fleet status donut ────────────────────────────────────────
/** Total e-bike count — used as the donut centre label */
export const FLEET_TOTAL = 2140;

/**
 * @typedef {Object} FleetSegment
 * @property {string} id    - Unique segment identifier
 * @property {string} label - Legend display label
 * @property {number} value - Absolute bike count
 * @property {number} pct   - Percentage of total (0–100)
 * @property {string} color - CSS hex colour for the donut segment
 */
export const FLEET_STATUS = [
  { id: "onLease",   label: "On Lease",   value: 1327, pct: 62, color: BRAND    },
  { id: "available", label: "Available",  value: 428,  pct: 20, color: YELLOW   },
  { id: "inService", label: "In Service", value: 235,  pct: 11, color: RED      },
  { id: "retired",   label: "Retired",    value: 150,  pct:  7, color: "#a8ccba" },
];

// ─── Period tabs ───────────────────────────────────────────────
export const PERIOD_TABS = ["Today", "Week", "Month", "Quarter", "YTD"];
