import { User } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateUserDto, ExtendedUser, UpdateUserDto } from '@/src/entities';

export class UsersQuery {
  static async getAll() {
    const { data, } = await Api.get<ExtendedUser[]>(
      '/users'
    );

    return data;
  }

  static async getById(id: string) {
    const { data, } = await Api.get<ExtendedUser>(
      `/users/${id}`
    );

    return data;
  }

  static async create(createUserDto: CreateUserDto) {
    const { data, } = await Api.post<User, CreateUserDto>(
      '/users',
      createUserDto
    );

    return data;
  }

  static async update(id: string, updateUserDto: UpdateUserDto) {
    const { data, } = await Api.patch<User, UpdateUserDto>(
      `/users/${id}`,
      updateUserDto
    );

    return data;
  }

  static async delete(id: string) {
    const { data, } = await Api.delete<User>(`/users/${id}`);

    return data;
  }
}
