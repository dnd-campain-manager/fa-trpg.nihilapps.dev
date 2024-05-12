import { Campain, Session } from '@prisma/client';
import { CustomMaster } from '@/src/entities';

export interface ExtendedSession extends Session {
  Master: CustomMaster[];
  Campain: Campain[];
}

export interface CreateSessionsDto {
  campainId: string;
  masterId: string;
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  gameTime: string;
  playersNumber: number;
  content: string;
  note: string;
}

export type UpdateSessionDto = Partial<Session>;
