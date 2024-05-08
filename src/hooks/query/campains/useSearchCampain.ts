import { useInfiniteQuery } from '@tanstack/react-query';
import { campainsKeys } from '@/src/data';
import { CampainsQuery } from '@/src/features';

export function useSearchCampain(keyword: string) {
  const query = useInfiniteQuery({
    queryKey: campainsKeys.search(keyword),
    queryFn: ({ pageParam, }) => CampainsQuery.search(keyword, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!keyword,
  });

  return query;
}
