"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";

import { useToast } from "@/hooks";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Stepper, type Step } from "@/components/ui/stepper";

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
const FORM_STEPS: Step[] = [
  { id: 1, title: "Details", description: "Repair details" },
  { id: 2, title: "Information", description: "Bike info" },
  { id: 3, title: "Photos", description: "Upload photos" },
  { id: 4, title: "Schedule", description: "Date & time" },
  { id: 5, title: "Preferences", description: "Your preferences" },
  { id: 6, title: "Location", description: "Pick location" }
];

export function NewRepairForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
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
      // Save repair request data to localStorage
      localStorage.setItem("pendingRepairRequest", JSON.stringify(data));

      toast({
        title: "Success",
        description: "Repair request saved. Please login to continue."
      });

      // Navigate to login page
      router.push("/login");
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

  const handleNext = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: Array<keyof NewRepair> = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["details"];
        break;
      case 2:
        fieldsToValidate = ["information"];
        break;
      case 3:
        fieldsToValidate = ["photos"];
        break;
      case 4:
        fieldsToValidate = ["dateTime"];
        break;
      case 5:
        fieldsToValidate = ["preferences"];
        break;
      case 6:
        fieldsToValidate = ["location"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < FORM_STEPS.length) {
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
        return <DetailsForm form={form} />;
      case 2:
        return <InformationForm form={form} />;
      case 3:
        return <PhotoForm form={form} />;
      case 4:
        return <DateTimeForm form={form} />;
      case 5:
        return <PreferencesForm form={form} />;
      case 6:
        return <LocationPicker onLocationSelect={handleLocationSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Stepper */}
      <Stepper steps={FORM_STEPS} currentStep={currentStep} />

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Current Step Content */}
          <div className="min-h-100">{renderStepContent()}</div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            )}

            <div className="flex-1" />

            {currentStep < FORM_STEPS.length && (
              <Button type="button" onClick={handleNext} className="flex items-center gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}

            {currentStep === FORM_STEPS.length && (
              <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                {isSubmitting ? "Submitting..." : "Submit Repair Request"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
