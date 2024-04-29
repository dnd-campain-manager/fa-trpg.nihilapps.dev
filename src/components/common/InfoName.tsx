'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function InfoName({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      `flex flex-row items-center justify-center rounded-1 p-1 px-2 mr-2 bg-blue-200 text-black-base font-900 text-center w-[140px] shrink-0`,
      styles,
    ]),
  };

  return (
    <>
      <span className={css.default}>{children}</span>
    </>
  );
}
