import { CalendarCheck, FilePlus2, MessageCircle, Scale, Send, Star } from "lucide-react";

import type { HowItWorksSimpleStep, HowItWorksStat, HowItWorksStep } from "@/types/how-it-works";

import BookingOfferImage from "@/assets/images/bookingOffer.png";
import ReceivingOffersImage from "@/assets/images/receivingOffers.png";
import TakingBikePhotoImage from "@/assets/images/takingBikePhoto.png";

export const HOW_IT_WORKS_STATS: HowItWorksStat[] = [
  {
    valueKey: "stats.workshops.value",
    labelKey: "stats.workshops.label"
  },
  {
    valueKey: "stats.repairs.value",
    labelKey: "stats.repairs.label"
  },
  {
    valueKey: "stats.reviews.value",
    labelKey: "stats.reviews.label"
  }
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    icon: FilePlus2,
    titleKey: "HowItWorksSteps.items.create.title",
    descriptionKey: "HowItWorksSteps.items.create.description"
  },
  {
    icon: Send,
    titleKey: "HowItWorksSteps.items.offers.title",
    descriptionKey: "HowItWorksSteps.items.offers.description"
  },
  {
    icon: Scale,
    titleKey: "HowItWorksSteps.items.compare.title",
    descriptionKey: "HowItWorksSteps.items.compare.description"
  },
  {
    icon: MessageCircle,
    titleKey: "HowItWorksSteps.items.chat.title",
    descriptionKey: "HowItWorksSteps.items.chat.description"
  },
  {
    icon: CalendarCheck,
    titleKey: "HowItWorksSteps.items.book.title",
    descriptionKey: "HowItWorksSteps.items.book.description"
  },
  {
    icon: Star,
    titleKey: "HowItWorksSteps.items.review.title",
    descriptionKey: "HowItWorksSteps.items.review.description"
  }
];

export const HOW_IT_WORKS_SIMPLE_STEPS: HowItWorksSimpleStep[] = [
  {
    image: TakingBikePhotoImage,
    titleKey: "HowItWorksSimpleProcess.steps.describe.title",
    descriptionKey: "HowItWorksSimpleProcess.steps.describe.description",
    imageAltKey: "HowItWorksSimpleProcess.steps.describe.imageAlt"
  },
  {
    image: ReceivingOffersImage,
    titleKey: "HowItWorksSimpleProcess.steps.receive.title",
    descriptionKey: "HowItWorksSimpleProcess.steps.receive.description",
    imageAltKey: "HowItWorksSimpleProcess.steps.receive.imageAlt"
  },
  {
    image: BookingOfferImage,
    titleKey: "HowItWorksSimpleProcess.steps.choose.title",
    descriptionKey: "HowItWorksSimpleProcess.steps.choose.description",
    imageAltKey: "HowItWorksSimpleProcess.steps.choose.imageAlt"
  }
];
