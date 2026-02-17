"use client";

import { SERVICE_PROVIDER_HOW_IT_WORKS_STEPS } from "@/constants/how-it-works";

import { HowItWorkCard } from "./component";

export default function HowItWorks() {
  return (
    <div className="container space-y-12 py-16">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-navy">
          How It Works in <span className="text-primary">6</span> Simple Steps
        </h1>
      </div>

      {/* Steps Grid */}
      <div className="mx-auto max-w-4xl space-y-8">
        {SERVICE_PROVIDER_HOW_IT_WORKS_STEPS.map((step, index) => (
          <HowItWorkCard
            key={step.title}
            number={index + 1}
            image={step.image}
            title={step.title!}
            description={step.description!}
            isAlternate={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}
