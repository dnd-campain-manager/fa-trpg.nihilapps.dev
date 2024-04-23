'use client';

import React, { useCallback, useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStore } from '@/src/entities';
import { useGetUserById, useSignOut } from '@/src/hooks';
import { CustomButton, SvgIcon } from '@/src/components';
import {
  userLockOpenSvg, userLockSvg, userPlusSvg, userSvg
} from '@/src/images';

interface Props {
  color?: 'black' | 'white';
  styles?: ClassNameValue;
}

export function UserNav({ color = 'black', styles, }: Props) {
  const { session, removeSession, } = authStore();

  const user = useGetUserById(session.userId);

  const userData = useMemo(
    () => {
      if (user.isLoading || user.isFetching) {
        return null;
      }

      const {
        data,
      } = user.data;

      return data;
    },
    [ user.isLoading, user.isFetching, ]
  );

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

  return (
    <>
      <div className={css.default}>
        <div className='flex-1 shrink-0 text-black-base text-middle font-900'>
          {session && (
            <span><strong>{userData.name}</strong></span>
          )}
        </div>

        <div className='text-right flex flex-row gap-3'>
          {session ? (
            <>
              <Link href='/mypage'>
                <CustomButton color={color} h36>
                  <SvgIcon icon={userSvg} styles='w-[20px]' /> 마이페이지
                </CustomButton>
              </Link>
              <CustomButton color={color} h36 actions={onClickSignOut}>
                <SvgIcon icon={userLockOpenSvg} styles='w-[20px]' /> 로그아웃
              </CustomButton>
            </>
          ) : (
            <>
              <Link href='/auth/signup'>
                <CustomButton color={color} h36>
                  <SvgIcon icon={userPlusSvg} styles='w-[20px]' /> 회원가입
                </CustomButton>
              </Link>
              <Link href='/auth/signin'>
                <CustomButton color={color} h36>
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
