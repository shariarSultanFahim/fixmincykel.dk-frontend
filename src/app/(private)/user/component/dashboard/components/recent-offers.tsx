"use client";

import Link from "next/link";

import { currencyFormatter } from "@/constants/currency-formatter";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function RecentOffers() {
  const offers = [
    {
      workshop: "Copenhagen Bike Repair",
      type: "Gear repair",
      price: "350"
    },
    {
      workshop: "City Cycle Fix",
      type: "Gear repair",
      price: "300"
    },
    {
      workshop: "Quick Bike Service",
      type: "Gear repair",
      price: "400"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-navy">
        <span>💼</span> Recent Offers
      </h2>
      <Card className="border-0 shadow-sm">
        <div className="px-6">
          <div className="space-y-2">
            {offers.map((offer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-3 last:border-0"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy">{offer.workshop}</p>
                  <p className="text-xs text-muted-foreground">{offer.type}</p>
                </div>
                <p className="text-sm font-semibold text-primary">
                  {currencyFormatter.format(Number(offer.price))}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/user/offers"
            className="mt-4 inline-block w-full text-sm font-medium text-primary hover:underline"
          >
            <Button variant="outline" className="w-full text-primary">
              View All Offers →
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
