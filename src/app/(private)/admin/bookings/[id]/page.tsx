import { Suspense } from "react";

import Header from "../../component/layouts/header";
import { BookingDetailsClient } from "./components";
import {
  BookingInformationSkeleton,
  ServiceDetailsSkeleton,
  UserDetailsSkeleton,
  WorkshopDetailsSkeleton
} from "./components/skeletons";

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
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
      <BookingDetailsClient bookingId={id} />
    </Suspense>
  );
}
