import { MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BookingDetails } from "../../data/bookings";

interface WorkshopDetailsProps {
  details?: BookingDetails;
}

export default function WorkshopDetails({ details }: WorkshopDetailsProps) {
  if (!details) {
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
          <p className="font-medium text-gray-900">{details.workshopName}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">{details.workshopAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{details.workshopPhone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
