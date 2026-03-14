"use client";

import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { WorkshopApprovalStatus } from "@/types/workshop-manage";

import { useApproveWorkshop } from "@/lib/actions/workshops/approve.workshop";
import { useRejectWorkshop } from "@/lib/actions/workshops/reject.workshop";
import { useSuspendWorkshop } from "@/lib/actions/workshops/suspend.workshop";
import { useUnsuspendWorkshop } from "@/lib/actions/workshops/unsuspend.workshop";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdminControlsProps {
  workshopId: string;
  status: WorkshopApprovalStatus;
}

const statusVariantMap: Record<
  WorkshopApprovalStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  APPROVED: "default",
  PENDING: "secondary",
  SUSPENDED: "destructive",
  REJECTED: "destructive"
};

const statusDisplayMap: Record<WorkshopApprovalStatus, string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  SUSPENDED: "Suspended",
  REJECTED: "Rejected"
};

export default function AdminControls({ workshopId, status }: AdminControlsProps) {
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState<WorkshopApprovalStatus>(status);

  const approveMutation = useApproveWorkshop();
  const rejectMutation = useRejectWorkshop();
  const suspendMutation = useSuspendWorkshop();
  const unsuspendMutation = useUnsuspendWorkshop();

  const isPending =
    approveMutation.isPending ||
    rejectMutation.isPending ||
    suspendMutation.isPending ||
    unsuspendMutation.isPending;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["workshop-details", workshopId] });
    queryClient.invalidateQueries({ queryKey: ["workshops-manage"] });
  };

  const handleApprove = async () => {
    try {
      const res = await approveMutation.mutateAsync(workshopId);
      toast.success(res.message || "Workshop approved.");
      setCurrentStatus("APPROVED");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to approve workshop."
      );
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectMutation.mutateAsync(workshopId);
      toast.success(res.message || "Workshop rejected.");
      setCurrentStatus("REJECTED");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to reject workshop."
      );
    }
  };

  const handleSuspend = async () => {
    try {
      const res = await suspendMutation.mutateAsync(workshopId);
      toast.success(res.message || "Workshop suspended.");
      setCurrentStatus("SUSPENDED");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to suspend workshop."
      );
    }
  };

  const handleUnsuspend = async () => {
    try {
      const res = await unsuspendMutation.mutateAsync(workshopId);
      toast.success(res.message || "Workshop unsuspended.");
      setCurrentStatus("APPROVED");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to unsuspend workshop."
      );
    }
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Administrative Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Current Status</p>
          <Badge variant={statusVariantMap[currentStatus]} className="w-fit gap-1">
            {currentStatus === "APPROVED" && <CheckCircle className="h-3 w-3" />}
            {currentStatus === "PENDING" && <AlertCircle className="h-3 w-3" />}
            {(currentStatus === "SUSPENDED" || currentStatus === "REJECTED") && (
              <XCircle className="h-3 w-3" />
            )}
            {statusDisplayMap[currentStatus]}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {currentStatus === "PENDING" && (
            <>
              <Button
                variant="default"
                size="sm"
                className="gap-2"
                disabled={isPending}
                onClick={handleApprove}
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                disabled={isPending}
                onClick={handleReject}
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}

          {currentStatus === "APPROVED" && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
              disabled={isPending}
              onClick={handleSuspend}
            >
              <AlertCircle className="h-4 w-4" />
              Suspend
            </Button>
          )}

          {currentStatus === "SUSPENDED" && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={isPending}
              onClick={handleUnsuspend}
            >
              <CheckCircle className="h-4 w-4" />
              Unsuspend
            </Button>
          )}

          {currentStatus === "REJECTED" && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={isPending}
              onClick={handleApprove}
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
