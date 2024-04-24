import { useQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useGetPcByName(name: string) {
  const query = useQuery({
    queryKey: pcsKeys.getByName(name),
    queryFn: () => PcsQuery.getByName(name),
    enabled: !!name,
  });

  return query;
}
