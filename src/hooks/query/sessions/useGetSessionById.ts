import { useQuery } from '@tanstack/react-query';
import { sessionsKeys } from '@/src/data';
import { SessionsQuery } from '@/src/features';

export function useGetSessionById(id: string) {
  const query = useQuery({
    queryKey: sessionsKeys.getById(id),
    queryFn: () => SessionsQuery.getById(id),
  });

  return query;
}
