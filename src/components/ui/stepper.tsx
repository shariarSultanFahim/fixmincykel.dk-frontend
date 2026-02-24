"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("w-full", className)}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "relative flex flex-1 flex-col items-center",
                index !== steps.length - 1 &&
                  "after:absolute after:top-5 after:left-[50%] after:h-0.5 after:w-full after:bg-gray-200"
              )}
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-semibold transition-all",
                  isCompleted && "border-primary bg-primary text-white",
                  isCurrent && "border-primary text-primary",
                  !isCompleted && !isCurrent && "border-gray-300 text-gray-500"
                )}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <span>{stepNumber}</span>}
              </div>

              {/* Step Title */}
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-sm font-medium",
                    (isCompleted || isCurrent) && "text-navy",
                    !isCompleted && !isCurrent && "text-gray-500"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="mt-1 hidden text-xs text-gray-500 sm:block">{step.description}</p>
                )}
              </div>

              {/* Connecting Line */}
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-5 left-[50%] -z-10 h-0.5 w-full transition-all",
                    isCompleted ? "bg-primary" : "bg-gray-200"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
