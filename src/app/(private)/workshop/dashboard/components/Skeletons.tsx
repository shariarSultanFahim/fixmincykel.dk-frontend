import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex-1">
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-10 w-10 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-24" />
        <Skeleton className="mt-2 h-3 w-16" />
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  const heights = ["60%", "80%", "70%", "90%", "50%", "40%", "30%"];

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent>
        <div className="flex h-64 items-end justify-between gap-4 px-2">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="flex w-full flex-col items-center justify-end"
                style={{ height: "200px" }}
              >
                <Skeleton className="w-full rounded-t-lg" style={{ height: heights[index] }} />
              </div>
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentActivitySkeleton() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <Skeleton className="h-6 w-36" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start gap-3">
              <Skeleton className="mt-1 h-2 w-2 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-1 h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="mt-6 h-4 w-32" />
      </CardContent>
    </Card>
  );
}
