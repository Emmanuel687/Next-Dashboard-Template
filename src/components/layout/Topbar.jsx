"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Settings,
  LogOut,
  Sun,
  Moon,
  Search,
  Calendar,
  ChevronDown,
  Menu,
  AlertCircle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { useThemeStore } from "@/store/useThemeStore";

const BRAND = "#03b155";

// ─── Mock notifications ───────────────────────────────────────
// Replace with real data from useNotificationStore / SSE
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "alert",
    title: "Critical Maintenance Job",
    message: "Vehicle GW-203 flagged for immediate battery replacement",
    actor: "System Alert",
    time: "10:12",
    unread: true,
  },
  {
    id: 2,
    type: "info",
    title: "KYC Pending",
    message: "3 customers require KYC approval before onboarding",
    actor: "John Kamau",
    time: "09:40",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    title: "Incident Resolved",
    message: "Incident IRC-2041 has been closed by the ERT team",
    actor: "Grace Wanjiku",
    time: "08:55",
    unread: false,
  },
  {
    id: 4,
    type: "alert",
    title: "Overdue Invoices",
    message: "14 invoices are now 30+ days overdue in Collections",
    actor: "Finance System",
    time: "Yesterday",
    unread: false,
  },
];

const NOTIF_ICONS = {
  alert:   { icon: AlertCircle,  color: "text-red-500",   bg: "bg-red-50 dark:bg-red-950/40"     },
  success: { icon: CheckCircle2, color: "text-[#03b155]", bg: "bg-green-50 dark:bg-green-950/30" },
  info:    { icon: Info,         color: "text-blue-500",  bg: "bg-blue-50 dark:bg-blue-950/40"   },
};

