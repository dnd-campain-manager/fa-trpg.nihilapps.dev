'use client';

import React from 'react';
import Link from 'next/link';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { SvgIcon } from '@/src/components';
import { archiveSvg, calendarSvg } from '@/src/images';

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
      `rounded-2 p-2 hover:bg-black-100 transition-colors duration-200 text-middle font-500`,
    ]),
  };

  return (
    <>
      <nav className={css.default}>
        <Link href='/calendar' className={css.link}>
          <SvgIcon icon={calendarSvg} /> 세션 일정
        </Link>
        <Link href='/campains' className={css.link}>
          <SvgIcon icon={archiveSvg} /> 캠페인 목록
        </Link>
        <Link href='/pcs' className={css.link}>
          PC 목록
        </Link>
      </nav>
    </>
  );
}
