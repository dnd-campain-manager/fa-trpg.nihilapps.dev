import { useQuery } from '@tanstack/react-query';
import { MastersQuery } from '@/src/features';
import { mastersKeys } from '@/src/data';

export function useGetMasters() {
  const query = useQuery({
    queryKey: mastersKeys.getAll,
    queryFn: MastersQuery.getAll,
  });

  return query;
}
