import { Card, CardContent, CardHeader } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";

export function CalendarPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-10 w-56" />
        <Skeleton className="h-10 w-40" />
      </div>
      <Card className="rounded-3xl border-none">
        <CardHeader className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
