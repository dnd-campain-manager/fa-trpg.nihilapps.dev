'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function WhiteBlock({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      `p-3 bg-white font-500 rounded-2 text-middle space-y-2`,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        {children}
      </div>
    </>
  );
}
