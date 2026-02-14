import Image from "next/image";

import type { MessageDictionary } from "@/types/messages";
import { HOW_IT_WORKS_SIMPLE_STEPS } from "@/constants/how-it-works";

import cycleWheel from "@/assets/images/cycle-wheel.jpg";
import personInCycleShop from "@/assets/images/person-in-cycle-shop.jpg";
import personTalkingOnPhone from "@/assets/images/person-talking-on-phone.jpg";
import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

export default function SimpleProcess() {
  const copy = messages as MessageDictionary;
  const [primaryStep] = HOW_IT_WORKS_SIMPLE_STEPS;

  return (
    <section className="bg-[#ECFBF8] py-10">
      <div className="container">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-navy md:text-4xl">
            {getMessage(copy, "HowItWorksSimpleProcess.title")}
          </h2>
          <Image src="/underline.svg" alt="" aria-hidden="true" width={300} height={20} />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <article className="relative overflow-hidden bg-white shadow-sm lg:col-span-1">
            <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              1
            </span>
            <Image
              src={personTalkingOnPhone}
              alt={getMessage(copy, primaryStep.imageAltKey)}
              className="h-72 w-full object-cover lg:h-320"
              priority
            />
            <div className="flex flex-col items-center gap-2 px-6 pt-4 pb-6 text-center">
              <h3 className="text-lg font-bold text-navy md:text-xl">
                {getMessage(copy, primaryStep.titleKey)}
              </h3>
              <p className="text-sm text-navy/70 lg:text-base">
                {getMessage(copy, primaryStep.descriptionKey)}
              </p>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-2">
            <article className="relative overflow-hidden bg-white shadow-sm">
              <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                2
              </span>
              <Image
                src={cycleWheel}
                alt={getMessage(copy, "HowItWorksSimpleProcess.steps.receive.imageAlt")}
                className="h-72 w-full object-cover lg:h-150"
              />
              <div className="flex flex-col items-center gap-2 px-6 pt-4 pb-6 text-center">
                <h3 className="text-lg font-bold text-navy md:text-xl">
                  {getMessage(copy, "HowItWorksSimpleProcess.steps.receive.title")}
                </h3>
                <p className="text-sm text-navy/70 md:text-base">
                  {getMessage(copy, "HowItWorksSimpleProcess.steps.receive.description")}
                </p>
              </div>
            </article>
            <article className="relative overflow-hidden bg-white shadow-sm">
              <span className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                3
              </span>
              <Image
                src={personInCycleShop}
                alt={getMessage(copy, "HowItWorksSimpleProcess.steps.choose.imageAlt")}
                className="h-72 w-full object-cover lg:h-150"
              />
              <div className="flex flex-col items-center gap-2 px-6 pt-4 pb-6 text-center">
                <h3 className="text-lg font-bold text-navy md:text-xl">
                  {getMessage(copy, "HowItWorksSimpleProcess.steps.choose.title")}
                </h3>
                <p className="text-sm text-navy/70 md:text-base">
                  {getMessage(copy, "HowItWorksSimpleProcess.steps.choose.description")}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
