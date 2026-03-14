"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

import type { Category, Job, Status } from "../data/jobs";
import JobActions from "./job-actions";
import ExportCSVButton from "./job-export-csv-button";
import FilterButton from "./job-filter-button";
import JobStatusBadge from "./job-status-badge";
import SearchBar from "./search-bar";

interface WorkshopTableProps {
  initialJobs: Job[];
}

const PAGE_SIZE = 5;

export default function WorkshopTable({ initialJobs }: WorkshopTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
    "pending",
    "booked",
    "completed"
  ]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "brakes",
    "puncture",
    "chain",
    "general-tune-up",
    "e-bike-service"
  ]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      // Filter by status
      if (!selectedStatuses.includes(job.status)) return false;

      // Filter by category
      if (!selectedCategories.includes(job.category)) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return job.jobId.toLowerCase().includes(query) || job.user.toLowerCase().includes(query);
      }

      return true;
    });
  }, [initialJobs, searchQuery, selectedStatuses, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + PAGE_SIZE);

  const handleStatusChange = (status: Status, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
    setPage(1);
  };

  const handleCategoryChange = (category: Category, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleView = (id: string) => {
    router.push(`/admin/jobs/${id}`);
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/jobs/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log("Delete job:", id);
    // TODO: Implement delete job
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar
            value={searchQuery}
            onSearch={handleSearchChange}
            placeholder="Search by job ID or user name..."
          />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton
            selectedStatuses={selectedStatuses}
            selectedCategories={selectedCategories}
            onStatusChange={handleStatusChange}
            onCategoryChange={handleCategoryChange}
          />
          <ExportCSVButton jobs={filteredJobs} />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border py-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="rounded-tl-xl">Job ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead className="">Offers</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.length > 0 ? (
              paginatedJobs.map((job) => (
                <TableRow
                  key={job.jobId}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleRowClick(job.jobId)}
                >
                  <TableCell className="font-medium">{job.jobId}</TableCell>
                  <TableCell>{job.user}</TableCell>
                  <TableCell className="">
                    <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                      {job.category.replace(/-/g, " ")}
                    </span>
                  </TableCell>
                  <TableCell className="">{job.offers}</TableCell>
                  <TableCell className="">
                    <JobStatusBadge status={job.status} />
                  </TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString("da-DK")}</TableCell>
                  <TableCell className="">
                    <div onClick={(e) => e.stopPropagation()}>
                      <JobActions
                        jobId={job.jobId}
                        jobStatus={job.status}
                        onView={handleView}
                        onDelete={handleDelete}
                      />
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
          Showing {paginatedJobs.length} of {filteredJobs.length} jobs
        </p>
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
