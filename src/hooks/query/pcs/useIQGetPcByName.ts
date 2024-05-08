import { useInfiniteQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useIQGetPcByName(name: string) {
  const query = useInfiniteQuery({
    queryKey: pcsKeys.getByName(name),
    queryFn: ({ pageParam, }) => PcsQuery.getByName(name, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!name,
  });

  return query;
}
