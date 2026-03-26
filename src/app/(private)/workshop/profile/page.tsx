"use client";

import { Settings } from "lucide-react";

import { getTimeByDay, useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";

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
  const { data: workshopResponse, isLoading, isError } = useGetMyWorkshopProfile();

  const workshop = workshopResponse?.data;

  const workshopProfile: WorkshopProfileData = {
    profile: {
      workshopId: workshop?.id,
      workshopName: workshop?.workshopName ?? "",
      address: workshop?.address ?? "",
      cvrNumber: workshop?.cvrNumber ?? "",
      description: workshop?.description ?? ""
    },
    service: {
      serviceCategories: [],
      openingHours: {
        weekdaysStart: getTimeByDay(workshop?.workshopOpeningHours ?? [], "TUESDAY").open,
        weekdaysEnd: getTimeByDay(workshop?.workshopOpeningHours ?? [], "TUESDAY").close,
        saturdayStart: getTimeByDay(workshop?.workshopOpeningHours ?? [], "SATURDAY").open,
        saturdayEnd: getTimeByDay(workshop?.workshopOpeningHours ?? [], "SATURDAY").close
      },
      notifications: {
        email: true,
        sms: false,
        inApp: true
      }
    }
  };

  return (
    <div className="space-y-6 py-8">
      <header className="flex items-center gap-2 text-navy">
        <Settings className="size-4" />
        <h1 className="text-lg font-semibold">Profile Settings</h1>
      </header>

      {isLoading ? (
        <ProfilePageSkeleton />
      ) : isError ? (
        <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          Failed to load workshop profile. Please refresh and try again.
        </div>
      ) : (
        <div className="space-y-6">
          <WorkshopProfileForm
            initialValues={workshopProfile.profile}
            avatarUrl={workshop?.avatar}
          />
          <WorkshopServiceForm initialValues={workshopProfile.service} workshopId={workshop?.id} />
        </div>
      )}
    </div>
  );
}
