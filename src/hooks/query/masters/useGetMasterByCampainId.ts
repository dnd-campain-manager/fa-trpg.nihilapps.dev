import { useQuery } from '@tanstack/react-query';
import { mastersKeys } from '@/src/data';
import { MastersQuery } from '@/src/features';

export function useGetMasterByCampainId(campainId: string) {
  const query = useQuery({
    queryKey: mastersKeys.getByCampainId(campainId),
    queryFn: () => MastersQuery.getByCampainId(campainId),
  });

  return query;
}
