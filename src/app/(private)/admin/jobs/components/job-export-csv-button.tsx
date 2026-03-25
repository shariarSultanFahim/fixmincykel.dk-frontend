"use client";

import { useState } from "react";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { exportJobs } from "@/lib/actions/analytics/export.jobs";

import { Button } from "@/components/ui/button";

export default function ExportCSVButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await exportJobs();
      const csvBlob = new Blob([blob], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(csvBlob);

      link.setAttribute("href", url);
      link.setAttribute("download", `jobs-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to export jobs. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={isExporting}>
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : "Export CSV"}
    </Button>
  );
}
