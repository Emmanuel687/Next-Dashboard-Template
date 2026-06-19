import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Fleet"
      title="Battery & Energy"
      subtitle="Battery health trends, charging cycles, and energy consumption analytics."
      icon="pi-bolt"
      stats={[
        { value: "4,280",  label: "Battery packs" },
        { value: "12",     label: "Swap stations" },
        { value: "8,914",  label: "Swaps this week", delta: { type: "up",   text: "+7.1% vs last week" } },
        { value: "3.2%",   label: "Packs degraded",  delta: { type: "warn", text: "monitor"            } },
      ]}
      description="Battery & Energy analytics is coming. You'll monitor individual battery health, track charge cycles, flag degrading packs, and schedule swaps."
      primaryAction={{ label: "Schedule Charge", icon: "pi-calendar" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
