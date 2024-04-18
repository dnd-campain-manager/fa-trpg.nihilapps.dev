import { MasterType } from '@prisma/client';

export interface createMasterDto {
  userId: string;
  campainId: string;
}

export interface updateMasterDto {
  masterId: string;
  campainId: string;
  masterType: MasterType;
}
