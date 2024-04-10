import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { SignOutDto } from '@/src/entities';

export function useSignOut() {
  const query = useMutation({
    mutationFn: (signOutDto: SignOutDto) => AuthQuery.signOutUser(signOutDto),
  });

  return query;
}
