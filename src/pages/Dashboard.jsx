/**
 * Dashboard
 * Main dashboard route component.
 * Uses DashboardShell for always-visible sidebar.
 * Preserves existing visual design exactly.
 */
import DashboardShell from "../components/layouts/DashboardShell";
import DashboardContent from "../components/dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  );
}
