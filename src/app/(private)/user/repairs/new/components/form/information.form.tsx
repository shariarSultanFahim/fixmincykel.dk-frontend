"use client";

import { UseFormReturn } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type NewRepair } from "../schema/newRepair.schema";

interface InformationFormProps {
  form: UseFormReturn<NewRepair>;
}

export function InformationForm({ form }: InformationFormProps) {
  return (
    <Card className="border-0 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-navy">Bike Information</h3>
        </div>

        <FormField
          control={form.control}
          name="information.whichBike"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">
                Which bike? <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter bike name or model"
                  {...field}
                  className="mt-1 border-gray-200 bg-white text-navy placeholder-gray-400 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="information.bikeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-navy">
                  Bike Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Mountain Bike, Road Bike"
                    {...field}
                    className="mt-1 border-gray-200 bg-white text-navy placeholder-gray-400 shadow-sm"
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
                <FormLabel className="text-sm font-medium text-navy">
                  Brand <span className="text-gray-500">(Optional)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Canyon, Trek, Specialized"
                    {...field}
                    className="mt-1 border-gray-200 bg-white text-navy placeholder-gray-400 shadow-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
