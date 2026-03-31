"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Ban, RotateCcw, ShieldCheck } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { UserManageStatus } from "@/types/users-manage";

import { useForgetPassword } from "@/lib/actions/auth/forget-password";
import { useBanUser, useUnbanUser } from "@/lib/actions/users/ban-unban.user";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminActionsProps {
  userId: string;
  userStatus: UserManageStatus;
  userEmail: string;
}

export default function AdminActions({ userId, userStatus, userEmail }: AdminActionsProps) {
  const queryClient = useQueryClient();
  const { mutate: banUser, isPending: isBanning } = useBanUser();
  const { mutate: unbanUser, isPending: isUnbanning } = useUnbanUser();
  const forgetPasswordMutation = useForgetPassword();

  const isSubmitting = isBanning || isUnbanning;
  const isUserBanned = userStatus === "BANNED";

  const handleBanUser = () => {
    banUser(userId, {
      onSuccess: (result) => {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["users-details", userId] });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast.error("Failed to ban user. Please try again.");
      }
    });
  };

  const handleUnbanUser = () => {
    unbanUser(userId, {
      onSuccess: (result) => {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["users-details", userId] });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast.error("Failed to unban user. Please try again.");
      }
    });
  };

  const handleResetPassword = async () => {
    try {
      const response = await forgetPasswordMutation.mutateAsync({ email: userEmail });
      console.log("Forget password response:", response);
      const message = response.message || response.data?.status || "Password reset email sent.";
      toast.success(message);
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : "Could not send reset email. Please try again.";
      toast.error(message);
    }
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
      </CardContent>
    </Card>
  );
}
