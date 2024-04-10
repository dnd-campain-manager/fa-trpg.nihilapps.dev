import { useMutation } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';

export function useDeleteCampain(id: string) {
  const query = useMutation({
    mutationFn: () => CampainsQuery.delete(id),
  });

  return query;
}
