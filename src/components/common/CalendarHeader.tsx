'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Calendar } from '@/src/utils';
import { MonthData } from '@/src/entities';

interface Props {
  monthData: MonthData;
  setMonthData: any;
  setMonthArray: any;
  styles?: ClassNameValue;
}

export function CalendarHeader({
  monthData, setMonthData, setMonthArray, styles,
}: Props) {
  console.log({
    now: monthData.now,
    prev: monthData.prev,
    next: monthData.next,
  });

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
          <button onClick={onClickPrev} className={css.button}>이전</button>
          <button onClick={onClickNext} className={css.button}>다음</button>
        </div>
      </div>
    </>
  );
}
