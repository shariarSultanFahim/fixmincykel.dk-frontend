"use client";

import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { type NewRepair } from "../schema/newRepair.schema";

interface LocationFormProps {
  form: UseFormReturn<NewRepair>;
}

export function LocationForm({ form }: LocationFormProps) {
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("location.latitude", position.coords.latitude);
          form.setValue("location.longitude", position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Location Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-navy">Where are you located?</h3>

        <div className="flex items-center gap-3 rounded-lg bg-secondary-mint/30 p-4">
          <MapPin className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <p className="font-medium text-navy">Use your current location</p>
            <p className="text-sm text-gray-600">We&apos;ll find workshops nearby</p>
          </div>
          <Button
            type="button"
            onClick={handleUseCurrentLocation}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Use GPS
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">Or enter manually</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="location.address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-navy">Street address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nørrebrogade 45"
                    {...field}
                    className="border-gray-200 bg-white text-navy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-navy">City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Copenhagen"
                    {...field}
                    className="border-gray-200 bg-white text-navy"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
