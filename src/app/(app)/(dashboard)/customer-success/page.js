import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="CRM"
      title="Customer Success"
      subtitle="Monitor satisfaction scores, churn risk, and retention metrics across the customer base."
      icon="pi-heart"
      stats={[
        { value: "1,612",  label: "Active customers" },
        { value: "4.8/5",  label: "Satisfaction score", delta: { type: "up",   text: "+0.2 vs last month" } },
        { value: "3",      label: "Churn risk",          delta: { type: "warn", text: "needs attention"     } },
        { value: "72",     label: "NPS score",           delta: { type: "up",   text: "+4 vs last quarter"  } },
      ]}
      description="Customer Success tooling is coming soon. You'll see retention analytics, satisfaction surveys, and churn alerts all in one place."
      primaryAction={{ label: "Add Customer", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
