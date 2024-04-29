'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { ExtendedUser, ExtendedUserPc } from '@/src/entities';
import {
  CustomButton, EmptyContent, ExternalLink, InfoItem, PageTitle, WhiteBlock
} from '@/src/components';
import { classObj, expData } from '@/src/data';

interface Props {
  userData: ExtendedUser;
  styles?: ClassNameValue;
}

export function MyPcList({ userData, styles, }: Props) {
  const pcs = userData?.Pc;

  const totalLevel = (pc: ExtendedUserPc) => {
    if (pc.Class.length === 1) {
      return pc.Class[0].level;
    } else {
      return pc.Class[0].level + pc.Class[1].level;
    }
  };

  const css = {
    default: twJoin([
      `flex flex-col gap-3 text-middle font-500`,
      styles,
    ]),
  };

  return (
    <>
      <PageTitle styles='mt-5' level='h3' icon='fluent:people-community-24-filled'>
        PC 목록
      </PageTitle>

      <div className={css.default}>
        {pcs.length === 0 && (
          <EmptyContent>
            생성한 PC가 없습니다.
          </EmptyContent>
        )}

        {pcs.map((pc) => (
          <WhiteBlock key={pc.id}>
            <div className='flex flex-row items-center'>
              <InfoItem name='캐릭터 이름' styles='flex-1'>
                {pc.name}
              </InfoItem>
              <div className='flex flex-row gap-2'>
                <Link href={`/pcs/${pc.id}/edit`}>
                  <CustomButton h36>PC 수정</CustomButton>
                </Link>
                <Link href={`/pcs/${pc.id}`}>
                  <CustomButton h36>PC 상세 정보</CustomButton>
                </Link>
              </div>
            </div>

            <InfoItem name='클래스 / 레벨'>
              {classObj[pc.Class[0].className]} {pc.Class[0].level}레벨
            </InfoItem>

            <InfoItem name='경험치'>
              {pc.exp}pt / {expData[totalLevel(pc)]}pt
            </InfoItem>

            <InfoItem name='비욘드 주소'>
              <ExternalLink link={pc.url} label={pc.url} />
            </InfoItem>
          </WhiteBlock>
        ))}
      </div>
    </>
  );
}
