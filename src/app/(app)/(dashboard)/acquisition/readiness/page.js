import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Acquisition"
      title="Readiness"
      subtitle="Driver onboarding readiness checks, document verification, and completion tracking."
      icon="pi-shield"
      stats={[
        { value: "24",   label: "Ready to onboard",   delta: { type: "up",   text: "+6 this week"    } },
        { value: "12",   label: "Docs pending",        delta: { type: "warn", text: "action needed"  } },
        { value: "8",    label: "Background check",    delta: { type: "warn", text: "in progress"    } },
        { value: "4.2d", label: "Avg. completion",     delta: { type: "down", text: "−0.8d faster"   } },
      ]}
      description="Readiness tracking is coming. You'll see which drivers have completed onboarding requirements, flag blockers, and approve riders for activation."
      primaryAction={{ label: "Review", icon: "pi-eye" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
