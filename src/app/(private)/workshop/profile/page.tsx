import { Suspense } from "react";

import { Settings } from "lucide-react";

import profileData from "@/data/profile.json";

import { Skeleton } from "@/components/ui/skeleton";
import type { WorkshopProfileData } from "@/types";

import { WorkshopProfileForm } from "./components/form/profile.form";
import { WorkshopServiceForm } from "./components/form/service.form";

function ProfilePageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-3xl bg-muted/50 p-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-24 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <div className="space-y-3 rounded-3xl bg-muted/50 p-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const workshopProfile = profileData as WorkshopProfileData;

  return (
    <div className="space-y-6 py-8">
      <header className="flex items-center gap-2 text-navy">
        <Settings className="size-4" />
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </header>

      <Suspense fallback={<ProfilePageSkeleton />}>
        <div className="space-y-6">
          <WorkshopProfileForm initialValues={workshopProfile.profile} />
          <WorkshopServiceForm initialValues={workshopProfile.service} />
        </div>
      </Suspense>
    </div>
  );
}
