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

export default function Home() {
  return (
    <section>
      <section className="relative overflow-hidden">
        <Image
          src="/HeroEllipse.svg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          className="pointer-events-none absolute top-1/2 left-0 hidden h-auto w-1/2 -translate-y-1/2 md:block md:w-[60%] lg:w-[65%]"
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
