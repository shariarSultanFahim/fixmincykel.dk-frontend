import { AlertCircle, CheckCircle, Clock, RefreshCw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const legendItems = [
  {
    label: "Invoice Sent",
    description: "Email with PDF sent to workshop",
    className: "text-green-600",
    Icon: CheckCircle
  },
  {
    label: "Ready to Invoice",
    description: "Jobs completed, invoice can be generated",
    className: "text-blue-600",
    Icon: Clock
  },
  {
    label: "Has Overdue",
    description: "Previous month's invoice not paid",
    className: "text-red-600",
    Icon: AlertCircle
  },
  {
    label: "Payment Received",
    description: "Workshop has paid this invoice",
    className: "text-gray-600",
    Icon: RefreshCw
  }
];

export default function StatusLegend() {
  return (
    <Card className="border-border p-0">
      <CardContent className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.Icon className={`h-5 w-5 ${item.className}`} />
            <div>
              <p className="text-sm font-semibold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
