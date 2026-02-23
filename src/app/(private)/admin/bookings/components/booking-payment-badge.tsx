import { Badge } from "@/components/ui/badge";

import type { Payment } from "../data/bookings";

interface PaymentBadgeProps {
  payment: Payment;
}

const paymentConfig = {
  paid: {
    variant: "default" as const,
    label: "Paid"
  },
  unpaid: {
    variant: "secondary" as const,
    label: "Unpaid"
  },
  refunded: {
    variant: "outline" as const,
    label: "Refunded"
  }
};

export default function PaymentBadge({ payment }: PaymentBadgeProps) {
  const config = paymentConfig[payment];

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
