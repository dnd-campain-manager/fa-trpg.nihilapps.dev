import { useMutation } from '@tanstack/react-query';
import { Api } from '@/src/utils';
import { UserData } from '@/src/entities';

async function userSync() {
  const { data, } = await Api.post<UserData, null>(
    '/api',
    null
  );

  return data;
}

export function useUserSync() {
  const query = useMutation({
    mutationFn: () => userSync(),
  });

  return query;
}
