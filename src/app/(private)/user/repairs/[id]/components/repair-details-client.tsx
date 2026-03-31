"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { useGetJobDetails } from "@/lib/actions/jobs/details.job";
import { formatDate } from "@/lib/date";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

import { OffersTable } from "./offers-table";
import { RepairDetailsSkeleton } from "./skeletons";

interface RepairDetailsClientProps {
  repairId: string;
}

const statusStyles: Record<string, string> = {
  OPEN: "bg-primary/10 text-navy",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-muted text-muted-foreground",
  PENDING: "bg-amber-100 text-amber-700",
  EXPIRED: "bg-rose-100 text-rose-700"
};

const formatStatus = (status: string) => status.replaceAll("_", " ");

export function RepairDetailsClient({ repairId }: RepairDetailsClientProps) {
  const { data: jobResponse, isLoading } = useGetJobDetails(repairId);

  if (isLoading) {
    return <RepairDetailsSkeleton />;
  }

  if (!jobResponse?.data) {
    return (
      <div className="space-y-4">
        <Link href="/user/repairs">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Repairs
          </Button>
        </Link>
        <Card className="rounded-3xl border-none shadow-sm">
          <CardContent className="py-10 text-center text-muted-foreground">
            Repair not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  const repair = jobResponse.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-navy">{repair.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Created {formatDate(repair.createdAt)}
          </p>
        </div>
        <Link href="/user/repairs">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="size-4" />
            Back to Repairs
          </Button>
        </Link>
      </div>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base text-navy">Repair Status</CardTitle>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[repair.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {formatStatus(repair.status)}
          </span>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Description</p>
              <p className="text-sm text-navy">{repair.description}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bike</p>
              <p className="text-sm text-navy">
                {repair.bikeBrand} {repair.bikeName} ({repair.bikeType})
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Preferred Time</p>
              <p className="text-sm text-navy">{formatDate(repair.preferredTime)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">Address</p>
              <p className="text-sm text-navy">{repair.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">City</p>
                <p className="text-sm text-navy">{repair.city}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Postal Code</p>
                <p className="text-sm text-navy">{repair.postalCode}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Search Radius</p>
              <p className="text-sm text-navy">{repair.radius} km</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-navy">Photos</CardTitle>
        </CardHeader>
        <CardContent>
          {repair.photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {repair.photos.map((photoUrl, index) => (
                <div
                  key={`${photoUrl}-${index}`}
                  className="overflow-hidden rounded-2xl bg-muted/40"
                >
                  <Image
                    src={photoUrl}
                    alt={`Repair photo ${index + 1}`}
                    width={480}
                    height={300}
                    unoptimized
                    className="h-36 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No photos uploaded for this repair.</p>
          )}
        </CardContent>
      </Card>

      <OffersTable jobId={repairId} />
    </div>
  );
}
