"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";

import { useGetCategories } from "@/lib/actions/jobs/get.categories";
import { cn } from "@/lib/utils";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { BIKE_TYPE_OPTIONS } from "../schema/information.schema";
import { type NewRepair } from "../schema/newRepair.schema";

interface BikeDetailsFormProps {
  form: UseFormReturn<NewRepair>;
}

export function BikeDetailsForm({ form }: BikeDetailsFormProps) {
  const { data: categoriesResponse } = useGetCategories();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details.categories"
  });

  const categories = categoriesResponse?.data.data ?? [];

  const handleCategorySelect = (categoryId: string) => {
    const isSelected = fields.some((field) => field.categoryId === categoryId);

    if (isSelected) {
      const index = fields.findIndex((field) => field.categoryId === categoryId);
      remove(index);
    } else {
      append({ categoryId, description: "" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Bike Information */}
      <div className="space-y-4">
        {/* <FormField
          control={form.control}
          name="details.repairIssue"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-navy">
                Repair request title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="E.g. Brake check and chain lubrication"
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
          name="details.repairDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold text-navy">Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue in detail"
                  {...field}
                  className="border-gray-200 bg-white text-navy placeholder-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
                <select
                  {...field}
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-navy"
                >
                  <option value="">Select bike type</option>
                  {BIKE_TYPE_OPTIONS.map((bikeType) => (
                    <option key={bikeType} value={bikeType}>
                      {bikeType}
                    </option>
                  ))}
                </select>
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
            {categories.map((category) => {
              const fieldIndex = fields.findIndex((field) => field.categoryId === category.id);
              const isSelected = fieldIndex !== -1;

              return (
                <div key={category.id} className="">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className={cn(
                      "flex w-full flex-col items-center justify-center rounded-lg border-2 bg-secondary-mint/30 p-4 transition hover:border-primary",
                      isSelected ? "border-primary bg-primary/10" : "border-gray-200"
                    )}
                  >
                    <div className="mb-2 text-4xl">🚲</div>
                    <span className="text-center text-sm font-medium text-navy">
                      {category.name}
                    </span>
                  </button>
                  {/* Description inputs for selected categories */}
                  {isSelected && (
                    <FormField
                      control={form.control}
                      name={`details.categories.${fieldIndex}.description`}
                      render={({ field: descField }) => (
                        <FormItem className="mt-4">
                          <FormLabel className="text-base font-semibold text-navy">
                            Describe the problem
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us what's wrong with your bike be as detailed as possible."
                              {...descField}
                              className="border-gray-200 bg-white text-navy placeholder-gray-400"
                            />
                          </FormControl>
                          <div className="text-xs text-gray-500">
                            {descField.value?.length || 0}/500 - Required
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {!categories.length && (
            <p className="text-sm text-gray-500">No categories available right now.</p>
          )}
          <FormMessage>{form.formState.errors.details?.categories?.message}</FormMessage>
        </div>
      </div>
    </div>
  );
}
