import { useQuery } from '@tanstack/react-query';
import { campainsKeys } from '@/src/common';
import { CampainsQuery } from '@/src/features';

export function useGetCampainById(id: string) {
  const query = useQuery({
    queryKey: campainsKeys.getById(id),
    queryFn: () => CampainsQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
