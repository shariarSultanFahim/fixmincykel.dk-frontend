"use client";

import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import type { Category, Job, Status } from "../data/jobs";
import JobActions from "./job-actions";
import ExportCSVButton from "./job-export-csv-button";
import FilterButton from "./job-filter-button";
import JobStatusBadge from "./job-status-badge";
import SearchBar from "./search-bar";

interface WorkshopTableProps {
  initialJobs: Job[];
}

export default function WorkshopTable({ initialJobs }: WorkshopTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleStatusChange = (status: Status, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  };

  const handleCategoryChange = (category: Category, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  const handleView = (id: string) => {
    console.log("View job:", id);
    // TODO: Implement view job details
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
            onSearch={setSearchQuery}
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
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.jobId} className="border-border">
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
                    <JobActions
                      jobId={job.jobId}
                      jobStatus={job.status}
                      onView={handleView}
                      onDelete={handleDelete}
                    />
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
      <div className="text-sm text-gray-600">
        Showing {filteredJobs.length} of {initialJobs.length} jobs
      </div>
    </div>
  );
}
