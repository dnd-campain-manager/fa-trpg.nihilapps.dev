import { useMutation } from '@tanstack/react-query';
import { UsersQuery } from '@/src/features';

export function useDeleteUser(id: string) {
  const query = useMutation({
    mutationFn: () => UsersQuery.delete(id),
  });

  return query;
}
