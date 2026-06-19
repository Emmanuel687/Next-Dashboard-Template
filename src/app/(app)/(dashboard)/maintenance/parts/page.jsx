import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Maintenance"
      title="Parts Inventory"
      subtitle="Spare parts stock levels, reorder alerts, and supplier purchase orders."
      icon="pi-box"
      stats={[
        { value: "1,240",    label: "Total SKUs" },
        { value: "14",       label: "On order",   delta: { type: "warn", text: "on order"   } },
        { value: "38",       label: "Low stock",  delta: { type: "down", text: "low stock"  } },
        { value: "KES 2.1M", label: "Stock value" },
      ]}
      description="Parts Inventory is being built. You'll track every SKU, set reorder thresholds, raise purchase orders, and reconcile stock against active jobs."
      primaryAction={{ label: "Order Parts", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
