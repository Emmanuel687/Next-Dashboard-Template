import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Drivers"
      title="Driver Support"
      subtitle="Support tickets, escalations, and resolution tracking for all driver requests."
      icon="pi-headphones"
      stats={[
        { value: "18",    label: "Open tickets",     delta: { type: "warn", text: "action needed"   } },
        { value: "12",    label: "Resolved today",   delta: { type: "up",   text: "+4 vs yesterday" } },
        { value: "2.1h",  label: "Avg. resolution",  delta: { type: "down", text: "−0.4h faster"   } },
        { value: "3",     label: "Escalated",        delta: { type: "warn", text: "urgent"          } },
      ]}
      description="Driver Support is on the way. You'll manage incoming tickets, assign agents, track SLAs, and escalate unresolved cases — all from one queue."
      primaryAction={{ label: "New Ticket", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
