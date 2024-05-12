import { Api } from '@/src/utils';
import {
  CreatePcDto, ExtendedPc, PcPages, UpdatePcDto
} from '@/src/entities';

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

  static async getByUserId(userId: string, page: number) {
    const { data, } = await Api.get<PcPages>(
      `/pcs/userId/${userId}?page=${page}`
    );

    return data;
  }

  static async getByName(name: string, page: number) {
    const { data, } = await Api.get<PcPages>(
      `/pcs/name/${name}?page=${page}`
    );

    return data;
  }

  static async getByLevel(level: number, page: number) {
    const { data, } = await Api.get<PcPages>(
      `/pcs/level/${level}?page=${page}`
    );

    return data;
  }

  static async getByUserName(
    username: string,
    page: number
  ) {
    const { data, } = await Api.get<PcPages>(
      `/pcs/username/${username}?page=${page}`
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
