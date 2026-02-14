import Image from "next/image";

import type { MessageDictionary } from "@/types/messages";

import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { faqData } from "@/data/faq";

import { Accordion } from "@/components/ui";

import { FaqItem } from "./item";

export default function Faq() {
  const copy = messages as MessageDictionary;

  return (
    <section className="container space-y-10 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-navy md:text-4xl">
          {getMessage(copy, "Faq.title")}
        </h2>
        <Image
          src="/underline.svg"
          alt=""
          aria-hidden="true"
          width={400}
          height={20}
          className="w-48 sm:w-64 md:w-80 lg:w-96"
        />
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          {getMessage(copy, "Faq.subtitle")}
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqData.map((item, index) => (
          <FaqItem
            key={item.id}
            value={item.id}
            index={index}
            question={getMessage(copy, item.questionKey)}
            answer={getMessage(copy, item.answerKey)}
          />
        ))}
      </Accordion>
    </section>
  );
}
