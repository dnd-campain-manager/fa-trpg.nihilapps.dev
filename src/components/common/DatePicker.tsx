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
  withTime?: boolean;
  styles?: ClassNameValue;
}

export function DatePicker({
  date, setDate, initDate, required, disabled, name, form, withTime, styles,
}: Props) {
  const [ calendarOpen, setCalendarOpen, ] = useState(false);
  const [ timeOpen, setTimeOpen, ] = useState(false);

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

  const onClickCalendarOpen = useCallback(
    () => {
      if (disabled) {
        return;
      }

      setCalendarOpen((prev) => !prev);
    },
    [ disabled, ]
  );

  const onClickTimeOpen = useCallback(
    () => {
      if (disabled) {
        return;
      }

      setTimeOpen((prev) => !prev);
    },
    [ disabled, ]
  );

  const onClickCalendarClear = useCallback(
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
    calendarToggle: twJoin([
      `p-1 bg-black-100 rounded-1 hover:bg-black-400 hover:text-white transition-colors duration-200`,
      calendarOpen && `bg-blue-500 text-white hover:!text-white hover:!bg-blue-500`,
    ]),
    timeToggle: twJoin([
      `p-1 bg-black-100 rounded-1 hover:bg-black-400 hover:text-white transition-colors duration-200`,
      timeOpen && `bg-blue-500 text-white hover:!text-white hover:!bg-blue-500`,
    ]),
  };

  return (
    <div className={css.default}>
      <div className={css.selected}>
        <div className='flex flex-row items-center gap-1'>
          <button
            type='button'
            className={css.calendarToggle}
            aria-label='calendar-toggle'
            onClick={onClickCalendarOpen}
          >
            <Icon icon='mdi:calendar' />
          </button>
          {withTime && (
            <button
              type='button'
              className={css.timeToggle}
              aria-label='time-toggle'
              onClick={onClickTimeOpen}
            >
              <Icon icon='mingcute:time-line' />
            </button>
          )}
        </div>
        <div>
          {date ? (
            Nihil.dateToFormat(date)
          ) : (
            '날짜를 선택하세요.'
          )}
        </div>
        <div>
          {date && !disabled && (
            <button
              onClick={onClickCalendarClear}
              type='button'
              aria-label='clear'
              className='flex flex-row items-center justify-center hover:text-red-500 transition-colors duration-200'
            >
              <Icon icon='pepicons-pop:times' fontSize={30} />
            </button>
          )}
        </div>
      </div>

      <CalendarBody open={calendarOpen}>
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
