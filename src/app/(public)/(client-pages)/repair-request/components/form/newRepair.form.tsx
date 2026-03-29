"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Resolver, useForm } from "react-hook-form";

import { BikeType, type CreateJobInput } from "@/types/job-create";
import { AUTH_SESSION_COOKIE } from "@/constants/auth";

import { useCreateJob } from "@/lib/actions/jobs/create.job";
import { parseAuthSession } from "@/lib/auth/session";
import { cookie } from "@/lib/cookie-client";

import { useToast } from "@/hooks";

import { Card } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Stepper, type Step } from "@/components/ui/stepper";

import { newRepairSchema, type NewRepair } from "../schema/newRepair.schema";
import { BikeDetailsForm } from "./bikeDetails.form";
import { LocationForm } from "./location.form";
import { LoginForm } from "./login.form";
import { PhotoForm } from "./photo.form";
import { ReviewSubmitForm } from "./reviewSubmit.form";

const FORM_STEPS: Step[] = [
  { id: 1, title: "Problem", description: "Bike details" },
  { id: 2, title: "Photos", description: "Upload photos" },
  { id: 3, title: "Location", description: "Add your info" },
  { id: 4, title: "Review", description: "Review and submit" }
];

const DEFAULT_LATITUDE = 55.6761;
const DEFAULT_LONGITUDE = 12.5683;
const DEFAULT_RADIUS_KM = 25;

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

const resolveBikeType = (bikeType: string): CreateJobInput["bikeType"] => {
  const normalized = bikeType.trim().toUpperCase().replace(/\s+/g, "_");
  const allowedBikeTypes = Object.values(BikeType);

  if (allowedBikeTypes.includes(normalized as CreateJobInput["bikeType"])) {
    return normalized as CreateJobInput["bikeType"];
  }

  return BikeType.OTHER;
};

const hasAuthenticatedSession = () => {
  const rawSession = cookie.get(AUTH_SESSION_COOKIE);

  if (!rawSession) {
    return false;
  }

  return Boolean(parseAuthSession(rawSession));
};

export function NewRepairForm() {
  const router = useRouter();
  const { toast } = useToast();
  const createJob = useCreateJob();

  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticatedSession);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        customTime: "",
        additionalNotes: ""
      },
      location: {
        latitude: undefined,
        longitude: undefined,
        address: ""
      }
    }
  });

  async function onSubmit(data: NewRepair) {
    if (!hasAuthenticatedSession()) {
      setShowLoginModal(true);
      toast({
        title: "Login required",
        description: "Please login or sign up to submit your repair request.",
        variant: "destructive"
      });

      return;
    }

    try {
      const mappedCategories = data.details.categories.map((category) => ({
        categoryId: category.categoryId,
        description: category.description?.trim() || "No additional details provided"
      }));

      const { address, city, postalCode } = parseAddress(data.location.address);
      const preferredTime = toPreferredTimeIso(
        data.dateTime.preferredDate,
        data.dateTime.preferredTime || "",
        data.dateTime.customTime
      );

      const fallbackTitle = "Bike repair request";
      const descriptionSections = data.details.categories
        .map((category) => category.description?.trim() || "No additional details provided")
        .join(" | ");

      const payload: CreateJobInput = {
        title: data.details.repairIssue?.trim() || fallbackTitle,
        description: data.dateTime.additionalNotes?.trim()
          ? `${descriptionSections} | Notes: ${data.dateTime.additionalNotes.trim()}`
          : descriptionSections,
        address,
        city: city.trim() || "Kobenhavn",
        postalCode: postalCode.trim() || "0000",
        latitude: data.location.latitude ?? DEFAULT_LATITUDE,
        longitude: data.location.longitude ?? DEFAULT_LONGITUDE,
        radius: DEFAULT_RADIUS_KM,
        bikeName: data.information.whichBike.trim(),
        bikeType: resolveBikeType(data.information.bikeType),
        bikeBrand: data.information.bikeBrand?.trim() || "Unknown",
        preferredTime,
        categories: mappedCategories,
        photos: data.photos.photos
      };

      const createResponse = await createJob.mutateAsync(payload);

      form.reset();
      toast({
        title: "Success",
        description: "Your repair request has been submitted successfully."
      });
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
        fieldsToValidate = ["location"];
        const locationIsValid = await form.trigger(fieldsToValidate);
        if (locationIsValid) {
          if (isAuthenticated || hasAuthenticatedSession()) {
            setCurrentStep(4);
          } else {
            setShowLoginModal(true);
          }
        }
        return;
      case 4:
        fieldsToValidate = ["dateTime"];
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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setCurrentStep(4);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BikeDetailsForm form={form} />;
      case 2:
        return <PhotoForm form={form} />;
      case 3:
        return <LocationForm form={form} />;
      case 4:
        return <ReviewSubmitForm form={form} />;
      default:
        return null;
    }
  };

  return (
    <Card className="mx-4 p-6">
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
                {createJob.isPending ? "Submitting..." : "Submit your task"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <LoginForm onLoginSuccess={handleLoginSuccess} isLoading={createJob.isPending} />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowLoginModal(false);
                setIsAuthenticated(hasAuthenticatedSession());
              }}
              className="mt-4 w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
