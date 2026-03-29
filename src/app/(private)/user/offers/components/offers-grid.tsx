"use client";

import { useMemo } from "react";

import type { JobOffer } from "@/types/jobs-manage";

import { useGetJobOffers } from "@/lib/actions/jobs/offers.job";

import { Skeleton } from "@/components/ui/skeleton";

import { OfferCard } from "./offer-card";

interface Offer {
  id: string;
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

const STATIC_OFFERS: Offer[] = [
  {
    id: "1",
    offerId: "1",
    workshop: "City Cycle Fix",
    rating: 4.8,
    reviewCount: 142,
    distance: "0.8 km away",
    address: "Vesterbrogade 15, 1620 Kobenhavn V",
    duration: "2-3 hours",
    availability: "Tomorrow, 10:00",
    price: 300,
    canBook: false,
    isBestValue: true
  },
  {
    id: "2",
    offerId: "2",
    workshop: "Copenhagen Bike Repair",
    rating: 4.9,
    reviewCount: 234,
    distance: "1.2 km away",
    address: "Nørrebrogade 42, 2200 Kobenhavn N",
    duration: "3-4 hours",
    availability: "Today, 15:00",
    price: 350,
    canBook: false
  },
  {
    id: "3",
    offerId: "3",
    workshop: "Quick Bike Service",
    rating: 4.5,
    reviewCount: 89,
    distance: "2.1 km away",
    address: "Amagerbrogade 88, 2300 Kobenhavn S",
    duration: "1-2 hours",
    availability: "Tomorrow, 09:00",
    price: 400,
    canBook: false
  }
];

interface OffersGridProps {
  jobId?: string | null;
}

export function OffersGrid({ jobId }: OffersGridProps) {
  const { data: offersResponse, isLoading } = useGetJobOffers(jobId || "", 1, 100, Boolean(jobId));

  const offers = useMemo(() => {
    if (jobId && offersResponse?.data?.data) {
      return offersResponse.data.data.map((offer: JobOffer) => ({
        id: offer.id,
        offerId: offer.id,
        workshop: offer.workshop?.workshopName || "Unknown Workshop",
        rating: offer.workshop?.avgRating || 0,
        reviewCount: offer.workshop?.reviewsCount || 0,
        distance: `${offer.distance} km away`,
        address: offer.workshop?.address || "N/A",
        duration: offer.estimatedTime || "N/A",
        availability: "Available",
        price: offer.price,
        status: offer.status,
        canBook: true,
        isBestValue: offer.isBestValue
      }));
    }
    return STATIC_OFFERS;
  }, [jobId, offersResponse]);

  if (jobId && isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-64" />
        ))}
      </div>
    );
  }

  if (jobId && offers.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-16">
        <p className="text-center text-muted-foreground">No Offers Received Yet</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  );
}
