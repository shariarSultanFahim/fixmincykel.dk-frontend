"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

import type { ArticleItem } from "@/types/article";

import articleImage1 from "@/assets/images/article-image.jpg";
import cycleBeachImage from "@/assets/images/cycle-beach.jpg";
import cycleWorkshopImage from "@/assets/images/cycle-workshop.jpg";

import { useCopy } from "@/hooks/use-copy";
import articleData from "@/data/about-articles.json";

import { Button } from "@/components/ui";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

const ARTICLE_IMAGES = {
  "yellow-cycle": articleImage1,
  "cycle-beach": cycleBeachImage,
  "cycle-workshop": cycleWorkshopImage
} satisfies Record<string, StaticImageData>;

export default function Article() {
  const { t } = useCopy("AboutArticle");
  const articles = articleData as ArticleItem[];
  const [api, setApi] = useState<CarouselApi | null>(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      // setCurrentIndex(api.selectedScrollSnap());
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

  // const { previousArticle, nextArticle } = useMemo(() => {
  //   return {
  //     previousArticle: currentIndex > 0 ? articles[currentIndex - 1] : null,
  //     nextArticle: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
  //   };
  // }, [articles, currentIndex]);

  return (
    <section className="container py-10">
      <input
        type="text"
        placeholder="Search articles..."
        className="mb-5 w-full flex-1 rounded-md border border-primary bg-white px-4 py-2 focus:ring focus:ring-primary/50 md:w-auto"
      />
      <Carousel setApi={setApi} opts={{ align: "start" }}>
        <CarouselContent>
          {articles.map((article) => {
            const image = ARTICLE_IMAGES[article.imageId as keyof typeof ARTICLE_IMAGES];

            return (
              <CarouselItem key={article.id}>
                <article className="overflow-hidden rounded-[14px] bg-white shadow-sm">
                  <div className="relative">
                    <Image
                      src={image}
                      alt={t(article.imageAltKey)}
                      className="h-64 w-full object-cover md:h-105"
                      priority={article.id === articles[0]?.id}
                    />
                    <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
                    <div className="absolute top-1/3 left-3 flex flex-col items-start justify-center gap-4 lg:left-6">
                      <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
                        {t(article.tagKey)}
                      </div>
                      <div className="flex flex-col items-start justify-center text-white">
                        <h1 className="text-xl leading-tight font-bold text-white md:text-4xl lg:text-6xl">
                          {t(article.titleKey)}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-white/80">
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                            {t(article.readTimeKey)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                            {t(article.dateKey)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-8">
                    <p className="border-l-2 border-primary/70 pl-4 text-sm text-navy/70 md:text-base">
                      {t(article.introKey)}
                    </p>

                    <div className="mt-6 space-y-6">
                      {article.sections.map((section, index) => (
                        <div key={section.titleKey} className="space-y-2">
                          <h3 className="text-base font-bold text-navy md:text-lg">
                            <span className="mr-2 text-primary">{index + 1}.</span>
                            {t(section.titleKey)}
                          </h3>
                          <p className="text-sm text-navy/70 md:text-base">{t(section.bodyKey)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-row items-center justify-between gap-4 border-t border-navy/10 pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        className="justify-start px-0 text-left text-navy hover:bg-transparent"
                        onClick={() => api?.scrollPrev()}
                        disabled={!canScrollPrev}
                        aria-label={t("nav.previousAria")}
                      >
                        <div className="flex items-center gap-3">
                          <ArrowLeft className="h-4 w-4 text-primary" aria-hidden="true" />
                          {/* <div>
                            <p className="text-xs font-semibold text-primary">
                              {t("nav.previous")}
                            </p>
                            <p className="text-sm font-semibold text-navy">
                              {previousArticle ? t(previousArticle.titleKey) : ""}
                            </p>
                          </div> */}
                        </div>
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="justify-end px-0 text-right text-navy hover:bg-transparent"
                        onClick={() => api?.scrollNext()}
                        disabled={!canScrollNext}
                        aria-label={t("nav.nextAria")}
                      >
                        <div className="flex items-center gap-3">
                          {/* <div>
                            <p className="text-xs font-semibold text-primary">{t("nav.next")}</p>
                            <p className="text-sm font-semibold text-navy">
                              {nextArticle ? t(nextArticle.titleKey) : ""}
                            </p>
                          </div> */}
                          <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
