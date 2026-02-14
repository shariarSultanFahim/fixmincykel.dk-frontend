import Link from "next/link";

import type { MessageDictionary } from "@/types/messages";

import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { Button } from "@/components/ui";

export default function Hero() {
  const copy = messages as MessageDictionary;

  return (
    <section className="py-10">
      <div className="container">
        <div
          className="border-nav grid items-stretch gap-6 rounded-[14px] border-2 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10"
          style={{
            backgroundImage: `url(/black-cycle.jpg)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="flex flex-col justify-center gap-5 py-40">
            <h1 className="text-3xl leading-tight font-bold text-white md:text-5xl">
              {getMessage(copy, "HowItWorksHero.title")}
            </h1>
            <p className="text-base leading-relaxed text-white/80 md:text-lg">
              {getMessage(copy, "HowItWorksHero.subtitle")}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="border-primary/40 bg-primary text-white hover:border hover:border-white hover:bg-transparent hover:text-white"
              >
                <Link href="/client-home">{getMessage(copy, "HowItWorksHero.ctaPrimary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-white bg-transparent text-white hover:border-primary/40 hover:bg-primary hover:text-white"
              >
                <Link href="/service-home">{getMessage(copy, "HowItWorksHero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
