'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStore } from '@/src/entities';
import { useGetUserById, useSignOut } from '@/src/hooks';
import { CustomButton, LoadingCircle, SvgIcon } from '@/src/components';
import {
  userLockOpenSvg, userLockSvg, userPlusSvg, userSvg
} from '@/src/images';
import { Skeleton } from '@/src/shadcn';

interface Props {
  color?: 'black' | 'white';
  styles?: ClassNameValue;
}

export function UserNav({ color = 'black', styles, }: Props) {
  const { session, removeSession, } = authStore();

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useGetUserById(session?.userId);

  const qc = useQueryClient();
  const signOut = useSignOut();

  const router = useRouter();

  const onClickSignOut = useCallback(
    () => {
      signOut.mutate({
        signInId: session.signInId,
        userId: session.userId,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          removeSession();

          router.push('/');
        },
      });
    },
    [ session, ]
  );

  const css = {
    default: twJoin([
      `flex flex-row gap-1 items-center mb-2`,
      styles,
    ]),
  };

  if (isLoading || isFetching) {
    return (
      <div className='justify-end flex flex-row gap-3 mb-2'>
        <Skeleton className='!h-[36px] !w-[80px]' />
        <Skeleton className='!h-[36px] !w-[135px]' />
        <Skeleton className='!h-[36px] !w-[120px]' />
      </div>
    );
  }

  return (
    <>
      <div className={css.default}>
        <div className='flex-1 shrink-0 text-black-base text-middle'>
          {session && (
            <span className='inline-block p-1 px-2 rounded-1 bg-white'>
              <strong className='font-900'>{userData?.data.name}</strong>님 환영합니다.
            </span>
          )}
        </div>

        <div className='text-right flex flex-row gap-3'>
          {session ? (
            <>
              <Link href='/admin'>
                <CustomButton color={color} h36 styles='!w-[80px]'>
                  관리자
                </CustomButton>
              </Link>
              <Link href='/mypage'>
                <CustomButton color={color} h36 styles='!w-[135px]'>
                  <SvgIcon icon={userSvg} styles='w-[20px]' /> 마이페이지
                </CustomButton>
              </Link>
              <CustomButton color={color} h36 actions={onClickSignOut} styles='!w-[120px]'>
                <SvgIcon icon={userLockOpenSvg} styles='w-[20px]' /> 로그아웃
              </CustomButton>
            </>
          ) : (
            <>
              <Link href='/auth/signup'>
                <CustomButton color={color} h36 styles='!w-[135px]'>
                  <SvgIcon icon={userPlusSvg} styles='w-[20px]' /> 회원가입
                </CustomButton>
              </Link>
              <Link href='/auth/signin'>
                <CustomButton color={color} h36 styles='!w-[120px]'>
                  <SvgIcon icon={userLockSvg} styles='w-[20px]' /> 로그인
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
