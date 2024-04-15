import {
  Master,
  Pc, User, UserRole, UserType
} from '@prisma/client';

export interface ExtendedUser extends User {
  Master: Master[];
  Pc: Pc[];
}

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
