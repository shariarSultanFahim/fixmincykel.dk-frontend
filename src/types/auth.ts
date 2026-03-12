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
