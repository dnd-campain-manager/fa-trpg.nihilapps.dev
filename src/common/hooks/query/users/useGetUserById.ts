import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/common';
import { UsersQuery } from '@/src/features';

export function useGetUserById(id: string) {
  const query = useQuery({
    queryKey: usersKeys.getById(id),
    queryFn: () => UsersQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
