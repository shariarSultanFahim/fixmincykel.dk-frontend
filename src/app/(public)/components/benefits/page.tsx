import Image from "next/image";

import approve from "@/assets/images/approve.png";
import freetouse from "@/assets/images/freeuse.png";
import nosurprise from "@/assets/images/nosurprise.png";
import time from "@/assets/images/time.png";

import { BenefitsCard } from "./card";

export default function Benefits() {
  const benefits = [
    {
      title: "Save nosurprise",
      description: "Stop calling around. Receive quotes from workshops quickly and easily.",
      imageSrc: time,
      imageAlt: "Benefits of getting bike repair quotes online - Save time"
    },
    {
      title: "No surprises",
      description: "Get a fixed price for your repair before you book. No hidden fees.",
      imageSrc: nosurprise,
      imageAlt: "Benefits of getting bike repair quotes online - No surprises"
    },
    {
      title: "Approved workshops",
      description: "All our partners are quality-assured and certified bicycle mechanics.",
      imageSrc: approve,
      imageAlt: "Benefits of getting bike repair quotes online - Approved Workshops"
    },
    {
      title: "Free to use",
      description: "It doesn't cost you a penny to get and compare quotes.",
      imageSrc: freetouse,
      imageAlt: "Benefits of getting bike repair quotes online - Free to use"
    }
  ];

  return (
    <section className="relative container overflow-hidden py-20">
      <Image
        src="/benifitsEllipse.svg"
        alt=""
        aria-hidden="true"
        width={1200}
        height={1200}
        className="pointer-events-none absolute top-1/2 left-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2"
        priority
      />
      <div className="relative z-10 flex flex-col items-center space-y-5">
        <h1 className="text-center">Benefits of getting bike repair quotes online</h1>
        <Image
          src="/underline.svg"
          alt="underline"
          width={400}
          height={20}
          className="w-64 sm:w-80 md:w-96 lg:w-125"
        />
        <p className="text-center text-muted-foreground">
          71% of Danish bike owners have no idea what a bike repair actually costs.
        </p>
        <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitsCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              imageSrc={benefit.imageSrc}
              imageAlt={benefit.imageAlt}
              className="max-w-sm lg:w-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
