'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';
import { CalendarItem, CalendarTopRow } from '@/src/components';
import { CalendarMonthData } from '@/src/entities';
import { Nihil } from '@/src/utils';

interface Props {
  data: CalendarMonthData[][];
  date: string;
  setDate: any;
  form: UseFormReturn;
  name: string;
  styles?: ClassNameValue;
}

export function CalendarContent({
  data, date, setDate, form, name, styles,
}: Props) {
  const css = {
    default: twJoin([
      `flex flex-col gap-1 w-full items-stretch px-2 pb-2`,
      styles,
    ]),
    row: twJoin([
      `flex flex-row gap-1 items-stretch`,
    ]),
  };

  return (
    <div>
      <CalendarTopRow />
      <div className={css.default}>
        {data.map((row) => (
          <div key={Nihil.uuid()} className={css.row}>
            {row.map((item) => (
              <CalendarItem
                key={item.fullDate}
                item={item}
                setDate={setDate}
                date={date}
                form={form}
                name={name}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
