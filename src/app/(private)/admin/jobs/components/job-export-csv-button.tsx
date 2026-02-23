import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Job } from "../data/workshop";

interface ExportCSVButtonProps {
  jobs: Job[];
}

export default function ExportCSVButton({ jobs }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (jobs.length === 0) return;

    // Define CSV headers
    const headers = ["Job ID", "User", "Category", "Offers", "Status", "Created"];

    // Map data to CSV rows
    const rows = jobs.map((job) => [
      job.jobId,
      job.user,
      job.category.replace(/-/g, " "),
      job.offers,
      job.status,
      new Date(job.createdAt).toLocaleDateString("da-DK")
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
    link.setAttribute("download", `jobs-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleExport} disabled={jobs.length === 0}>
      <Download className="mr-2 h-4 w-4" />
      Export CSV
    </Button>
  );
}
