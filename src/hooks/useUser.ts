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
        return {
          name: '',
          email: '',
        };
      }

      return user?.data;
    },
    [ user, isLoading, isFetching, ]
  );

  return {
    userData,
    isLoading,
    isFetching,
  };
}
