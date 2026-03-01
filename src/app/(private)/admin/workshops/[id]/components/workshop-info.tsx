import { Hash, Mail, MapPin, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { ServiceCategory, WorkshopDetails } from "../../data/workshop";

interface WorkshopInfoProps {
  email: string;
  owner: string;
  details?: WorkshopDetails;
}

function getServiceCategoryLabel(category: ServiceCategory): string {
  const labels: Record<ServiceCategory, string> = {
    "puncture-repair": "Puncture Repair",
    "brake-service": "Brake Service",
    "chain-replacement": "Chain Replacement",
    "general-tune-up": "General Tune-up",
    "wheel-repair": "Wheel Repair",
    "drivetrain-service": "Drivetrain Service",
    "suspension-service": "Suspension Service",
    "custom-builds": "Custom Builds"
  };
  return labels[category];
}

function getServiceCategoryColor(category: ServiceCategory): string {
  const colors: Record<ServiceCategory, string> = {
    "puncture-repair": "bg-primary text-white",
    "brake-service": "bg-primary text-white",
    "chain-replacement": "bg-primary text-white",
    "general-tune-up": "bg-primary text-white",
    "wheel-repair": "bg-secondary text-white",
    "drivetrain-service": "bg-secondary text-white",
    "suspension-service": "bg-secondary text-white",
    "custom-builds": "bg-secondary text-white"
  };
  return colors[category];
}

export default function WorkshopInfo({ email, owner, details }: WorkshopInfoProps) {
  const openingHoursEntries = details
    ? Object.entries(details.openingHours).sort((a, b) => {
        const dayOrder = [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday"
        ];
        return dayOrder.indexOf(a[0]) - dayOrder.indexOf(b[0]);
      })
    : [];

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Workshop Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact and Owner Information */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Owner</p>
              <p className="font-medium text-gray-900">{owner}</p>
            </div>
          </div>

          {details && (
            <>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{details.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hash className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">CVR Number</p>
                  <p className="font-medium text-gray-900">{details.cvrNumber}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Service Categories */}
        {details && details.serviceCategories.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">Service Categories</p>
            <div className="flex flex-wrap gap-2">
              {details.serviceCategories.map((category) => (
                <Badge
                  key={category}
                  className={`${getServiceCategoryColor(category)}`}
                  variant="secondary"
                >
                  {getServiceCategoryLabel(category)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Opening Hours */}
        {details && openingHoursEntries.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">Opening Hours</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {openingHoursEntries.map(([day, hours]) => {
                const dayLabel = day.charAt(0).toUpperCase() + day.slice(1);
                const hoursText = hours === "closed" ? "Closed" : `${hours.open} - ${hours.close}`;

                return (
                  <div key={day} className="flex justify-between rounded bg-gray-50 p-2">
                    <span className="font-medium text-gray-900">{dayLabel}</span>
                    <span className="text-gray-600">{hoursText}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
