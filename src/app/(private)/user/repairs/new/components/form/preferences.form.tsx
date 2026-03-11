"use client";

import { UseFormReturn } from "react-hook-form";

import DenmarkAddressInput from "@/components/map/DenmarkAddressInput";
import { Checkbox } from "@/components/ui";
import { Card } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type NewRepair } from "../schema/newRepair.schema";

interface PreferencesFormProps {
  form: UseFormReturn<NewRepair>;
}

export function PreferencesForm({ form }: PreferencesFormProps) {
  const handleAddressSelect = ({ address }: { address: string }) => {
    form.setValue("preferences.address", address, { shouldValidate: true });
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
        />

        <FormField
          control={form.control}
          name="preferences.receiveSmsNotifications"
          render={({ field }) => (
            <FormItem className="flex items-start space-y-0 space-x-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
              </FormControl>
              <div className="grow">
                <FormLabel className="cursor-pointer text-sm font-medium text-navy">
                  Receive SMS notifications
                </FormLabel>
                <p className="text-xs text-gray-600">
                  Get updates about offers and booking confirmations
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
