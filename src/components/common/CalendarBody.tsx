'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  CalendarDate, CalendarRow, CalendarTopRow, CalendarYearSelector
} from '@/src/components';
import { Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

export function CalendarBody({ styles, }: Props) {
  const data = [];

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <CalendarYearSelector />
        <CalendarTopRow />
        {data.map((item) => (
          <CalendarDate
            key={Nihil.uuid()}
            dateData={item}
          />
        ))}
      </div>
    </>
  );
}
