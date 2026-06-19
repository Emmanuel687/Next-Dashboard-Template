import PlaceholderPage from "@/modules/shared/PlaceholderPage";

export default function Page() {
  return (
    <PlaceholderPage
      eyebrow="System"
      title="Settings"
      subtitle="System configuration, integrations, user roles, and preferences."
      icon="pi-cog"
      stats={[
        { value: "12", label: "Integrations" },
        { value: "4",  label: "Users" },
        { value: "5",  label: "Role types" },
        { value: "2",  label: "Pending invites", delta: { type: "warn", text: "sent" } },
      ]}
      description="Settings is coming. You'll configure system-wide preferences, manage user roles and permissions, connect integrations, and control notification rules."
      primaryAction={{ label: "Save Changes", icon: "pi-check" }}
    />
  );
}
