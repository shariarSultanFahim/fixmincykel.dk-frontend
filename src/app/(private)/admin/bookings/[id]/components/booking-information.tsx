import { Briefcase, Calendar, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Booking, Payment, Status } from "../../data/bookings";

interface BookingInformationProps {
  booking: Booking;
}

function getStatusColor(status: Status): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "booked":
      return "secondary";
    case "cancle":
      return "destructive";
    default:
      return "outline";
  }
}

function getPaymentColor(payment: Payment): "default" | "secondary" | "destructive" | "outline" {
  switch (payment) {
    case "paid":
      return "default";
    case "unpaid":
      return "outline";
    case "refunded":
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

  const formattedDate = new Date(booking.date).toLocaleString("da-DK");
  const statusLabel = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  const paymentLabel = booking.payment.charAt(0).toUpperCase() + booking.payment.slice(1);

  return (
    <Card className="border-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>Booking Information</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getStatusColor(booking.status)}>{statusLabel}</Badge>
            <Badge variant={getPaymentColor(booking.payment)}>{paymentLabel}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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
              <p className="font-medium text-gray-900">
                {currencyFormatter.format(booking.amount)}
              </p>
            </div>
          </div>
        </div>

        {booking.details && (
          <div className="flex items-start gap-3 border-t pt-4">
            <Briefcase className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Related Job</p>
              <div className="mt-1 space-y-1">
                <p className="font-medium text-gray-900">{booking.details.jobId}</p>
                <p className="text-sm text-gray-600">{booking.details.jobCategory}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
