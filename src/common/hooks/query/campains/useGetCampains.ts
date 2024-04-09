import { useQuery } from '@tanstack/react-query';
import { campainsKeys } from '@/src/common';
import { CampainsQuery } from '@/src/features';

export function useGetCampains() {
  const query = useQuery({
    queryKey: campainsKeys.getAll,
    queryFn: CampainsQuery.getAll,
  });

  return query;
}
