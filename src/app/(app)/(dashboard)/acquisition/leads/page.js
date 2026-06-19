import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Acquisition"
      title="Leads"
      subtitle="All incoming and active lead records from every acquisition channel."
      icon="pi-user-plus"
      stats={[
        { value: "682",   label: "New this week",  delta: { type: "up", text: "+12% vs last week"  } },
        { value: "4",     label: "Sources" },
        { value: "33.9%", label: "Lead → MQL",     delta: { type: "up", text: "+2.1pp vs last month" } },
        { value: "5",     label: "Field agents" },
      ]}
      description="The Leads list is being built. You'll be able to view, filter, and manage every lead record, assign owners, and track stage progression."
      primaryAction={{ label: "Add Lead", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
