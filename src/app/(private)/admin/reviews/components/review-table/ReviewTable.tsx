"use client";

import { useMemo, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, EyeOff, Star } from "lucide-react";

import type {
  ReviewModerationApiItem,
  ReviewModerationItem,
  ReviewModerationStatus
} from "@/types/review-moderation";

import { useGetReviews } from "@/lib/actions/reviews/get.reviews";
import { useDeleteReview, useHideReview } from "@/lib/actions/reviews/moderate.review";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useToast } from "@/hooks/use-toast";

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
import { TablePagination } from "@/components/widgets";

import { DeleteReviewDialog, HideReviewDialog, ReviewDetailsDialog } from "../dialogs";
import FilterButton from "../filter-button";
import ReviewActions from "../review-actions";
import SearchBar from "../search-bar";

const LIMIT = 10;

const statusStyles: Record<ReviewModerationStatus, string> = {
  visible: "border-green-200 bg-green-50 text-green-700",
  flagged: "border-amber-200 bg-amber-50 text-amber-700",
  hidden: "border-slate-200 bg-slate-100 text-slate-700"
};

const mapReviewItem = (review: ReviewModerationApiItem): ReviewModerationItem => {
  const status: ReviewModerationStatus = review.isHidden
    ? "hidden"
    : review.isFlagged
      ? "flagged"
      : "visible";

  return {
    id: review.id,
    userName: review.user?.name ?? "Unknown user",
    workshopName: review.booking?.workshop?.workshopName ?? "Unknown workshop",
    rating: review.rating,
    comment: review.comment,
    status,
    createdAt: formatDate(review.createdAt, "da")
  };
};

export default function ReviewTable() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 700);
  const [page, setPage] = useState(1);
  const [selectedStatuses, setSelectedStatuses] = useState<ReviewModerationStatus[]>([
    "visible",
    "flagged",
    "hidden"
  ]);
  const [activeReview, setActiveReview] = useState<ReviewModerationItem | null>(null);
  const [activeDialog, setActiveDialog] = useState<"view" | "hide" | "delete" | null>(null);
  const [pendingAction, setPendingAction] = useState<"hide" | "delete" | null>(null);

  const selectedStatusParam = selectedStatuses.length === 1 ? selectedStatuses[0] : undefined;

  const { data, isFetching, isError } = useGetReviews({
    page,
    limit: LIMIT,
    searchTerm: debouncedSearchQuery || undefined,
    status: selectedStatusParam
  });
  const { mutate: hideReview } = useHideReview();
  const { mutate: deleteReview } = useDeleteReview();

  const reviews = useMemo(() => (data?.data?.data ?? []).map(mapReviewItem), [data?.data?.data]);

  const total = data?.data?.meta?.total ?? 0;
  const totalPages = Math.max(1, Number(data?.data?.meta?.totalPage ?? 1));
  const currentPage = Math.min(page, totalPages);

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

  const handleDelete = (id: string) => {
    const review = reviews.find((item) => item.id === id);
    if (!review) return;
    setActiveReview(review);
    setActiveDialog("delete");
  };

  const handleCloseDialog = () => {
    setActiveDialog(null);
    setActiveReview(null);
    setPendingAction(null);
  };

  const handleConfirmHide = (id: string) => {
    setPendingAction("hide");
    hideReview(id, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["reviews-manage"] });
        handleCloseDialog();
      },
      onError: () => {
        toast({
          title: "Failed to hide review",
          description: "Please try again.",
          variant: "destructive"
        });
      },
      onSettled: () => setPendingAction(null)
    });
  };

  const handleConfirmDelete = (id: string) => {
    setPendingAction("delete");
    deleteReview(id, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["reviews-manage"] });
        handleCloseDialog();
      },
      onError: () => {
        toast({
          title: "Failed to delete review",
          description: "Please try again.",
          variant: "destructive"
        });
      },
      onSettled: () => setPendingAction(null)
    });
  };

  const handleStatusChange = (status: ReviewModerationStatus, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <>
      <div className="space-y-4">
        <Card className="flex flex-row items-center justify-between gap-3 border-none px-4">
          <CardContent className="w-full flex-1 px-0">
            <SearchBar value={searchQuery} onSearch={handleSearch} />
          </CardContent>
          <CardContent className="border-none px-0">
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
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    Loading reviews...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                    Failed to load reviews. Please try again.
                  </TableCell>
                </TableRow>
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
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
                          ) : review.status === "hidden" ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <AlertTriangle className="h-3 w-3" />
                          )}
                        </span>
                        {review.status === "visible"
                          ? "Visible"
                          : review.status === "hidden"
                            ? "Hidden"
                            : "Flagged"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{review.createdAt}</TableCell>
                    <TableCell>
                      <ReviewActions
                        reviewId={review.id}
                        reviewStatus={review.status}
                        onView={handleView}
                        onHide={handleHide}
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

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {reviews.length} of {total} reviews
          </p>
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isFetching}
          />
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
          isLoading={pendingAction === "hide"}
        />
      )}

      {activeReview && activeDialog === "delete" && (
        <DeleteReviewDialog
          review={activeReview}
          onClose={handleCloseDialog}
          onConfirm={handleConfirmDelete}
          isLoading={pendingAction === "delete"}
        />
      )}
    </>
  );
}
