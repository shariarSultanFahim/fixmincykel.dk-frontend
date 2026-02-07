import Image from "next/image";

import type { MessageDictionary } from "@/types/messages";

import HeroImage from "@/assets/images/hero-image.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Button } from "@/components/ui";

export default function Hero() {
  const copy = messages as MessageDictionary;
  return (
    <section>
      <div className="container flex flex-col-reverse justify-between md:flex-row">
        <div className="flex flex-col items-start justify-center gap-4 md:w-1/2">
          <h1
            style={{ fontSize: "clamp(30px, 8vw - 1rem, 56px)" }}
            className="leading-tight font-bold text-navy"
          >
            {getMessage(copy, "Hero.title")}
          </h1>
          <p
            style={{ fontSize: "clamp(16px, 2vw, 18px)" }}
            className="leading-relaxed text-muted-foreground"
          >
            {getMessage(copy, "Hero.subtitle")}
          </p>
          <Button>{getMessage(copy, "Hero.ctaPrimary")}</Button>
        </div>
        <div className="flex items-center justify-end md:w-1/2">
          <Image
            src={HeroImage}
            alt={getMessage(copy, "Hero.imageAlt")}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="border-[#E2E8F0 ] mt-12 mb-4 grid grid-cols-2 gap-8 border-b md:justify-between md:gap-4 lg:grid-cols-4">
        <div className="flex items-center gap-3 p-6">
          <Image
            src="/jobsCompleted.svg"
            width={50}
            height={50}
            alt="Jobs Completed Icon"
            unoptimized
          />
          <div>
            <span className="text-2xl font-bold text-navy">
              {getMessage(copy, "Stats.jobsCompleted")}
            </span>
            <p className="text-sm text-navy">{getMessage(copy, "Stats.jobsCompletedText")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-6">
          <Image
            src="/verifiedWorkshop.svg"
            width={50}
            height={50}
            alt="Verified Workshops Icon"
            unoptimized
          />
          <div>
            <span className="text-2xl font-bold text-navy">
              {getMessage(copy, "Stats.verifiedWorkshops")}
            </span>
            <p className="text-sm text-navy">{getMessage(copy, "Stats.verifiedWorkshopsText")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-6">
          <Image src="/rating.svg" width={50} height={50} alt="Rating Icon" unoptimized />
          <div>
            <span className="text-2xl font-bold text-navy">
              {getMessage(copy, "Stats.averageRating")}
            </span>
            <p className="text-sm text-navy">{getMessage(copy, "Stats.averageRatingText")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-6">
          <Image
            src="/serviceReq.svg"
            width={50}
            height={50}
            alt="Service Requests Icon"
            unoptimized
          />
          <div>
            <span className="text-2xl font-bold text-navy">
              {getMessage(copy, "Stats.serviceRequests")}
            </span>
            <p className="text-sm text-navy">{getMessage(copy, "Stats.serviceRequestsText")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
