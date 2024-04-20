'use client';

import React, { useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import Link from 'next/link';
import { HeadingItem } from '@/src/components';
import { Card, CardContent } from '@/src/shadcn';
import { ExtendedCampain } from '@/src/entities';
import { Nihil } from '@/src/utils';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

export function CampainItem({ campain, styles, }: Props) {
  const findMainMaster = (campain: ExtendedCampain) => {
    const masters = campain.Master;
    const mainMaster = masters.find((item) => (
      item.masterType === 'mainMaster'
    ));

    const masterName = mainMaster.User.name;

    return masterName;
  };

  const mainMaster = useMemo(() => {
    const master = findMainMaster(campain);

    return master;
  }, [ campain, ]);

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
    itemName: twJoin([
      `inline-block rounded-1 p-1 px-2 mr-2 bg-blue-200 text-black-base font-500`,
    ]),
  };

  return (
    <>
      <Card key={campain.id}>
        <div className='flex flex-row items-stretch p-2 pb-0 gap-2'>
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
        <CardContent className='!p-2 !text-middle flex flex-col gap-1'>
          <p>
            <span className={css.itemName}>캠페인 시작일</span>
            {Nihil.dateToFormat(campain.createdAt)}
          </p>
          {campain.status === 'close' && (
            <p>
              <span className={css.itemName}>캠페인 종료일</span>
              {Nihil.dateToFormat(campain.updatedAt)}
            </p>
          )}
          <p>
            <span className={css.itemName}>메인 마스터</span>
            {mainMaster}
          </p>
          <p>
            <span className={css.itemName}>서브 마스터</span>
            {campain.Master.length !== 0 ? campain.Master.length - 1 : 0}명
          </p>
          <p>
            <span className={css.itemName}>진행 세션수</span>
            {campain.Session.length !== 0 ? campain.Session.length : 0}회
          </p>
          <p>
            <span className={css.itemName}>캠페인 링크</span>
            <a
              href={campain.url}
              target='_blank'
              rel='noreferrer noopener'
              className='underline text-black-base hover:text-blue-500 transition-colors duration-200'
            >
              {campain.url}
            </a>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
