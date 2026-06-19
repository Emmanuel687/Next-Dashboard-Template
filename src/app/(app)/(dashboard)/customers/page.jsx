import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="CRM"
      title="Customers"
      subtitle="All customer profiles, contact records, and interaction history."
      icon="pi-users"
      stats={[
        { value: "1,842",    label: "Total customers",     delta: { type: "up",   text: "+23% vs last month" } },
        { value: "1,612",    label: "On active lease" },
        { value: "3",        label: "Needs attention",     delta: { type: "warn", text: "flagged"            } },
        { value: "KSh 4.1M", label: "Outstanding balance" },
      ]}
      description="The Customers directory is being built. You'll search and manage every customer account, view interaction timelines, and track lifetime value."
      primaryAction={{ label: "Add Customer", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
