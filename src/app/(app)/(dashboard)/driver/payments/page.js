import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Drivers"
      title="Driver Payments"
      subtitle="Payment schedules, disbursement history, and dispute management."
      icon="pi-credit-card"
      stats={[
        { value: "KSh 1.2M", label: "Due this week",      delta: { type: "warn", text: "action needed"      } },
        { value: "KSh 890K", label: "Disbursed",          delta: { type: "up",   text: "+8% vs last month"  } },
        { value: "4",        label: "Disputes",           delta: { type: "warn", text: "under review"       } },
        { value: "98.2%",    label: "On schedule" },
      ]}
      description="Driver Payments is being built. You'll view and approve payment runs, track disbursement history, and handle disputes for every driver account."
      primaryAction={{ label: "New Payment", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
