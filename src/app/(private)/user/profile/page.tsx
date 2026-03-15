import { Suspense } from "react";

import { UserProfileForm, UserProfileSkeleton } from "./components";

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2 text-navy">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </header>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfileForm />
      </Suspense>
    </div>
  );
}
