import Link from "next/link";

import { Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface RatingProps {
  score: number;
  reviews: number;
  reportUrl: string;
}

export function RatingCard({ score, reviews, reportUrl }: RatingProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-2">
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-navy">{score}</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        <p className="text-sm text-navy/70">Based on {reviews} reviews</p>
        <Link href={reportUrl} className="text-sm font-medium text-primary hover:underline">
          View Full Report →
        </Link>
      </CardContent>
    </Card>
  );
}
