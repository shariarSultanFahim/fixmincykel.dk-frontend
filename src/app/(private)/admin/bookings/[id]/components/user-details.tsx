import { Mail, Phone, User } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { BookingDetails } from "../../data/bookings";

interface UserDetailsProps {
  details?: BookingDetails;
}

export default function UserDetails({ details }: UserDetailsProps) {
  if (!details) {
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
            <p className="font-medium text-gray-900">{details.userName}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{details.userEmail}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{details.userPhone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
