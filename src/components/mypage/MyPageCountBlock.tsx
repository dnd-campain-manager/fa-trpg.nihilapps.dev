'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ExtendedUser } from '@/src/entities';
import { PageTitle } from '@/src/components';

interface Props {
  userData: ExtendedUser;
  styles?: ClassNameValue;
}

export function MyPageCountBlock({ userData, styles, }: Props) {
  const css = {
    default: twJoin([
      `flex flex-row gap-2`,
      styles,
    ]),
    card: twJoin([
      `flex-1 shrink-0 text-center font-500 text-black-base text-middle rounded-2 bg-white py-2`,
    ]),
    title: twJoin([
      `font-900 text-normal`,
    ]),
  };

  return (
    <>
      <PageTitle level='h3' icon='mingcute:game-2-fill' styles='mt-5'>
        플레이 현황
      </PageTitle>

      <div className={css.default}>
        <div className={css.card}>
          <div className={css.title}>플레이 횟수</div>
          {userData.playCount}회
        </div>
        <div className={css.card}>
          <div className={css.title}>안식일 토큰</div>
          {userData.playToken}개
        </div>
        <div className={css.card}>
          <div className={css.title}>마스터링</div>
          {userData.masterCount}회
        </div>
        <div className={css.card}>
          <div className={css.title}>마스터링 포인트</div>
          {userData.masterPoint}개
        </div>
      </div>
    </>
  );
}
