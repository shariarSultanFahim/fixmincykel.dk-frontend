"use client";

import { useState } from "react";
import Link from "next/link";

import { CheckCircle, GitCompare, Star } from "lucide-react";

import type { JobOffer } from "@/types/jobs-manage";

import { useAcceptOffer } from "@/lib/actions/jobs/accept-offer.job";
import { useGetJobOffers } from "@/lib/actions/jobs/offers.job";

import { toast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { TablePagination } from "@/components/widgets";

const PAGE_SIZE = 10;

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700"
};

const currencyFormatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK"
});

interface OffersTableProps {
  jobId: string;
}

export function OffersTable({ jobId }: OffersTableProps) {
  const [page, setPage] = useState(1);
  const { data: offersResponse, isLoading, isError } = useGetJobOffers(jobId, page, PAGE_SIZE);
  const { mutate: acceptOffer, isPending: isAccepting } = useAcceptOffer();

  const offers = offersResponse?.data?.data ?? [];
  const meta = offersResponse?.data?.meta;
  const totalPages = Math.max(1, meta?.totalPage ?? 1);
  const currentPage = Math.min(page, totalPages);

  if (isError) {
    return (
      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="py-10 text-center text-muted-foreground">
          Failed to load offers. Please try again.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-3xl border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle className="text-base text-navy">
            Offers from Workshops ({meta?.total ?? 0})
          </CardTitle>
          <Link href={`/user/offers?jobId=${jobId}`}>
            <Button size="sm" variant="outline" className="gap-2">
              <GitCompare className="size-4" />
              Compare Offers
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="rounded-tl-xl">Workshop</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Estimated Time</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Best Value</TableHead>
                <TableHead className="rounded-tr-xl text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-8 text-center text-gray-500">
                    Loading offers...
                  </TableCell>
                </TableRow>
              ) : offers.length > 0 ? (
                offers.map((offer: JobOffer) => (
                  <TableRow key={offer.id} className="border-border hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {offer.workshop?.workshopName || "N/A"}
                    </TableCell>
                    <TableCell className="text-sm">
                      <div className="space-y-0.5">
                        <p>{offer.workshop?.email}</p>
                        <p className="text-muted-foreground">{offer.workshop?.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {currencyFormatter.format(offer.price)}
                    </TableCell>
                    <TableCell className="text-sm">{offer.estimatedTime}</TableCell>
                    <TableCell className="max-w-xs text-sm text-muted-foreground">
                      <p className="line-clamp-2">{offer.message}</p>
                    </TableCell>
                    <TableCell className="text-sm">{offer.distance} km</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="size-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">
                          {offer.workshop?.avgRating.toFixed(1) ?? "0.0"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({offer.workshop?.reviewsCount ?? 0})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${statusStyles[offer.status] ?? "bg-muted text-muted-foreground"}`}
                        variant="outline"
                      >
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {offer.isBestValue ? (
                        <Badge className="bg-primary/10 text-primary" variant="outline">
                          ✓ Best Value
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant={offer.status === "PENDING" ? "default" : "outline"}
                        disabled={offer.status !== "PENDING" || isAccepting}
                        onClick={() => {
                          acceptOffer(offer.id, {
                            onSuccess: () => {
                              toast({
                                title: "Success",
                                description: "Offer accepted successfully"
                              });
                            },
                            onError: (error) => {
                              const errorMessage =
                                error instanceof Error ? error.message : "Failed to accept offer";
                              toast({
                                variant: "destructive",
                                title: "Error",
                                description: errorMessage
                              });
                            }
                          });
                        }}
                        className="gap-1"
                      >
                        <CheckCircle className="size-4" />
                        {isAccepting ? "Accepting..." : "Accept"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="py-8 text-center text-gray-500">
                    No offers available yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}
