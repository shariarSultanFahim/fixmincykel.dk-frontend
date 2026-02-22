"use client";

import { OfferCard } from "./offer-card";

interface Offer {
  id: string;
  workshop: string;
  rating: number;
  reviewCount: number;
  distance: string;
  address: string;
  duration: string;
  availability: string;
  price: number;
  isBestValue?: boolean;
}

export function OffersGrid() {
  const offers: Offer[] = [
    {
      id: "1",
      workshop: "City Cycle Fix",
      rating: 4.8,
      reviewCount: 142,
      distance: "0.8 km away",
      address: "Vesterbrogade 15, 1620 Kobenhavn V",
      duration: "2-3 hours",
      availability: "Tomorrow, 10:00",
      price: 300,
      isBestValue: true
    },
    {
      id: "2",
      workshop: "Copenhagen Bike Repair",
      rating: 4.9,
      reviewCount: 234,
      distance: "1.2 km away",
      address: "Nørrebrogade 42, 2200 Kobenhavn N",
      duration: "3-4 hours",
      availability: "Today, 15:00",
      price: 350
    },
    {
      id: "3",
      workshop: "Quick Bike Service",
      rating: 4.5,
      reviewCount: 89,
      distance: "2.1 km away",
      address: "Amagerbrogade 88, 2300 Kobenhavn S",
      duration: "1-2 hours",
      availability: "Tomorrow, 09:00",
      price: 400
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}
    </div>
  );
}
