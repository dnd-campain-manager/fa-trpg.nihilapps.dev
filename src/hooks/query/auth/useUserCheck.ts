import { useMutation } from '@tanstack/react-query';
import { UserCheck } from '@/src/entities';
import { AuthQuery } from '@/src/features';

export function useUserCheck() {
  const query = useMutation({
    mutationFn: (userCheckDto: UserCheck) => AuthQuery.userCheck(userCheckDto),
  });

  return query;
}
