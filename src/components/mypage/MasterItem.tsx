'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { ExtendedUserMaster } from '@/src/entities';
import { CustomButton } from '@/src/components';

interface Props {
  master: ExtendedUserMaster;
  styles?: ClassNameValue;
}

export function MasterItem({ master, styles, }: Props) {
  const typeString = {
    mainMaster: '메인 마스터',
    subMaster: '보조 마스터',
  };

  const css = {
    default: twJoin([
      `bg-white p-2 rounded-2 text-black-base font-500 text-middle flex flex-col gap-1`,
      styles,
    ]),
    top: twJoin([
      `flex flex-row items-center justify-between`,
    ]),
    itemName: twJoin([
      `bg-blue-200 rounded-1 p-1 px-3 inline-block mr-2 font-900 h-[36px]`,
    ]),
    title: twJoin([
      `font-900`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className={css.top}>
          <h4 className={css.title}>
            <span className={css.itemName}>캠페인 이름</span>
            {master.Campain.name}
          </h4>
          <Link
            href={`/campains/${master.campainId}`}
          >
            <CustomButton color='black' h36>
              캠페인 바로가기
            </CustomButton>
          </Link>
        </div>

        <div className='flex flex-row items-center'>
          <span className={css.itemName}>
            마스터 유형
          </span>
          {typeString[master.masterType]}
        </div>
        <div className='flex flex-row items-center'>
          <span className={css.itemName}>
            진행 세션 횟수
          </span>
          {master.Session.length}회
        </div>
      </div>
    </>
  );
}
