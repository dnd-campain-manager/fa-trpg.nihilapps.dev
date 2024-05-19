'use client';

import React, { useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { DatePicker } from '@/src/components';
import { Calendar, Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

export function TestCalendar({ styles, }: Props) {
  const [ date, setDate, ] = useState(
    Calendar.getNowDate()
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <DatePicker date={date} setDate={setDate} />
    </>
  );
}
