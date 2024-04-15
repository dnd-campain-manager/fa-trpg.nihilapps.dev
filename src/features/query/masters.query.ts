import { createMasterDto, updateMasterDto } from '@/src/entities';
import { Api } from '@/src/utils';

export class MastersQuery {
  static async create(createMasterDto: createMasterDto) {
    const { data, } = await Api.post(
      `/masters`,
      createMasterDto
    );

    return data;
  }

  static async update(name: string, updateMasterDto: updateMasterDto) {
    const { data, } = await Api.patch(
      `/masters/name/${name}`,
      updateMasterDto
    );

    return data;
  }
}
