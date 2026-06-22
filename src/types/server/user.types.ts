export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserRole {
  id: string;
  name: string;
  description: string | null;
}

export interface AuthUser {
  id: string;
  fullName: string | null;
  email: string;
  isVerified: boolean;
  authMethod: string;
  provider: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  } | null;
  error: any;
  meta: {
    timestamp: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  isVerified: boolean;
  createdAt?: string;
  roles?: UserRole[];
  permissions?: string[];
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile | null;
  error: any;
  meta: {
    timestamp: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  error: any;
  meta: {
    timestamp: string;
  };
}
