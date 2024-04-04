import { User, UserRole } from '@prisma/client';

export interface CreateUserDto {
  name: string;
  password: string;
  role: UserRole;
  admin: boolean;
  create: boolean;
}

export type UpdateUserDto = Partial<User>;
