import {
  Campain, CampainStatus, MasterType, Pc, Session,
  User
} from '@prisma/client';

export interface ExtendedPc extends Pc {
  User: User;
}

export interface CustomMaster {
  masterType: MasterType;
  User: User;
}

interface ExtendedSession extends Session {
  Master: CustomMaster;
}

export interface ExtendedCampain extends Campain {
  Session: ExtendedSession[];
  Master: CustomMaster[];
  Pc: ExtendedPc[];
}

export interface CreateCampainDto {
  userId: string;
  name: string;
  status: CampainStatus;
  url: string;
}

export type UpdateCampainDto = Partial<Campain>;
