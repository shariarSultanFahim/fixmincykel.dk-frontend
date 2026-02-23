import Header from "../component/layouts/header";
import { DashboardContent } from "./components";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Admin Dashboard Overview"
        subtitle="System-wide performance and activity monitoring"
        icon={null}
      />
      <DashboardContent />
    </div>
  );
}
