'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { authStore } from '@/src/entities';
import { CustomButton, PageTitle } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

export function MyPage({ styles, }: Props) {
  const { session, } = authStore();

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
          <CustomButton full>개인정보 수정</CustomButton>
          <CustomButton full>비밀번호 변경</CustomButton>
        </div>
      </div>
    </>
  );
}
