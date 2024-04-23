'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { authStore } from '@/src/entities';
import {
  ChangePersonalDataButton, PageTitle, PasswordChangeButton
} from '@/src/components';
import { useUser } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

export function MyPage({ styles, }: Props) {
  const { session, } = authStore();

  const userData = useUser(session.userId);

  console.log('userData >> ', userData);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <PageTitle icon='mdi:user'>
          마이페이지
        </PageTitle>

        <div className='flex flex-row gap-2'>
          <ChangePersonalDataButton />
          <PasswordChangeButton />
        </div>
      </div>
    </>
  );
}
