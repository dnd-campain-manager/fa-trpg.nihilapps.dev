import { UserRole } from '@prisma/client';
import { ExtendedUser } from '@/src/entities';

export interface SignInDto {
  name: string;
  password: string;
}

export interface SignOutDto {
  userId: string;
  signInId: string;
}

export interface TokenRefreshDto {
  userId: string;
  signInId: string;
  refreshToken: string;
}

export interface TokenInfo {
  id: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface UserCheck {
  userId: string;
  signInId: string;
  password: string;
}

export interface ResetPasswordDto {
  userId: string;
  signInId: string;
  newPassword: string;
}

export interface UserSession extends ExtendedUser {
  signInId: string;
  accessToken: string;
  refreshToken: string;
  accessExp: number;
  refreshExp: number;
}
