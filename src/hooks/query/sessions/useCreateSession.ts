import { useMutation } from '@tanstack/react-query';
import { SessionsQuery } from '@/src/features';
import { CreateSessionsDto } from '@/src/entities';

export function useCreateSession() {
  const query = useMutation({
    mutationFn: (createSessionDto: CreateSessionsDto) => (
      SessionsQuery.create(createSessionDto)
    ),
  });

  return query;
}
