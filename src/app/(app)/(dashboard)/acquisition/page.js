import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Acquisition"
      title="Acquisition"
      subtitle="Overview of all customer acquisition channels, lead pipeline, and conversion metrics."
      icon="pi-users"
      stats={[
        { value: "1,842",    label: "Total leads",       delta: { type: "up",   text: "+23% vs last month"   } },
        { value: "33.9%",    label: "Lead → MQL rate",   delta: { type: "up",   text: "+2.1pp vs last month" } },
        { value: "14",       label: "Deals won",         delta: { type: "up",   text: "+3 this month"        } },
        { value: "34 days",  label: "Avg. conv. time",   delta: { type: "down", text: "−4d vs last quarter"  } },
      ]}
      description="The Acquisition overview is coming. You'll see a consolidated view of your lead funnel, channel performance, and team activity."
      primaryAction={{ label: "Add Lead", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
