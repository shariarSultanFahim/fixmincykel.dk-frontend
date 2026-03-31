"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import type { UserManageStatus } from "@/types/users-manage";

import { useBanUser, useUnbanUser } from "@/lib/actions/users/ban-unban.user";
import { useGetUsers } from "@/lib/actions/users/get.users";

import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useToast } from "@/hooks/use-toast";

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
import { TableBodySkeletonRows } from "./skeletons";
import StatusBadge from "./status-badge";
import UserActions from "./user-actions";

const LIMIT = 10;

export default function UserTable() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");
  const searchQuery = useDebouncedValue(searchInput, 700);
  const [page, setPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<UserManageStatus | undefined>(undefined);

  const { data, isFetching, isError } = useGetUsers({
    searchTerm: searchQuery || undefined,
    status: selectedStatus,
    page,
    limit: LIMIT
  });
  const { mutate: banUser } = useBanUser();
  const { mutate: unbanUser } = useUnbanUser();

  const users = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(1, Number(meta?.totalPage ?? 1));
  const currentPage = Math.min(page, totalPages);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleStatusChange = (status?: UserManageStatus) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handleView = (id: string) => {
    router.push(`/admin/users/${id}`);
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/users/${id}`);
  };

  const handleBan = (id: string) => {
    banUser(id, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast({
          title: "Failed to ban user",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  const handleUnban = (id: string) => {
    unbanUser(id, {
      onSuccess: (result) => {
        toast({ title: result.message });
        queryClient.invalidateQueries({ queryKey: ["users-manage"] });
      },
      onError: () => {
        toast({
          title: "Failed to unban user",
          description: "Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <Card className="flex flex-col gap-3 border-none sm:flex-row sm:items-center sm:justify-between">
        <CardContent className="flex-1">
          <SearchBar value={searchInput} onSearch={handleSearch} />
        </CardContent>
        <CardContent className="flex gap-2">
          <FilterButton selectedStatus={selectedStatus} onStatusChange={handleStatusChange} />
          <ExportCSVButton searchTerm={searchQuery || undefined} status={selectedStatus} />
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
              <TableHead>Jobs Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="rounded-tr-xl">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <TableBodySkeletonRows count={LIMIT} />
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                  Failed to load users. Please try again.
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => handleRowClick(user.id)}
                >
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user._count.jobs}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString("da-DK")}</TableCell>
                  <TableCell>
                    <div onClick={(e) => e.stopPropagation()}>
                      <UserActions
                        userId={user.id}
                        userStatus={user.status}
                        onView={handleView}
                        onBan={handleBan}
                        onUnban={handleUnban}
                      />
                    </div>
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

      {/* Footer: summary + pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {users.length} of {total} users
        </p>
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
