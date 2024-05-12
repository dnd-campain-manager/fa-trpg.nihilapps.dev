'use client';

import React, {
  useEffect, useMemo, useState
} from 'react';
import { twJoin } from 'tailwind-merge';
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
  time?: boolean;
  validate?: boolean;
}

export function CustomDate({
  name, disabled, validate, form, initDate, time,
}: Props) {
  const [ year, setYear, ] = useState('none');
  const [ month, setMonth, ] = useState('none');
  const [ day, setDay, ] = useState('none');
  const [ hour, setHour, ] = useState('none');
  const [ minute, setMinute, ] = useState('none');

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

  const hours = new Array(24)
    .fill(0)
    .map((item, index) => ({
      code: `${(+item + index) < 10 ? `0${+item + index}` : (+item + index)}`,
      label: `${(+item + index) < 10 ? `0${+item + index}` : (+item + index)}시`,
    }));

  const minutes = new Array(61)
    .fill(0)
    .map((item, index) => ({
      code: `${(+item + index) < 10 ? `0${+item + index}` : (+item + index)}`,
      label: `${(+item + index) < 10 ? `0${+item + index}` : (+item + index)}분`,
    }));

  const validateWithValid = validate
    && ((year !== 'none') && (month !== 'none') && (day !== 'none'));

  const validTimeWithValid = time && validate && ((hour !== 'none') && (minute !== 'none'));

  const validateWithOutValid = !validate
   && (
     ((year !== 'none') && (month !== 'none') && (day !== 'none'))
      || ((year === 'none') && (month === 'none') && (day === 'none'))
   );

  const validTimeWithOutValid = time && !validate && (
    ((hour !== 'none') && (minute !== 'none'))
    || ((hour === 'none') && (minute === 'none'))
  );

  const isValidCond = time ? (
    validate
      ? validateWithValid && validTimeWithValid
      : validateWithOutValid && validTimeWithOutValid
  ) : (
    validate
      ? validateWithValid
      : validateWithOutValid
  );

  useEffect(() => {
    let value: string;

    if (time) {
      value = `${year}-${month}-${day} ${hour}:${minute}`;
    } else {
      value = `${year}-${month}-${day}`;
    }

    console.log('value >> ', value);

    if (value.includes('none')) {
      value = '';
    }

    form.setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: !!validate,
    });
  }, [ year, month, day, time, hour, minute, ]);

  useEffect(() => {
    if (!initDate) {
      setYear('none');
      setMonth('none');
      setDay('none');
      setHour('none');
      setMinute('none');
    }

    if (initDate) {
      setYear(nowDate.year);
      setMonth(nowDate.month);
      setDay(nowDate.date);
      setHour(nowDate.hour);
      setMinute(nowDate.minute);

      let value: string;

      if (time) {
        value = `${nowDate.year}-${nowDate.month}-${nowDate.date} ${nowDate.hour}:${nowDate.minute}`;
      } else {
        value = `${nowDate.year}-${nowDate.month}-${nowDate.date}`;
      }

      form.setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: !!validate,
      });
    }
  }, [ initDate, validate, ]);

  useEffect(() => {
    if (validate && validateWithValid) {
      form.clearErrors(name);
    } else if (!validate && validateWithOutValid) {
      form.clearErrors(name);
    } else {
      form.setError(name, {
        type: 'validate',
        message: time
          ? '년월일, 시간을 모두 선택해주세요.'
          : '년월일을 모두 선택해주세요.',
      });
    }
  }, [ year, month, day, hour, minute, validate, ]);

  const css = {
    flexRow: twJoin([
      `flex flex-row items-center gap-1`,
    ]),
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className={css.flexRow}>
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
      {time && (
        <div className={css.flexRow}>
          <CustomDropDown
            data={hours}
            value={hour}
            disabled={disabled}
            validate={validate}
            isValidCond={isValidCond}
            isDate
            setValue={setHour}
          />
          <CustomDropDown
            data={minutes}
            value={minute}
            disabled={disabled}
            validate={validate}
            isValidCond={isValidCond}
            isDate
            setValue={setMinute}
          />
        </div>
      )}
    </div>
  );
}
