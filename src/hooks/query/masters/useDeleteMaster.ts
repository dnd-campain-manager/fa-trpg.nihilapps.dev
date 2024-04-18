import { useMutation } from '@tanstack/react-query';
import { MastersQuery } from '@/src/features';

export function useDeleteMaster(id: string) {
  const query = useMutation({
    mutationFn: () => MastersQuery.delete(id),
  });

  return query;
}
