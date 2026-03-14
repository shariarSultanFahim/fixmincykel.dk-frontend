import { CheckCircle, Eye, MoreHorizontal, Pause, XCircle } from "lucide-react";

import type { WorkshopApprovalStatus } from "@/types/workshop-manage";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface WorkshopActionsProps {
  workshopId: string;
  workshopStatus: WorkshopApprovalStatus;
  onView?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onUnsuspend?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export default function WorkshopActions({
  workshopId,
  workshopStatus,
  onView,
  onSuspend,
  onUnsuspend,
  onApprove,
  onReject
}: WorkshopActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onView && (
          <DropdownMenuItem onClick={() => onView(workshopId)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {workshopStatus === "APPROVED" && onSuspend && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSuspend(workshopId)} className="text-orange-600">
              <Pause className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
          </>
        )}

        {workshopStatus === "PENDING" && (
          <>
            {onApprove && (
              <DropdownMenuItem onClick={() => onApprove(workshopId)}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                Approve
              </DropdownMenuItem>
            )}
            {onReject && (
              <DropdownMenuItem onClick={() => onReject(workshopId)}>
                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                Reject
              </DropdownMenuItem>
            )}
          </>
        )}

        {workshopStatus === "SUSPENDED" && onUnsuspend && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUnsuspend(workshopId)}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Unsuspend
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
