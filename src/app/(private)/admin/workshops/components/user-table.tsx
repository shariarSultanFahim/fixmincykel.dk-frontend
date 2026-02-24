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

import { WorkshopStatus, type Workshop } from "../data/workshop";
import ExportCSVButton from "./export-csv-button";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";
import StatusBadge from "./status-badge";
import WorkshopActions from "./workshop-actions";

interface WorkshopTableProps {
  initialWorkshops: Workshop[];
}

export default function WorkshopTable({ initialWorkshops }: WorkshopTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<WorkshopStatus[]>([
    "approved",
    "pending"
  ]);

  const filteredWorkshops = useMemo(() => {
    return initialWorkshops.filter((workshop) => {
      // Filter by status
      if (!selectedStatuses.includes(workshop.status)) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          workshop.name.toLowerCase().includes(query) ||
          workshop.owner.toLowerCase().includes(query) ||
          workshop.email.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [initialWorkshops, searchQuery, selectedStatuses]);

  const handleStatusChange = (status: WorkshopStatus, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  };

  const handleView = (id: string) => {
    router.push(`/admin/workshops/${id}`);
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/workshops/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit workshop:", id);
    // TODO: Implement edit workshop
  };

  const handleSuspend = (id: string) => {
    console.log("Suspend workshop:", id);
    // TODO: Implement suspend workshop
  };

  const handleReactivate = (id: string) => {
    console.log("Reactivate workshop:", id);
    // TODO: Implement reactivate workshop
  };

  const handleReview = (id: string) => {
    console.log("Review workshop:", id);
    // TODO: Implement review workshop
  };

  const handleApprove = (id: string) => {
    console.log("Approve workshop:", id);
    // TODO: Implement approve workshop
  };

  const handleReject = (id: string) => {
    console.log("Reject workshop:", id);
    // TODO: Implement reject workshop
  };

  const handleDelete = (id: string) => {
    console.log("Delete workshop:", id);
    // TODO: Implement delete workshop
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton selectedStatuses={selectedStatuses} onStatusChange={handleStatusChange} />
          <ExportCSVButton workshops={filteredWorkshops} />
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
              <TableHead className="">Rating</TableHead>
              <TableHead className="">Jobs</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkshops.length > 0 ? (
              filteredWorkshops.map((workshop) => (
                <TableRow
                  key={workshop.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleRowClick(workshop.id)}
                >
                  <TableCell className="font-medium">{workshop.name}</TableCell>
                  <TableCell>{workshop.owner}</TableCell>
                  <TableCell>{workshop.email}</TableCell>
                  <TableCell className="">⭐ {workshop.rating}</TableCell>
                  <TableCell className="">{workshop.jobs}</TableCell>
                  <TableCell className="">
                    <StatusBadge status={workshop.status} />
                  </TableCell>
                  <TableCell className="">
                    <div onClick={(e) => e.stopPropagation()}>
                      <WorkshopActions
                        workshopId={workshop.id}
                        workshopStatus={workshop.status}
                        onView={handleView}
                        onEdit={handleEdit}
                        onSuspend={handleSuspend}
                        onReactivate={handleReactivate}
                        onReview={handleReview}
                        onApprove={handleApprove}
                        onReject={handleReject}
                        onDelete={handleDelete}
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
      <div className="text-sm text-gray-600">
        Showing {filteredWorkshops.length} of {initialWorkshops.length} workshops
      </div>
    </div>
  );
}
