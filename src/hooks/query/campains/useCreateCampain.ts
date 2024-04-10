import { useMutation } from '@tanstack/react-query';
import { CampainsQuery } from '@/src/features';
import { CreateCampainDto } from '@/src/entities';

export function useCreateCampain() {
  const query = useMutation({
    mutationFn: (createCampainDto: CreateCampainDto) => (
      CampainsQuery.create(createCampainDto)
    ),
  });

  return query;
}
