/**
 * @module pipeline/data
 * Acquisition Funnel — all static seed data.
 * Ported from Greenwheels-ERP acquisition.js.
 */

// ─── KPI metrics ──────────────────────────────────────────────
/** @typedef {{ id: string, label: string, value: string, delta: { type: 'up'|'down'|'neutral', text: string }, hero?: boolean }} FunnelKpi */

/** @type {FunnelKpi[]} */
export const FUNNEL_KPIS = [
  { id: "leads", label: "Total Leads",     value: "1,842",   delta: { type: "up",   text: "+23% vs last month"   }, hero: true  },
  { id: "mql",   label: "MQL Rate",        value: "33.9%",   delta: { type: "up",   text: "+2.1pp vs last month" }              },
  { id: "won",   label: "Deals Won",       value: "14",      delta: { type: "up",   text: "+3 vs last month"     }              },
  { id: "time",  label: "Avg. Conv. Time", value: "34 days", delta: { type: "down", text: "−4d vs last month"    }              },
];

// ─── Pipeline stage config ────────────────────────────────────
/** @typedef {{ id: string, label: string, color: string, volume: number, conv: string|null, bar: number }} Stage */

/** @type {Stage[]} */
export const STAGES = [
  { id: "new-lead",  label: "New Lead",  color: "#71717a", volume: 1842, conv: null,    bar: 1.00 },
  { id: "mql",       label: "MQL",       color: "#f59e0b", volume: 624,  conv: "33.9%", bar: 0.66 },
  { id: "sql",       label: "SQL",       color: "#399180", volume: 187,  conv: "30.0%", bar: 0.44 },
  { id: "proposal",  label: "Proposal",  color: "#398E69", volume: 52,   conv: "27.8%", bar: 0.27 },
  { id: "won",       label: "Won",       color: "#03b155", volume: 14,   conv: "26.9%", bar: 0.16 },
];

// ─── Source icon map (PrimeIcons) ─────────────────────────────
export const SOURCE_ICONS = {
  "Website":      "pi-globe",
  "Referral":     "pi-share-alt",
  "Roadshow":     "pi-calendar",
  "Field agent":  "pi-users",
  "Social media": "pi-heart",
  "Walk-in":      "pi-map-marker",
};

export const LEAD_SOURCES = ["Website", "Referral", "Roadshow", "Field agent", "Social media", "Walk-in"];

// ─── Team assignees ───────────────────────────────────────────
export const ASSIGNEES = [
  { initials: "MM", bg: "#03b155",  color: "#fff" },
  { initials: "SK", bg: "#399180",  color: "#fff" },
  { initials: "JW", bg: "#398E69",  color: "#fff" },
  { initials: "AN", bg: "#b45309",  color: "#fff" },
];

// ─── Monogram tile palette (deterministic by name) ────────────
const TILES = [
  { bg: "#e8f7f0", fg: "#03b155" },
  { bg: "#e8f4f2", fg: "#399180" },
  { bg: "#e8f2ed", fg: "#398E69" },
  { bg: "#fef3c7", fg: "#b45309" },
  { bg: "#f4f4f5", fg: "#71717a" },
];

/** @param {string} name */
export function tileFor(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return TILES[sum % TILES.length];
}

/** @param {string} initials */
export function assigneeColor(initials) {
  return ASSIGNEES.find((a) => a.initials === initials) ?? { bg: "#71717a", color: "#fff" };
}

// ─── Lead columns (merged stage + cards) ─────────────────────
/**
 * @typedef {{
 *   id: string, customer: string, contact: string,
 *   source: string, owner: string,
 *   days?: string, won?: boolean, wonDate?: string
 * }} Lead
 *
 * @typedef {Stage & { leads: Lead[] }} LeadColumn
 */

const RAW_LEADS = {
  "new-lead": [
    { id: "l1", customer: "Jane Wambui",    contact: "Delivery rider · Westlands", source: "Website",     owner: "MM", days: "2d"  },
    { id: "l2", customer: "Daniel Maina",   contact: "Boda rider · Kasarani",      source: "Referral",    owner: "SK", days: "5d"  },
    { id: "l3", customer: "Grace Odhiambo", contact: "Courier · CBD",              source: "Roadshow",    owner: "JW", days: "1d"  },
    { id: "l4", customer: "Brian Kamau",    contact: "Boda rider · Rongai",        source: "Referral",    owner: "AN", days: "3d"  },
    { id: "l5", customer: "Faith Njeri",    contact: "Delivery rider · Kilimani",  source: "Field agent", owner: "MM", days: "6d"  },
  ],
  "mql": [
    { id: "l6",  customer: "Alice Kamau",   contact: "Boda rider · Embakasi",      source: "Roadshow",    owner: "SK", days: "13d" },
    { id: "l7",  customer: "David Ochieng", contact: "Courier · Industrial Area",  source: "Field agent", owner: "SK", days: "10d" },
    { id: "l8",  customer: "Peter Mwangi",  contact: "Boda rider · Githurai",      source: "Website",     owner: "JW", days: "12d" },
    { id: "l9",  customer: "Mary Akinyi",   contact: "Delivery rider · Lavington", source: "Referral",    owner: "MM", days: "8d"  },
  ],
  "sql": [
    { id: "l10", customer: "James Otieno",   contact: "Boda rider · Donholm",   source: "Referral", owner: "MM", days: "14d" },
    { id: "l11", customer: "Victor Ouma",    contact: "Courier · Westlands",    source: "Referral", owner: "JW", days: "20d" },
    { id: "l12", customer: "Priscilla Sang", contact: "Delivery rider · Karen", source: "Roadshow", owner: "AN", days: "17d" },
  ],
  "proposal": [
    { id: "l13", customer: "Sarah Ndegwa", contact: "Boda rider · Kawangware", source: "Referral",    owner: "AN", days: "11d" },
    { id: "l14", customer: "Tom Kamau",    contact: "Delivery rider · Ruaka",  source: "Website",     owner: "MM", days: "25d" },
    { id: "l15", customer: "Helen Mwiti",  contact: "Courier · Parklands",     source: "Field agent", owner: "SK", days: "18d" },
  ],
  "won": [
    { id: "l16", customer: "Rose Achieng", contact: "Boda rider · Buruburu",    source: "Roadshow", owner: "MM", won: true, wonDate: "Jun 8" },
    { id: "l17", customer: "Eric Luo",     contact: "Delivery rider · Langata", source: "Referral", owner: "JW", won: true, wonDate: "Jun 1" },
  ],
};

/** @type {LeadColumn[]} */
export const INITIAL_COLUMNS = STAGES.map((stage) => ({
  ...stage,
  leads: (RAW_LEADS[stage.id] ?? []).map((l) => ({ ...l })),
}));
