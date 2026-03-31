import { Skeleton } from "@/components/ui/skeleton";

export function RepairDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="rounded-3xl bg-muted/50 p-6">
        <Skeleton className="h-5 w-28" />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={`repair-detail-${index}`} className="h-12 w-full" />
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-muted/50 p-6">
        <Skeleton className="h-5 w-20" />
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={`repair-photo-${index}`} className="h-36 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
