import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { TokenRefreshDto } from '@/src/entities';

export function useTokenRefresh() {
  const query = useMutation({
    mutationFn: (tokenRefreshDto: TokenRefreshDto) => AuthQuery.tokenRefresh(tokenRefreshDto),
  });

  return query;
}
