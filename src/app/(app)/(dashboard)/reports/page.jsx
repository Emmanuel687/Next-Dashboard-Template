import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Analytics"
      title="Reports"
      subtitle="Business intelligence reports, custom exports, and scheduled insights."
      icon="pi-chart-bar"
      stats={[
        { value: "18", label: "Saved reports" },
        { value: "6",  label: "Scheduled" },
        { value: "4",  label: "Run this week" },
        { value: "2",  label: "Shared" },
      ]}
      description="Reports is on the way. You'll build custom dashboards, schedule automated exports, and share insights across teams — all without writing SQL."
      primaryAction={{ label: "Create Report", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
