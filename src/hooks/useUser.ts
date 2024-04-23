import { useMemo } from 'react';
import { useGetUserById } from '@/src/hooks';

export function useUser(userId: string) {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useGetUserById(userId);

  const userData = useMemo(
    () => {
      if (isLoading || isFetching) {
        return null;
      }

      const { data, } = user;

      return data;
    },
    [ isLoading, isFetching, ]
  );

  return userData;
}
