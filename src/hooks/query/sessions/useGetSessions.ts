import { useQuery } from '@tanstack/react-query';
import { sessionsKeys } from '@/src/data';
import { SessionsQuery } from '@/src/features';

export function useGetSessions() {
  const query = useQuery({
    queryKey: sessionsKeys.getAll,
    queryFn: SessionsQuery.getAll,
  });

  return query;
}
