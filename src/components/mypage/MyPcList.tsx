'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ExtendedUser, ExtendedUserPc } from '@/src/entities';
import { CustomButton, EmptyContent, PageTitle } from '@/src/components';
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
    itemName: twJoin([
      `bg-blue-200 rounded-1 p-1 px-3 inline-block h-[36px] font-900`,
    ]),
  };

  return (
    <>
      <PageTitle styles='mt-5' level='h3' icon=''>
        PC 목록
      </PageTitle>

      <div className={css.default}>
        {pcs.length === 0 && (
          <EmptyContent>
            생성한 PC가 없습니다.
          </EmptyContent>
        )}

        {pcs.map((pc) => (
          <div key={pc.id} className='flex flex-col gap-1 bg-white p-2 rounded-2'>
            <div className='flex flex-row items-center'>
              <div className='flex flex-row gap-2 items-center flex-1 shrink-0'>
                <span className={css.itemName}>캐릭터 이름</span>
                <h4>{pc.name}</h4>
              </div>
              <div className='flex flex-row gap-2'>
                <CustomButton h36>PC 수정</CustomButton>
                <a href={pc.url} target='_blank' rel='noopener noreferrer'>
                  <CustomButton h36>비욘드 페이지</CustomButton>
                </a>
              </div>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <span className={css.itemName}>클래스 / 레벨</span>
              <p>{classObj[pc.Class[0].className]} {pc.Class[0].level}레벨</p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
              <span className={css.itemName}>경험치</span>
              <p>{pc.exp}pt / {expData[totalLevel(pc)]}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
