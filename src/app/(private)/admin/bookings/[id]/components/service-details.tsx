import { AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BookingDetails } from "../../data/bookings";

interface ServiceDetailsProps {
  details?: BookingDetails;
}

export default function ServiceDetails({ details }: ServiceDetailsProps) {
  if (!details) {
    return null;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Service Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">Service Description</p>
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-gray-900">{details.serviceDescription}</p>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-medium text-gray-700">Notes</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-gray-900">{details.serviceNotes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
