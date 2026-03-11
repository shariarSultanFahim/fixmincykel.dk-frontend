"use client";

import { UseFormReturn } from "react-hook-form";

import DenmarkAddressInput from "@/components/map/DenmarkAddressInput";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { type NewRepair } from "../schema/newRepair.schema";

interface LocationFormProps {
  form: UseFormReturn<NewRepair>;
}

export function LocationForm({ form }: LocationFormProps) {
  const handleAddressSelect = ({
    address,
    latitude,
    longitude
  }: {
    address: string;
    latitude?: number;
    longitude?: number;
  }) => {
    form.setValue("location.address", address, { shouldValidate: true });
    form.setValue("location.latitude", latitude);
    form.setValue("location.longitude", longitude);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-navy">Where are you located?</h3>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="location.address"
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
        </div>
      </div>
    </div>
  );
}
