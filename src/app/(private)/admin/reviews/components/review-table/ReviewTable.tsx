"use client";

import { useState } from "react";

import { AlertTriangle, CheckCircle2, Star } from "lucide-react";

import type { ReviewModerationItem, ReviewModerationStatus } from "@/types/review-moderation";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import { DeleteReviewDialog, HideReviewDialog, ReviewDetailsDialog } from "../dialogs";
import FilterButton from "../filter-button";
import ReviewActions from "../review-actions";
import SearchBar from "../search-bar";

interface ReviewTableProps {
  reviews: ReviewModerationItem[];
}

const statusStyles: Record<ReviewModerationStatus, string> = {
  visible: "border-green-200 bg-green-50 text-green-700",
  flagged: "border-amber-200 bg-amber-50 text-amber-700"
};

export default function ReviewTable({ reviews }: ReviewTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ReviewModerationStatus[]>([
    "visible",
    "flagged"
  ]);
  const [activeReview, setActiveReview] = useState<ReviewModerationItem | null>(null);
  const [activeDialog, setActiveDialog] = useState<"view" | "hide" | "delete" | null>(null);

  const handleView = (id: string) => {
    const review = reviews.find((item) => item.id === id);
    if (!review) return;
    setActiveReview(review);
    setActiveDialog("view");
  };

  const handleHide = (id: string) => {
    const review = reviews.find((item) => item.id === id);
    if (!review) return;
    setActiveReview(review);
    setActiveDialog("hide");
  };

  const handleResolve = (id: string) => {
    void id;
  };

  const handleDelete = (id: string) => {
    const review = reviews.find((item) => item.id === id);
    if (!review) return;
    setActiveReview(review);
    setActiveDialog("delete");
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
    setActiveReview(null);
  };

  const handleConfirmHide = (id: string) => {
    void id;
    handleCloseDialog();
  };

  const handleConfirmDelete = (id: string) => {
    void id;
    handleCloseDialog();
  };

  const filteredReviews = reviews.filter((review) => {
    if (!selectedStatuses.includes(review.status)) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        review.userName.toLowerCase().includes(query) ||
        review.workshopName.toLowerCase().includes(query) ||
        review.comment.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleStatusChange = (status: ReviewModerationStatus, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  };

  return (
    <>
      <div className="space-y-4">
        <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
          <CardContent className="flex-1">
            <SearchBar value={searchQuery} onSearch={setSearchQuery} />
          </CardContent>
          <CardContent className="flex gap-2">
            <FilterButton selectedStatuses={selectedStatuses} onStatusChange={handleStatusChange} />
          </CardContent>
        </Card>

        <Card className="border-border py-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="rounded-tl-xl">User</TableHead>
                <TableHead>Workshop</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="rounded-tr-xl">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <TableRow key={review.id} className="border-border">
                    <TableCell className="font-medium text-gray-900">{review.userName}</TableCell>
                    <TableCell className="text-gray-700">{review.workshopName}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={`${review.id}-star-${index}`}
                            className={cn(
                              "h-4 w-4",
                              index < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700">{review.comment}</TableCell>
                    <TableCell>
                      <Badge className={cn("border", statusStyles[review.status])}>
                        <span className="mr-1">
                          {review.status === "visible" ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <AlertTriangle className="h-3 w-3" />
                          )}
                        </span>
                        {review.status === "visible" ? "Visible" : "Flagged"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{review.createdAt}</TableCell>
                    <TableCell>
                      <ReviewActions
                        reviewId={review.id}
                        reviewStatus={review.status}
                        onView={handleView}
                        onHide={handleHide}
                        onResolve={handleResolve}
                        onDelete={handleDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    No reviews found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>

        <div className="text-sm text-gray-600">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </div>
      </div>

      {activeReview && activeDialog === "view" && (
        <ReviewDetailsDialog
          review={activeReview}
          onClose={handleCloseDialog}
          onHide={handleHide}
          onDelete={handleDelete}
        />
      )}

      {activeReview && activeDialog === "hide" && (
        <HideReviewDialog
          review={activeReview}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmHide}
        />
      )}

      {activeReview && activeDialog === "delete" && (
        <DeleteReviewDialog
          review={activeReview}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
