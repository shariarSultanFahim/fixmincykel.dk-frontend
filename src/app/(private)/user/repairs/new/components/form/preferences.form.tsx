"use client";

import { UseFormReturn } from "react-hook-form";

import DenmarkAddressInput from "@/components/map/DenmarkAddressInput";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type NewRepair } from "../schema/newRepair.schema";

interface PreferencesFormProps {
  form: UseFormReturn<NewRepair>;
}

const extractPostalCode = (address: string) => {
  const match = address.match(/(?:,\s*)?(\d{4})\s+[^,]+$/);
  return match?.[1] ?? "";
};

export function PreferencesForm({ form }: PreferencesFormProps) {
  const handleAddressSelect = ({
    address,
    latitude,
    longitude
  }: {
    address: string;
    latitude?: number;
    longitude?: number;
  }) => {
    form.setValue("preferences.address", address, { shouldValidate: true });
    const postalCode = extractPostalCode(address);

    if (postalCode) {
      form.setValue("preferences.postalCode", postalCode, { shouldValidate: true });
    }

    form.setValue("preferences.maximumDistance", "5", { shouldValidate: true });

    if (typeof latitude === "number" && typeof longitude === "number") {
      form.setValue(
        "location",
        {
          latitude,
          longitude
        },
        { shouldValidate: true }
      );
    }
  };
  return (
    <Card className="border-0 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-navy">Preferences</h3>
        </div>

        <FormField
          control={form.control}
          name="preferences.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">Address</FormLabel>
              <FormControl>
                <DenmarkAddressInput
                  value={field.value}
                  onChange={field.onChange}
                  onSelect={handleAddressSelect}
                  placeholder="Nørrebrogade 45, 2200 København N"
                />
              </FormControl>
              <p className="text-sm text-gray-600">
                Search and select your address to help us find nearby workshops.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferences.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter 4-digit postal code"
                  {...field}
                  inputMode="numeric"
                  maxLength={4}
                  className="mt-1 border-gray-200 bg-white text-navy placeholder-gray-400 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="preferences.maximumDistance"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-navy">Maximum Distance</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter maximum distance in km"
                  {...field}
                  type="number"
                  className="mt-1 border-gray-200 bg-white text-navy placeholder-gray-400 shadow-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </Card>
  );
}
