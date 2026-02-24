"use client";

import { Ban, Download, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminActionsProps {
  userId: string;
}

export default function AdminActions({ userId }: AdminActionsProps) {
  const handleBanUser = () => {
    // TODO: Implement ban user
    console.log("Ban user:", userId);
  };

  const handleResetPassword = () => {
    // TODO: Implement reset password
    console.log("Reset password for user:", userId);
  };

  //   const handleViewMessages = () => {
  //     // TODO: Implement view messages
  //     console.log("View messages for user:", userId);
  //   };

  const handleExportData = () => {
    // TODO: Implement export data
    console.log("Export data for user:", userId);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Admin Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button variant="destructive" size="sm" className="gap-2" onClick={handleBanUser}>
          <Ban className="h-4 w-4" />
          Ban User
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleResetPassword}>
          <RotateCcw className="h-4 w-4" />
          Reset Password
        </Button>
        {/* <Button variant="outline" size="sm" className="gap-2" onClick={handleViewMessages}>
          <MessageSquare className="h-4 w-4" />
          View Messages
        </Button> */}
        <Button variant="outline" size="sm" className="gap-2" onClick={handleExportData}>
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </CardContent>
    </Card>
  );
}
