import type { Control } from "react-hook-form";

import type { BikeType } from "./job-create";

export interface UserBike {
  id: string;
  name: string;
  type: BikeType;
  brand: string;
  model: string;
  year: number;
  color: string;
  isPrimary: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string;
  bikes: UserBike[];
}

export interface UserProfileData {
  userProfile: UserProfile;
}

export interface UserProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string;
}

export interface UserPreferencesFormValues {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface UserBikeFormValues {
  name: string;
  type: BikeType;
  brand: string;
  model: string;
  year: string;
  color: string;
}

export interface BikeCardProps {
  bike: UserBike;
  variant: "primary" | "secondary";
}

export interface EditBikeDialogProps {
  bike: UserBike;
  onSubmit: (bikeId: string, values: UserBikeFormValues) => Promise<void>;
}

export interface AddBikeDialogProps {
  ownerId: string;
  onSubmit: (values: UserBikeFormValues & { ownerId: string }) => Promise<void>;
}

export interface PreferenceToggleProps {
  control: Control<UserPreferencesFormValues>;
  name: "emailNotifications" | "smsNotifications" | "marketingEmails";
  label: string;
  description: string;
}
