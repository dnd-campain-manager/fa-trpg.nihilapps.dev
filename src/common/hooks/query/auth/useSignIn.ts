import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { SignInDto } from '@/src/entities';

export function useSignIn() {
  const query = useMutation({
    mutationFn: (signInDto: SignInDto) => AuthQuery.signInUser(signInDto),
  });

  return query;
}
