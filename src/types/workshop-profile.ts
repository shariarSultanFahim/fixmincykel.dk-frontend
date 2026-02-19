export interface WorkshopProfileInfo {
  workshopName: string;
  address: string;
  cvrNumber: string;
  description: string;
}

export interface WorkshopOpeningHours {
  weekdaysStart: string;
  weekdaysEnd: string;
  saturdayStart: string;
  saturdayEnd: string;
}

export interface WorkshopNotifications {
  email: boolean;
  sms: boolean;
  inApp: boolean;
}

export interface WorkshopServiceSettings {
  serviceCategories: string[];
  openingHours: WorkshopOpeningHours;
  notifications: WorkshopNotifications;
}

export interface WorkshopProfileData {
  profile: WorkshopProfileInfo;
  service: WorkshopServiceSettings;
}

export interface WorkshopProfileFormProps {
  initialValues: WorkshopProfileInfo;
}

export interface WorkshopServiceFormProps {
  initialValues: WorkshopServiceSettings;
}
