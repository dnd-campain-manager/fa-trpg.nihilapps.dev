'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  CustomButton, LogoBlock, NavBlock
} from '@/src/components';
import { Card, CardContent } from '@/src/shadcn';
import { authStore } from '@/src/entities';
import { useSignOut } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

export function HeaderBlock({ styles, }: Props) {
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
      `mt-5 mx-5`,
      styles,
    ]),
  };

  return (
    <header className={css.default}>
      <div className='flex flex-row gap-2 items-center justify-end mb-2 w-full mo-md:max-w-[900px] mx-auto'>
        {session ? (
          <>
            <Link href='/mypage'>
              <CustomButton
                icon='mdi:user'
                styles='border-2 border-blue-500 font-500 text-blue-500'
              >
                마이페이지
              </CustomButton>
            </Link>
            <CustomButton
              icon='mdi:user-lock-open'
              actions={onClickSignOut}
              styles='border-2 border-blue-500 font-500 text-blue-500'
            >
              로그아웃
            </CustomButton>
          </>
        ) : (
          <>
            <Link href='/auth/signup'>
              <CustomButton
                icon='mdi:user-plus'
                styles='border-2 border-blue-500 font-500 text-blue-500'
              >
                회원가입
              </CustomButton>
            </Link>
            <Link href='/auth/signin'>
              <CustomButton
                icon='mdi:user-lock'
                styles='border-2 border-blue-500 font-500 text-blue-500'
              >
                로그인
              </CustomButton>
            </Link>
          </>
        )}
      </div>
      <Card className='w-full mo-md:max-w-[900px] mx-auto'>
        <CardContent className='!p-2 flex flex-col items-center'>
          <LogoBlock />

          <div>
            <NavBlock />
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
