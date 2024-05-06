import { useInfiniteQuery } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';
import { campainsKeys } from '@/src/data';

export function useIQGetCampains() {
  const query = useInfiniteQuery({
    queryKey: campainsKeys.getAll,
    queryFn: ({ pageParam, }) => CampainsQuery.getAll(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
  });

  return query;
}
