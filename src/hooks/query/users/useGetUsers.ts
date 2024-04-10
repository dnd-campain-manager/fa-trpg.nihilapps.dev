import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '@/src/data';
import { UsersQuery } from '@/src/features';

export function useGetUsers() {
  const query = useQuery({
    queryKey: usersKeys.getAll,
    queryFn: UsersQuery.getAll,
  });

  return query;
}
