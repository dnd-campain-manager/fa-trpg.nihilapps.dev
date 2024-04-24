import { useMutation } from '@tanstack/react-query';
import { CreatePcDto } from '@/src/entities';
import { PcsQuery } from '@/src/features';

export function useCreatePc() {
  const query = useMutation({
    mutationFn: (createPcDto: CreatePcDto) => (
      PcsQuery.create(createPcDto)
    ),
  });

  return query;
}
