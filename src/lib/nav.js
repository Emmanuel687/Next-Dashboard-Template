/**
 * @module nav
 * @description Single source of truth for route metadata.
 *
 * The breadcrumb, page title, and search placeholder in the Topbar
 * all read from ROUTE_META. When you add a new page:
 *   1. Add an entry here
 *   2. Add the link to the Sidebar NAV
 *
 * Keep route paths in sync with the sidebar NAV in Sidebar.jsx.
 */

/**
 * @typedef {Object} RouteMeta
 * @property {string|null} section  - Breadcrumb middle segment (null = top-level)
 * @property {string}      page     - Breadcrumb leaf / active-page label
 * @property {string}      search   - Context-specific search placeholder
 */

/** @type {Record<string, RouteMeta>} */
export const ROUTE_META = {
  // ── Top level ────────────────────────────────────────────────
  "/dashboard":            { section: null,                    page: "Dashboard",          search: "Search records, POs, suppliers…"     },

  // ── Operations ───────────────────────────────────────────────
  "/fleet":                { section: "Operations",            page: "Fleet",              search: "Search bikes, VINs, hubs…"           },
  "/fleet/vehicles":       { section: "Fleet",                 page: "Vehicles",           search: "Search VINs, models, plates…"        },
  "/fleet/maintenance":    { section: "Fleet",                 page: "Maintenance",        search: "Search jobs, vehicles, technicians…" },
  "/fleet/workshop":       { section: "Fleet",                 page: "Workshop",           search: "Search workshop jobs, bays…"         },
  "/fleet/yard-map":       { section: "Fleet",                 page: "Yard Map",           search: "Search bays, zones…"                 },
  "/contracts":            { section: "Operations",            page: "Lease Contracts",    search: "Search contracts, riders…"           },
  "/energy":               { section: "Operations",            page: "Battery & Energy",   search: "Search batteries, swap stations…"    },
  "/collections":          { section: "Operations",            page: "Collections",        search: "Search invoices, collections…"       },
  "/customer-success":     { section: "Operations",            page: "Customer Success",   search: "Search customers, tickets…"          },
  "/ert":                  { section: "Operations",            page: "ERT",                search: "Search incidents, alerts…"           },

  // ── Customer Acquisition ─────────────────────────────────────
  "/pipeline":             { section: "Customer Acquisition",  page: "Acquisition Funnel", search: "Search leads, companies, contacts…"  },
  "/customers":            { section: "Customer Acquisition",  page: "Customers",          search: "Search customers, riders…"           },
  "/leads":                { section: "Customer Acquisition",  page: "Leads",              search: "Search leads, sources, owners…"      },
  "/acquisition":          { section: "Customer Acquisition",  page: "Acquisition",        search: "Search acquisitions, leads…"         },

  // ── Driver ───────────────────────────────────────────────────
  "/driver":               { section: "Operations",            page: "Driver",             search: "Search drivers, riders…"             },
  "/driver/balance":       { section: "Driver",                page: "Balance",            search: "Search balances, transactions…"      },
  "/driver/payments":      { section: "Driver",                page: "Payments",           search: "Search payments…"                    },
  "/driver/support":       { section: "Driver",                page: "Support",            search: "Search support tickets…"             },
  "/driver/pause-request": { section: "Driver",                page: "Pause Requests",     search: "Search pause requests…"              },

  // ── Maintenance ──────────────────────────────────────────────
  "/maintenance/queue":    { section: "Maintenance",           page: "Workshop Queue",     search: "Search jobs, vehicles, technicians…" },
  "/maintenance/jobs":     { section: "Maintenance",           page: "Maintenance Jobs",   search: "Search all maintenance jobs…"        },
  "/maintenance/yard":     { section: "Maintenance",           page: "Yard Map",           search: "Search bays, zones…"                 },
  "/maintenance/parts":    { section: "Maintenance",           page: "Parts Inventory",    search: "Search parts, SKUs, suppliers…"      },

  // ── System ───────────────────────────────────────────────────
  "/reports":              { section: "System",                page: "Reports",            search: "Search reports, dashboards…"         },
  "/settings":             { section: "System",                page: "Settings",           search: "Search settings…"                    },
};

/** Fallback used when no route matches */
export const DEFAULT_META = {
  section: null,
  page:    "GreenWheels",
  search:  "Search vehicles, drivers, jobs, incidents…",
};

/**
 * Resolves route metadata for a Next.js pathname.
 * Falls back to the parent path (handles dynamic segments like /fleet/maintenance/GW-123),
 * then to DEFAULT_META.
 *
 * @param {string} pathname - Value from Next.js usePathname()
 * @returns {RouteMeta}
 */
export function getRouteMeta(pathname) {
  if (ROUTE_META[pathname]) return ROUTE_META[pathname];
  const parent = pathname.split("/").slice(0, -1).join("/");
  return ROUTE_META[parent] ?? DEFAULT_META;
}
