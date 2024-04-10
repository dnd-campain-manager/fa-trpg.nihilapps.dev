import { useQuery } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';
import { campainsKeys } from '@/src/data';

export function useGetCampainById(id: string) {
  const query = useQuery({
    queryKey: campainsKeys.getById(id),
    queryFn: () => CampainsQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
