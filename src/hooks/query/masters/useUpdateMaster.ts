import { useMutation } from '@tanstack/react-query';
import { UpdateMasterDto } from '@/src/entities';
import { MastersQuery } from '@/src/features';

export function useUpdateMaster(id: string) {
  const query = useMutation({
    mutationFn: (updateMasterDto: UpdateMasterDto) => MastersQuery.update(
      id,
      updateMasterDto
    ),
  });

  return query;
}
