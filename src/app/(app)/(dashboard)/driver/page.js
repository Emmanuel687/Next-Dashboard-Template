import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Drivers"
      title="Driver Management"
      subtitle="Active driver profiles, onboarding pipeline, and compliance status."
      icon="pi-id-card"
      stats={[
        { value: "1,886", label: "Active drivers",      delta: { type: "up",   text: "+42 this month"   } },
        { value: "1,612", label: "On active lease" },
        { value: "24",    label: "On pause",            delta: { type: "warn", text: "review needed"    } },
        { value: "38",    label: "Pending activation" },
      ]}
      description="Driver management is coming soon. You'll see all driver profiles, onboarding status, compliance flags, and performance metrics in one view."
      primaryAction={{ label: "Add Driver", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
