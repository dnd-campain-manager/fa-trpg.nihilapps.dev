import {
  Campain,
  Master,
  MasterStatus, MasterType, Session, User
} from '@prisma/client';

export interface ExtendedMaster extends Master {
  User: User;
  Session: Session[];
  Campain: Campain;
}

export interface MasterPages {
  masters: ExtendedMaster[];
  total: number;
  page: number;
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
  masterType?: MasterType;
  masterStatus?: MasterStatus;
}
