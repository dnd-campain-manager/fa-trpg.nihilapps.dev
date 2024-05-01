'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import {
  CustomButton, ExternalLink, InfoItem, WhiteBlock
} from '@/src/components';
import { classObj, expData } from '@/src/data';
import { authStore, ExtendedPc, ExtendedUserPc } from '@/src/entities';

interface Props {
  pc: ExtendedUserPc | ExtendedPc;
  styles?: ClassNameValue;
}

export function PcListItem({ pc, styles, }: Props) {
  const { session, } = authStore();

  const isMyPc = session?.userId === pc.userId;
  const isDev = process.env.NODE_ENV === 'development';

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <WhiteBlock key={pc.id}>
        <div className='flex flex-row items-center'>
          <InfoItem name='캐릭터 이름' styles='flex-1'>
            {pc.name}
          </InfoItem>
          <div className='flex flex-row gap-2'>
            {(isDev || isMyPc) && (
              <Link href={`/pcs/${pc.id}/edit`}>
                <CustomButton h36>PC 수정</CustomButton>
              </Link>
            )}
            <Link href={`/pcs/${pc.id}`}>
              <CustomButton h36>PC 상세 정보</CustomButton>
            </Link>
            <Link href={`/campains/${pc.campainId}`}>
              <CustomButton h36>{pc.Campain.name}</CustomButton>
            </Link>
          </div>
        </div>

        <InfoItem name='레벨'>
          {pc.totalLevel}
        </InfoItem>

        <InfoItem name='클래스'>
          {classObj[pc.Class[0].className]} {pc.Class[0].level}레벨
          {pc.Class[1] && (
            <>{classObj[pc.Class[1].className]} {pc.Class[1].level}레벨</>
          )}
        </InfoItem>

        <InfoItem name='경험치'>
          {pc.exp}pt / {expData[pc.totalLevel]}pt
        </InfoItem>

        <InfoItem name='플레이어'>
          {(pc as ExtendedPc).User.name}
        </InfoItem>

        <InfoItem name='비욘드 주소'>
          <ExternalLink link={pc.url} label={pc.url} />
        </InfoItem>
      </WhiteBlock>
    </>
  );
}
