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
    status: string;
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
