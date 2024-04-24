import { useMutation } from '@tanstack/react-query';
import { UpdatePcDto } from '@/src/entities';
import { PcsQuery } from '@/src/features';

export function useUpdatePc(id: string) {
  const query = useMutation({
    mutationFn: (updatePcDto: UpdatePcDto) => (
      PcsQuery.update(id, updatePcDto)
    ),
  });

  return query;
}
