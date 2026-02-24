"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";

import { useToast } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { newRepairSchema, type NewRepair } from "../schema/newRepair.schema";
import { DateTimeForm } from "./dateTime.form";
import { DetailsForm } from "./details.form";
import { InformationForm } from "./information.form";
import { PhotoForm } from "./photo.form";
import { PreferencesForm } from "./preferences.form";

// 1. Dynamically import the map with SSR disabled
const LocationPicker = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100 w-full animate-pulse rounded bg-gray-100">Loading Map...</div>
  )
});
export function NewRepairForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewRepair>({
    resolver: zodResolver(newRepairSchema) as unknown as Resolver<NewRepair>,
    defaultValues: {
      details: {
        repairIssue: "",
        category: "",
        description: "",
        urgency: "Medium"
      },
      information: {
        whichBike: "",
        bikeType: "",
        bikeBrand: ""
      },
      photos: {
        photos: []
      },
      dateTime: {
        preferredDate: undefined as unknown as Date,
        preferredTime: "",
        customTime: ""
      },
      preferences: {
        preferredLocation: "",
        maximumDistance: "",
        receiveSmsNotifications: false
      },
      location: {
        latitude: 0,
        longitude: 0
      }
    }
  });

  async function onSubmit(data: NewRepair) {
    setIsSubmitting(true);

    try {
      console.log("Repair Request Data:", data);

      toast({
        title: "Success",
        description: "Your repair request has been submitted successfully!"
      });

      // Reset form after successful submission
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit repair request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    console.log("Parent received location:", lat, lng);
    form.setValue("location", { latitude: lat, longitude: lng });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Details Section */}
        <DetailsForm form={form} />

        {/* Information Section */}
        <InformationForm form={form} />

        {/* Photo Section */}
        <PhotoForm form={form} />

        {/* DateTime Section */}
        <DateTimeForm form={form} />

        {/* Preferences Section */}
        <PreferencesForm form={form} />

        <LocationPicker onLocationSelect={handleLocationSelect} />

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="g flex-1">
            {isSubmitting ? "Submitting..." : "Submit Repair Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
