'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  styles?: ClassNameValue;
}

const days = [
  '일', '월', '화', '수', '목', '금', '토',
];

export function CalendarTopRow({ styles, }: Props) {
  const css = {
    default: twJoin([
      `flex flex-row px-2 gap-1`,
      styles,
    ]),
    item: twJoin([
      `flex-1 shrink-0 text-center font-900 p-1`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        {days.map((item) => (
          <div key={item} className={css.item}>{item}</div>
        ))}
      </div>
    </>
  );
}
