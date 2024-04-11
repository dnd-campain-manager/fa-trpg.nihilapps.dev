import { Session } from '@prisma/client';

export interface CreateSessionsDto {
  campainId: string;
  masterId: string;
  number: number;
  name: string;
  startTime: Date;
  endTime: Date;
  playersNumber: number;
  content: string;
  players: string[];
}

export type UpdateSessionDto = Partial<Session>;
