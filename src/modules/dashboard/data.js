import {
  Bike, Activity, Wrench, AlertTriangle, Users, MapPin,
  CheckCircle2, AlertCircle, Info, Battery, Shield, Settings2, Zap,
} from "lucide-react";

export const BRAND = "#03b155";

// ─── KPI cards ────────────────────────────────────────────────
export const STATS = [
  {
    key: "total",
    label: "Total Vehicles",
    sub: "fleet size",
    value: 156,
    icon: Bike,
    bg: "bg-violet-50 dark:bg-violet-950/40",
    iconColor: "text-violet-500",
    trend: "up",
    trendLabel: "+3",
    trendSeverity: "success",
    sparkColor: "#7c3aed",
    spark: [120, 125, 130, 128, 135, 140, 145, 148, 150, 153, 155, 156],
  },
  {
    key: "active",
    label: "Active",
    sub: "on the road",
    value: 74,
    icon: Activity,
    bg: "bg-green-50 dark:bg-green-950/40",
    iconColor: "text-[#03b155]",
    trend: "up",
    trendLabel: "+5",
    trendSeverity: "success",
    sparkColor: BRAND,
    spark: [60, 62, 65, 68, 70, 69, 71, 72, 73, 74, 74, 74],
  },
  {
    key: "maintenance",
    label: "In Maintenance",
    sub: "at workshop",
    value: 42,
    icon: Wrench,
    bg: "bg-amber-50 dark:bg-amber-950/40",
    iconColor: "text-amber-500",
    trend: "down",
    trendLabel: "-2",
    trendSeverity: "danger",
    sparkColor: "#f59e0b",
    spark: [50, 48, 46, 47, 45, 44, 46, 44, 43, 42, 43, 42],
  },
  {
    key: "critical",
    label: "Critical Jobs",
    sub: "need attention",
    value: 7,
    icon: AlertTriangle,
    bg: "bg-red-50 dark:bg-red-950/40",
    iconColor: "text-red-500",
    trend: "up",
    trendLabel: "+2",
    trendSeverity: "danger",
    sparkColor: "#ef4444",
    spark: [3, 4, 3, 5, 4, 5, 6, 5, 6, 7, 7, 7],
  },
  {
    key: "technicians",
    label: "Technicians",
    sub: "available now",
    value: 12,
    icon: Users,
    bg: "bg-blue-50 dark:bg-blue-950/40",
    iconColor: "text-blue-500",
    trend: "neutral",
    trendLabel: "stable",
    trendSeverity: "secondary",
    sparkColor: "#3b82f6",
    spark: [10, 11, 12, 11, 13, 12, 12, 11, 12, 12, 12, 12],
  },
  {
    key: "yard",
    label: "Yard Utilization",
    sub: "capacity used",
    value: "68%",
    icon: MapPin,
    bg: "bg-teal-50 dark:bg-teal-950/40",
    iconColor: "text-teal-500",
    trend: "up",
    trendLabel: "+4%",
    trendSeverity: "success",
    sparkColor: "#14b8a6",
    spark: [55, 57, 60, 62, 63, 65, 64, 66, 67, 68, 68, 68],
  },
];

// ─── Fleet activity chart (7 days) ───────────────────────────
export const FLEET_ACTIVITY = [
  { day: "Mon", completed: 18, opened: 22, critical: 2 },
  { day: "Tue", completed: 24, opened: 19, critical: 4 },
  { day: "Wed", completed: 20, opened: 25, critical: 3 },
  { day: "Thu", completed: 31, opened: 28, critical: 1 },
  { day: "Fri", completed: 27, opened: 22, critical: 5 },
  { day: "Sat", completed: 15, opened: 10, critical: 2 },
  { day: "Sun", completed: 9,  opened: 6,  critical: 1 },
];

// ─── Workshop job statuses ────────────────────────────────────
export const WORKSHOP_STATUS = [
  { label: "New",           count: 23, color: "#6366f1" },
  { label: "Assigned",      count: 31, color: "#3b82f6" },
  { label: "In Progress",   count: 42, color: BRAND      },
  { label: "Waiting Parts", count: 18, color: "#f59e0b"  },
  { label: "QA Review",     count: 12, color: "#8b5cf6"  },
  { label: "Completed",     count: 29, color: "#10b981"  },
];

// ─── Top issues ───────────────────────────────────────────────
export const TOP_ISSUES = [
  { label: "Battery Faults",          count: 19, icon: Battery,   href: "/fleet/maintenance" },
  { label: "Brake Service Needed",    count: 14, icon: Shield,    href: "/fleet/workshop"    },
  { label: "Tire Replacement",        count: 11, icon: Settings2, href: "/fleet/workshop"    },
  { label: "Motor Controller Errors", count: 8,  icon: Zap,       href: "/fleet/maintenance" },
];

// ─── Activity feed ────────────────────────────────────────────
export const SEED_EVENTS = [
  { id: 1, type: "success", label: "Maintenance completed",    ref: "GW-MC-1245", ago: "2 min ago"  },
  { id: 2, type: "warn",    label: "Brake issue flagged",      ref: "GW-MC-0821", ago: "8 min ago"  },
  { id: 3, type: "info",    label: "Driver assigned",           ref: "GW-CR-0412", ago: "15 min ago" },
  { id: 4, type: "error",   label: "Critical battery alert",   ref: "GW-MC-1120", ago: "22 min ago" },
  { id: 5, type: "success", label: "Job closed",                ref: "GW-CR-0338", ago: "31 min ago" },
  { id: 6, type: "warn",    label: "Vehicle entered workshop",  ref: "GW-MC-0764", ago: "49 min ago" },
  { id: 7, type: "info",    label: "Inspection scheduled",     ref: "GW-CR-0192", ago: "1 hr ago"   },
  { id: 8, type: "success", label: "Maintenance completed",    ref: "GW-MC-1217", ago: "2 hr ago"   },
];

export const NEW_EVENT_LABELS = [
  "Vehicle inspection completed",
  "Battery swap requested",
  "Driver check-in recorded",
  "Route deviation flagged",
  "Brake pad replacement done",
  "Motor overheating reported",
];

export const EVENT_TYPES = ["success", "info", "warn", "error"];

export const EVENT_CFG = {
  success: {
    dot: "bg-[#03b155]",
    icon: CheckCircle2,
    iconColor: "text-[#03b155]",
    iconBg: "bg-green-50 dark:bg-green-950/40",
  },
  warn: {
    dot: "bg-amber-400",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/40",
  },
  error: {
    dot: "bg-red-500",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    iconBg: "bg-red-50 dark:bg-red-950/40",
  },
  info: {
    dot: "bg-blue-400",
    icon: Info,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/40",
  },
};
