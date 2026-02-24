"use client";

import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { WorkshopStatus } from "../../data/workshop";

interface AdminControlsProps {
  workshopId: string;
  status: WorkshopStatus;
}

function getStatusBadgeVariant(
  status: WorkshopStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
    case "pending":
      return "secondary";
    case "suspended":
      return "destructive";
    case "rejected":
      return "destructive";
    default:
      return "outline";
  }
}

function getStatusDisplay(status: WorkshopStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminControls({ workshopId, status }: AdminControlsProps) {
  const handleApprove = () => {
    // TODO: Implement approve workshop
    console.log("Approve workshop:", workshopId);
  };

  const handleReject = () => {
    // TODO: Implement reject workshop with notes
    console.log("Reject workshop:", workshopId);
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Administrative Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-900">Current Status</p>
          <Badge variant={getStatusBadgeVariant(status)} className="w-fit gap-1">
            {status === "approved" && <CheckCircle className="h-3 w-3" />}
            {status === "pending" && <AlertCircle className="h-3 w-3" />}
            {(status === "suspended" || status === "rejected") && <XCircle className="h-3 w-3" />}
            {getStatusDisplay(status)}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {status === "pending" && (
            <>
              <Button variant="default" size="sm" className="gap-2" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
              <Button variant="destructive" size="sm" className="gap-2" onClick={handleReject}>
                <XCircle className="h-4 w-4" />
                Reject (with notes)
              </Button>
            </>
          )}

          {status === "approved" && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
              onClick={() => {
                // TODO: Implement suspend
                console.log("Suspend workshop:", workshopId);
              }}
            >
              <AlertCircle className="h-4 w-4" />
              Suspend
            </Button>
          )}

          {(status === "suspended" || status === "rejected") && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                // TODO: Implement reactivate
                console.log("Reactivate workshop:", workshopId);
              }}
            >
              <CheckCircle className="h-4 w-4" />
              Reactivate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
