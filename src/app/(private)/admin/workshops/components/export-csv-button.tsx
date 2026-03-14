"use client";

import { useState } from "react";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { exportWorkshops } from "@/lib/actions/workshops/export.workshops";

import { Button } from "@/components/ui/button";

export default function ExportCSVButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const blob = await exportWorkshops();
      const csvBlob = new Blob([blob], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");

      link.setAttribute("href", url);
      link.setAttribute("download", `workshops-${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      toast.error("Failed to export workshops. Please try again.");
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
