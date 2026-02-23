import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Workshop } from "../data/workshop";

interface ExportCSVButtonProps {
  workshops: Workshop[];
}

export default function ExportCSVButton({ workshops }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (workshops.length === 0) return;

    // Define CSV headers
    const headers = ["Name", "Owner", "Email", "Jobs", "Status", "Rating"];

    // Map data to CSV rows
    const rows = workshops.map((workshop) => [
      workshop.name,
      workshop.owner,
      workshop.email,
      workshop.jobs,
      workshop.status,
      workshop.rating
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((col) => `"${col}"`).join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `users-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
