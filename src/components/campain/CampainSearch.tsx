'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { Icon } from '@iconify/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/navigation';
import {
  Card, CardContent
} from '@/src/shadcn';
import {
  CustomButton, CustomForm, CustomFormItem
} from '@/src/components';
import { Nihil } from '@/src/utils';

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
        Nihil.toast({
          type: 'error',
          text: '검색어를 입력해주세요.',
        });

        return;
      }

      router.push(`/search/campain?keyword=${data.search}`);
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
            <CustomForm
              form={form}
              onSubmit={form.handleSubmit(onClickSearch)}
              flexRow
            >
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
            </CustomForm>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
