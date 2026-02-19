import type { Control } from "react-hook-form";

export interface UserBike {
  id: string;
  name: string;
  type: string;
  year: string;
  color: string;
  frameSize: string;
  isPrimary: boolean;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string;
  bikes: UserBike[];
  preferences: UserPreferences;
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
  preferences: UserPreferences;
}

export interface UserBikeFormValues {
  name: string;
  type: string;
  year: string;
  color: string;
  frameSize: string;
}

export interface UserProfileFormProps {
  initialValues: UserProfile;
}

export interface BikeCardProps {
  bike: UserBike;
  variant: "primary" | "secondary";
}

export interface EditBikeDialogProps {
  bike: UserBike;
}

export interface PreferenceToggleProps {
  control: Control<UserProfileFormValues>;
  name:
    | "preferences.emailNotifications"
    | "preferences.smsNotifications"
    | "preferences.marketingEmails";
  label: string;
  description: string;
}
