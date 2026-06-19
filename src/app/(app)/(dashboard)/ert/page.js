import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Operations"
      title="ERT"
      subtitle="Emergency response incidents across the fleet — tracking, escalation, and resolution."
      icon="pi-bolt"
      stats={[
        { value: "3",     label: "Open incidents",   delta: { type: "warn", text: "action needed" } },
        { value: "7",     label: "Resolved today",   delta: { type: "up",   text: "+3 vs yesterday" } },
        { value: "8 min", label: "Avg. response",    delta: { type: "up",   text: "−2 min faster" } },
        { value: "12",    label: "Active vehicles" },
      ]}
      description="ERT incident management is on the way. You'll be able to log, track, and resolve emergency response events for every vehicle in the fleet."
      primaryAction={{ label: "New Incident", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
