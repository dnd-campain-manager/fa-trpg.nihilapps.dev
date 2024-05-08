import { useInfiniteQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useIQGetPcByLevel(level: number) {
  const query = useInfiniteQuery({
    queryKey: pcsKeys.getByLevel(level),
    queryFn: ({ pageParam, }) => PcsQuery.getByLevel(level, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!level,
  });

  return query;
}
