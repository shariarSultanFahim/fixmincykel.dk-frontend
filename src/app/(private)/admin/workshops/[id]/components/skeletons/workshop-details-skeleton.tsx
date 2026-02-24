import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WorkshopDetailsHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
    </div>
  );
}

export function WorkshopInfoSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 shrink-0 rounded" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <Skeleton className="mb-3 h-4 w-32" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-24 rounded-full" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="mb-3 h-4 w-32" />
          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-40" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceMetricsSkeleton() {
  return (
    <Card className="border-primary bg-linear-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-white p-4 sm:p-6"
          >
            <Skeleton className="h-8 w-8 rounded sm:h-10 sm:w-10" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AdminControlsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-32" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkshopDetailsPageSkeleton() {
  return (
    <div className="space-y-6">
      <WorkshopDetailsHeaderSkeleton />
      <div className="space-y-6">
        <WorkshopInfoSkeleton />
        <PerformanceMetricsSkeleton />
        <AdminControlsSkeleton />
      </div>
    </div>
  );
}
