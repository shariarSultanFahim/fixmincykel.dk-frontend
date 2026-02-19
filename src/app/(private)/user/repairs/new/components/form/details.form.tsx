"use client";

import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from "@/components/ui/combobox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { REPAIR_CATEGORIES } from "../constants";
import { type NewRepair } from "../schema/newRepair.schema";

interface DetailsFormProps {
  form: UseFormReturn<NewRepair>;
}

export function DetailsForm({ form }: DetailsFormProps) {
  const urgencies = [
    { label: "Low", description: "Can wait a week or more" },
    { label: "Medium", description: "Within a few days" },
    { label: "High", description: "As soon as possible" }
  ];

  return (
    <Card className="border-0 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-navy">Repair Details</h3>
        </div>

        <FormField
          control={form.control}
          name="details.repairIssue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">
                What needs to be repaired? <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <input
                  placeholder="e.g., Gear Problem, Brake Squeaking, Flat Tire"
                  {...field}
                  className="mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-navy placeholder-gray-400 shadow-sm transition focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-navy">
                Category <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Combobox value={field.value} onValueChange={field.onChange}>
                  <ComboboxInput
                    placeholder="Select category..."
                    className="mt-1 w-full"
                    showClear
                  />
                  <ComboboxContent>
                    <ComboboxList>
                      {REPAIR_CATEGORIES.map((category: string) => (
                        <ComboboxItem key={category} value={category}>
                          {category}
                        </ComboboxItem>
                      ))}
                      <ComboboxEmpty>No category found.</ComboboxEmpty>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="details.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">
                Description <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the problem in detail. When did it start? How often does it happen? Any unusual sounds or behaviors?"
                  {...field}
                  className="mt-1 min-h-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-navy placeholder-gray-400 shadow-sm transition focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Urgency Field - Not in schema but shown in design */}
        <FormField
          control={form.control}
          name="details.urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">
                Urgency <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="mt-2 grid grid-cols-3 gap-3">
                  {urgencies.map((urgency) => (
                    <button
                      key={urgency.label}
                      type="button"
                      onClick={() => field.onChange(urgency.label)}
                      className={cn(
                        "rounded-lg border-2 px-3 py-4 text-center transition",
                        field.value === urgency.label
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      )}
                    >
                      <div className="font-medium text-navy">{urgency.label}</div>
                      <div className="text-xs text-gray-600">{urgency.description}</div>
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
