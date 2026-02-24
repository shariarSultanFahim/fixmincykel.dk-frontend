import { Suspense } from "react";

import Header from "../component/layouts/header";
import { ReportSummary, ReportToolbar, StatusLegend, WorkshopInvoiceList } from "./components";
import {
  ReportSummarySkeleton,
  ReportToolbarSkeleton,
  StatusLegendSkeleton,
  WorkshopInvoiceListSkeleton
} from "./components/skeletons";
import { invoiceDetails, reportSummary, workshopInvoiceList } from "./data/invoices";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Monthly Workshop Invoices & Payouts"
        subtitle="Generate one invoice per workshop for all completed jobs in a selected month."
      />

      <Suspense fallback={<ReportToolbarSkeleton />}>
        <ReportToolbar />
      </Suspense>

      <Suspense fallback={<ReportSummarySkeleton />}>
        <ReportSummary summary={reportSummary} />
      </Suspense>

      <Suspense fallback={<WorkshopInvoiceListSkeleton />}>
        <WorkshopInvoiceList items={workshopInvoiceList} invoiceDetails={invoiceDetails} />
      </Suspense>

      <Suspense fallback={<StatusLegendSkeleton />}>
        <StatusLegend />
      </Suspense>
    </div>
  );
}
