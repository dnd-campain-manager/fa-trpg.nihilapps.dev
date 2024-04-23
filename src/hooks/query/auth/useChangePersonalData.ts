import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { ChangePersonalDataDto } from '@/src/entities';
import { usersKeys } from '@/src/data';

export function UseChangePersonalData(
  userId: string
) {
  const qc = useQueryClient();

  const query = useMutation({
    mutationFn: (changePersonalDataDto: ChangePersonalDataDto) => (
      AuthQuery.changePersonalData(changePersonalDataDto)
    ),
    onSettled() {
      qc.invalidateQueries({
        queryKey: usersKeys.getById(userId),
      });
    },
  });

  return query;
}
