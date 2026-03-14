import Image from "next/image";

import { Bike, Calendar, MapPin, User } from "lucide-react";

import type { AdminJobDetails, JobStatus } from "@/types/jobs-manage";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FullUserSubmissionProps {
  job: AdminJobDetails;
}

function getStatusColor(status: JobStatus): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "COMPLETED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "PENDING":
      return "secondary";
    case "OPEN":
      return "outline";
    case "EXPIRED":
      return "destructive";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

export default function FullUserSubmission({ job }: FullUserSubmissionProps) {
  const formattedDate = new Date(job.createdAt).toLocaleDateString("da-DK", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Full User Submission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <User className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">User ID</p>
              <p className="font-medium text-gray-900">{job.userId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Bike className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Bike</p>
              <Badge variant="outline" className="mt-1">
                {`${job.bikeBrand} ${job.bikeName} (${job.bikeType})`}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-primary text-center text-xs text-white">
              ✓
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant={getStatusColor(job.status)} className="mt-1">
                {job.status.replaceAll("_", " ")}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Created</p>
              <p className="font-medium text-gray-900">{formattedDate}</p>
            </div>
          </div>

          <div className="col-span-2 flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-medium text-gray-900">{`${job.address}, ${job.postalCode} ${job.city}`}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {job.description && (
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">Description</p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-700">{job.description}</p>
            </div>
          </div>
        )}

        {/* Photos */}
        {job.photos.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">Photos ({job.photos.length})</p>
            <div className="flex flex-wrap gap-4">
              {job.photos.map((photo, index) => (
                <figure key={photo} className="h-24 w-24 overflow-hidden rounded-lg">
                  <Image
                    src={photo}
                    alt={`Job photo ${index + 1}`}
                    width={96}
                    height={96}
                    className="h-full w-full rounded-lg object-cover"
                    unoptimized
                  />
                </figure>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
