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

import type { Job, JobStatus } from "../../data/users";

interface JobHistoryProps {
  jobs: Job[];
}

function getJobStatusColor(status: JobStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "in-progress":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
}

export default function JobHistory({ jobs }: JobHistoryProps) {
  return (
    <Card className="gap-2 border-border pt-4 pb-0">
      <CardHeader className="px-4">
        <CardTitle>Full Job History</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead>Job ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <TableRow key={job.id} className="border-border">
                  <TableCell className="font-medium text-primary">{job.id}</TableCell>
                  <TableCell>{job.category}</TableCell>
                  <TableCell>
                    <Badge variant={getJobStatusColor(job.status)}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{job.created}</TableCell>
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
