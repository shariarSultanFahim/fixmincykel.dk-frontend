"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { useCopy } from "@/hooks/use-copy";

import { Button } from "@/components/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

import { blogsData } from "../explore/data/blogs";

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
    <div className="container flex w-full flex-col gap-8">
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
          {blogsData.map((blog) => (
            <CarouselItem key={blog.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/explore/${blog.slug}`}>
                <article className="overflow-hidden rounded-[14px] border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md">
                  <div className="relative h-36 w-full sm:h-40">
                    <Image src={blog.image} alt={blog.imageAlt} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-navy md:text-base">{blog.title}</h3>
                  </div>
                </article>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
