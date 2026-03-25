"use client";

import { useState } from "react";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { exportBookings } from "@/lib/actions/analytics/export.bookings";
import { exportJobs } from "@/lib/actions/analytics/export.jobs";
import { exportUsers } from "@/lib/actions/analytics/export.users";
import { exportWorkshops } from "@/lib/actions/analytics/export.workshops";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ExportType = "users" | "workshops" | "jobs" | "bookings";

const exportTools: { label: string; type: ExportType }[] = [
  { label: "Export Users", type: "users" },
  { label: "Export Workshops", type: "workshops" },
  { label: "Export Jobs", type: "jobs" },
  { label: "Export Bookings", type: "bookings" }
];

export default function ExportTools() {
  const [activeExport, setActiveExport] = useState<ExportType | null>(null);

  const downloadCsvBlob = (blob: Blob, filename: string) => {
    const csvBlob = new Blob([blob], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(csvBlob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async (type: ExportType) => {
    setActiveExport(type);
    try {
      const date = new Date().toISOString().split("T")[0];

      if (type === "users") {
        const blob = await exportUsers();
        downloadCsvBlob(blob, `users-${date}.csv`);
        return;
      }

      if (type === "workshops") {
        const blob = await exportWorkshops();
        downloadCsvBlob(blob, `workshops-${date}.csv`);
        return;
      }

      if (type === "jobs") {
        const blob = await exportJobs();
        downloadCsvBlob(blob, `jobs-${date}.csv`);
        return;
      }

      const blob = await exportBookings();
      downloadCsvBlob(blob, `bookings-${date}.csv`);
    } catch {
      toast.error("Failed to export data. Please try again.");
    } finally {
      setActiveExport(null);
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Download className="h-4 w-4" />
          Export Tools
        </CardTitle>
        <CardDescription>Export platform data in CSV or XLSX format</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {exportTools.map((tool) => (
            <Button
              key={tool.type}
              type="button"
              className="w-full"
              onClick={() => handleExport(tool.type)}
              disabled={activeExport !== null}
            >
              {activeExport === tool.type ? "Exporting..." : tool.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
