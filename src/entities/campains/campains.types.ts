import {
  Campain, CampainStatus, Class, Master, MasterType, Pc, Session,
  User
} from '@prisma/client';

export interface ExtendedCampainPc extends Pc {
  User: User;
  Class: Class;
}

export interface CustomMaster extends Master {
  Session: Session[],
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

export interface CampainPages {
  campains: ExtendedCampain[];
  total: number;
  page: number;
}

export interface CampainSearchPages extends CampainPages {
  keyword: string;
}

export interface CreateCampainDto {
  userId: string;
  name: string;
  status: CampainStatus;
  url: string;
}

export type UpdateCampainDto = Partial<Campain>;
