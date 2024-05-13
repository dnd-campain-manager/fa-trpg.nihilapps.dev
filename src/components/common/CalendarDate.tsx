'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';

interface Props {
  dateData: string;
  styles?: ClassNameValue;
}

export function CalendarDate({ dateData, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default} data-date={dateData}>content</div>
    </>
  );
}
