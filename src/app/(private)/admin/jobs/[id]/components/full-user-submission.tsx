import Image from "next/image";

import { Calendar, FileText, User } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Category, JobDetails, Status } from "../../data/jobs";

interface FullUserSubmissionProps {
  user: string;
  category: Category;
  status: Status;
  createdAt: number;
  details?: JobDetails;
}

function getCategoryLabel(category: Category): string {
  const labels: Record<Category, string> = {
    brakes: "Brakes",
    puncture: "Puncture",
    chain: "Chain",
    "general-tune-up": "General Tune-up",
    "e-bike-service": "E-Bike Service"
  };
  return labels[category];
}

function getStatusColor(status: Status): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "completed":
      return "default";
    case "booked":
      return "secondary";
    case "pending":
      return "outline";
    default:
      return "outline";
  }
}

export default function FullUserSubmission({
  user,
  category,
  status,
  createdAt,
  details
}: FullUserSubmissionProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("da-DK", {
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <User className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">User</p>
              <p className="font-medium text-gray-900">{details?.userFullName || user}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <Badge variant="outline" className="mt-1">
                {getCategoryLabel(category)}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-primary text-center text-xs text-white">
              ✓
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge variant={getStatusColor(status)} className="mt-1">
                {status.charAt(0).toUpperCase() + status.slice(1)}
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
        </div>

        {/* Description */}
        {details?.description && (
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-900">Description</p>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-700">{details.description}</p>
            </div>
          </div>
        )}

        {/* Photos */}
        {details?.photos && details.photos.length > 0 && (
          <div>
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Photos ({details.photos.length})
            </p>
            <div className="flex flex-wrap gap-4">
              {details.photos.map((photo) => (
                <Avatar key={photo.id} className="h-24 w-24 rounded-lg">
                  <Image
                    src={photo.url}
                    alt={`Photo ${photo.id}`}
                    width={96}
                    height={96}
                    className="rounded-lg"
                    unoptimized
                  />
                </Avatar>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
