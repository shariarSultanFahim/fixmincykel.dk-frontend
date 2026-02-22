import type { MessageDictionary } from "@/types/messages";

import { getMessage } from "@/helpers/messages";
import messages from "@/messages/en.json";

import { faqData } from "@/data/faq";

import { Accordion } from "@/components/ui";

import Title from "../section-title";
import { FaqItem } from "./item";

export default function Faq() {
  const copy = messages as MessageDictionary;

  return (
    <section className="container space-y-10 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <Title title={getMessage(copy, "Faq.title")} subtitle={getMessage(copy, "Faq.subtitle")} />
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
