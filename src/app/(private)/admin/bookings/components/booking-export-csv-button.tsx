"use client";

import { Download } from "lucide-react";

import type {
  BookingManagePaymentStatus,
  BookingManageQueryParams,
  BookingManageStatus
} from "@/types/booking-manage";

import { useExportBookings } from "@/lib/actions/analytics/export.bookings";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";

interface ExportCSVButtonProps {
  searchTerm?: string;
  status?: BookingManageStatus;
  paymentStatus?: BookingManagePaymentStatus;
}

export default function ExportCSVButton({
  searchTerm,
  status,
  paymentStatus
}: ExportCSVButtonProps) {
  const { mutate: runExport, isPending } = useExportBookings();
  const { toast } = useToast();

  const handleExport = () => {
    const params: BookingManageQueryParams = {};

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (status) {
      params.status = status;
    }

    if (paymentStatus) {
      params.paymentStatus = paymentStatus;
    }

    runExport(params, {
      onSuccess: (blob) => {
        const csvBlob = new Blob([blob], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(csvBlob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", `bookings-${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      onError: () => {
        toast({
          title: "Export failed",
          description: "Could not export bookings. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Button onClick={handleExport} disabled={isPending}>
      <Download className="mr-2 h-4 w-4" />
      {isPending ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
