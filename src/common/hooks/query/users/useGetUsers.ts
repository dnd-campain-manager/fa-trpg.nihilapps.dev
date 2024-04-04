import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/common';
import { UsersQuery } from '@/src/features';

export function useGetUsers() {
  const query = useQuery({
    queryKey: usersKeys.getAll,
    queryFn: UsersQuery.getAll,
  });

  return query;
}
