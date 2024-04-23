import {
  Campain,
  Master, Pc, Session, User, UserRole, UserType
} from '@prisma/client';

export interface ExtendedUserMaster extends Master {
  Session: Session[];
  Campain: Campain;
}

export interface ExtendedUserPc extends Pc {
  Campain: Campain;
}

export interface ExtendedUser extends User {
  Master: ExtendedUserMaster[];
  Pc: ExtendedUserPc[];
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
