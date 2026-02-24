import { DollarSign, FileText, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <Card className="border-border">
      <CardContent className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-3">{icon}</div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

interface FinancialDashboardProps {
  totalOrdersProcessed: number;
  invoicesSent: number;
  totalPlatformFeesCollected: number;
}

export default function FinancialDashboard({
  totalOrdersProcessed,
  invoicesSent,
  totalPlatformFeesCollected
}: FinancialDashboardProps) {
  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <MetricCard
        label="Total Orders Processed"
        value={totalOrdersProcessed}
        icon={<TrendingUp className="h-6 w-6 text-primary" />}
      />
      <MetricCard
        label="Invoices Sent"
        value={invoicesSent}
        icon={<FileText className="h-6 w-6 text-primary" />}
      />
      <MetricCard
        label="Total Platform Fees Collected"
        value={currencyFormatter.format(totalPlatformFeesCollected)}
        icon={<DollarSign className="h-6 w-6 text-primary" />}
      />
    </div>
  );
}
