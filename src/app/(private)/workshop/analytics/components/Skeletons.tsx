import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCardSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-2 pt-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
      </CardContent>
    </Card>
  );
}

export function RevenueTrendChartSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-80 w-full" />
      </CardContent>
    </Card>
  );
}

export function JobsByCategoryChartSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-80 w-full rounded-full" />
      </CardContent>
    </Card>
  );
}

export function RatingCardSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-16" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded" />
            ))}
          </div>
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </CardContent>
    </Card>
  );
}
