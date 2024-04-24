import { useQuery } from '@tanstack/react-query';
import { pcsKeys } from '@/src/data';
import { PcsQuery } from '@/src/features';

export function useGetPcs() {
  const query = useQuery({
    queryKey: pcsKeys.getAll,
    queryFn: PcsQuery.getAll,
  });

  return query;
}
