import MaintenanceJobDetail from "@/modules/fleet/maintenance/MaintenanceJobDetail";

export default function Page({ params }) {
  return <MaintenanceJobDetail jobId={params.jobId} />;
}
