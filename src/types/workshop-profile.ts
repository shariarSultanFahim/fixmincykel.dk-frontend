export interface WorkshopProfileInfo {
  workshopId?: string;
  workshopName: string;
  address: string;
  cvrNumber: string;
  description: string;
}

export interface WorkshopMeCategory {
  id: string;
  workshopId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopMeOpeningHour {
  id: string;
  workshopId: string;
  day: string;
  openTime: string | null;
  closeTime: string | null;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopMeData {
  id: string;
  workshopName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  avatar: string | null;
  role: string;
  isVerified: boolean;
  approvalStatus: string;
  avgRating: number;
  city: string | null;
  country: string | null;
  ownerName: string;
  latitude: number;
  longitude: number;
  cvrNumber: string;
  createdAt: string;
  updatedAt: string;
  state: string | null;
  categories: WorkshopMeCategory[];
  workshopOpeningHours: WorkshopMeOpeningHour[];
  postalCode: string;
  _count: {
    categories: number;
    bookings: number;
    jobs: number;
    invoices: number;
    rooms: number;
    workshopOpeningHours: number;
  };
}

export interface WorkshopMeResponse {
  success: boolean;
  message: string;
  data: WorkshopMeData;
}

export interface UpdateWorkshopProfilePayload {
  workshopName: string;
  description: string;
  address: string;
}

export interface UpdateWorkshopProfileInput {
  workshopId: string;
  data: UpdateWorkshopProfilePayload;
}

export interface WorkshopCategoryDetails {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopCategoryItem {
  id: string;
  workshopId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: WorkshopCategoryDetails;
}

export interface WorkshopCategoryListResponse {
  success: boolean;
  message: string;
  data: WorkshopCategoryItem[];
}

export interface WorkshopCategoryMutationPayload {
  workshopId: string;
  categoryId: string;
}

export interface WorkshopCategoryMutationResponse {
  success: boolean;
  message: string;
  data: WorkshopCategoryItem;
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
  workshopId?: string;
}
