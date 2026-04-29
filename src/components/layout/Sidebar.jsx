"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Bike,
  ClipboardCheck,
  List,
  Users,
  FileText,
  AlertTriangle,
  Search,
  CheckCircle,
  Wrench,
  ClipboardEdit,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BRAND = "#03b155";

const NAV = [
  {
    section: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Operations",
    items: [
      { label: "Bike Registry", href: "/bikes", icon: Bike },
      { label: "QC Checklist", href: "/bikes/qc", icon: ClipboardCheck },
      { label: "Master List", href: "/bikes/list", icon: List },
    ],
  },
  {
    section: "Customers",
    items: [
      { label: "Customers", href: "/customers", icon: Users },
      { label: "KYC", href: "/customers/kyc", icon: FileText },
    ],
  },
  {
    section: "Incidents",
    items: [
      { label: "Incidents", href: "/irc", icon: AlertTriangle },
      { label: "Triage", href: "/irc/triage", icon: Search },
      { label: "Resolutions", href: "/irc/resolutions", icon: CheckCircle },
    ],
  },
  {
    section: "Maintenance",
    items: [
      { label: "Tickets", href: "/maintenance", icon: Wrench },
      { label: "Assessments", href: "/maintenance/assessments", icon: ClipboardEdit },
      { label: "Repossessions", href: "/maintenance/repossessions", icon: Truck },
    ],
  },
];

export const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const initials =
    user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "GW";

  return (
    <>
      {/* ───────── MOBILE OVERLAY ───────── */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ───────── SIDEBAR SHELL ───────── */}
      <aside
        className={`
          fixed lg:relative z-50
          h-screen flex flex-col

          bg-white/80 backdrop-blur-xl
          border-r border-zinc-200
          shadow-xl

          transition-transform duration-300 ease-in-out

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-72
        `}
      >

        {/* ───────── HEADER ───────── */}
        <div className="h-14 px-3 flex items-center justify-between border-b border-zinc-200 shrink-0">

          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
              style={{ background: BRAND }}
            >
              GW
            </div>

            {!collapsed && (
              <div className="leading-tight">
                <div className="text-sm font-semibold text-gray-900">
                  GreenWheels OS
                </div>
                <div className="text-[10px] text-gray-500">
                  Operations System
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(p => !p)}
            className="hidden lg:flex text-gray-500 hover:text-[#03b155]"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* ───────── NAV (SCROLLABLE AREA) ───────── */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">

          {NAV.map(section => (
            <div key={section.section}>

              {!collapsed && (
                <div className="px-2 mb-2">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {section.section}
                  </p>
                </div>
              )}

              <div className="space-y-1">

                {section.items.map(item => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={toggleSidebar}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-xl
                        transition-all duration-200

                        ${active
                          ? "bg-[#03b15510] text-[#03b155] border border-[#03b15530] shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"}
                      `}
                    >
                      <Icon size={18} />

                      {!collapsed && (
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}

              </div>
            </div>
          ))}
        </nav>

        {/* ───────── FOOTER (PINNED) ───────── */}
        <div className="border-t border-zinc-200 p-3 shrink-0 bg-white/60">

          <div className="flex items-center gap-2">

            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
              style={{ background: BRAND }}
            >
              {initials}
            </div>

            {!collapsed && (
              <div className="leading-tight">
                <p className="text-xs font-medium text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-[10px] text-gray-500">
                  {user?.role || "Admin"}
                </p>
              </div>
            )}

          </div>

        </div>

      </aside>
    </>
  );
};