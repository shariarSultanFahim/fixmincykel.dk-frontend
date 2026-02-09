import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui";

interface FaqItemProps {
  value: string;
  index: number;
  question: string;
  answer: string;
}

export function FaqItem({ value, index, question, answer }: FaqItemProps) {
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <AccordionItem value={value} className="border-b-2 border-muted">
      <AccordionTrigger className="group flex w-full items-center justify-between gap-6 py-6 text-left">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-navy md:text-2xl">
            {formattedIndex}. {question}
          </h3>
        </div>
        <span
          className={cn(
            "relative flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary",
            "text-primary transition-colors duration-200 group-data-[state=open]:bg-primary",
            "group-data-[state=open]:text-white"
          )}
          aria-hidden="true"
        >
          <Plus
            className={cn(
              "absolute h-5 w-5 transition-opacity duration-200",
              "group-data-[state=open]:opacity-0"
            )}
          />
          <Minus
            className={cn(
              "absolute h-5 w-5 opacity-0 transition-opacity duration-200",
              "group-data-[state=open]:opacity-100"
            )}
          />
        </span>
      </AccordionTrigger>
      <AccordionContent
        className={cn(
          "pr-16 pb-6 text-sm text-muted-foreground md:text-base",
          "data-[state=open]:animate-accordion-down data-[state=open]:fade-in-0",
          "data-[state=closed]:animate-accordion-up data-[state=closed]:fade-out-0"
        )}
      >
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}
