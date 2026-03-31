"use client";

import { Download } from "lucide-react";

import type { UserManageQueryParams, UserManageStatus } from "@/types/users-manage";

import { useExportUsers } from "@/lib/actions/analytics/export.users";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";

interface ExportCSVButtonProps {
  searchTerm?: string;
  status?: UserManageStatus;
}

export default function ExportCSVButton({ searchTerm, status }: ExportCSVButtonProps) {
  const { mutate: exportUsers, isPending } = useExportUsers();
  const { toast } = useToast();

  const handleExport = () => {
    const params: UserManageQueryParams = {};
    if (searchTerm) params.searchTerm = searchTerm;
    if (status) params.status = status;

    exportUsers(params, {
      onSuccess: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `users-${new Date().toISOString().split("T")[0]}.csv`;
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      onError: () => {
        toast({
          title: "Export failed",
          description: "Could not export users. Please try again.",
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