// ─── Search modal ─────────────────────────────────────────────
function SearchModal({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[560px] mx-4 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
          <Search size={16} className="text-zinc-400 shrink-0" />
          <input
            ref={ref}
            placeholder="Search vehicles, drivers, jobs, incidents..."
            className="flex-1 text-[14px] bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-400 font-mono">
            ESC
          </kbd>
        </div>
        <div className="px-4 py-3">
          <p className="text-[11px] text-zinc-400 uppercase tracking-widest font-semibold mb-2">
            Quick links
          </p>
          {["Vehicle Grid", "Workshop Queue", "Live Incidents", "Collections"].map((label) => (
            <button
              key={label}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left"
            >
              <Search size={13} className="text-zinc-400" />
              <span className="text-[13px] text-zinc-700 dark:text-zinc-300">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Notification panel ───────────────────────────────────────
function NotificationPanel({ notifications, onClose, onClearAll }) {
  return (
    <div className="
      absolute right-0 top-[calc(100%+8px)] z-[100]
      w-[360px] rounded-2xl overflow-hidden shadow-xl
      bg-white dark:bg-zinc-900
      border border-zinc-100 dark:border-zinc-800
    ">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <h3 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">
            Notifications
          </h3>
          {notifications.filter(n => n.unread).length > 0 && (
            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#03b155] text-white text-[10px] font-bold">
              {notifications.filter(n => n.unread).length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="text-[11px] text-zinc-400 hover:text-[#03b155] transition-colors"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[340px] overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-800">
        {notifications.map((n) => {
          const cfg  = NOTIF_ICONS[n.type] || NOTIF_ICONS.info;
          const Icon = cfg.icon;
          return (
            <div
              key={n.id}
              className={`
                flex gap-3 px-4 py-3 cursor-pointer
                ${n.unread ? "bg-zinc-50/80 dark:bg-white/[0.03]" : ""}
                hover:bg-zinc-50 dark:hover:bg-white/[0.04] transition-colors
              `}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
                <Icon size={14} className={cfg.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[12px] font-semibold leading-tight truncate ${n.unread ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {n.title}
                  </p>
                  <span className="text-[10px] text-zinc-400 shrink-0 mt-px">{n.time}</span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-500 mt-0.5 leading-relaxed line-clamp-2">
                  {n.message}
                </p>
                <p className="text-[10px] mt-1" style={{ color: BRAND }}>{n.actor}</p>
              </div>
              {n.unread && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#03b155] shrink-0 mt-1.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800">
        <button className="w-full text-[12px] text-center text-zinc-500 hover:text-[#03b155] transition-colors">
          View all notifications →
        </button>
      </div>
    </div>
  );
}

// ─── Main Topbar ──────────────────────────────────────────────
export const Topbar = ({ toggleSidebar, user, onLogout }) => {
  const router = useRouter();
  const { dark, toggle } = useThemeStore();

  const [now, setNow]               = useState(new Date());
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen]   = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const notifRef = useRef(null);
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // ⌘K shortcut
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close notif panel on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleClearAll = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) || "GW";
  const roleName = user?.role_label || user?.roles?.[0] || "Admin";

  const dateStr = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* ── Search modal ── */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="
        h-[54px] px-4 flex items-center justify-between shrink-0
        bg-white dark:bg-[#111318]
        border-b border-zinc-100 dark:border-white/[0.06]
      ">

        {/* ── LEFT ── */}
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={toggleSidebar}
            className="
              lg:hidden w-8 h-8 flex items-center justify-center rounded-lg
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-white/[0.06]
              transition-colors
            "
          >
            <Menu size={17} />
          </button>

          {/* Date + time — matches design */}
          <button className="
            hidden md:flex items-center gap-2 h-8 px-3 rounded-lg
            bg-zinc-50 dark:bg-white/[0.05]
            border border-zinc-100 dark:border-white/[0.07]
            hover:bg-zinc-100 dark:hover:bg-white/[0.08]
            transition-colors group
          ">
            <Calendar size={13} className="text-zinc-400 dark:text-zinc-500 shrink-0" />
            <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">
              {dateStr}
            </span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
              {timeStr}
            </span>
            <ChevronDown size={11} className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 transition-colors" />
          </button>
        </div>

        {/* ── CENTER — Search bar ── */}
        <div className="flex-1 max-w-[420px] mx-4 hidden sm:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="
              w-full flex items-center gap-2.5 h-9 px-3 rounded-xl
              bg-zinc-50 dark:bg-white/[0.05]
              border border-zinc-100 dark:border-white/[0.07]
              hover:border-zinc-200 dark:hover:border-white/[0.12]
              hover:bg-zinc-100 dark:hover:bg-white/[0.08]
              transition-all group text-left
            "
          >
            <Search size={14} className="text-zinc-400 shrink-0" />
            <span className="text-[13px] text-zinc-400 dark:text-zinc-500 flex-1">
              Search hub, vehicle, driver, cabinet...
            </span>
            <kbd className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.1] text-[10px] text-zinc-400 font-mono shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-1">

          {/* Search icon (mobile) */}
          <button
            onClick={() => setSearchOpen(true)}
            className="
              sm:hidden w-8 h-8 flex items-center justify-center rounded-lg
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-white/[0.06]
              transition-colors
            "
          >
            <Search size={16} />
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            title={dark ? "Switch to light" : "Switch to dark"}
            className="
              w-8 h-8 flex items-center justify-center rounded-lg
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-white/[0.06]
              hover:text-zinc-800 dark:hover:text-zinc-200
              transition-colors
            "
          >
            {dark
              ? <Sun size={16} />
              : <Moon size={16} />
            }
          </button>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen((p) => !p)}
              className="
                relative w-8 h-8 flex items-center justify-center rounded-lg
                text-zinc-500 dark:text-zinc-400
                hover:bg-zinc-100 dark:hover:bg-white/[0.06]
                hover:text-zinc-800 dark:hover:text-zinc-200
                transition-colors
              "
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span className="
                  absolute -top-0.5 -right-0.5
                  min-w-[16px] h-[16px] px-[3px]
                  flex items-center justify-center
                  rounded-full bg-[#03b155] text-white text-[9px] font-bold
                ">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <NotificationPanel
                notifications={notifications}
                onClose={() => setNotifOpen(false)}
                onClearAll={handleClearAll}
              />
            )}
          </div>

          {/* Settings */}
          <button
            onClick={() => router.push("/settings")}
            className="
              w-8 h-8 flex items-center justify-center rounded-lg
              text-zinc-500 dark:text-zinc-400
              hover:bg-zinc-100 dark:hover:bg-white/[0.06]
              hover:text-zinc-800 dark:hover:text-zinc-200
              transition-colors
            "
          >
            <Settings size={16} />
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-zinc-100 dark:bg-white/[0.08] mx-1" />

          {/* User avatar + name — matches design */}
          <button className="
            flex items-center gap-2 h-8 pl-1 pr-2.5 rounded-lg
            hover:bg-zinc-100 dark:hover:bg-white/[0.06]
            transition-colors group
          ">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
              style={{ background: BRAND }}
            >
              {initials}
            </div>
            <div className="hidden md:block text-left leading-tight">
              <p className="text-[12px] font-semibold text-zinc-800 dark:text-zinc-200 leading-tight">
                {user?.name || "User"}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
                {roleName}
              </p>
            </div>
            <ChevronDown size={11} className="hidden md:block text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 transition-colors" />
          </button>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="
              w-8 h-8 flex items-center justify-center rounded-lg
              text-zinc-400 dark:text-zinc-500
              hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-950/30
              transition-colors
            "
            title="Sign out"
          >
            <LogOut size={15} />
          </button>

        </div>
      </header>
    </>
  );
};