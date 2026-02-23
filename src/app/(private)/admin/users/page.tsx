import { Suspense } from "react";

import Header from "../component/layouts/header";
import { UserTable } from "./components";
import { UserTableSkeleton } from "./components/skeletons";
import { usersData } from "./data/users";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <Header title="User Management" subtitle="Manage platform cyclists and their activity" />
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTable initialUsers={usersData} />
      </Suspense>
    </div>
  );
}
