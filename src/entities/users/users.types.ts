import { UserRole, UserType } from '@prisma/client';

export interface CreateUserDto {
  name: string;
  password: string;
  userType: UserType;
  userRole: UserRole;
}

export interface UpdateUserDto {
  name?: string;
  userType?: UserType;
  userRole?: UserRole;
}
