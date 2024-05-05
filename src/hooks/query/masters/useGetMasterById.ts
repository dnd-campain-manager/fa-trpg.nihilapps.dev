import { useQuery } from '@tanstack/react-query';
import { mastersKeys } from '@/src/data';
import { MastersQuery } from '@/src/features';

export function useGetMasterById(id: string) {
  const query = useQuery({
    queryKey: mastersKeys.getById(id),
    queryFn: () => MastersQuery.getById(id),
  });

  return query;
}
