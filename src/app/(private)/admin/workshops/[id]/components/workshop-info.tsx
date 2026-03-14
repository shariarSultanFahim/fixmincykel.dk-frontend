import { Hash, Mail, MapPin, Phone, User } from "lucide-react";

import type { AdminWorkshop } from "@/types/workshop-manage";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkshopInfoProps {
  workshop: AdminWorkshop;
}

export default function WorkshopInfo({ workshop }: WorkshopInfoProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Workshop Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{workshop.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Owner</p>
              <p className="font-medium text-gray-900">{workshop.ownerName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{workshop.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Hash className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">CVR Number</p>
              <p className="font-medium text-gray-900">{workshop.cvrNumber}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">
                {workshop.address}, {workshop.postalCode} {workshop.city}
                {workshop.country ? `, ${workshop.country}` : ""}
              </p>
            </div>
          </div>
        </div>

        {workshop.description && (
          <div>
            <p className="mb-1 text-sm font-semibold text-gray-900">Description</p>
            <p className="text-sm text-gray-600">{workshop.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
