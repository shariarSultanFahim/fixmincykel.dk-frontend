import { CheckCircle, Eye, EyeOff, MoreHorizontal, Trash2 } from "lucide-react";

import type { ReviewModerationStatus } from "@/types/review-moderation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ReviewActionsProps {
  reviewId: string;
  reviewStatus: ReviewModerationStatus;
  onView?: (id: string) => void;
  onHide?: (id: string) => void;
  onResolve?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function ReviewActions({
  reviewId,
  reviewStatus,
  onView,
  onHide,
  onResolve,
  onDelete
}: ReviewActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {onView && (
          <DropdownMenuItem onClick={() => onView(reviewId)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
        )}

        {reviewStatus === "visible" && onHide && (
          <DropdownMenuItem onClick={() => onHide(reviewId)}>
            <EyeOff className="mr-2 h-4 w-4 text-orange-600" />
            Hide
          </DropdownMenuItem>
        )}

        {reviewStatus === "flagged" && onResolve && (
          <DropdownMenuItem onClick={() => onResolve(reviewId)}>
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
            Resolve
          </DropdownMenuItem>
        )}

        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(reviewId)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
