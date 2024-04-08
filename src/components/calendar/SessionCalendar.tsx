'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Calendar } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

export function SessionCalendar({ styles, }: Props) {
  console.log(Calendar.monthData());
  console.log(Calendar.monthData(null, 1));

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <div>content</div>
    </>
  );
}
