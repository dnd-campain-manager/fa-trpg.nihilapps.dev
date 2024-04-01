import { User, UserRole } from '@prisma/client';

export interface CreateUserDto {
  name: string;
  password: string;
  role: UserRole;
}

export type UpdateUserDto = Partial<User>;
