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
      pageParam as string
    ),
    getNextPageParam: (lastPage) => lastPage.data.url || null,
    initialPageParam: null,
  });

  return query;
}
