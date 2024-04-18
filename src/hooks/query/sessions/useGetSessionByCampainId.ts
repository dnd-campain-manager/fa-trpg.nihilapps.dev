import { useQuery } from '@tanstack/react-query';
import { sessionsKeys } from '@/src/data';
import { SessionsQuery } from '@/src/features';

export function useGetSessionByCampainId(campainId: string) {
  const query = useQuery({
    queryKey: sessionsKeys.getByCampainId(campainId),
    queryFn: () => SessionsQuery.getByCampainId(campainId),
    enabled: !!campainId,
  });

  return query;
}
