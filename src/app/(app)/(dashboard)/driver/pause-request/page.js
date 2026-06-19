import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Drivers"
      title="Pause Requests"
      subtitle="Active, pending, and resolved driver pause requests with approval workflows."
      icon="pi-pause-circle"
      stats={[
        { value: "12", label: "Pending",        delta: { type: "warn", text: "awaiting approval" } },
        { value: "4",  label: "Approved today", delta: { type: "up",   text: "+2 vs yesterday"  } },
        { value: "28", label: "Active pauses" },
        { value: "8d", label: "Avg. duration" },
      ]}
      description="Pause Request management is coming. You'll review, approve, or reject driver pause requests, set return dates, and track re-activation status."
      primaryAction={{ label: "Review", icon: "pi-eye" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
