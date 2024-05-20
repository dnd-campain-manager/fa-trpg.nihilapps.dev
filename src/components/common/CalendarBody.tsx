'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  children: React.ReactNode;
  open: boolean;
  styles?: ClassNameValue;
}

export function CalendarBody({ children, open, styles, }: Props) {
  const css = {
    default: twJoin([
      `bg-white rounded-2 text-middle text-black-base transition-[opacity,height] duration-200 h-0 opacity-0`,
      open && `opacity-100 h-[320px] mt-2`,
      !open && `overflow-y-hidden`,
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

export const MemoCalendarBody = React
  .memo(CalendarBody);
