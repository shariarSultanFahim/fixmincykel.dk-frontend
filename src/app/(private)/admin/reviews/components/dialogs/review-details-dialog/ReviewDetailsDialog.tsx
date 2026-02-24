import { AlertTriangle, CheckCircle2, Star } from "lucide-react";

import type { ReviewModerationItem } from "@/types/review-moderation";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ReviewDetailsDialogProps {
  review: ReviewModerationItem;
  onClose: () => void;
  onHide: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ReviewDetailsDialog({
  review,
  onClose,
  onHide,
  onDelete
}: ReviewDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="space-y-5 border-border sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">User</p>
            <p className="text-sm font-semibold text-gray-900">{review.userName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Workshop</p>
            <p className="text-sm font-semibold text-gray-900">{review.workshopName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Rating</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={`detail-star-${review.id}-${index}`}
                    className={cn(
                      "h-4 w-4",
                      index < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">({review.rating}/5)</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-sm font-semibold text-gray-900">{review.createdAt}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500">Comment</p>
          <div className="mt-2 rounded-xl border border-border bg-gray-50 p-4 text-sm text-gray-700">
            {review.comment}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500">Status</p>
          <Badge
            className={cn(
              "mt-2 border",
              review.status === "visible"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-amber-200 bg-amber-50 text-amber-700"
            )}
          >
            <span className="mr-1">
              {review.status === "visible" ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <AlertTriangle className="h-3 w-3" />
              )}
            </span>
            {review.status === "visible" ? "Visible" : "Flagged"}
          </Badge>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-900">Admin Actions</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {review.status === "visible" && (
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => onHide(review.id)}
              >
                Hide Review
              </Button>
            )}
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => onDelete(review.id)}
            >
              Delete Review
            </Button>
            <Button variant="outline" onClick={() => onClose()}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
