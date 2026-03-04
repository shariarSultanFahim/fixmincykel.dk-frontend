"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { REPAIR_CATEGORIES_WITH_ICONS } from "../constants";
import { type NewRepair } from "../schema/newRepair.schema";

interface BikeDetailsFormProps {
  form: UseFormReturn<NewRepair>;
}

export function BikeDetailsForm({ form }: BikeDetailsFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details.categories"
  });

  const handleCategorySelect = (categoryValue: string) => {
    const isSelected = fields.some((field) => field.category === categoryValue);

    if (isSelected) {
      const index = fields.findIndex((field) => field.category === categoryValue);
      remove(index);
    } else {
      append({ category: categoryValue, description: "" });
    }
  };

  const isCategorySelected = (categoryValue: string) => {
    return fields.some((field) => field.category === categoryValue);
  };

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
          <p className="text-sm text-gray-600">Select all that apply</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {REPAIR_CATEGORIES_WITH_ICONS.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => handleCategorySelect(category.value)}
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border-2 bg-secondary-mint/30 p-4 transition hover:border-primary",
                  isCategorySelected(category.value)
                    ? "border-primary bg-primary/10"
                    : "border-gray-200"
                )}
              >
                <div className="mb-2 text-4xl">{category.icon}</div>
                <span className="text-center text-sm font-medium text-navy">{category.label}</span>
              </button>
            ))}
          </div>
          <FormMessage>{form.formState.errors.details?.categories?.message}</FormMessage>
        </div>

        {/* Description inputs for selected categories */}
        {fields.length > 0 && (
          <div className="space-y-4 rounded-lg bg-muted/50 p-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`details.categories.${index}.description`}
                render={({ field: descField }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-navy">
                      Describe the{" "}
                      {REPAIR_CATEGORIES_WITH_ICONS.find((c) => c.value === fields[index].category)
                        ?.label || "problem"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the problem"
                        {...descField}
                        className="border-gray-200 bg-white text-navy placeholder-gray-400"
                      />
                    </FormControl>
                    <div className="text-xs text-gray-500">
                      {descField.value?.length || 0}/500 - Minimum 10 characters
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
