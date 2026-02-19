import { Skeleton } from "@/components/ui/skeleton";

export function MyRepairsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-44" />
      </div>

      <div className="rounded-3xl bg-muted/50 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`repair-skeleton-${index}`} className="rounded-3xl bg-muted/50 p-6">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="mt-3 h-3 w-44" />
            <Skeleton className="mt-2 h-3 w-32" />
            <Skeleton className="mt-4 h-8 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
