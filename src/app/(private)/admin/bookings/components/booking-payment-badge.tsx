import type { BookingManagePaymentStatus } from "@/types/booking-manage";

import { Badge } from "@/components/ui/badge";

interface PaymentBadgeProps {
  paymentStatus: BookingManagePaymentStatus;
}

const paymentConfig = {
  PAID: {
    variant: "default" as const,
    label: "Paid"
  },
  PENDING: {
    variant: "secondary" as const,
    label: "Pending"
  },
  FAILED: {
    variant: "destructive" as const,
    label: "Failed"
  },
  REFUNDED: {
    variant: "outline" as const,
    label: "Refunded"
  }
};

export default function PaymentBadge({ paymentStatus }: PaymentBadgeProps) {
  const config = paymentConfig[paymentStatus];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
