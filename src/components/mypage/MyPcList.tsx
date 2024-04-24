'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ExtendedUser } from '@/src/entities';
import { PageTitle } from '@/src/components';
import { classObj } from '@/src/data';

interface Props {
  userData: ExtendedUser;
  styles?: ClassNameValue;
}

export function MyPcList({ userData, styles, }: Props) {
  const pcs = userData?.Pc;

  console.log(pcs);

  const css = {
    default: twJoin([
      `flex flex-col gap-3`,
      styles,
    ]),
  };

  return (
    <>
      <PageTitle styles='mt-5' level='h3' icon=''>
        PC 목록
      </PageTitle>

      <div className={css.default}>
        {pcs.length === 0 && (
          <p className='font-900 text-h4 text-center text-black-base py-10'>
            생성한 PC가 없습니다.
          </p>
        )}

        {pcs.map((pc) => (
          <div key={pc.id}>
            <h4>{pc.name}</h4>
            <div>
              <p>{classObj[pc.Class[0].className]} {pc.Class[0].level}레벨</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
