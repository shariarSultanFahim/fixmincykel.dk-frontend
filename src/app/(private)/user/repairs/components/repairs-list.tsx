"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Eye, Plus, Search, SlidersHorizontal } from "lucide-react";

import { useGetMyJobs } from "@/lib/actions/jobs/my-jobs";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";

import { useDebouncedValue } from "@/hooks";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { TablePagination } from "@/components/widgets";

const PAGE_SIZE = 5;

const statusStyles: Record<string, string> = {
  OPEN: "bg-primary/10 text-navy",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-muted text-muted-foreground",
  PENDING: "bg-amber-100 text-amber-700",
  EXPIRED: "bg-rose-100 text-rose-700"
};

const formatStatus = (status: string) => status.replaceAll("_", " ");

export function RepairsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 500);

  const { data, isLoading, isFetching } = useGetMyJobs({
    page,
    limit: PAGE_SIZE,
    searchTerm: debouncedSearchQuery || undefined
  });

  const jobs = data?.data.result ?? [];
  const meta = data?.data.meta;
  const totalPages = meta?.totalPage ?? 1;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-navy">My Repairs</h1>
          <p className="mt-2 text-muted-foreground">View and manage all your repair requests</p>
        </div>
        <Link href="/user/repairs/new">
          <Button className="gap-2 self-start sm:self-auto">
            <Plus className="size-4" />
            New Repair Request
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="flex flex-row items-center justify-between gap-3">
          <div className="w-full">
            <InputGroup className="bg-muted/60">
              <InputGroupAddon>
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                value={searchQuery}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search repairs..."
              />
            </InputGroup>
          </div>
          <Button variant="outline" className="border-none" disabled>
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {isLoading ? (
          <Card className="rounded-3xl border-none shadow-sm">
            <CardContent className="py-8 text-sm text-muted-foreground">
              Loading repairs...
            </CardContent>
          </Card>
        ) : jobs.length > 0 ? (
          jobs.map((repair) => (
            <Card key={repair.id} className="rounded-3xl border-none shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <CardTitle className="text-sm font-semibold text-navy">{repair.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 font-semibold",
                        statusStyles[repair.status] ?? "bg-muted text-muted-foreground"
                      )}
                    >
                      {formatStatus(repair.status)}
                    </span>
                    <span>Created: {formatDate(repair.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {repair.bikeBrand} {repair.bikeName} • {repair.bikeType}
                  </p>
                  <p className="text-sm text-navy">{repair.city}</p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2"
                  onClick={() => router.push(`/user/repairs/${repair.id}`)}
                >
                  <Eye className="size-4" />
                  View Details
                </Button>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card className="rounded-3xl border-none shadow-sm">
            <CardContent className="py-8 text-sm text-muted-foreground">
              No repairs found.
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {meta ? `Showing ${jobs.length} of ${meta.total} repairs` : ""}
        </p>
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          disabled={isFetching}
        />
      </div>
    </div>
  );
}
