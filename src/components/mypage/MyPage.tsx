'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { authStore } from '@/src/entities';
import {
  ChangePersonalDataButton,
  LoadingCircle,
  MyMasteringList,
  MyPageCountBlock,
  MyPcList,
  PageTitle,
  PasswordChangeButton
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

          <MyPageCountBlock userData={userData?.data} />

          <PageTitle styles='mt-5' level='h3' icon='fluent:people-community-24-filled'>
            PC 목록
          </PageTitle>

          <MyPcList />

          <PageTitle styles='mt-5' level='h3' icon='iconoir:hexagon-dice'>
            마스터링 중 캠페인
          </PageTitle>

          <MyMasteringList status='open' />

          <PageTitle styles='mt-5' level='h3' icon='iconoir:hexagon-dice'>
            마스터링 종료 캠페인
          </PageTitle>

          <MyMasteringList status='close' />
        </div>
      )}
    </>
  );
}
