import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { ChangePersonalDataDto } from '@/src/entities';

export function UseChangePersonalData() {
  const query = useMutation({
    mutationFn: (changePersonalDataDto: ChangePersonalDataDto) => (
      AuthQuery.changePersonalData(changePersonalDataDto)
    ),
  });

  return query;
}
