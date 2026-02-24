import type { InvoiceReportSummary } from "@/types/invoice-report";
import { currencyFormatter } from "@/constants/currency-formatter";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSummaryProps {
  summary: InvoiceReportSummary;
}

export default function ReportSummary({ summary }: ReportSummaryProps) {
  return (
    <Card className="gap-0 border-border bg-blue-50/70 py-4">
      <CardHeader>
        <CardTitle className="text-lg">Report Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-gray-600">Report Period</p>
          <p className="text-base font-semibold text-gray-900">{summary.reportPeriod}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Job Revenue (All Workshops)</p>
          <p className="text-base font-semibold text-gray-900">
            {currencyFormatter.format(summary.totalJobRevenue)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Platform Fees to Invoice</p>
          <p className="text-base font-semibold text-primary">
            {currencyFormatter.format(summary.totalPlatformFees)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-base font-semibold text-gray-900">
            {summary.readyWorkshopsCount} of {summary.totalWorkshops} workshops ready for invoicing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
