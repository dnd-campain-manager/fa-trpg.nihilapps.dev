import {
  CreateMasterDto, ExtendedMaster, MasterPages, UpdateMasterDto
} from '@/src/entities';
import { Api } from '@/src/utils';

export class MastersQuery {
  static async getAll() {
    const { data, } = await Api.get<ExtendedMaster[]>(
      '/masters'
    );

    return data;
  }

  static async getByCampainId(
    campainId: string,
    url: string
  ) {
    const defaultUrl = url || `/masters/campain/${campainId}?page=1&lastId`;

    const { data, } = await Api.get<MasterPages>(
      defaultUrl
    );

    return data;
  }

  static async getById(id: string) {
    const { data, } = await Api.get<ExtendedMaster>(
      `/masters/${id}`
    );

    return data;
  }

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
