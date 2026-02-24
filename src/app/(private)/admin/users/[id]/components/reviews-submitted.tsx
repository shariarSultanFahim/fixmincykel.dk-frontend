import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Review } from "../../data/users";

interface ReviewsSubmittedProps {
  reviews: Review[];
}

export default function ReviewsSubmitted({ reviews }: ReviewsSubmittedProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-border pt-6 pb-0">
      <CardHeader className="border-b border-border">
        <CardTitle>Reviews Submitted</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-0">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b border-border px-6 pb-4 last:border-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{review.workshop}</h4>
                  <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                  <p className="mt-2 text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="shrink-0">{renderStars(review.rating)}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-gray-500">No reviews submitted</p>
        )}
      </CardContent>
    </Card>
  );
}
