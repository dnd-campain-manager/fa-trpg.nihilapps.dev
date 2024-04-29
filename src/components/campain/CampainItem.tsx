'use client';

import React, { useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { CampainItemStatus, HeadingItem, WhiteBlock } from '@/src/components';
import { ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainItem({ campain, styles, }: Props) {
  const status = useMemo(() => {
    const statusLabel = {
      ready: '준비중',
      open: '진행중',
      close: '종료',
    };

    return statusLabel[campain.status];
  }, [ campain, ]);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    heading: twJoin([
      `p-2 py-3 rounded-1 bg-black-100 text-black-base hover:bg-black-base hover:text-white transition-colors duration-200 leading-none`,
    ]),
    status: twJoin([
      `rounded-1 p-1 px-2 text-middle inline-flex items-center justify-center font-900`,
      campain.status === 'ready' && `bg-black-400 text-white`,
      campain.status === 'open' && `bg-green-500 text-white`,
      campain.status === 'close' && `bg-red-500 text-white`,
    ]),
  };

  return (
    <>
      <WhiteBlock>
        <div className='flex flex-row items-stretch pb-0 gap-2'>
          <Link href={`/campains/${campain.id}`} className='shrink-0 flex-1'>
            <HeadingItem
              level='h3'
              styles={css.heading}
            >
              {campain.name}
            </HeadingItem>
          </Link>
          <span className={css.status}>
            {status}
          </span>
        </div>
        <CampainItemStatus campain={campain} />
      </WhiteBlock>
    </>
  );
}
