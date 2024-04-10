'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { HeadingItem } from '@/src/components';

interface Props {
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function PageTitle({ children, styles, }: Props) {
  const css = {
    default: twJoin([
      `text-center mb-5 mt-5`,
      styles,
    ]),
    content: twJoin([
      `text-black-base text-center border-t-[5px] border-black-base`,
    ]),
  };

  return (
    <>
      <HeadingItem level='h2' styles={css.default}>
        <span className={css.content}>{children}</span>
      </HeadingItem>
    </>
  );
}
