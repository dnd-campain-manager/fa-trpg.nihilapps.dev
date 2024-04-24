import { useQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useGetPcByLevel(level: number) {
  const query = useQuery({
    queryKey: pcsKeys.getByLevel(level),
    queryFn: () => PcsQuery.getByLevel(level),
    enabled: !!level,
  });

  return query;
}
