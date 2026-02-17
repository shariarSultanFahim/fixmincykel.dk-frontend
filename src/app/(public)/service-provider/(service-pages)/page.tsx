import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";

import { Dashboard } from "./components/dashboard";
import ServiceHero from "./components/hero/hero";
import HowItWorks from "./components/how-it-works/page";
import WhyWorkshopLovesUs from "./components/whyWorkshopLovesUs/why-us";

export default function ServiceHome() {
  return (
    <section className="">
      <ServiceHero />
      <WhyWorkshopLovesUs />
      <HowItWorks />
      <Dashboard />
      <section className="relative container flex min-h-105 items-center justify-center overflow-hidden py-0 md:py-10 lg:py-72">
        <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
          <h1>Join 100+ Workshops Already Growing Their Business</h1>
          <Link href="/service-provider/register" className="w-72">
            <Button variant="default" className="w-full">
              Sign up your workshop
            </Button>
          </Link>
          <p className="font-medium">No setup fees • First month free • Cancel anytime</p>
        </div>
        <Image
          src="/bgEllipse.svg"
          alt=""
          aria-hidden="true"
          width={1000}
          height={1000}
          className="pointer-events-none absolute top-1/2 block h-auto w-full -translate-y-1/2 md:w-[60%] lg:w-[65%]"
          priority
        />
      </section>
    </section>
  );
}
