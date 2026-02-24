import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobDetailsHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-96" />
    </div>
  );
}

export function FullUserSubmissionSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
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
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-20 w-full" />
        </div>

        <div>
          <Skeleton className="mb-3 h-4 w-20" />
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-24 rounded-lg" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function OffersReceivedSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-4 border-b border-border pb-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-48" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-48" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function FullChatHistorySkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border-l-4 border-primary bg-blue-50 p-4">
            <div className="flex items-baseline justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="mt-2 h-3 w-full" />
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
        <Skeleton className="h-9 w-20" />
      </CardContent>
    </Card>
  );
}

export function JobDetailsPageSkeleton() {
  return (
    <div className="space-y-6">
      <JobDetailsHeaderSkeleton />
      <div className="space-y-6">
        <FullUserSubmissionSkeleton />
        <OffersReceivedSkeleton />
        <FullChatHistorySkeleton />
        <AdminActionsSkeleton />
      </div>
    </div>
  );
}
