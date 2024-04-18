import { useMutation } from '@tanstack/react-query';
import { MastersQuery } from '@/src/features';
import { CreateMasterDto } from '@/src/entities';

export function useCreateMaster() {
  const query = useMutation({
    mutationFn: (createMasterDto: CreateMasterDto) => MastersQuery.create(createMasterDto),
  });

  return query;
}
