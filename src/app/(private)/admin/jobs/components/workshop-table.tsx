"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type { JobStatus } from "@/types/jobs-manage";

import { useGetJobs } from "@/lib/actions/jobs/get.jobs";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { TablePagination } from "@/components/widgets";

import JobActions from "./job-actions";
import ExportCSVButton from "./job-export-csv-button";
import JobFilterButton from "./job-filter-button";
import JobStatusBadge from "./job-status-badge";
import SearchBar from "./search-bar";

const PAGE_SIZE = 10;

export default function WorkshopTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<JobStatus | undefined>(undefined);

  const { data, isLoading } = useGetJobs({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchQuery || undefined,
    status: statusFilter
  });

  const jobs = data?.data.data ?? [];
  const meta = data?.data.meta;
  const totalPages = meta ? Math.max(1, Math.ceil(meta.total / meta.limit)) : 1;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusFilterChange = (status: JobStatus | undefined) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleView = (id: string) => {
    router.push(`/admin/jobs/${id}`);
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/jobs/${id}`);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar
            value={searchQuery}
            onSearch={handleSearchChange}
            placeholder="Search by job title or user name..."
          />
        </CardContent>
        <CardContent className="flex gap-2">
          <JobFilterButton
            selectedStatus={statusFilter}
            onStatusChange={handleStatusFilterChange}
          />
          <ExportCSVButton />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border py-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="rounded-tl-xl">Title</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Bike</TableHead>
              <TableHead>Offers</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  Loading jobs...
                </TableCell>
              </TableRow>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleRowClick(job.id)}
                >
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.user.name}</TableCell>
                  <TableCell>{`${job.bikeBrand} ${job.bikeName}`}</TableCell>
                  <TableCell>{job.offers.length}</TableCell>
                  <TableCell>
                    <JobStatusBadge status={job.status} />
                  </TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString("da-DK")}</TableCell>
                  <TableCell>
                    <div onClick={(e) => e.stopPropagation()}>
                      <JobActions jobId={job.id} onView={handleView} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  No jobs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {meta ? `Showing ${jobs.length} of ${meta.total} jobs` : ""}
        </p>
        <TablePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
