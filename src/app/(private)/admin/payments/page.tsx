"use client";

import { Suspense } from "react";

import Header from "../component/layouts/header";
import { FinancialDashboard, WorkshopFinancialOverview } from "./components";
import {
  FinancialDashboardSkeleton,
  WorkshopFinancialOverviewSkeleton
} from "./components/skeletons";
import { paymentMetrics, workshopFinancialData } from "./data/payments";

export default function PaymentsManagementPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Payments & Platform Fee"
        subtitle="Financial overview and workshop fee management"
      />

      <Suspense fallback={<FinancialDashboardSkeleton />}>
        <FinancialDashboard
          totalOrdersProcessed={paymentMetrics.totalOrdersProcessed}
          invoicesSent={paymentMetrics.invoicesSent}
          totalPlatformFeesCollected={paymentMetrics.totalPlatformFeesCollected}
        />
      </Suspense>

      <Suspense fallback={<WorkshopFinancialOverviewSkeleton />}>
        <WorkshopFinancialOverview workshops={workshopFinancialData} />
      </Suspense>
    </div>
  );
}
