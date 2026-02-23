import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { User } from "../data/users";

interface ExportCSVButtonProps {
  users: User[];
}

export default function ExportCSVButton({ users }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (users.length === 0) return;

    // Define CSV headers
    const headers = ["Name", "Email", "Phone", "Jobs Created", "Status", "Registered"];

    // Map data to CSV rows
    const rows = users.map((user) => [
      user.name,
      user.email,
      user.phone,
      user.jobsCreated,
      user.status,
      user.registered
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
