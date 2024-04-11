import { useQuery } from '@tanstack/react-query';
import { sessionsKeys } from '@/src/data';
import { SessionsQuery } from '@/src/features';

export function useGetSessionByName(name: string) {
  const query = useQuery({
    queryKey: sessionsKeys.getByName(name),
    queryFn: () => SessionsQuery.getByName(name),
    enabled: !!name,
  });

  return query;
}
