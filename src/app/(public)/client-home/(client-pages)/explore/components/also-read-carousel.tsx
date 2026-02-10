"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ArrowLeft, ArrowRight } from "lucide-react";

import winterBikeImage from "@/assets/images/cycle-beach.jpg";
import eBikeImage from "@/assets/images/cycle-home.jpg";
import workshopImage from "@/assets/images/cycle-workshop.jpg";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "@/components/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

const ALSO_READ_ITEMS = [
  {
    id: "essential-tools",
    titleKey: "alsoRead.cards.essentialTools.title",
    imageAltKey: "alsoRead.cards.essentialTools.imageAlt",
    image: winterBikeImage
  },
  {
    id: "home-repair",
    titleKey: "alsoRead.cards.homeRepair.title",
    imageAltKey: "alsoRead.cards.homeRepair.imageAlt",
    image: eBikeImage
  },
  {
    id: "workshop-setup",
    titleKey: "alsoRead.cards.workshopSetup.title",
    imageAltKey: "alsoRead.cards.workshopSetup.imageAlt",
    image: workshopImage
  },
  {
    id: "workshop-setup-2",
    titleKey: "alsoRead.cards.workshopSetup.title",
    imageAltKey: "alsoRead.cards.workshopSetup.imageAlt",
    image: winterBikeImage
  }
];

export default function AlsoReadCarousel() {
  const { t } = useCopy("Explore");
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="relative flex items-center">
        <div className="flex w-full items-center gap-4 pr-24">
          <span className="h-px flex-1 bg-navy/10" aria-hidden="true" />
          <h2 className="text-base font-semibold text-navy md:text-lg">{t("alsoRead.title")}</h2>
          <span className="h-px flex-1 bg-navy/10" aria-hidden="true" />
        </div>
        <div className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-2">
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label={t("alsoRead.prevAria")}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            aria-label={t("alsoRead.nextAria")}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {ALSO_READ_ITEMS.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <article className="overflow-hidden rounded-[14px] border border-navy/10 bg-white shadow-sm">
                <div className="relative h-36 w-full sm:h-40">
                  <Image src={item.image} alt={t(item.imageAltKey)} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-navy md:text-base">
                    {t(item.titleKey)}
                  </h3>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
