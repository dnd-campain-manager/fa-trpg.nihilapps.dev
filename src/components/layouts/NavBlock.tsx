'use client';

import React from 'react';
import Link from 'next/link';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { SvgIcon } from '@/src/components';
import { archiveSvg, calendarSvg, peopleSvg } from '@/src/images';

interface Props {
  styles?: ClassNameValue
}

export function NavBlock({ styles, }: Props) {
  const css = {
    default: twJoin([
      `flex flex-row gap-2`,
      styles,
    ]),
    link: twJoin([
      `flex flex-row gap-1 items-center rounded-2 px-2 hover:text-blue-500 transition-colors duration-200 text-middle font-500`,
    ]),
  };

  return (
    <>
      <nav className={css.default}>
        <Link href='/calendar' className={css.link}>
          <SvgIcon icon={calendarSvg} styles='w-[25px] h-auto' /> 세션 일정
        </Link>
        <Link href='/campains' className={css.link}>
          <SvgIcon icon={archiveSvg} styles='w-[25px] h-auto' /> 캠페인 목록
        </Link>
        <Link href='/pcs' className={css.link}>
          <SvgIcon icon={peopleSvg} styles='w-[25px] h-auto' /> PC 목록
        </Link>
      </nav>
    </>
  );
}
