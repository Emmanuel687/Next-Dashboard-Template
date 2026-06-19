import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Maintenance"
      title="Yard Map"
      subtitle="Live spatial view of all vehicles and assets in the maintenance yard."
      icon="pi-map"
      stats={[
        { value: "12", label: "Total bays" },
        { value: "8",  label: "Occupied",  delta: { type: "up",   text: "in use"   } },
        { value: "4",  label: "Available" },
        { value: "2",  label: "Reserved",  delta: { type: "warn", text: "reserved" } },
      ]}
      description="The Maintenance Yard Map is coming. You'll see a live overhead layout of the yard — vehicles, bay occupancy, and technician locations in real time."
      primaryAction={{ label: "Refresh", icon: "pi-refresh" }}
      secondaryAction={{ label: "Filter", icon: "pi-filter" }}
    />
  );
}
