import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FinancialDashboardSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="border-border">
          <CardContent className="flex items-center gap-4 pt-6">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function WorkshopFinancialOverviewSkeleton() {
  return (
    <Card className="border-border">
      <div className="border-b border-border px-6 py-4">
        <Skeleton className="h-6 w-40" />
      </div>
      <CardContent className="p-0">
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-border px-6 py-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-16 rounded" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
