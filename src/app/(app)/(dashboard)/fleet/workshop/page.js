import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="Fleet"
      title="Workshop"
      subtitle="Workshop job scheduling, technician assignments, and bay status."
      icon="pi-wrench"
      stats={[
        { value: "16", label: "Total bays" },
        { value: "11", label: "Occupied",     delta: { type: "up",   text: "in use"     } },
        { value: "5",  label: "Available" },
        { value: "8",  label: "Booked today" },
      ]}
      description="Workshop scheduling is being built. You'll plan and assign jobs to bays and technicians, track SLAs, and monitor live bay occupancy."
      primaryAction={{ label: "New Job", icon: "pi-plus" }}
      secondaryAction={{ label: "Export", icon: "pi-download" }}
    />
  );
}
