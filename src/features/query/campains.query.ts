import { Campain } from '@prisma/client';
import { Api } from '@/src/utils';
import {
  CampainPages, CampainSearchPages, CreateCampainDto, ExtendedCampain, UpdateCampainDto
} from '@/src/entities';

export class CampainsQuery {
  static async getAll(page: number) {
    const { data, } = await Api.get<CampainPages>(
      `/campains?page=${page}`
    );

    return data;
  }

  static async getById(id: string) {
    const { data, } = await Api.get<ExtendedCampain>(
      `/campains/${id}`
    );

    return data;
  }

  static async getByName(name: string) {
    const { data, } = await Api.get<ExtendedCampain[]>(
      `/campains/name/${name}`
    );

    return data;
  }

  static async search(
    keyword: string,
    page: number
  ) {
    const { data, } = await Api.get<CampainSearchPages>(
      `/campains/search?keyword=${keyword}&page=${page}`
    );

    return data;
  }

  static async create(createCampainDto: CreateCampainDto) {
    const { data, } = await Api.post<Campain, CreateCampainDto>(
      '/campains',
      createCampainDto
    );

    return data;
  }

  static async update(id: string, updateCampainDto: UpdateCampainDto) {
    const { data, } = await Api.patch<Campain, UpdateCampainDto>(
      `/campains/${id}`,
      updateCampainDto
    );

    return data;
  }

  static async delete(id: string) {
    const { data, } = await Api.delete<Campain>(`/campains/${id}`);

    return data;
  }
}
