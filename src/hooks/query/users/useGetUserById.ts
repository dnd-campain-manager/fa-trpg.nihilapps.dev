import { useQuery } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features';
import { usersKeys } from '@/src/data';

export function useGetUserById(id: string) {
  const query = useQuery({
    queryKey: usersKeys.getById(id),
    queryFn: () => UsersQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
