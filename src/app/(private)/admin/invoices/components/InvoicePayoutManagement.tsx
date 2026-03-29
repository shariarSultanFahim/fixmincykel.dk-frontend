"use client";

import { useState } from "react";

import { Download, FileText } from "lucide-react";
import { isAxiosError } from "axios";

import type { MonthlyInvoiceItem } from "@/types/admin-invoice";
import { currencyFormatter } from "@/constants/currency-formatter";

import {
  useAdjustWorkshopPlatformFees,
  useDownloadInvoice,
  useGenerateMonthlyInvoices,
  useGetMonthlyInvoices,
  useMarkInvoiceAsPaid
} from "@/lib/actions/invoices/manage-invoices";
import { formatDate } from "@/lib/date";

import { useToast } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { TablePagination } from "@/components/widgets";

type InvoiceFilterStatus = "all" | "PENDING" | "PAID";

const DEFAULT_LIMIT = 10;

const getDefaultMonth = () => {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}`;
};

const getStatusBadgeVariant = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized === "paid") {
    return "default";
  }

  return "secondary";
};

const getStatusLabel = (status: string) => {
  const normalized = status.toLowerCase();

  if (normalized === "paid") {
    return "Paid";
  }

  if (normalized === "pending" || normalized === "sent") {
    return "Pending";
  }

  return status;
};

const buildDownloadFilename = (invoice: MonthlyInvoiceItem) => {
  const monthLabel = formatDate(invoice.billingMonth, undefined, "PPP");
  return `invoice-${invoice.workshop.workshopName}-${monthLabel}.pdf`;
};

export default function InvoicePayoutManagement() {
  const { toast } = useToast();

  const [selectedMonth, setSelectedMonth] = useState(getDefaultMonth);
  const [statusFilter, setStatusFilter] = useState<InvoiceFilterStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoiceForAdjustment, setSelectedInvoiceForAdjustment] =
    useState<MonthlyInvoiceItem | null>(null);
  const [platformFeesInput, setPlatformFeesInput] = useState("10");

  const queryParams = {
    month: selectedMonth,
    page: currentPage,
    limit: DEFAULT_LIMIT,
    status: statusFilter === "all" ? undefined : statusFilter
  };

  const { data, isLoading, isFetching, refetch } = useGetMonthlyInvoices(queryParams);

  const generateMonthlyInvoices = useGenerateMonthlyInvoices();
  const markInvoiceAsPaid = useMarkInvoiceAsPaid();
  const adjustWorkshopPlatformFees = useAdjustWorkshopPlatformFees();
  const downloadInvoice = useDownloadInvoice();

  const invoices = data?.data ?? [];
  const totalPages = data?.meta.totalPage ?? 1;

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (status: InvoiceFilterStatus) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleGenerateAllInvoice = async () => {
    try {
      const response = await generateMonthlyInvoices.mutateAsync({ month: selectedMonth });
      toast({
        title: "Success",
        description: response.message
      });
      await refetch();
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message ||
          "Failed to generate monthly invoices."
        : "Failed to generate monthly invoices.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleMarkAsPaid = async (invoiceId: string) => {
    try {
      const response = await markInvoiceAsPaid.mutateAsync(invoiceId);
      toast({
        title: "Success",
        description: response.message || "Invoice marked as paid successfully."
      });
      await refetch();
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message ||
          "Failed to mark invoice as paid."
        : "Failed to mark invoice as paid.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const openAdjustDialog = (invoice: MonthlyInvoiceItem) => {
    setSelectedInvoiceForAdjustment(invoice);
    setPlatformFeesInput(
      invoice.workshop.platformFees !== null ? `${invoice.workshop.platformFees}` : "10"
    );
  };

  const closeAdjustDialog = () => {
    setSelectedInvoiceForAdjustment(null);
  };

  const handleAdjustPlatformFee = async () => {
    if (!selectedInvoiceForAdjustment) {
      return;
    }

    const platformFees = Number(platformFeesInput);

    if (Number.isNaN(platformFees)) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid platform fee value.",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await adjustWorkshopPlatformFees.mutateAsync({
        workshopId: selectedInvoiceForAdjustment.workshopId,
        platformFees
      });

      toast({
        title: "Success",
        description: response.message || "Platform fees updated successfully."
      });
      closeAdjustDialog();
      await refetch();
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message ||
          "Failed to adjust platform fees."
        : "Failed to adjust platform fees.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handleDownloadInvoice = async (invoice: MonthlyInvoiceItem) => {
    try {
      const blob = await downloadInvoice.mutateAsync(invoice.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = buildDownloadFilename(invoice);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message ||
          "Failed to download invoice."
        : "Failed to download invoice.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const isBusy =
    isLoading ||
    isFetching ||
    generateMonthlyInvoices.isPending ||
    markInvoiceAsPaid.isPending ||
    adjustWorkshopPlatformFees.isPending ||
    downloadInvoice.isPending;

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
            <span className="text-sm font-medium text-gray-700">Select Month:</span>
            <Input
              type="month"
              value={selectedMonth}
              onChange={(event) => handleMonthChange(event.target.value)}
              className="w-full border-border bg-white sm:max-w-56"
            />
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-end">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => handleStatusFilterChange("all")}
              className="flex-1 sm:flex-none"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "PENDING" ? "default" : "outline"}
              onClick={() => handleStatusFilterChange("PENDING")}
              className="flex-1 sm:flex-none"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "PAID" ? "default" : "outline"}
              onClick={() => handleStatusFilterChange("PAID")}
              className="flex-1 sm:flex-none"
            >
              Paid
            </Button>
            <Button
              onClick={handleGenerateAllInvoice}
              disabled={generateMonthlyInvoices.isPending}
              className="w-full sm:w-auto"
            >
              <FileText className="mr-2 h-4 w-4" />
              {generateMonthlyInvoices.isPending ? "Generating..." : "Generate All Invoice"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-2 border-border pt-4 pb-0">
        <CardHeader className="px-4">
          <CardTitle className="text-lg">Invoice List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-0">
          <div className="overflow-x-auto px-0">
            <Table className="min-w-262.5">
              <TableHeader>
                <TableRow className="border-border bg-gray-50">
                  <TableHead>Workshop</TableHead>
                  <TableHead>Billing Month</TableHead>
                  <TableHead>Total Jobs</TableHead>
                  <TableHead>Job Revenue</TableHead>
                  <TableHead>Platform Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {!isLoading && invoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-sm text-gray-500">
                      No invoices found for this month. Generate invoices to populate the table.
                    </TableCell>
                  </TableRow>
                )}

                {invoices.map((invoice) => {
                  const isPaid = invoice.status.toLowerCase() === "paid";

                  return (
                    <TableRow key={invoice.id} className="border-border">
                      <TableCell className="max-w-55 font-medium text-gray-900 sm:max-w-70">
                        {invoice.workshop.workshopName}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(invoice.billingMonth, undefined, "PPP")}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{invoice.totalJobs}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {currencyFormatter.format(invoice.totalJobAmount)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {currencyFormatter.format(invoice.platformFee)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {getStatusLabel(invoice.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(invoice.dueDate)}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex min-w-72.5 flex-wrap justify-end gap-2 lg:flex-nowrap">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            disabled={isPaid || markInvoiceAsPaid.isPending}
                          >
                            Mark as paid
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => openAdjustDialog(invoice)}
                            disabled={adjustWorkshopPlatformFees.isPending}
                          >
                            Adjust
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadInvoice(invoice)}
                            disabled={downloadInvoice.isPending}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Invoice
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 pb-4">
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              disabled={isBusy}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(selectedInvoiceForAdjustment)}
        onOpenChange={(open) => !open && closeAdjustDialog()}
      >
        <DialogContent className="space-y-4 border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Platform Fee</DialogTitle>
            <DialogDescription>
              Update platform fee for {selectedInvoiceForAdjustment?.workshop.workshopName}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="platform-fees-input">
              Platform Fees
            </label>
            <Input
              id="platform-fees-input"
              type="number"
              min="0"
              step="0.01"
              value={platformFeesInput}
              onChange={(event) => setPlatformFeesInput(event.target.value)}
              placeholder="10"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeAdjustDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdjustPlatformFee}
              disabled={adjustWorkshopPlatformFees.isPending}
            >
              {adjustWorkshopPlatformFees.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
