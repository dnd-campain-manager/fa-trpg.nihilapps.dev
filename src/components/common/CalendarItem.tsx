'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';
import { CalendarMonthData } from '@/src/entities';

interface Props {
  item: CalendarMonthData;
  setDate: any;
  date: string;
  form: UseFormReturn;
  name: string;
  styles?: ClassNameValue;
}

export function CalendarItem({
  item, setDate, date, form, name, styles,
}: Props) {
  const onClickSelectDate = useCallback(
    () => {
      if (!item.isActive) {
        return;
      }

      setDate(item.fullDate);

      form.setValue(name, item.fullDate, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [ name, ]
  );

  const css = {
    default: twJoin([
      `flex-1 shrink-0 rounded-1 items-center p-1 px-2 cursor-pointer transition-colors duration-200`,
      item.isActive && `bg-blue-100 hover:bg-blue-300`,
      !item.isActive && `bg-black-100 hover:bg-black-100 text-black-200 hover:text-black-200 !cursor-default`,
      (item.isActive && date === item.fullDate) && `bg-blue-500 hover:!bg-blue-500 text-white hover:text-white`,
      (!item.isActive && date === item.fullDate) && `!bg-black-500 text-white hover:!text-white hover:bg-black-500`,
      styles,
    ]),
  };

  return (
    <>
      <button className={css.default} type='button' onClick={onClickSelectDate}>
        {item.date}
      </button>
    </>
  );
}
