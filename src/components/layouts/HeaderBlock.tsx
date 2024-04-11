'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  CustomButton, LogoBlock, NavBlock, UserNav
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
      `pt-5 w-full mo-md:max-w-[940px] mx-auto px-5`,
      styles,
    ]),
  };

  return (
    <header className={css.default}>
      <UserNav />

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
