"use client";

import Image from "next/image";

import { HOW_IT_WORKS_STATS } from "@/constants/how-it-works";

import VisionImage from "@/assets/images/yellow-cycle.jpg";

import { useCopy } from "@/hooks/use-copy";

export default function Vision() {
  const { t } = useCopy("HowItWorksVision");

  return (
    <section className="bg-[#F9FFFE] py-10 md:py-14">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
          <figure className="relative h-full w-full overflow-hidden">
            <Image
              src={VisionImage}
              alt={t("imageAlt")}
              className="h-full w-full object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-secondary/70 mix-blend-multiply"
              aria-hidden="true"
            />
            <figcaption className="sr-only">{t("imageCaption")}</figcaption>
          </figure>

          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="text-2xl font-bold text-navy md:text-4xl">{t("title")}</h2>
            <p className="text-base leading-relaxed text-navy/80 md:text-lg">{t("body")}</p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {HOW_IT_WORKS_STATS.map((item) => (
                <div
                  key={item.valueKey}
                  className="flex flex-col gap-1 border-primary/30 sm:border-l sm:pl-4 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="text-xl font-bold text-primary md:text-2xl">
                    {t(item.valueKey)}
                  </span>
                  <span className="text-sm font-semibold text-navy/70">{t(item.labelKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
