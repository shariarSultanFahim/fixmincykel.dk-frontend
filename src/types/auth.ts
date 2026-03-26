export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponseData {
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    status?: string;
    approvalStatus?: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: LoginResponseData;
}

export interface LoginErrorMessage {
  path: string;
  message: string;
}

export interface LoginErrorResponse {
  success: boolean;
  message: string;
  errorMessages?: LoginErrorMessage[];
  stack?: string;
}

export interface ForgetPasswordRequest {
  email: string;
}

export interface ForgetPasswordResponseData {
  status: string;
}

export interface ForgetPasswordResponse {
  success: boolean;
  message: string;
  data?: ForgetPasswordResponseData;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
}

export interface RegisterResponseData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: RegisterResponseData;
}

export interface VerifyUserRequest {
  email: string;
  otp: number;
}

export interface VerifyUserResponseData {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    address: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface VerifyUserResponse {
  success: boolean;
  message: string;
  data?: VerifyUserResponseData;
}

export interface ResendOTPRequest {
  email: string;
}

export interface WorkshopRegisterRequest {
  workshopName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  description: string;
  city: string;
  cvrNumber: string;
  ownerName: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface WorkshopRegisterResponseData {
  id: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cvrNumber: string;
  ownerName: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  workshopName: string;
  description: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopRegisterResponse {
  success: boolean;
  message: string;
  data?: WorkshopRegisterResponseData;
}

export interface VerifyWorkshopRequest {
  email: string;
  otp: number;
}

export interface VerifyWorkshopResponseData {
  accessToken?: string;
  refreshToken?: string;
  workshop?: {
    id: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    approvalStatus?: string;
  };
}

export interface VerifyWorkshopResponse {
  success: boolean;
  message: string;
  data?: VerifyWorkshopResponseData;
}
