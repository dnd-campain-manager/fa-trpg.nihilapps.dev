import { useMutation } from '@tanstack/react-query';
import { UpdateCampainDto } from '@/src/entities';
import { CampainsQuery } from '@/src/features';

export function useUpdateCampain(id: string) {
  const query = useMutation({
    mutationFn: (updateCampainDto: UpdateCampainDto) => (
      CampainsQuery.update(id, updateCampainDto)
    ),
  });

  return query;
}
