import { Session } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateSessionsDto, UpdateSessionDto } from '@/src/entities';

export class SessionsQuery {
  static async getAll() {
    const { data, } = await Api.get<Session[]>('/sessions');

    return data;
  }

  static async getById(id: string) {
    const { data, } = await Api.get<Session>(`/sessions/${id}`);

    return data;
  }

  static async getByName(name: string) {
    const { data, } = await Api.get<Session[]>(
      `/sessions/name/${name}`
    );

    return data;
  }

  static async create(createSessionDto: CreateSessionsDto) {
    const { data, } = await Api.post<Session, CreateSessionsDto>(
      '/sessions',
      createSessionDto
    );

    return data;
  }

  static async update(id: string, updateSessionDto: UpdateSessionDto) {
    const { data, } = await Api.patch<Session, UpdateSessionDto>(
      `/sessions/${id}`,
      updateSessionDto
    );

    return data;
  }

  static async delete(id: string) {
    const { data, } = await Api.delete<Session>(
      `/sessions/${id}`
    );

    return data;
  }
}
