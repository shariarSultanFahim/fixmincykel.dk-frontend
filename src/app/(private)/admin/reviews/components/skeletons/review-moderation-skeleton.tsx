import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export function ReviewTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 7 }).map((_, index) => (
                <TableHead key={`review-head-${index}`}>
                  <Skeleton className="h-4 w-12" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={`review-row-${index}`}>
                {Array.from({ length: 7 }).map((__, cellIndex) => (
                  <TableCell key={`review-cell-${index}-${cellIndex}`}>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Skeleton className="h-4 w-48" />
    </div>
  );
}

export function AdminControlsSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base">Admin Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`admin-control-${index}`} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-64" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
