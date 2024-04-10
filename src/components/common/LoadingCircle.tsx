'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { loadingSvg } from '@/src/images';
import { SvgIcon } from '@/src/components';

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
        <SvgIcon icon={loadingSvg} styles={css.icon} />
      </div>
    </>
  );
}
