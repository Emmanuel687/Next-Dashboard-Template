import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Fleet"
      title="Fleet Overview"
      subtitle="All vehicles, active assignments, and fleet health at a glance."
      icon="pi-car"
      stats={[
        { value: "2,140", label: "Total e-bikes" },
        { value: "1,886", label: "Deployed",        delta: { type: "up",   text: "88% utilisation" } },
        { value: "142",   label: "In service",      delta: { type: "down", text: "6.6% of fleet"   } },
        { value: "112",   label: "Available at hubs" },
      ]}
      description="The Fleet overview is on the way. You'll see a live summary of all vehicles, their current status, assignment history, and health scores."
      primaryAction={{ label: "Add Vehicle", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
