import { useMutation } from '@tanstack/react-query';
import { UpdateUserDto } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useUpdateUser(id: string) {
  const query = useMutation({
    mutationFn: (updateUserDto: UpdateUserDto) => UsersQuery.update(id, updateUserDto),
  });

  return query;
}
