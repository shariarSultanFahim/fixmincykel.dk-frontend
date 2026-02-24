"use client";

import { useState } from "react";

import { AlertCircle, CheckCircle, Clock } from "lucide-react";

import type { MonthlyInvoiceDetail } from "@/types/invoice-detail";
import type { InvoiceStatus, WorkshopInvoiceItem } from "@/types/invoice-report";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { MonthlyInvoiceDetailDialog } from "../dialogs";

interface WorkshopInvoiceListProps {
  items: WorkshopInvoiceItem[];
  invoiceDetails: Record<string, MonthlyInvoiceDetail>;
}

const statusConfig: Record<
  InvoiceStatus,
  { label: string; className: string; Icon: typeof CheckCircle }
> = {
  sent: { label: "Invoice Sent", className: "text-green-600", Icon: CheckCircle },
  ready: { label: "Ready to Invoice", className: "text-blue-600", Icon: Clock },
  overdue: { label: "Has Overdue", className: "text-red-600", Icon: AlertCircle },
  "payment-received": { label: "Payment Received", className: "text-gray-600", Icon: CheckCircle }
};

const actionStyles: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  success: "text-green-600",
  danger: "text-red-600",
  muted: "text-gray-600"
};

export default function WorkshopInvoiceList({ items, invoiceDetails }: WorkshopInvoiceListProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<MonthlyInvoiceDetail | null>(null);
  const currencyFormatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0
  });

  const handleActionClick = (actionLabel: string, item: WorkshopInvoiceItem) => {
    if (actionLabel !== "Review") return;

    const detail = invoiceDetails[item.id];
    if (detail) {
      setSelectedInvoice(detail);
    }
  };

  return (
    <>
      <Card className="gap-2 border-border pt-4 pb-0">
        <CardHeader className="px-4">
          <CardTitle className="text-lg">Workshop Invoice List</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-gray-50">
                <TableHead>Workshop</TableHead>
                <TableHead>Completed Jobs</TableHead>
                <TableHead>Job Revenue</TableHead>
                <TableHead>Fee (10%)</TableHead>
                <TableHead>Invoice Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => {
                const status = statusConfig[item.invoiceStatus];
                const feeAmount = (item.jobRevenue * item.feePercentage) / 100;
                const statusLabel = item.invoiceStatusDetail
                  ? `${status.label} (${item.invoiceStatusDetail})`
                  : status.label;

                return (
                  <TableRow key={item.id} className="border-border">
                    <TableCell className="font-medium text-gray-900">{item.name}</TableCell>
                    <TableCell>{item.completedJobs} jobs</TableCell>
                    <TableCell>{currencyFormatter.format(item.jobRevenue)}</TableCell>
                    <TableCell>{currencyFormatter.format(feeAmount)}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${status.className}`}>
                        <status.Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{statusLabel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {item.actions.map((action) => (
                        <Button
                          key={action.label}
                          variant="link"
                          size="sm"
                          className={`h-auto p-0 ${actionStyles[action.tone]}`}
                          onClick={() => handleActionClick(action.label, item)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedInvoice && (
        <MonthlyInvoiceDetailDialog
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </>
  );
}
