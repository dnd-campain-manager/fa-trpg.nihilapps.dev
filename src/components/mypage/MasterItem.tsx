'use client';

import React from 'react';
import { twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { ExtendedUserMaster } from '@/src/entities';
import {
  CustomButton, InfoItem, WhiteBlock
} from '@/src/components';

interface Props {
  master: ExtendedUserMaster;
}

export function MasterItem({ master, }: Props) {
  const typeString = {
    mainMaster: '메인 마스터',
    subMaster: '보조 마스터',
  };

  const css = {
    top: twJoin([
      `flex flex-row items-center justify-between`,
    ]),
    title: twJoin([
      `font-900`,
    ]),
  };

  return (
    <>
      <WhiteBlock>
        <div className={css.top}>
          <InfoItem name='캠페인 이름'>
            {master.Campain.name}
          </InfoItem>
          <Link
            href={`/campains/${master.campainId}`}
          >
            <CustomButton color='black' h36>
              캠페인 바로가기
            </CustomButton>
          </Link>
        </div>

        <InfoItem name='마스터 유형'>
          {typeString[master.masterType]}
        </InfoItem>

        <InfoItem name='세션 진행 횟수'>
          {master.Session.length}회
        </InfoItem>
      </WhiteBlock>
    </>
  );
}
