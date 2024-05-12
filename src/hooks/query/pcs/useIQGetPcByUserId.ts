import { useInfiniteQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useIQGetPcByUserId(userId: string) {
  const query = useInfiniteQuery({
    queryKey: pcsKeys.getByUserId(userId),
    queryFn: ({ pageParam, }) => PcsQuery.getByUserId(userId, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });

  return query;
}
