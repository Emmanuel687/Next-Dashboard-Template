import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Finance"
      title="Collections"
      subtitle="Track outstanding payments, arrears, and drive collection actions across all accounts."
      icon="pi-wallet"
      stats={[
        { value: "KSh 2.3M", label: "Outstanding",         delta: { type: "warn", text: "action needed"      } },
        { value: "8",        label: "Collectors active" },
        { value: "KSh 890K", label: "Recovered this month", delta: { type: "up",   text: "+12% vs last month" } },
        { value: "14",       label: "Overdue accounts",     delta: { type: "down", text: "overdue"            } },
      ]}
      description="Collections management is being built. You'll manage overdue accounts, payment plans, and collection agent assignments from here."
      primaryAction={{ label: "New Collection", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
