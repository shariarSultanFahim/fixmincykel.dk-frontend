"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";

import { useToast } from "@/hooks";

import { Card } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Stepper, type Step } from "@/components/ui/stepper";

import { newRepairSchema, type NewRepair } from "../schema/newRepair.schema";
import { BikeDetailsForm } from "./bikeDetails.form";
import { DateTimeForm } from "./dateTime.form";
import { PhotoForm } from "./photo.form";
import { PreferencesForm } from "./preferences.form";

// 1. Dynamically import the map with SSR disabled
const LocationPicker = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100 w-full animate-pulse rounded bg-gray-100">Loading Map...</div>
  )
});

const FORM_STEPS: Step[] = [
  { id: 1, title: "Problem", description: "Bike details" },
  { id: 2, title: "Photos", description: "Upload photos" },
  { id: 3, title: "Schedule", description: "Date & time" },
  { id: 4, title: "Preferences", description: "Location & distance" }
];

export function NewRepairForm() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewRepair>({
    resolver: zodResolver(newRepairSchema) as unknown as Resolver<NewRepair>,
    defaultValues: {
      details: {
        repairIssue: "",
        categories: [],
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
      setCurrentStep(1);
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

  const handleNext = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: Array<keyof NewRepair> = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["details", "information"];
        break;
      case 2:
        fieldsToValidate = ["photos"];
        break;
      case 3:
        fieldsToValidate = ["dateTime"];
        break;
      case 4:
        fieldsToValidate = ["preferences"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < FORM_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BikeDetailsForm form={form} />;
      case 2:
        return <PhotoForm form={form} />;
      case 3:
        return <DateTimeForm form={form} />;
      case 4:
        return (
          <div className="space-y-6">
            <PreferencesForm form={form} />
            <LocationPicker
              showMap={true}
              onLocationSelect={(lat, lng) => {
                form.setValue("location", { latitude: lat, longitude: lng });
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="mx-4 border-none p-6">
      {/* Stepper */}
      <Stepper steps={FORM_STEPS} currentStep={currentStep} />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Step Content */}
          <div className="min-h-96">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex-1 items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            )}

            {currentStep < FORM_STEPS.length && (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 items-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {currentStep === FORM_STEPS.length && (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 items-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Repair Request"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
