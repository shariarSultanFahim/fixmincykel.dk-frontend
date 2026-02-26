"use client";

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
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <nav aria-label="Progress" className={cn("w-full space-y-4", className)}>
      {/* Step Labels */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex-1 text-center text-sm font-medium transition-colors",
                isCurrent ? "text-primary" : "text-gray-400"
              )}
            >
              {step.title}
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step Counter */}
      <div className="text-center text-sm text-gray-600">
        Step {currentStep} of {steps.length}
      </div>
    </nav>
  );
}
