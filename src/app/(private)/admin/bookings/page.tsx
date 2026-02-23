import { Suspense } from "react";

import Header from "../component/layouts/header";
import { BookingTable } from "./components";
import { BookingTableSkeleton } from "./components/skeletons";
import { bookingData } from "./data/bookings";

export default function BookingsManagementPage() {
  return (
    <div>
      <Header title="Bookings Management" subtitle="Monitor all scheduled and completed bookings" />
      <Suspense fallback={<BookingTableSkeleton />}>
        <BookingTable initialBookings={bookingData} />
      </Suspense>
    </div>
  );
}
