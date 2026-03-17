import { MapPin, Phone } from "lucide-react";

import type { AdminBooking } from "@/types/booking-manage";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopDetailsProps {
  booking: AdminBooking;
}

export default function WorkshopDetails({ booking }: WorkshopDetailsProps) {
  if (!booking.workshop) {
    return null;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Workshop Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Workshop Name</p>
          <p className="font-medium text-gray-900">{booking.workshop.workshopName}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">{booking.workshop.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{booking.workshop.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
