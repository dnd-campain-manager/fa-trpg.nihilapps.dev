'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { UseFormReturn } from 'react-hook-form';
import { CalendarBody, CalendarContent, CalendarHeader } from '@/src/components';
import { Calendar, Nihil } from '@/src/utils';

interface Props {
  date?: string;
  setDate?: any;
  initDate?: string;
  required?: boolean
  disabled?: boolean;
  name: string;
  form: UseFormReturn;
  styles?: ClassNameValue;
}

export function DatePicker({
  date, setDate, initDate, required, disabled, name, form, styles,
}: Props) {
  const [ open, setOpen, ] = useState(false);

  console.log(initDate);
  console.log('date >> ', date);

  const [ monthData, setMonthData, ] = useState(
    Calendar.monthData(initDate)
  );

  const [ monthArray, setMonthArray, ] = useState(
    Calendar.monthArray(initDate)
  );

  console.log(form.getValues());

  useEffect(() => {
    setDate(initDate);
    form.setValue(name, initDate, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [ name, initDate, ]);

  console.log({
    monthData,
    monthArray,
  });

  const onClickOpen = useCallback(
    () => {
      if (disabled) {
        return;
      }

      setOpen((prev) => !prev);
    },
    [ disabled, ]
  );

  const onClickClear = useCallback(
    () => {
      if (disabled) {
        return;
      }

      setDate('');
      form.setValue(name, '', {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    },
    [ name, disabled, ]
  );

  const css = {
    default: twJoin([
      `w-[335px] select-none`,
      styles,
    ]),
    selected: twJoin([
      `flex flex-row justify-between items-center text-middle bg-white p-2 rounded-2 border-2 border-primary h-[40px] font-500`,
      required && !date && `!border-red-500 text-red-500`,
      required && date && `!border-blue-500 text-blue-500`,
      disabled && `!border-black-300 text-black-300 !bg-black-100`,
    ]),
  };

  return (
    <div className={css.default}>
      <div className={css.selected}>
        <Icon icon='mdi:calendar' fontSize={22} />
        <div>
          {date ? (
            Nihil.dateToFormat(date)
          ) : (
            '날짜를 선택하세요.'
          )}
        </div>
        <div>
          {date && !disabled && (
            <button onClick={onClickClear} aria-label='clear'>
              <Icon icon='pepicons-pop:times' />
            </button>
          )}
          <button onClick={onClickOpen} className='rounded-1 p-1 hover:bg-black-200 transition-colors duration-200'>
            {open ? (
              <Icon icon='raphael:arrowup' />
            ) : (
              <Icon icon='raphael:arrowdown' />
            )}
          </button>
        </div>
      </div>

      <CalendarBody open={open}>
        <CalendarHeader
          monthData={monthData}
          setMonthData={setMonthData}
          setMonthArray={setMonthArray}
          setDate={setDate}
          form={form}
          name={name}
        />
        <CalendarContent
          data={monthArray}
          date={date}
          setDate={setDate}
          form={form}
          name={name}
        />
      </CalendarBody>
    </div>
  );
}

export const MemoDatePicker = React
  .memo(DatePicker);
