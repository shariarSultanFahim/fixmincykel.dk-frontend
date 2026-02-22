import { pastBookings, upcomingBookings } from "@/data";

import { PastBookingCard, UpcomingBookingCard } from "./components";

export default function MyBookingsPage() {
  return (
    <div className="space-y-10 pb-12">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy">Upcoming bookings</h2>
          <p className="text-sm text-muted-foreground">{upcomingBookings.length} scheduled</p>
        </div>
        <div className="space-y-4">
          {upcomingBookings.map((booking) => (
            <UpcomingBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy">Past bookings</h2>
          <p className="text-sm text-muted-foreground">{pastBookings.length} completed</p>
        </div>
        <div className="space-y-4">
          {pastBookings.map((booking) => (
            <PastBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </section>
    </div>
  );
}
