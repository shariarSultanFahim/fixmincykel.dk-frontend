import { Suspense } from "react";

import Header from "../component/layouts/header";
import InvoicePayoutManagement from "./components/InvoicePayoutManagement";
import { InvoicePayoutManagementSkeleton } from "./components/skeletons";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <Header
        title="Monthly Workshop Invoices & Payouts"
        subtitle="Manage monthly invoices, platform fees, and payouts in one place."
      />

      <Suspense fallback={<InvoicePayoutManagementSkeleton />}>
        <InvoicePayoutManagement />
      </Suspense>
    </div>
  );
}
