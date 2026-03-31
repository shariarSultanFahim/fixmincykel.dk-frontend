"use client";

import { useRouter } from "next/navigation";

import type { UserJob, UserJobStatus } from "@/types/users-manage";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface JobHistoryProps {
  jobs: UserJob[];
}

function getJobStatusVariant(
  status: UserJobStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "PENDING":
      return "secondary";
    case "IN_PROGRESS":
      return "outline";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

const jobStatusLabels: Record<UserJobStatus, string> = {
  PENDING: "Pending",
  OPEN: "Open",
  COMPLETED: "Completed",
  IN_PROGRESS: "In Progress",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired"
};

export default function JobHistory({ jobs }: JobHistoryProps) {
  const router = useRouter();

  return (
    <Card className="gap-2 border-border pt-4 pb-0">
      <CardHeader className="px-4">
        <CardTitle>Full Job History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Job Title</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer border-border hover:bg-gray-50"
                  onClick={() => router.push(`/admin/jobs/${job.id}`)}
                >
                  <TableCell className="font-medium text-primary">{job.title || job.id}</TableCell>
                  <TableCell>{job.urgency}</TableCell>
                  <TableCell>
                    <Badge variant={getJobStatusVariant(job.status)}>
                      {jobStatusLabels[job.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(job.createdAt).toLocaleDateString("da-DK")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                  No job history
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
