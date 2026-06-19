import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Finance"
      title="Lease Contracts"
      subtitle="Manage all vehicle lease agreements, renewals, and contract compliance."
      icon="pi-file-edit"
      stats={[
        { value: "1,612", label: "Active leases",    delta: { type: "up",   text: "+14 this month" } },
        { value: "94.2%", label: "On-time rate",     delta: { type: "up",   text: "+1.3pp"         } },
        { value: "38",    label: "Up for renewal" },
        { value: "9",     label: "In arrears",       delta: { type: "warn", text: "review"         } },
      ]}
      description="Lease Contracts is being built. You'll create, sign, and track all lease agreements — with automated renewal reminders and compliance flags."
      primaryAction={{ label: "New Contract", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
