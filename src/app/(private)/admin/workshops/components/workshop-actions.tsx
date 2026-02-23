import { CheckCircle, Edit, Eye, MoreHorizontal, Pause, Trash2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { WorkshopStatus } from "../data/workshop";

interface WorkshopActionsProps {
  workshopId: string;
  workshopStatus: WorkshopStatus;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onReactivate?: (id: string) => void;
  onReview?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function WorkshopActions({
  workshopId,
  workshopStatus,
  onView,
  onEdit,
  onSuspend,
  onReactivate,
  onReview,
  onApprove,
  onReject,
  onDelete
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

        {workshopStatus === "approved" && (
          <>
            {onEdit && (
              <DropdownMenuItem onClick={() => onEdit(workshopId)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}
            {onSuspend && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSuspend(workshopId)} className="text-orange-600">
                  <Pause className="mr-2 h-4 w-4" />
                  Suspend
                </DropdownMenuItem>
              </>
            )}
          </>
        )}

        {workshopStatus === "pending" && (
          <>
            {onReview && (
              <DropdownMenuItem onClick={() => onReview(workshopId)}>
                <Eye className="mr-2 h-4 w-4" />
                Review
              </DropdownMenuItem>
            )}
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

        {workshopStatus === "suspended" && onReactivate && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onReactivate(workshopId)}>
              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
              Reactivate
            </DropdownMenuItem>
          </>
        )}

        {(workshopStatus === "suspended" || workshopStatus === "rejected") && onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(workshopId)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
