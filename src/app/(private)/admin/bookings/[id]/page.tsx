import { Suspense } from "react";
import { redirect } from "next/navigation";

import Header from "../../component/layouts/header";
import { bookingData } from "../data/bookings";
import { BookingInformation, ServiceDetails, UserDetails, WorkshopDetails } from "./components";
import {
  BookingInformationSkeleton,
  ServiceDetailsSkeleton,
  UserDetailsSkeleton,
  WorkshopDetailsSkeleton
} from "./components/skeletons";

interface BookingDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function BookingDetails({ id }: { id: string }) {
  const booking = bookingData.find((b) => b.bookingID === id);

  if (!booking) {
    redirect("/admin/bookings");
  }

  return (
    <div className="space-y-6">
      <Header
        title={`Booking Details: ${booking.bookingID}`}
        subtitle="Complete booking information and activity"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={<BookingInformationSkeleton />}>
          <BookingInformation booking={booking} />
        </Suspense>

        <Suspense fallback={<WorkshopDetailsSkeleton />}>
          <WorkshopDetails details={booking.details} />
        </Suspense>

        <Suspense fallback={<UserDetailsSkeleton />}>
          <UserDetails details={booking.details} />
        </Suspense>

        <Suspense fallback={<ServiceDetailsSkeleton />}>
          <ServiceDetails details={booking.details} />
        </Suspense>
      </div>
    </div>
  );
}

export default async function BookingDetailsPage({ params }: BookingDetailsPageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Header title="Booking Details" subtitle="Loading..." />
          <div className="grid gap-6 lg:grid-cols-2">
            <BookingInformationSkeleton />
            <WorkshopDetailsSkeleton />
            <UserDetailsSkeleton />
            <ServiceDetailsSkeleton />
          </div>
        </div>
      }
    >
      <BookingDetails id={id} />
    </Suspense>
  );
}
