import { Api } from '@/src/utils';
import { CreatePcDto, ExtendedPc, UpdatePcDto } from '@/src/entities';

export class PcsQuery {
  static async getAll() {
    const { data, } = await Api.get<ExtendedPc[]>(
      '/pcs'
    );

    return data;
  }

  static async getById(id: string) {
    const { data, } = await Api.get<ExtendedPc>(
      `/pcs/${id}`
    );

    return data;
  }

  static async getByName(name: string) {
    const { data, } = await Api.get<ExtendedPc>(
      `/pcs/name/${name}`
    );

    return data;
  }

  static async getByLevel(level: number) {
    const { data, } = await Api.get<ExtendedPc>(
      `/pcs/level/${level}`
    );

    return data;
  }

  static async create(createPcDto: CreatePcDto) {
    const { data, } = await Api.post<ExtendedPc, CreatePcDto>(
      '/pcs',
      createPcDto
    );

    return data;
  }

  static async update(id: string, updatePcDto: UpdatePcDto) {
    const { data, } = await Api.patch<ExtendedPc, UpdatePcDto>(
      `/pcs/${id}`,
      updatePcDto
    );

    return data;
  }

  static async delete(id: string) {
    const { data, } = await Api.delete<ExtendedPc>(
      `pcs/${id}`
    );

    return data;
  }
}
