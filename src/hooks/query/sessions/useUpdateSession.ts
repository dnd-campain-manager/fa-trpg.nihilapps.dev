import { useMutation } from '@tanstack/react-query';
import { UpdateSessionDto } from '@/src/entities';
import { SessionsQuery } from '@/src/features';

export function useUpdateSession(id: string) {
  const query = useMutation({
    mutationFn: (updateSessionDto: UpdateSessionDto) => (
      SessionsQuery.update(id, updateSessionDto)
    ),
  });

  return query;
}
