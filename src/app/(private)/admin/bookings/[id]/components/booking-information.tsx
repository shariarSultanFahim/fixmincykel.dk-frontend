import { Briefcase, Calendar, DollarSign } from "lucide-react";

import type {
  AdminBooking,
  BookingManagePaymentStatus,
  BookingManageStatus
} from "@/types/booking-manage";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingInformationProps {
  booking: AdminBooking;
}

function getStatusColor(
  status: BookingManageStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "CONFIRMED":
    case "IN_PROGRESS":
    case "PENDING":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

function getPaymentColor(
  paymentStatus: BookingManagePaymentStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (paymentStatus) {
    case "PAID":
      return "default";
    case "PENDING":
      return "outline";
    case "FAILED":
      return "destructive";
    case "REFUNDED":
      return "secondary";
    default:
      return "outline";
  }
}

export default function BookingInformation({ booking }: BookingInformationProps) {
  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK"
  });

  const formattedDate = new Date(booking.scheduleStart).toLocaleString("da-DK");
  const statusLabel = booking.status.replaceAll("_", " ");
  const paymentLabel = booking.paymentStatus.replaceAll("_", " ");

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Booking Information</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(booking.status)}>{statusLabel}</Badge>
            <Badge variant={getPaymentColor(booking.paymentStatus)}>{paymentLabel}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Date & Time</p>
              <p className="font-medium text-gray-900">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DollarSign className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Amount</p>
              <div className="flex flex-col">
                {booking.oldPrice && (
                  <p className="text-xs font-medium text-rose-500 line-through">
                    {currencyFormatter.format(booking.oldPrice)}
                  </p>
                )}
                <p className="font-medium text-gray-900">
                  {booking.oldPrice ? "New Price: " : ""}
                  {currencyFormatter.format(booking.offer?.price ?? 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {booking.job && (
          <div className="flex items-start gap-3 border-t pt-4">
            <Briefcase className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Related Job</p>
              <div className="mt-1 space-y-1">
                <p className="font-medium text-gray-900">{booking.job.id}</p>
                <p className="text-sm text-gray-600">{booking.job.title}</p>
              </div>
            </div>
          </div>
        )}

        {booking.priceChangeNote && (
          <div className="mt-4 border-t border-dashed border-gray-200 pt-4">
            <p className="text-sm font-semibold text-gray-600">Price Change Note</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-700 italic">
              "{booking.priceChangeNote}"
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
