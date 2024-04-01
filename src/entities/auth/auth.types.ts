import { User, UserRole } from '@prisma/client';

export interface SignInDto {
  name: string;
  password: string;
}

export interface SignOutDto {
  userId: string;
}

export interface TokenRefreshDto {
  userId: string;
  refreshToken: string;
}

export interface TokenInfo {
  id: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface UserSession extends User {
  accessToken: string;
  refreshToken: string;
  accessExp: number;
  refreshExp: number;
}
