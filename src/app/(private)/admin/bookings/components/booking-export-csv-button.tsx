import { Download } from "lucide-react";

import type { AdminBooking } from "@/types/booking-manage";

import { Button } from "@/components/ui/button";

interface ExportCSVButtonProps {
  bookings: AdminBooking[];
}

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

export default function ExportCSVButton({ bookings }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (bookings.length === 0) return;

    const headers = ["Booking ID", "User", "Workshop", "Status", "Payment", "Date", "Amount"];

    const rows = bookings.map((booking) => [
      booking.id,
      booking.user?.name ?? booking.userId,
      booking.workshop?.workshopName ?? booking.workshopId,
      booking.status,
      booking.paymentStatus,
      new Date(booking.scheduleStart).toLocaleDateString("da-DK"),
      currencyFormatter.format(booking.offer?.price ?? 0)
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((col) => `"${col}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `bookings-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleExport} disabled={bookings.length === 0}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
