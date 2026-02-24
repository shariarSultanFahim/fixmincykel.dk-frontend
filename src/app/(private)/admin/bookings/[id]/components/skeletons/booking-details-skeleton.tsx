import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookingInformationSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="mt-1 h-5 w-5 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function WorkshopDetailsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="mt-1 h-5 w-5 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-56" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function UserDetailsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="mt-1 h-5 w-5 shrink-0 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ServiceDetailsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}
