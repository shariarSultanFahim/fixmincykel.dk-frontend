import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { UserDetails } from "../../data/users";

interface FullProfileProps {
  email: string;
  phone: string;
  details?: UserDetails;
  registered: string;
}

export default function FullProfile({ email, phone, details, registered }: FullProfileProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Full Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{phone}</p>
          </div>
        </div>

        {details && (
          <>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Default Address</p>
                <p className="font-medium text-gray-900">{details.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm text-gray-600">Registered</p>
                <p className="font-medium text-gray-900">{registered}</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
