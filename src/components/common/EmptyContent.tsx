'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function EmptyContent({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      `py-20 text-center text-h3 font-900 text-black-base my-20 select-none`,
      styles,
    ]),
  };

  return (
    <>
      <h3 className={css.default}>
        {children}
      </h3>
    </>
  );
}
