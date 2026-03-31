"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Resolver, useForm } from "react-hook-form";

import type { CreateJobInput } from "@/types/job-create";

import { useCreateJob } from "@/lib/actions/jobs/create.job";

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

const parseAddress = (rawAddress: string) => {
  const normalizedAddress = rawAddress.trim();
  const postalCityMatch = normalizedAddress.match(/(?:,\s*)?(\d{4})\s+([^,]+)$/);

  if (postalCityMatch) {
    const postalCode = postalCityMatch[1];
    const city = postalCityMatch[2].trim();
    const matchStartIndex = postalCityMatch.index ?? normalizedAddress.length;
    const address = normalizedAddress.slice(0, matchStartIndex).replace(/,\s*$/, "").trim();

    return {
      address,
      postalCode,
      city
    };
  }

  const segments = normalizedAddress
    .split(",")
    .map((segment) => segment.trim())
    .filter(Boolean);

  const lastSegment = segments.at(-1) ?? "";
  const secondLastSegment = segments.at(-2) ?? "";
  const looksLikeCountry = /^(denmark|danmark)$/i.test(lastSegment);
  const fallbackCity = looksLikeCountry ? secondLastSegment : lastSegment;

  return {
    address: normalizedAddress,
    postalCode: "",
    city: fallbackCity
  };
};

const parseTimeString = (timeStr: string): { hours: number; minutes: number } => {
  if (timeStr.includes(":") && !timeStr.includes("AM") && !timeStr.includes("PM")) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return { hours, minutes };
  }

  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) {
    throw new Error("Invalid time format");
  }

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

const toPreferredTimeIso = (preferredDate: Date, preferredTime: string, customTime?: string) => {
  const selectedTime = customTime?.trim() || preferredTime;
  const { hours, minutes } = parseTimeString(selectedTime);

  const dateTime = new Date(preferredDate);
  dateTime.setHours(hours, minutes, 0, 0);

  return dateTime.toISOString();
};

export function NewRepairForm() {
  const router = useRouter();
  const { toast } = useToast();
  const createJob = useCreateJob();

  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<NewRepair>({
    resolver: zodResolver(newRepairSchema) as unknown as Resolver<NewRepair>,
    defaultValues: {
      details: {
        repairIssue: "",
        repairDescription: "",
        categories: []
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
        address: "",
        postalCode: "",
        maximumDistance: ""
      },
      location: {
        latitude: 55.6761,
        longitude: 12.5683
      }
    }
  });

  async function onSubmit(data: NewRepair) {
    try {
      const { address, city } = parseAddress(data.preferences.address);
      const postalCode = data.preferences.postalCode.trim();

      const preferredTime = toPreferredTimeIso(
        data.dateTime.preferredDate,
        data.dateTime.preferredTime || "",
        data.dateTime.customTime
      );

      const payload: CreateJobInput = {
        title: data.details.repairIssue.trim(),
        description: data.details.repairDescription.trim(),
        address,
        city: city.trim(),
        postalCode,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        radius: Number(data.preferences.maximumDistance),
        bikeName: data.information.whichBike.trim(),
        bikeType: data.information.bikeType as CreateJobInput["bikeType"],
        bikeBrand: data.information.bikeBrand.trim(),
        preferredTime,
        categories: data.details.categories.map((category) => ({
          categoryId: category.categoryId,
          description: category.description.trim()
        })),
        photos: data.photos.photos
      };

      const createResponse = await createJob.mutateAsync(payload);

      toast({
        title: "Success",
        description: "Your repair request has been submitted successfully."
      });
      form.reset();
      router.push(`/user/repairs/${createResponse.data.id}`);
    } catch (error) {
      const errorMessage = isAxiosError(error)
        ? (error.response?.data as { message?: string } | undefined)?.message ||
          "Failed to submit repair request."
        : "Failed to submit repair request. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
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
                disabled={createJob.isPending}
                className="flex-1 items-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                {createJob.isPending ? "Submitting..." : "Submit Repair Request"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}
