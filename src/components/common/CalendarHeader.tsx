'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { UseFormReturn } from 'react-hook-form';
import { Calendar, Nihil } from '@/src/utils';
import { MonthData } from '@/src/entities';

interface Props {
  monthData: MonthData;
  setMonthData: any;
  setMonthArray: any;
  setDate: any;
  form: UseFormReturn;
  name: string;
  styles?: ClassNameValue;
}

export function CalendarHeader({
  monthData, setMonthData, setMonthArray, setDate, form, name, styles,
}: Props) {
  const now = Nihil.getDateInfo();

  const onClickNext = useCallback(
    () => {
      setMonthData(Calendar.monthData(monthData.next));
      setMonthArray(Calendar.monthArray(monthData.next));
    },
    [ monthData, ]
  );

  const onClickPrev = useCallback(
    () => {
      setMonthData(Calendar.monthData(monthData.prev));
      setMonthArray(Calendar.monthArray(monthData.prev));
    },
    [ monthData, ]
  );

  const onClickNow = useCallback(
    () => {
      setMonthData(Calendar.monthData(`${now.year}-${now.month}`));
      setMonthArray(Calendar.monthArray(`${now.year}-${now.month}`));
      setDate(`${now.year}-${now.month}-${now.date}`);

      form.setValue(name, `${now.year}-${now.month}-${now.date}`);
    },
    [ name, now, ]
  );

  const css = {
    default: twJoin([
      `flex flex-row justify-between items-center p-2`,
      styles,
    ]),
    buttons: twJoin([
      `flex flex-row gap-2`,
    ]),
    button: twJoin([
      `p-1 px-2 rounded-1 bg-primary hover:bg-blue-500 text-white transition-colors duration-200`,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <div className='pl-2 font-900 text-[120%]'>{monthData.now}</div>
        <div className={css.buttons}>
          <button onClick={onClickNow} type='button' className={css.button}>
            오늘
          </button>
          <button onClick={onClickPrev} type='button' className={css.button} aria-label='prev-month'>
            <Icon icon='raphael:arrowleft' />
          </button>
          <button onClick={onClickNext} type='button' className={css.button} aria-label='next-month'>
            <Icon icon='raphael:arrowright' />
          </button>
        </div>
      </div>
    </>
  );
}
