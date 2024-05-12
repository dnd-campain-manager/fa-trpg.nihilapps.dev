'use client';

import React, {
  useEffect, useMemo, useState
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  UseFormReturn
} from 'react-hook-form';
import { CustomDropDown } from '@/src/components';
import { Calendar, Nihil } from '@/src/utils';
import { DropDownData } from '@/src/entities';

interface Props {
  name: string;
  form?: UseFormReturn;
  disabled?: boolean;
  initDate?: string;
  styles?: ClassNameValue;
  validate?: boolean;
}

export function CustomDate({
  name, disabled, validate, form, styles, initDate,
}: Props) {
  const [ year, setYear, ] = useState('none');
  const [ month, setMonth, ] = useState('none');
  const [ day, setDay, ] = useState('none');

  const nowDate = Nihil.getDateInfo(initDate || '');

  const years: DropDownData[] = new Array(5)
    .fill('2024')
    .map((item: string, index) => ({
      code: `${+item + index}`,
      label: `${+item + index}년`,
    }));

  const months: DropDownData[] = new Array(12)
    .fill('1')
    .map((item: string, index) => {
      const month = (+item + index) < 10 ? `0${+item + index}` : `${+item + index}`;

      return {
        code: month,
        label: `${month}월`,
      };
    });

  const days: DropDownData[] = useMemo(
    () => {
      const daysInfo = Calendar.getDateArray(
        +year || +nowDate.year,
        +month || +nowDate.month
      ).map((item) => ({
        day: item.day,
        date: item.date < 10 ? `0${item.date}` : `${item.date}`,
      }));

      return daysInfo.map((item) => ({
        code: item.date,
        label: `${item.date}일`,
      }));
    },
    [ year, month, nowDate, ]
  );

  const validateWithValid = validate
    && ((year !== 'none') && (month !== 'none') && (day !== 'none'));

  const validateWithOutValid = !validate
   && (
     ((year !== 'none') && (month !== 'none') && (day !== 'none'))
      || ((year === 'none') && (month === 'none') && (day === 'none'))
   );

  const isValidCond = validate
    ? validateWithValid
    : validateWithOutValid;

  useEffect(() => {
    if (!initDate) {
      setYear('none');
      setMonth('none');
      setDay('none');
    }

    if (initDate) {
      setYear(nowDate.year);
      setMonth(nowDate.month);
      setDay(nowDate.date);

      const value = `${nowDate.year}-${nowDate.month}-${nowDate.date}`;

      form.setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: !!validate,
      });
    }

    console.log(`${name} >> `, form.getValues(name));
  }, [ initDate, validate, ]);

  useEffect(() => {
    if (validate && validateWithValid) {
      form.clearErrors(name);
    } else if (!validate && validateWithOutValid) {
      form.clearErrors(name);
    } else {
      form.setError(name, {
        type: 'validate',
        message: '년월일을 모두 선택해주세요.',
      });
    }
  }, [ year, month, day, validate, ]);

  const css = {
    default: twJoin([
      `flex flex-row items-center gap-1`,
      styles,
    ]),
  };

  return (
    <div className={css.default}>
      <CustomDropDown
        data={years}
        value={year}
        disabled={disabled}
        validate={validate}
        isValidCond={isValidCond}
        isDate
        setValue={setYear}
      />
      <CustomDropDown
        data={months}
        value={month}
        disabled={disabled}
        validate={validate}
        isValidCond={isValidCond}
        isDate
        setValue={setMonth}
      />
      <CustomDropDown
        data={days}
        value={day}
        disabled={disabled}
        validate={validate}
        isValidCond={isValidCond}
        isDate
        setValue={setDay}
      />
    </div>
  );
}
