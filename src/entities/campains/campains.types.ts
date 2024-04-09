import { Campain, CampainStatus } from '@prisma/client';

export interface CreateCampainDto {
  userId: string;
  name: string;
  status: CampainStatus;
  url: string;
}

export type UpdateCampainDto = Partial<Campain>;
