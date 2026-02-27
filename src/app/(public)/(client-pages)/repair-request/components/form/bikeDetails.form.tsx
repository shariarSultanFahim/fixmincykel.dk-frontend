"use client";

import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { REPAIR_CATEGORIES_WITH_ICONS } from "../constants";
import { type NewRepair } from "../schema/newRepair.schema";

interface BikeDetailsFormProps {
  form: UseFormReturn<NewRepair>;
}

export function BikeDetailsForm({ form }: BikeDetailsFormProps) {
  return (
    <div className="space-y-6">
      {/* Bike Information */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="information.whichBike"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-navy">
                Give your bike a name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. My Road Bike, City Cruiser, etc."
                  {...field}
                  className="border-gray-200 bg-white text-navy placeholder-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information.bikeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-navy">Bike type</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. Road Bike, Mountain Bike, City Bike"
                  {...field}
                  className="border-gray-200 bg-white text-navy placeholder-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="information.bikeBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-navy">Bike Brand</FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. Trek, Giant, Specialized"
                  {...field}
                  className="border-gray-200 bg-white text-navy placeholder-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-navy">What&apos;s wrong with your bike?</h3>
          <p className="text-sm text-gray-600">Select category</p>
        </div>

        <FormField
          control={form.control}
          name="details.category"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {REPAIR_CATEGORIES_WITH_ICONS.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => field.onChange(category.value)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg border-2 bg-secondary-mint/30 p-4 transition hover:border-primary",
                        field.value === category.value
                          ? "border-primary bg-primary/10"
                          : "border-gray-200"
                      )}
                    >
                      <div className="mb-2 text-4xl">{category.icon}</div>
                      <span className="text-center text-sm font-medium text-navy">
                        {category.label}
                      </span>
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
