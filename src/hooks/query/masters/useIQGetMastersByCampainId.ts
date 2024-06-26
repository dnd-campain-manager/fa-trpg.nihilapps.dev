import { useInfiniteQuery } from '@tanstack/react-query';
import { mastersKeys } from '@/src/data';
import { MastersQuery } from '@/src/features';

export function useIQGetMastersByCampainId(
  campainId: string
) {
  const query = useInfiniteQuery({
    queryKey: mastersKeys.getByCampainIdIQ(campainId),
    queryFn: ({ pageParam, }) => MastersQuery.getByCampainIdIQ(
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
