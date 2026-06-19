import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Acquisition"
      title="Qualifications"
      subtitle="Lead qualification status, scoring, and approval workflows."
      icon="pi-check-square"
      stats={[
        { value: "28",  label: "Pending review", delta: { type: "warn", text: "awaiting"        } },
        { value: "142", label: "Approved",        delta: { type: "up",   text: "+18 this week"  } },
        { value: "18",  label: "Rejected" },
        { value: "76%", label: "Avg. score" },
      ]}
      description="Lead Qualifications is coming soon. You'll review scoring results, approve or reject leads, and track the MQL-to-SQL conversion workflow here."
      primaryAction={{ label: "Review Leads", icon: "pi-eye" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
