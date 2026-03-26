"use client";

import { CalendarDays } from "lucide-react";

import {
  useGetWorkshopCalendarBookings,
  useGetWorkshopDailyCalendarBookings,
  useGetWorkshopWeeklyCalendarBookings
} from "@/lib/actions/bookings/get-workshop-calendar-bookings";
import { useGetMyWorkshopProfile } from "@/lib/actions/workshops/profile.workshop";

import { Card, CardContent } from "@/components/ui";

import { CalendarPageContent } from "./components/CalendarPageContent";
import { CalendarPageSkeleton } from "./components/CalendarPageSkeleton";

export default function CalendarPage() {
  const { data: workshopResponse, isLoading: isWorkshopLoading } = useGetMyWorkshopProfile();
  const workshopId = workshopResponse?.data?.id;

  const {
    data: allBookings,
    isLoading: isAllLoading,
    isError: isAllError
  } = useGetWorkshopCalendarBookings(workshopId);

  const {
    data: weeklyBookings,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError
  } = useGetWorkshopWeeklyCalendarBookings(workshopId);

  const {
    data: dailyBookings,
    isLoading: isDailyLoading,
    isError: isDailyError
  } = useGetWorkshopDailyCalendarBookings(workshopId);

  const isLoading =
    isWorkshopLoading ||
    (Boolean(workshopId) && (isAllLoading || isWeeklyLoading || isDailyLoading));
  const isError = isAllError || isWeeklyError || isDailyError;

  return (
    <div className="space-y-6 py-8">
      <header className="flex items-center gap-2 text-navy">
        <CalendarDays className="size-4" />
        <h1 className="text-lg font-semibold">Calendar</h1>
      </header>

      {isLoading ? (
        <CalendarPageSkeleton />
      ) : !workshopId || isError || !allBookings || !weeklyBookings || !dailyBookings ? (
        <Card className="rounded-3xl border-none shadow-sm">
          <CardContent className="py-10 text-center text-muted-foreground">
            Failed to load calendar bookings. Please try again.
          </CardContent>
        </Card>
      ) : (
        <CalendarPageContent
          dayData={dailyBookings}
          weekData={weeklyBookings}
          listData={allBookings}
        />
      )}
    </div>
  );
}
