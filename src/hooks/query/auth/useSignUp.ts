import { useMutation } from '@tanstack/react-query';
import { CreateUserDto } from '@/src/entities';
import { UsersQuery } from '@/src/features';

export function useSignUp() {
  const query = useMutation({
    mutationFn: (signUpDto: CreateUserDto) => UsersQuery.create(signUpDto),
  });

  return query;
}
