import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Wrench } from "lucide-react";

import ToolBox from "@/assets/icons/clarity_tools-solid.svg";
import Tools from "@/assets/icons/vaadin_tools.svg";
import eBike from "@/assets/images/e-bike.png";
import tireImage from "@/assets/images/tire.png";

import Title from "../section-title";

export default function NewsTipsMaintenance() {
  return (
    <section className="container space-y-10 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <Title title="News, tips & maintenance" subtitle="" />
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
          aria-label="See all news, tips & maintenance articles"
        >
          <span>See all</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:grid-rows-2">
        {/* card 1 */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-primary p-6 shadow-xl">
          <div className="space-y-4">
            <div className="my-10 flex items-center pb-5">
              <ToolBox
                className="h-20 w-20 rounded-full bg-navy p-2 text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-3xl font-semibold text-white">Bike Maintenance Basics</h3>
            <p className="text-sm text-white">
              Keep your bike running smoothly with a simple routine: tire pressure, chain cleaning,
              brake checks, and quick bolt inspections. These small habits prevent bigger problems
              and help your bike feel fresh every day.
            </p>
          </div>
        </div>

        {/* card 2 */}
        <div className="rounded-3xl bg-[#E2E8F0] shadow-xl">
          <div className="bg-light flex h-full flex-col justify-between rounded-lg p-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image src={tireImage} alt="Tire" className="h-full w-full" />
              </div>
              <h3 className="text-3xl font-semibold text-navy">Fix a Flat Tire Fast</h3>
              <p className="text-sm text-navy">
                Step-by-step tips and when to book a workshop instead.
              </p>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-secondary shadow-xl lg:col-span-3">
          <div className="flex h-full flex-col justify-center gap-10 rounded-3xl bg-secondary p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wrench
                  className="h-20 w-20 rounded-full bg-accent-foreground p-2 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-3xl font-semibold text-navy">Brake Problems Explained</h3>
              <p className="text-sm text-navy">
                Squeaking, rubbing, soft braking, or a lever that feels too loose can mean worn
                pads, dirty rotors, cable issues, or misalignment. Learn the most common causes,
                quick home checks, and when it’s safer to book a workshop.
              </p>
            </div>
            <Link
              href="/news/brake-problems-explained"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* card 4 */}
        <div className="space-y-4 rounded-3xl bg-white shadow-xl lg:row-start-2">
          <Image src={eBike} alt="E-Bike" className="h-auto w-full rounded-t-3xl" />
          <div className="space-y-4 p-6">
            <h3 className="text-3xl font-semibold text-navy">E-Bike Care & Battery Tips</h3>
            <p className="text-sm text-navy">
              Charge smart, store safely, and extend your battery life.
            </p>
          </div>
        </div>

        {/* card 5 */}
        <div
          className="flex flex-col items-center justify-center rounded-3xl shadow-xl lg:col-span-3 lg:row-start-2"
          style={{
            backgroundImage: `url(/tune-up.png)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <div className="flex h-full flex-col justify-center gap-10 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tools
                  className="h-20 w-20 rounded-full bg-secondary p-2 text-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-3xl font-semibold text-white">Best Time for a Tune-Up</h3>
              <p className="text-sm text-white">
                Not sure if you need a service? If shifting feels rough, brakes feel weak, or your
                chain makes noise, it’s time. This checklist helps you catch issues early, avoid
                costly repairs, and choose the right service level for your riding style.
              </p>
            </div>
            <Link
              href="/news/brake-problems-explained"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              <ArrowRight className="h-10 w-10" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* card 6 */}
        <div className="flex flex-col items-center justify-center rounded-3xl bg-navy p-6 shadow-xl lg:col-start-5 lg:row-start-2">
          <div className="space-y-4">
            <div className="my-10 flex items-center pb-5">
              <Tools
                className="h-20 w-20 rounded-full bg-secondary p-2 text-primary"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-3xl font-semibold text-white"> Choosing the Right Workshop</h3>
            <p className="text-sm text-white">
              A good workshop is more than a rating. Learn how to compare pricing, response time,
              service specialties (road, MTB, e-bike), and warranty policies—so you can book with
              confidence and get quality repairs the first time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
