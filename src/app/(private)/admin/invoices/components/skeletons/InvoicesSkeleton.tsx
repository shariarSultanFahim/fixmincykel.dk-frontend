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

export function ReportToolbarSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-10 w-56" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}

export function ReportSummarySkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Report Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`summary-${index}`} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function WorkshopInvoiceListSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg">Workshop Invoice List</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-gray-50">
              <TableHead>Workshop</TableHead>
              <TableHead>Completed Jobs</TableHead>
              <TableHead>Job Revenue</TableHead>
              <TableHead>Fee (10%)</TableHead>
              <TableHead>Invoice Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 4 }).map((_, index) => (
              <TableRow key={`invoice-row-${index}`} className="border-border">
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function StatusLegendSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`legend-${index}`} className="flex items-start gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
