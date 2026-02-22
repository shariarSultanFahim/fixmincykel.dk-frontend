import approve from "@/assets/images/approve.png";
import freetouse from "@/assets/images/freeuse.png";
import nosurprise from "@/assets/images/nosurprise.png";
import time from "@/assets/images/time.png";

import Title from "../section-title";
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
    <div className="flex flex-col items-center space-y-5">
      <Title
        title="Benefits of getting bike repair quotes online"
        subtitle="71% of Danish bike owners have no idea what a bike repair actually costs."
      />
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
  );
}
