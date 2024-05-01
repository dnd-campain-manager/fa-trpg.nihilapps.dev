'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { CustomButton } from '@/src/components';
import { Api } from '@/src/utils';
import { UserData } from '@/src/entities';

interface Props {
  styles?: ClassNameValue;
}

export function UserSyncButton({ styles, }: Props) {
  const qc = useQueryClient();

  const onClickSync = useCallback(
    () => {
      qc.fetchQuery({
        queryKey: [ 'getUserData', ],
        queryFn: async () => {
          const { data, } = await Api.get<UserData>('/');
          return data;
        },
      });
    },
    [ qc, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <CustomButton type='button' h36 actions={onClickSync} styles='w-full'>
        플레이어 목록 동기화
      </CustomButton>
    </>
  );
}
