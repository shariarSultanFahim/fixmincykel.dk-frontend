"use client";

import { useGetBookingDetails } from "@/lib/actions/bookings/details.booking";

import { BookingInformation, ServiceDetails, UserDetails, WorkshopDetails } from ".";
import Header from "../../../component/layouts/header";
import {
  BookingInformationSkeleton,
  ServiceDetailsSkeleton,
  UserDetailsSkeleton,
  WorkshopDetailsSkeleton
} from "./skeletons";

interface BookingDetailsClientProps {
  bookingId: string;
}

export default function BookingDetailsClient({ bookingId }: BookingDetailsClientProps) {
  const { data, isLoading, isError } = useGetBookingDetails(bookingId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header title="Booking Details" subtitle="Loading..." />
        <div className="grid gap-6 lg:grid-cols-2">
          <BookingInformationSkeleton />
          <WorkshopDetailsSkeleton />
          <UserDetailsSkeleton />
          <ServiceDetailsSkeleton />
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-lg text-gray-500">Booking not found</p>
      </div>
    );
  }

  const booking = data.data;

  return (
    <div className="space-y-6">
      <Header
        title={`Booking Details: ${booking.id}`}
        subtitle="Complete booking information and activity"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <BookingInformation booking={booking} />
        <WorkshopDetails booking={booking} />
        <UserDetails booking={booking} />
        <ServiceDetails booking={booking} />
      </div>
    </div>
  );
}
