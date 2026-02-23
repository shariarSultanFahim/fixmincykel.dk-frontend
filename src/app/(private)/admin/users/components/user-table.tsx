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

import type { User, UserStatus } from "../data/users";
import ExportCSVButton from "./export-csv-button";
import FilterButton from "./filter-button";
import SearchBar from "./search-bar";
import StatusBadge from "./status-badge";
import UserActions from "./user-actions";

interface UserTableProps {
  initialUsers: User[];
}

export default function UserTable({ initialUsers }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<UserStatus[]>([
    "active",
    "pending",
    "banned"
  ]);

  const filteredUsers = useMemo(() => {
    return initialUsers.filter((user) => {
      // Filter by status
      if (!selectedStatuses.includes(user.status)) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [initialUsers, searchQuery, selectedStatuses]);

  const handleStatusChange = (status: UserStatus, checked: boolean) => {
    setSelectedStatuses((prev) => (checked ? [...prev, status] : prev.filter((s) => s !== status)));
  };

  const handleView = (id: string) => {
    console.log("View user:", id);
    // TODO: Implement view user details
  };

  const handleBan = (id: string) => {
    console.log("Ban user:", id);
    // TODO: Implement ban user
  };

  const handleApprove = (id: string) => {
    console.log("Approve user:", id);
    // TODO: Implement approve user
  };

  const handleReject = (id: string) => {
    console.log("Reject user:", id);
    // TODO: Implement reject user
  };

  const handleUnban = (id: string) => {
    console.log("Unban user:", id);
    // TODO: Implement unban user
  };

  const handleDelete = (id: string) => {
    console.log("Delete user:", id);
    // TODO: Implement delete user
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
          <ExportCSVButton users={filteredUsers} />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border py-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="rounded-tl-xl">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-center">Jobs Created</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="rounded-tr-xl text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-border">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell className="text-center">{user.jobsCreated}</TableCell>
                  <TableCell className="text-center">
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>{user.registered}</TableCell>
                  <TableCell className="text-center">
                    <UserActions
                      userId={user.id}
                      userStatus={user.status}
                      onView={handleView}
                      onBan={handleBan}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onUnban={handleUnban}
                      onDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredUsers.length} of {initialUsers.length} users
      </div>
    </div>
  );
}
