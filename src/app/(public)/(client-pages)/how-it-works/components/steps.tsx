import Image from "next/image";

import type { MessageDictionary } from "@/types/messages";
import { HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";

import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

export default function Steps() {
  const copy = messages as MessageDictionary;

  return (
    <section className="bg-muted/40 py-10">
      <div className="container">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-navy md:text-4xl">
            {getMessage(copy, "HowItWorksSteps.title")}
          </h2>
          <Image src="/underline.svg" alt="" aria-hidden="true" width={300} height={20} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.titleKey}
                className="flex flex-col items-center gap-4 rounded-[14px] bg-[#F9FFFE] p-6 text-center shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy md:text-xl">
                  {getMessage(copy, item.titleKey as string)}
                </h3>
                <p className="text-sm text-navy/70 md:text-base">
                  {getMessage(copy, item.descriptionKey as string)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
