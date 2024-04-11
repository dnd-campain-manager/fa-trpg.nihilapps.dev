import { useQuery } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';
import { campainsKeys } from '@/src/data';

export function useGetCampainByName(name: string) {
  const query = useQuery({
    queryKey: campainsKeys.getByName(name),
    queryFn: () => CampainsQuery.getByName(name),
    enabled: !!name,
  });

  return query;
}
