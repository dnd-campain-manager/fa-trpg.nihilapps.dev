import { useQuery } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';
import { campainsKeys } from '@/src/data';

export function useGetCampains() {
  const query = useQuery({
    queryKey: campainsKeys.getAll,
    queryFn: () => CampainsQuery.getAll(),
  });

  return query;
}
