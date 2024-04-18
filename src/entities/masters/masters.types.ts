import { MasterType, Session, User } from '@prisma/client';

export interface ExtendedMaster {
  User: User;
  Session: Session[];
}

export interface CreateMasterDto {
  userId: string;
  campainId: string;
  masterType: MasterType;
}

export interface UpdateMasterDto {
  masterId: string;
  userId: string;
  campainId: string;
  masterType: MasterType;
}
