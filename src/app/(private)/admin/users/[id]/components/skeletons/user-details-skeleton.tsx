import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserDetailsHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
    </div>
  );
}

export function FullProfileSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 shrink-0 rounded" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function AdminActionsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-32" />
        ))}
      </CardContent>
    </Card>
  );
}

export function JobHistorySkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-4 border-b border-border pb-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function BookingHistorySkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-4 border-b border-border pb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ReviewsSubmittedSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="mt-1 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
              <div className="shrink-0">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function UserDetailsPageSkeleton() {
  return (
    <div className="space-y-6">
      <UserDetailsHeaderSkeleton />
      <div className="space-y-6">
        <FullProfileSkeleton />
        <AdminActionsSkeleton />
        <JobHistorySkeleton />
        <BookingHistorySkeleton />
        <ReviewsSubmittedSkeleton />
      </div>
    </div>
  );
}
