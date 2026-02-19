import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FiltersBarSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function JobCardSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-56" />
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-9 w-24" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(4)].map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
