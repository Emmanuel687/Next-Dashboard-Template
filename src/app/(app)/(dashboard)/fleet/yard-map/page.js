import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Fleet"
      title="Yard Map"
      subtitle="Live spatial view of all vehicles and assets in the yard."
      icon="pi-map"
      stats={[
        { value: "12", label: "Total bays" },
        { value: "8",  label: "Occupied",  delta: { type: "up",   text: "in use"    } },
        { value: "4",  label: "Available" },
        { value: "2",  label: "Reserved",  delta: { type: "warn", text: "reserved"  } },
      ]}
      description="The Yard Map is coming. You'll see a real-time visual layout of the yard — vehicle positions, bay occupancy, and zone assignments at a glance."
      primaryAction={{ label: "Refresh", icon: "pi-refresh" }}
      secondaryAction={{ label: "Filter", icon: "pi-filter" }}
    />
  );
}
