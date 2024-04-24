import { useQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useGetPcById(id: string) {
  const query = useQuery({
    queryKey: pcsKeys.getById(id),
    queryFn: () => PcsQuery.getById(id),
    enabled: !!id,
  });

  return query;
}
