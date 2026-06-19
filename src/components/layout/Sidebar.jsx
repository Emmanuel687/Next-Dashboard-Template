"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Bike,
  FileText,
  Zap,
  TrendingUp,
  Users,
  UserPlus,
  Wrench,
  ClipboardList,
  MapPin,
  Package,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const BRAND       = "#03b155";
const LOGO_URL    = "https://greenwheels.africa/wp-content/uploads/2025/08/Logo-Horizontal01.svg";
const SIDEBAR_DARK = "#111318";

const NAV = [
  {
    section: null,
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["*"] },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Fleet",            href: "/fleet",     icon: Bike,     roles: ["*"] },
      { label: "Lease Contracts",  href: "/contracts", icon: FileText, roles: ["*"] },
      { label: "Battery & Energy", href: "/energy",    icon: Zap,      roles: ["*"] },
    ],
  },
  {
    section: "Customer Acquisition",
    items: [
      { label: "Acquisition Funnel", href: "/pipeline",  icon: TrendingUp, roles: ["*"] },
      { label: "Customers",          href: "/customers", icon: Users,      roles: ["*"], badgeCount: 3 },
      { label: "Leads",              href: "/leads",     icon: UserPlus,   roles: ["*"] },
    ],
  },
  {
    section: "Maintenance",
    items: [
      { label: "Workshop Queue",   href: "/maintenance/queue", icon: Wrench,        roles: ["*"], badgeCount: 12 },
      { label: "Maintenance Jobs", href: "/maintenance/jobs",  icon: ClipboardList, roles: ["*"] },
      { label: "Yard Map",         href: "/maintenance/yard",  icon: MapPin,        roles: ["*"] },
      { label: "Parts Inventory",  href: "/maintenance/parts", icon: Package,       roles: ["*"] },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Reports",  href: "/reports",  icon: BarChart2, roles: ["*"] },
      { label: "Settings", href: "/settings", icon: Settings,  roles: ["*"] },
    ],
  },
];

const CONTEXT_LABELS = {
  "gw-ke": { label: "Kenya",  color: "#03b155" },
  "gw-ug": { label: "Uganda", color: "#1a6efb" },
  "gw-gh": { label: "Ghana",  color: "#f59e0b" },
};

function canSeeSection(section, userRoles) {
  if (!section.roles) return true;
  if (userRoles.includes("*")) return true;
  if (!userRoles || userRoles.length === 0) return false;
  return section.roles.some((r) => userRoles.includes(r));
}

function canSeeItem(item, userRoles) {
  if (item.roles.includes("*")) return true;
  if (userRoles.includes("*")) return true;
  if (!userRoles || userRoles.length === 0) return false;
  return item.roles.some((r) => userRoles.includes(r));
}

function Tooltip({ label, children }) {
  return (
    <div className="group/tip relative inline-flex items-center justify-center">
      {children}
      <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 z-[99] px-2.5 py-1.5 rounded-lg text-[12px] font-medium whitespace-nowrap bg-zinc-900 dark:bg-zinc-700 text-white shadow-xl opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150">
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-zinc-900 dark:border-r-zinc-700" />
      </div>
    </div>
  );
}

