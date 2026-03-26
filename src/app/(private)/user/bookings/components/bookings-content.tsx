"use client";

import type { JobBooking } from "@/types/jobs-manage";

import { useGetBookings } from "@/lib/actions/bookings/get-bookings";
import { useGetMyProfile } from "@/lib/actions/users/profile.user";

import { Card, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import type { Booking } from "@/types";

import { PastBookingCard } from "./past-booking-card";
import { UpcomingBookingCard } from "./upcoming-booking-card";

function formatBookingFromJobBooking(jobBooking: JobBooking): Booking {
  const isUpcoming = ["PENDING", "CONFIRMED", "IN_PROGRESS"].includes(jobBooking.status);

  return {
    id: jobBooking.id,
    title: "Job Repair",
    jobId: jobBooking.jobId,
    scheduledAt: jobBooking.scheduleStart,
    priceDkk: jobBooking.offer.price,
    workshop: {
      name: jobBooking.workshop.workshopName,
      address: jobBooking.workshop.address,
      phone: jobBooking.workshop.phone,
      email: jobBooking.workshop.email
    },
    status: isUpcoming ? "upcoming" : "completed"
  };
}

export function BookingsContent() {
  const { data: profileData, isLoading: isProfileLoading } = useGetMyProfile();
  const userId = profileData?.data?.id;

  const { data: bookingsData, isLoading: isBookingsLoading, isError } = useGetBookings(userId);

  const bookings = bookingsData?.data ?? [];
  const formattedBookings = bookings.map(formatBookingFromJobBooking);

  const upcomingBookings = formattedBookings.filter((booking) => booking.status === "upcoming");
  const pastBookings = formattedBookings.filter((booking) => booking.status === "completed");

  if (isProfileLoading || isBookingsLoading) {
    return (
      <div className="space-y-10 pb-12">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="rounded-2xl border-none shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          Failed to load bookings. Please try again later.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-navy">Upcoming bookings</h2>
          <p className="text-muted-foreground">{upcomingBookings.length} scheduled</p>
        </div>
        <div className="space-y-4">
          {upcomingBookings.length > 0 ? (
            upcomingBookings.map((booking) => (
              <UpcomingBookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                No upcoming bookings
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy">Past bookings</h2>
          <p className="text-sm text-muted-foreground">{pastBookings.length} completed</p>
        </div>
        <div className="space-y-4">
          {pastBookings.length > 0 ? (
            pastBookings.map((booking) => <PastBookingCard key={booking.id} booking={booking} />)
          ) : (
            <Card className="border-0 shadow-sm">
              <CardContent className="py-8 text-center text-muted-foreground">
                No past bookings
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
