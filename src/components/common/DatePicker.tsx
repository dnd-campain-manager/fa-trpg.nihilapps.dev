'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { CalendarBody, CalendarContent, CalendarHeader } from '@/src/components';
import { Calendar } from '@/src/utils';

interface Props {
  date?: string;
  setDate?: any;
  initDate?: string;
  styles?: ClassNameValue;
}

export function DatePicker({
  date, setDate, initDate, styles,
}: Props) {
  const [ open, setOpen, ] = useState(false);

  console.log('date >> ', date);

  const [ monthData, setMonthData, ] = useState(
    Calendar.monthData(initDate)
  );

  const [ monthArray, setMonthArray, ] = useState(
    Calendar.monthArray(initDate)
  );

  console.log({
    monthData,
    monthArray,
  });

  const onClickOpen = useCallback(
    () => {
      setOpen((prev) => !prev);
    },
    []
  );

  const css = {
    default: twJoin([
      `w-[350px]`,
      styles,
    ]),
    selected: twJoin([
      `flex flex-row justify-between items-center text-middle bg-white p-2 rounded-2`,
    ]),
  };

  return (
    <div className={css.default}>
      <div className={css.selected}>
        <Icon icon='mdi:calendar' fontSize={22} />
        <div>{date}</div>
        <button onClick={onClickOpen} className='rounded-1 p-2 px-3 hover:bg-black-200 transition-colors duration-200'>
          {open ? (
            <Icon icon='raphael:arrowup' />
          ) : (
            <Icon icon='raphael:arrowdown' />
          )}
        </button>
      </div>

      <CalendarBody open={open}>
        <CalendarHeader
          monthData={monthData}
          setMonthData={setMonthData}
          setMonthArray={setMonthArray}
        />
        <CalendarContent
          data={monthArray}
          date={date}
          setDate={setDate}
        />
      </CalendarBody>
    </div>
  );
}
