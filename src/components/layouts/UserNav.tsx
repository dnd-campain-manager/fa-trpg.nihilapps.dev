'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStore } from '@/src/entities';
import { useSignOut } from '@/src/hooks';
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

  const qc = useQueryClient();
  const signOut = useSignOut();

  const router = useRouter();

  const onClickSignOut = useCallback(
    () => {
      signOut.mutate({
        signInId: session.signInId,
        userId: session.id,
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
      `flex flex-row gap-1 items-center`,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className='flex-1 shrink-0 text-black-base text-middle font-900'>
          {session && (
            <span><strong>{session.name}</strong></span>
          )}
        </div>

        <div className='text-right mb-2 flex flex-row gap-3'>
          {session ? (
            <>
              <Link href='/mypage'>
                <CustomButton color={color}>
                  <SvgIcon icon={userSvg} styles='w-[20px]' /> 마이페이지
                </CustomButton>
              </Link>
              <CustomButton color={color} actions={onClickSignOut}>
                <SvgIcon icon={userLockOpenSvg} styles='w-[20px]' /> 로그아웃
              </CustomButton>
            </>
          ) : (
            <>
              <Link href='/auth/signup'>
                <CustomButton color={color}>
                  <SvgIcon icon={userPlusSvg} styles='w-[20px]' /> 회원가입
                </CustomButton>
              </Link>
              <Link href='/auth/signin'>
                <CustomButton color={color}>
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
