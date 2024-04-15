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
  startTime: Date;
  endTime: Date;
  gameTime: string;
  playersNumber: number;
  content: string;
  players: string[];
}

export type UpdateSessionDto = Partial<Session>;
