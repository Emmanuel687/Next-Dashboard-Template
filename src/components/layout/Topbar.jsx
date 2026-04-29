"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell, Settings, LogOut } from "lucide-react";
import { OverlayPanel } from "primereact/overlaypanel";

const BRAND = "#03b155";

const notifications = [
  {
    id: 1,
    title: "New Bike Registered",
    message: "Bike KMG 231A was successfully added",
    name: "System Auto",
    date: "10:12",
  },
  {
    id: 2,
    title: "KYC Pending",
    message: "3 customers require KYC approval",
    name: "John Kamau",
    date: "09:40",
  },
];

export const Topbar = ({ toggleSidebar, user, onLogout }) => {
  const op = useRef(null);
  const router = useRouter();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const initials =
    user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "GW";

  const date = now.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header
      className="
        h-[52px]
        px-3
        flex items-center justify-between
        bg-[#ffffff]
        border-b border-zinc-200
      "
    >

      {/* ───────── LEFT (SYSTEM IDENTITY) ───────── */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-gray-600 hover:text-[#03b155]"
        >
          ☰
        </button>

        {/* SYSTEM BLOCK (clean ERP identity) */}
        <div className="hidden md:flex items-center gap-3">

          {/* status dot */}
          <span className="w-2 h-2 rounded-full bg-[#03b155]" />

          <div className="leading-tight">

            {/* TOP LINE */}
            <p className="text-xs font-semibold text-gray-900">
              GreenWheels ERP
            </p>

            {/* SECOND LINE */}
            <p className="text-[10px] text-gray-500">
              {user?.org || "Operations Hub"} • {date} • {time}
            </p>

          </div>
        </div>

      </div>

      {/* ───────── CENTER (reserved for future search / commands) ───────── */}
      <div className="hidden lg:flex flex-1 justify-center">
        <div className="text-[10px] text-gray-400 tracking-widest">
          SYSTEM READY
        </div>
      </div>

      {/* ───────── RIGHT (ACTIONS) ───────── */}
      <div className="flex items-center gap-1.5">

        {/* NOTIFICATIONS */}
        <button
          onClick={(e) => op.current.toggle(e)}
          className="relative p-2 rounded-lg hover:bg-zinc-100"
        >
          <Bell size={17} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        {/* SETTINGS */}
        <button
          onClick={() => router.push("/settings")}
          className="p-2 rounded-lg hover:bg-zinc-100"
        >
          <Settings size={17} className="text-gray-600" />
        </button>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="p-2 rounded-lg hover:bg-red-50 group"
        >
          <LogOut size={17} className="text-gray-600 group-hover:text-red-600" />
        </button>

        {/* AVATAR */}
        <div
          className="
            w-8 h-8 rounded-full
            flex items-center justify-center
            text-white text-[11px] font-bold
          "
          style={{ background: BRAND }}
        >
          {initials}
        </div>

      </div>

      {/* ───────── NOTIFICATIONS PANEL ───────── */}
      <OverlayPanel ref={op} className="w-80">
        <div className="p-2">

          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-800">
              Notifications
            </h3>

            <button
              onClick={() => {
                op.current.hide();
                router.push("/notifications");
              }}
              className="text-xs text-[#03b155] hover:underline"
            >
              See all →
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">

            {notifications.map((n) => (
              <div
                key={n.id}
                className="
                  p-2.5 rounded-lg
                  border border-zinc-100
                  hover:bg-zinc-50
                "
              >
                <p className="text-xs font-semibold text-gray-800">
                  {n.title}
                </p>

                <p className="text-[11px] text-gray-500">
                  {n.message}
                </p>

                <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                  <span className="text-[#03b155]">{n.name}</span>
                  <span>{n.date}</span>
                </div>

              </div>
            ))}

          </div>

        </div>
      </OverlayPanel>

    </header>
  );
};