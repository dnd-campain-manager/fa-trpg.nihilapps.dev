'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { authStore } from '@/src/entities';
import {
  ChangePersonalDataButton, LoadingCircle, MyMasterList, MyPcList, PageTitle, PasswordChangeButton
} from '@/src/components';
import { useGetUserById } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

export function MyPage({ styles, }: Props) {
  const { session, } = authStore();

  const {
    data: userData,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetUserById(session?.userId);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return <LoadingCircle />;
  }

  return (
    <>
      {isSuccess && (
        <div className={css.default}>
          <PageTitle icon='mdi:user'>
            마이페이지
          </PageTitle>

          <div className='flex flex-row gap-2'>
            <ChangePersonalDataButton userData={userData?.data} />
            <PasswordChangeButton />
          </div>

          <MyPcList userData={userData?.data} />
          <MyMasterList userData={userData?.data} />
        </div>
      )}
    </>
  );
}
