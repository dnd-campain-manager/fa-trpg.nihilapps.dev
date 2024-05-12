import { useInfiniteQuery } from '@tanstack/react-query';
import { mastersKeys } from '@/src/data';
import { MastersQuery } from '@/src/features';

export function UseIQGetMasterByUserId(userId: string, status: string) {
  const query = useInfiniteQuery({
    queryKey: mastersKeys.getByUserId(userId, status),
    queryFn: ({ pageParam, }) => (
      MastersQuery.getByUserId(userId, pageParam, status)
    ),
    getNextPageParam: (lastPage) => {
      return lastPage.data.page;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });

  return query;
}
