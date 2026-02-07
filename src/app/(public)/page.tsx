import Image from "next/image";

import { Header } from "@/components/layouts";

import Hero from "./components/hero/hero";

export default function Home() {
  return (
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
  );
}
