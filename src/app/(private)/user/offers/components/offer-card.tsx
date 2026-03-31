"use client";

import { CheckCircle2, Clock, MapPin, Star } from "lucide-react";

import type { JobOffer } from "@/types/jobs-manage";
import { currencyFormatter } from "@/constants/currency-formatter";

import { useAcceptOffer } from "@/lib/actions/jobs/accept-offer.job";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OfferCardProps {
  offerId: string;
  workshop: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  duration: string;
  availability: string;
  price: number;
  status?: JobOffer["status"];
  canBook?: boolean;
  isBestValue?: boolean;
}

export function OfferCard({
  offerId,
  workshop,
  rating,
  reviewCount,
  distance,
  address,
  duration,
  availability,
  price,
  status,
  canBook = false,
  isBestValue = false
}: OfferCardProps) {
  const { mutate: acceptOffer, isPending: isAccepting } = useAcceptOffer();

  const isPendingOffer = status ? status === "PENDING" : true;
  const isDisabled = !canBook || !isPendingOffer || isAccepting;

  const handleBooking = () => {
    if (!canBook) {
      return;
    }

    acceptOffer(offerId, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Your booking with ${workshop} has been created successfully.`
        });
      },
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : "Failed to create booking";
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage
        });
      }
    });
  };

  return (
    <Card
      className={`relative overflow-hidden border-none shadow-sm ${
        isBestValue ? "border-2 border-primary" : ""
      }`}
    >
      {isBestValue && (
        <div className="absolute top-0 right-0">
          <div className="rounded-bl-lg bg-primary px-4 py-1 text-xs font-semibold text-white">
            Best Value
          </div>
        </div>
      )}

      <div className="space-y-4 p-6">
        {/* Workshop Name */}
        <h3 className="text-lg font-semibold text-navy">{workshop}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-navy">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
        </div>

        {/* Location */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="size-4 shrink-0" />
            <span className="font-medium text-navy">{distance}</span>
          </div>
          <p className="ml-6">{address}</p>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4 shrink-0" />
          <span>{duration}</span>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle2 className="size-4 shrink-0 text-green-600" />
          <span className="font-medium text-green-700">Available: {availability}</span>
        </div>

        {/* Price */}
        <div className="pt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-navy">{currencyFormatter.format(price)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button onClick={handleBooking} disabled={isDisabled} className="w-full">
          {isAccepting
            ? "Booking..."
            : !canBook
              ? "Unavailable"
              : !isPendingOffer
                ? "Already Processed"
                : "Select & Book"}
        </Button>
      </div>
    </Card>
  );
}
