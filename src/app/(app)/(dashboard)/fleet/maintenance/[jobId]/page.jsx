import MaintenanceJobDetail from "@/modules/maintenance/MaintenanceJobDetail";

export default function Page({ params }) {
  return <MaintenanceJobDetail jobId={params.jobId} />;
}
