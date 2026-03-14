import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import type { UserManageItem } from "@/types/users-manage";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FullProfileProps {
  user: UserManageItem;
}

export default function FullProfile({ user }: FullProfileProps) {
  const address = [user.address, user.city, user.state, user.postalCode, user.country]
    .filter(Boolean)
    .join(", ");

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
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">{user.phone}</p>
          </div>
        </div>

        {address && (
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">{address}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm text-gray-600">Registered</p>
            <p className="font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("da-DK")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
