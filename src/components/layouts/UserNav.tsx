'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authStore } from '@/src/entities';
import { useSignOut } from '@/src/hooks';
import { CustomButton } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

export function UserNav({ styles, }: Props) {
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
      `text-right mb-2`,
      styles,
    ]),
  };

  return (
    <>
      <header className={css.default}>
        {session ? (
          <>
            <Link href='/mypage'>
              <CustomButton icon='mdi:user' styles='mr-3'>마이페이지</CustomButton>
            </Link>
            <CustomButton icon='mdi:user-lock-open' actions={onClickSignOut}>로그아웃</CustomButton>
          </>
        ) : (
          <>
            <Link href='/auth/signup'>
              <CustomButton icon='mdi:user-plus' styles='mr-3'>회원가입</CustomButton>
            </Link>
            <Link href='/auth/signin'>
              <CustomButton icon='mdi:user-lock'>로그인</CustomButton>
            </Link>
          </>
        )}
      </header>
    </>
  );
}
