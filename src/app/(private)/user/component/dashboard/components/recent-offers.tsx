"use client";

import type { JobOffer } from "@/types/jobs-manage";
import { currencyFormatter } from "@/constants/currency-formatter";

import { useGetUserOffers } from "@/lib/actions/offers/user-offers";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentOffers() {
  const { data: allOffers = [], isLoading } = useGetUserOffers();
  const offers = allOffers.slice(0, 3);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
          <span>💼</span> Recent Offers
        </h2>
        <Card className="border-0 shadow-sm">
          <div className="px-6 py-4">
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-12 w-full rounded" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <span>💼</span> Recent Offers
      </h2>
      <Card className="border-0 shadow-sm">
        <div className="px-6">
          <div className="space-y-2">
            {offers.length > 0 ? (
              offers.map((offer: JobOffer, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-navy">
                      {offer.workshop?.workshopName || "Unknown Workshop"}
                    </p>
                    <p className="text-xs text-muted-foreground">Repair Offer</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">
                    {currencyFormatter.format(Number(offer.price || 0))}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">No offers yet</p>
            )}
          </div>

          {/* <Link
            href="/user/offers"
            className="mt-4 inline-block w-full text-sm font-medium text-primary hover:underline"
          >
            <Button variant="outline" className="w-full text-primary">
              View All Offers →
            </Button>
          </Link> */}
        </div>
      </Card>
    </div>
  );
}
