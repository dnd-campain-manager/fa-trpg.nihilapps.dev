'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import {
  Card, CardContent, Form, FormField, FormItem
} from '@/src/shadcn';
import { CustomButton, CustomFormItem, CustomInput } from '@/src/components';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  search: string;
}

export function CampainSearch({ styles, }: Props) {
  const formModel = object({
    search: string(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      search: '',
    },
  });

  const router = useRouter();

  const onClickSearch: SubmitHandler<Inputs> = useCallback(
    (data) => {
      if (!data.search) {
        return;
      }

      router.push(`/campains?search=${data.search}`);
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
      <div className={css.default}>
        <Card className=''>
          <CardContent className='!p-2'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onClickSearch)}>
                <div className='flex flex-row gap-2'>
                  <CustomFormItem
                    name='search'
                    itemName='search'
                    type='text'
                    placeholder='캠페인 이름을 입력하세요.'
                    form={form}
                    validate={false}
                    singleInput
                    styles='flex-1 shrink-0'
                  />
                  <CustomButton type='submit' styles='!mt-0'>
                    <Icon icon='ph:magnifying-glass-bold' className='text-[140%]' />
                  </CustomButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
