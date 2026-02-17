import type { StaticImageData } from "next/image";

import type { LucideIcon } from "lucide-react";

export interface HowItWorksStat {
  valueKey: string;
  labelKey: string;
}

export interface HowItWorksStep {
  icon: LucideIcon;
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
}

export interface ServiceHowItWorksStep {
  image: StaticImageData;
  title?: string;
  description?: string;
  titleKey?: string;
  descriptionKey?: string;
}
export interface HowItWorksSimpleStep {
  image: StaticImageData;
  titleKey: string;
  descriptionKey: string;
  imageAltKey: string;
}
