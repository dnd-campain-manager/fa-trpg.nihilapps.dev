import {
  Campain, CampainStatus, Class, MasterType, Pc, Session,
  User
} from '@prisma/client';

export interface ExtendedCampainPc extends Pc {
  User: User;
  Class: Class;
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
  Pc: ExtendedCampainPc[];
}

export interface CreateCampainDto {
  userId: string;
  name: string;
  status: CampainStatus;
  url: string;
}

export type UpdateCampainDto = Partial<Campain>;
