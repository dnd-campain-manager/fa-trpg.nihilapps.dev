import { useMutation } from '@tanstack/react-query';
import { SessionsQuery } from '@/src/features';

export function useDeleteSession(id: string) {
  const query = useMutation({
    mutationFn: () => SessionsQuery.delete(id),
  });

  return query;
}
