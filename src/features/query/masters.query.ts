import { CreateMasterDto, ExtendedMaster, UpdateMasterDto } from '@/src/entities';
import { Api } from '@/src/utils';

export class MastersQuery {
  static async create(createMasterDto: CreateMasterDto) {
    const { data, } = await Api.post<ExtendedMaster, CreateMasterDto>(
      `/masters`,
      createMasterDto
    );

    return data;
  }

  static async update(id: string, updateMasterDto: UpdateMasterDto) {
    const { data, } = await Api.patch<ExtendedMaster, UpdateMasterDto>(
      `/masters/${id}`,
      updateMasterDto
    );

    return data;
  }

  static async delete(id: string) {
    const { data, } = await Api.delete<ExtendedMaster>(
      `/masters/${id}`
    );

    return data;
  }
}
