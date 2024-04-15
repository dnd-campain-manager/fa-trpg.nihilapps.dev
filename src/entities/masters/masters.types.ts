import { MasterType } from '@prisma/client';

export interface createMasterDto {
  name: string;
  campainId: string;
}

export interface updateMasterDto {
  masterId: string;
  campainId: string;
  masterType: MasterType;
}