// ─── Logo pill — works on both light and dark ─────────────────
// Light mode: dark pill so white SVG is visible
// Dark mode:  transparent, logo shows directly on dark bg
function LogoPill({ collapsed }) {
  if (collapsed) {
    return (
      <Tooltip label="GreenWheels OS2">
        <div className="w-8 h-8 overflow-hidden shrink-0 flex items-center">
          <img
            src={LOGO_URL}
            alt="GreenWheels"
            className="h-8 w-auto max-w-none object-left object-contain"
            style={{ minWidth: "200px", marginLeft: 0 }}
          />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
      {/*
        Light mode:  rounded dark pill so the white SVG logo is legible
        Dark mode:   no pill needed — logo sits directly on #111318
      */}
      <div className="
        inline-flex items-center
        rounded-lg px-2.5 py-1.5

        dark:bg-transparent dark:px-0 dark:py-0
        w-fit
      ">
        <img
          src={LOGO_URL}
          alt="GreenWheels"
          className="h-10 w-auto object-contain object-left"
          style={{ maxWidth: "236px" }}
        />
      </div>

    </div>
  );
}

export const Sidebar = ({ user, sidebarOpen, toggleSidebar, alertCount = 0 }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState(
    NAV.reduce((acc, s) => ({ ...acc, [s.section ?? "__root__"]: true }), {})
  );

  const userRoles = user?.roles || [];
  const contextId = user?.context_id || "gw-ke";
  const context   = CONTEXT_LABELS[contextId] || { label: contextId, color: BRAND };
  const initials  = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "GW";
  const roleName  = userRoles[0] === "*" ? "Administrator" : (userRoles[0] ?? "No role");

  function toggleSection(key) {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function isActive(href) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  function handleLinkClick() {
    if (typeof window !== "undefined" && window.innerWidth < 1024) toggleSidebar?.();
  }

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:relative z-50 h-screen flex flex-col select-none
          bg-white dark:bg-[#111318]
          border-r border-zinc-100 dark:border-white/[0.06]
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-[64px]" : "lg:w-[240px]"}
          w-[240px]
        `}
      >

        {/* ── Header ── */}
        <div
          className={`
            h-[58px] flex items-center shrink-0
            border-b border-zinc-100 dark:border-white/[0.06]
            ${collapsed ? "px-3 justify-between" : "px-3 justify-between"}
          `}
        >
          <LogoPill collapsed={collapsed} />

          {!collapsed ? (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex shrink-0 ml-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden lg:flex shrink-0 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          )}
        </div>


        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NAV.map((section, si) => {
            if (section.module && !canSeeSection(section, userRoles)) return null;
            const visibleItems = section.items.filter((item) => canSeeItem(item, userRoles));
            if (visibleItems.length === 0) return null;
            const sectionKey = section.section ?? "__root__";
            const isExpanded = expandedSections[sectionKey] !== false;

            return (
              <div key={sectionKey} className={si > 0 ? "mt-4" : ""}>

                {!collapsed && section.section && (
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="group w-full flex items-center justify-between px-4 h-[24px] mb-1"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">
                      {section.section}
                    </span>
                    <ChevronDown
                      size={10}
                      className={`text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`}
                    />
                  </button>
                )}

                {(collapsed || isExpanded) && (
                  <div className={collapsed ? "flex flex-col items-center gap-0.5 w-full" : "space-y-0.5"}>
                    {visibleItems.map((item) => {
                      const Icon   = item.icon;
                      const active = isActive(item.href);
                      const count  = item.badgeCount ?? (item.badge ? alertCount : 0);

                      if (collapsed) {
                        return (
                          <Tooltip key={item.href} label={item.label}>
                            <Link
                              href={item.href}
                              onClick={handleLinkClick}
                              className={`
                                relative w-10 h-9 flex items-center justify-center rounded-lg transition-all duration-100
                                ${active
                                  ? "text-[#03b155] bg-[#03b15516] dark:bg-[#03b15520]"
                                  : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.06]"}
                              `}
                            >
                              <Icon size={16} />
                              {count > 0 && (
                                <span className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[#03b155]" />
                              )}
                            </Link>
                          </Tooltip>
                        );
                      }

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`
                            group relative flex items-center gap-3 h-9 px-4
                            text-[13px] font-medium transition-all duration-100
                            ${active
                              ? "text-[#03b155] bg-[#03b15510] dark:bg-[#03b15518]"
                              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-white/[0.05]"}
                          `}
                        >
                          {active && (
                            <span className="absolute left-0 inset-y-[7px] w-[3px] rounded-r-full bg-[#03b155]" />
                          )}
                          <Icon
                            size={15}
                            className={`shrink-0 transition-colors ${active ? "text-[#03b155]" : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"}`}
                          />
                          <span className="truncate flex-1">{item.label}</span>
                          {count > 0 && (
                            <span className="ml-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#03b155] text-white text-[10px] font-bold">
                              {count > 99 ? "99+" : count}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── AI Assistant CTA ── */}
        {!collapsed && (
          <div className="px-3 py-2">
            <Link
              href="/ai-assistant"
              className="
                flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                bg-zinc-50 dark:bg-white/[0.04]
                hover:bg-zinc-100 dark:hover:bg-white/[0.07]
                border border-zinc-100 dark:border-white/[0.06]
                transition-colors group
              "
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
              >
                <Sparkles size={13} className="text-white" />
              </div>
              <span className="text-[12px] font-medium text-zinc-600 dark:text-zinc-400 flex-1">
                AI Assistant
              </span>
              <ArrowRight size={13} className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        )}

      </aside>
    </>
  );
};