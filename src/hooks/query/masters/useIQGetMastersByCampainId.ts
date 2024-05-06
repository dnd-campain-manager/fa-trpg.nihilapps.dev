import { useInfiniteQuery } from '@tanstack/react-query';
import { mastersKeys } from '@/src/data';
import { MastersQuery } from '@/src/features';

export function useIQGetMastersByCampainId(
  campainId: string
) {
  const query = useInfiniteQuery({
    queryKey: mastersKeys.getByCampainId(campainId),
    queryFn: ({ pageParam, }) => MastersQuery.getByCampainId(
      campainId,
      pageParam
    ),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!campainId,
  });

  return query;
}
