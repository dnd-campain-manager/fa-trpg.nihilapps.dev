'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { MingcuteLoadingFill } from '@/src/images';

interface Props {
  styles?: ClassNameValue;
}

export function LoadingCircle({ styles, }: Props) {
  const css = {
    default: twJoin([
      `flex flex-row items-center justify-center`,
      styles,
    ]),
    icon: twJoin([
      `animate-spin-2 w-[50px] h-[50px]`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <MingcuteLoadingFill className={css.icon} />
      </div>
    </>
  );
}
