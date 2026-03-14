import Header from "../component/layouts/header";
import { UserTable } from "./components";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <Header title="User Management" subtitle="Manage platform cyclists and their activity" />
      <UserTable />
    </div>
  );
}
