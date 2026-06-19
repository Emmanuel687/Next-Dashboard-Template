import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Drivers"
      title="Driver Balance"
      subtitle="Account balances, top-ups, deductions, and full transaction history per driver."
      icon="pi-chart-bar"
      stats={[
        { value: "KSh 3.2M",  label: "Total float" },
        { value: "28",        label: "Top-ups today",  delta: { type: "up",   text: "+6 vs yesterday"    } },
        { value: "12",        label: "Deductions" },
        { value: "KSh 1,700", label: "Avg. balance" },
      ]}
      description="Driver Balance is on the way. You'll view individual account balances, process top-ups or deductions, and audit transaction histories."
      primaryAction={{ label: "Add Credit", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
