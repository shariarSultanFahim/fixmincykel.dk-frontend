import Image from "next/image";

import { Footer, Header } from "@/components/layouts";

import BecomePartner from "./components/become-partner/page";
import Benefits from "./components/benefits/page";
import Faq from "./components/faq/page";
import Feedback from "./components/feedback/page";
import Hero from "./components/hero/hero";
import NewsTipsMaintenance from "./components/news-tips-maintenance/page";
import RepairQuotes from "./components/repair-quotes/page";
import WorkshopLocationMap from "./components/workshopLocationMap/page";

export default function ClientHome() {
  return (
    <section>
      <section className="relative overflow-hidden">
        <Image
          src="/HeroEllipse.svg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          className="pointer-events-none absolute top-2/3 right-1/2 hidden h-auto w-[70%] -translate-y-2/3 md:block"
          priority
        />
        <section className="relative z-10">
          <Header />
          <section className="flex flex-col items-center justify-center">
            <div>
              <Hero />
            </div>
          </section>
        </section>
      </section>
      <RepairQuotes />
      <Benefits />
      <Feedback />
      <WorkshopLocationMap />
      <NewsTipsMaintenance />
      <Faq />
      <BecomePartner />
      <Footer />
    </section>
  );
}
