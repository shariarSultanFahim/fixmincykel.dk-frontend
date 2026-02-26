"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export function NewRepairForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const form = useForm<NewRepair>({
    resolver: zodResolver(newRepairSchema) as unknown as Resolver<NewRepair>,
    defaultValues: {
      details: {
        repairIssue: "",
        category: "",
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
        city: "",
        address: ""
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
        description: "Repair request saved successfully!"
      });

      // Navigate to dashboard or home
      router.push("/user");
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
        fieldsToValidate = ["location"];
        // Show login modal before moving to next step
        const locationIsValid = await form.trigger(fieldsToValidate);
        if (locationIsValid) {
          setShowLoginModal(true);
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
    setShowLoginModal(false);
    // Move to step 4 (review) after successful login
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
                disabled={isSubmitting}
                className="flex-1 items-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                {isSubmitting ? "Submitting..." : "Submit your task"}
              </Button>
            )}
          </div>
        </form>
      </Form>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <LoginForm onLoginSuccess={handleLoginSuccess} isLoading={isSubmitting} />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLoginModal(false)}
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
