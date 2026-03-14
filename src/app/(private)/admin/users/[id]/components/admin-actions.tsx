"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ban, Download, RotateCcw, ShieldCheck } from "lucide-react";

import type { UserManageStatus } from "@/types/users-manage";

import { useBanUser, useUnbanUser } from "@/lib/actions/users/ban-unban.user";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminActionsProps {
  userId: string;
  userStatus: UserManageStatus;
}

export default function AdminActions({ userId, userStatus }: AdminActionsProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: banUser, isPending: isBanning } = useBanUser();
  const { mutate: unbanUser, isPending: isUnbanning } = useUnbanUser();

  const isSubmitting = isBanning || isUnbanning;
  const isUserBanned = userStatus === "BANNED";

  const handleBanUser = () => {
    banUser(userId, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["users-details", userId] });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast({
          title: "Failed to ban user",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const handleUnbanUser = () => {
    unbanUser(userId, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["users-details", userId] });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast({
          title: "Failed to unban user",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const handleResetPassword = () => {
    // TODO: Implement reset password
  };

  //   const handleViewMessages = () => {
  //     // TODO: Implement view messages
  //     console.log("View messages for user:", userId);
  //   };

  const handleExportData = () => {
    // TODO: Implement export data
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Admin Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {isUserBanned ? (
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleUnbanUser}
            disabled={isSubmitting}
          >
            <ShieldCheck className="h-4 w-4" />
            {isSubmitting ? "Unbanning..." : "Unban User"}
          </Button>
        ) : (
          <Button
            variant="destructive"
            size="sm"
            className="gap-2"
            onClick={handleBanUser}
            disabled={isSubmitting}
          >
            <Ban className="h-4 w-4" />
            {isSubmitting ? "Banning..." : "Ban User"}
          </Button>
        )}
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
