import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Fleet"
      title="Vehicles"
      subtitle="Vehicle inventory, health status, and assignment history."
      icon="pi-car"
      stats={[
        { value: "2,140", label: "Total e-bikes" },
        { value: "1,886", label: "Deployed",       delta: { type: "up",   text: "88% utilisation" } },
        { value: "142",   label: "In service",     delta: { type: "down", text: "6.6% of fleet"   } },
        { value: "112",   label: "Available" },
      ]}
      description="The Vehicles list is on the way. You'll search and manage every vehicle, view health scores, see current assignments, and access full service history."
      primaryAction={{ label: "Add Vehicle", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
