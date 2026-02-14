import Image from "next/image";

import type { MessageDictionary } from "@/types/messages";

import workingImage from "@/assets/images/working.png";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { partnerBenefitsData } from "@/data/partner-benefits";

import { Button } from "@/components/ui";

import { BenefitItem } from "./benefit-item";

export default function BecomePartner() {
  const copy = messages as MessageDictionary;

  return (
    <section className="relative z-10 -mb-10">
      <div className="container">
        <div className="rounded-[14px] bg-primary p-6 shadow-subtle md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <figure className="w-full">
              <div className="rounded-[14px]">
                <Image
                  src={workingImage}
                  alt={getMessage(copy, "Partner.imageAlt")}
                  className="h-full w-full rounded-[18px] object-cover lg:p-10"
                />
              </div>
              <figcaption className="sr-only">
                {getMessage(copy, "Partner.imageCaption")}
              </figcaption>
            </figure>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wide text-primary uppercase">
                  {getMessage(copy, "Partner.kicker")}
                </p>
                <h2 className="text-3xl font-bold text-navy md:text-4xl">
                  {getMessage(copy, "Partner.title")}
                </h2>
                <p className="text-sm text-white md:text-base">
                  {getMessage(copy, "Partner.subtitle")}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {partnerBenefitsData.map((benefit) => (
                  <BenefitItem key={benefit.id} label={getMessage(copy, benefit.labelKey)} />
                ))}
              </div>
              <Button
                variant="outline"
                className="border-primary/40 bg-secondary text-navy hover:bg-secondary hover:text-navy"
              >
                {getMessage(copy, "Partner.cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
