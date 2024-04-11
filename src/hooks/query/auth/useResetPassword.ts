import { useMutation } from '@tanstack/react-query';
import { AuthQuery } from '@/src/features';
import { ResetPasswordDto } from '@/src/entities';

export function useResetPassword() {
  const query = useMutation({
    mutationFn: (resetPasswordDto: ResetPasswordDto) => (
      AuthQuery.resetPassword(resetPasswordDto)
    ),
  });

  return query;
}
