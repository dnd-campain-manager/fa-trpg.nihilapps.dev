import { useMutation } from '@tanstack/react-query';
import { PcsQuery } from '@/src/features';

export function useDeletePc(id: string) {
  const query = useMutation({
    mutationFn: () => PcsQuery.delete(id),
  });

  return query;
}
