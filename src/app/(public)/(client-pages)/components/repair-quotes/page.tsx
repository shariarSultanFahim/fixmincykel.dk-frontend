import bookingOffer from "@/assets/images/bookingOffer.png";
import receivingOffers from "@/assets/images/receivingOffers.png";
import takingBikePhoto from "@/assets/images/takingBikePhoto.png";

import Title from "../section-title";
import { RepairQuoteCard } from "./card";

export default function RepairQuotes() {
  const repairQuotes = [
    {
      title: "Submit your repair task",
      description: "Show us what’s wrong with your bike",
      imageSrc: takingBikePhoto,
      imageAlt: "Repair quote"
    },
    {
      title: "You will recive offers",
      description: "Local workshops send you their best offers.",
      imageSrc: receivingOffers,
      imageAlt: "Repair quote"
    },
    {
      title: "Book the best offer",
      description: "Choose the best match and book instantly",
      imageSrc: bookingOffer,
      imageAlt: "Repair quote"
    }
  ];

  return (
    <div className="container space-y-5 py-20">
      <Title title="It’s that easy to get repair quotes" subtitle="" />
      <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
        {repairQuotes.map((quote, index) => (
          <RepairQuoteCard
            key={index}
            title={quote.title}
            description={quote.description}
            imageSrc={quote.imageSrc}
            imageAlt={quote.imageAlt}
            className="w-full max-w-sm"
          />
        ))}
      </div>
    </div>
  );
}
