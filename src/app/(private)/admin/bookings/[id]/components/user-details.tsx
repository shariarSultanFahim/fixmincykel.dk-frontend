import { Mail, Phone, User } from "lucide-react";

import type { AdminBooking } from "@/types/booking-manage";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserDetailsProps {
  booking: AdminBooking;
}

export default function UserDetails({ booking }: UserDetailsProps) {
  if (!booking.user) {
    return null;
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <User className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{booking.user.name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{booking.user.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{booking.user.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
