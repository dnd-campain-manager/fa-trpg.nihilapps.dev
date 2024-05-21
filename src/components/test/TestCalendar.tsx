'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Calendar, Nihil } from '@/src/utils';
import { CustomForm, CustomFormItem, DatePicker } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  test: string;
  test2: string;
}

export function TestCalendar({ styles, }: Props) {
  const [ date, setDate, ] = useState(
    Calendar.getNowDate()
  );

  const formModel = object({
    test: string().notRequired(),
    test2: string().required(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      test: '',
      test2: '',
    },
  });

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
        <CustomFormItem
          name='test'
          form={form}
          mode='date'
          date={date}
          setDate={setDate}
          validate={false}
        />

        <CustomFormItem
          name='test2'
          form={form}
          mode='date'
          date={date}
          withTime
          setDate={setDate}
        />
      </CustomForm>
    </>
  );
}
