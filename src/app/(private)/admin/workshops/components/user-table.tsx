"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import type { WorkshopApprovalStatus } from "@/types/workshop-manage";

import { useApproveWorkshop } from "@/lib/actions/workshops/approve.workshop";
import { useGetWorkshops } from "@/lib/actions/workshops/get.workshops";
import { useRejectWorkshop } from "@/lib/actions/workshops/reject.workshop";
import { useSuspendWorkshop } from "@/lib/actions/workshops/suspend.workshop";
import { useUnsuspendWorkshop } from "@/lib/actions/workshops/unsuspend.workshop";

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

import ExportCSVButton from "./export-csv-button";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";
import StatusBadge from "./status-badge";
import WorkshopActions from "./workshop-actions";

const PAGE_SIZE = 10;

export default function WorkshopTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<WorkshopApprovalStatus | undefined>(undefined);

  const { data, isLoading } = useGetWorkshops({
    page,
    limit: PAGE_SIZE,
    searchTerm: searchQuery || undefined,
    approvalStatus: statusFilter
  });

  const workshops = data?.data.data ?? [];
  const meta = data?.data.meta;
  const totalPages = meta?.totalPage ?? 1;

  const approveMutation = useApproveWorkshop();
  const rejectMutation = useRejectWorkshop();
  const suspendMutation = useSuspendWorkshop();
  const unsuspendMutation = useUnsuspendWorkshop();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["workshops-manage"] });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleStatusFilterChange = (status: WorkshopApprovalStatus | undefined) => {
    setStatusFilter(status);
    setPage(1);
  };

  const handleView = (id: string) => router.push(`/admin/workshops/${id}`);
  const handleRowClick = (id: string) => router.push(`/admin/workshops/${id}`);

  const handleSuspend = async (id: string) => {
    try {
      const res = await suspendMutation.mutateAsync(id);
      toast.success(res.message || "Workshop suspended.");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to suspend workshop."
      );
    }
  };

  const handleUnsuspend = async (id: string) => {
    try {
      const res = await unsuspendMutation.mutateAsync(id);
      toast.success(res.message || "Workshop unsuspended.");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to unsuspend workshop."
      );
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await approveMutation.mutateAsync(id);
      toast.success(res.message || "Workshop approved.");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to approve workshop."
      );
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await rejectMutation.mutateAsync(id);
      toast.success(res.message || "Workshop rejected.");
      invalidate();
    } catch (error) {
      toast.error(
        isAxiosError(error) ? error.response?.data?.message : "Failed to reject workshop."
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchQuery} onSearch={handleSearchChange} />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton selectedStatus={statusFilter} onStatusChange={handleStatusFilterChange} />
          <ExportCSVButton />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border py-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="rounded-tl-xl">Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  Loading workshops...
                </TableCell>
              </TableRow>
            ) : workshops.length > 0 ? (
              workshops.map((workshop) => (
                <TableRow
                  key={workshop.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleRowClick(workshop.id)}
                >
                  <TableCell className="font-medium">{workshop.workshopName}</TableCell>
                  <TableCell>{workshop.ownerName}</TableCell>
                  <TableCell>{workshop.email}</TableCell>
                  <TableCell>{workshop.city}</TableCell>
                  <TableCell>{workshop._count.jobs}</TableCell>
                  <TableCell>
                    <StatusBadge status={workshop.approvalStatus} />
                  </TableCell>
                  <TableCell>
                    <div onClick={(e) => e.stopPropagation()}>
                      <WorkshopActions
                        workshopId={workshop.id}
                        workshopStatus={workshop.approvalStatus}
                        onView={handleView}
                        onSuspend={handleSuspend}
                        onUnsuspend={handleUnsuspend}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  No workshops found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {meta ? `Showing ${workshops.length} of ${meta.total} workshops` : ""}
        </p>
        <TablePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
