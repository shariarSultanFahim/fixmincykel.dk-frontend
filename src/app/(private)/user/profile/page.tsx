import { Suspense } from "react";

import profileData from "@/data/profile.json";

import type { UserProfileData } from "@/types";

import { UserProfileForm, UserProfileSkeleton } from "./components";

export default function UserProfilePage() {
  const userProfile = (profileData as UserProfileData).userProfile;

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-2 text-navy">
        <h1 className="text-3xl font-bold">User Profile</h1>
      </header>
      <Suspense fallback={<UserProfileSkeleton />}>
        <UserProfileForm initialValues={userProfile} />
      </Suspense>
    </div>
  );
}
