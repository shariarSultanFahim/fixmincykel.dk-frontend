import Image from "next/image";

import bookingOffer from "@/assets/images/bookingOffer.png";
import receivingOffers from "@/assets/images/receivingOffers.png";
import takingBikePhoto from "@/assets/images/takingBikePhoto.png";

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
    <div className="container my-10 space-y-10">
      <h1 className="flex justify-center text-center">It’s that easy to get repair quotes</h1>
      <div className="flex items-center justify-center">
        <Image
          src="/underline.svg"
          alt="underline"
          width={400}
          height={20}
          className="w-full max-w-xs md:max-w-md lg:max-w-lg"
        />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-3">
        {repairQuotes.map((quote, index) => (
          <RepairQuoteCard
            key={index}
            title={quote.title}
            description={quote.description}
            imageSrc={quote.imageSrc}
            imageAlt={quote.imageAlt}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}
