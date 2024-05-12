'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import {
  CustomButton, CustomForm, CustomFormItem
} from '@/src/components';
import { Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  search: string;
  mode: string;
}

export function PcSearch({ styles, }: Props) {
  const dropdownCode = [
    { code: 'name', label: '이름', },
    { code: 'level', label: '레벨', },
  ];

  const formModel = object({
    search: string().notRequired(),
    mode: string().notRequired(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      search: '',
      mode: '',
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

      router.push(`/search/pc?mode=${data.mode}&keyword=${data.search}`);
    },
    []
  );

  const css = {
    default: twJoin([
      `bg-white p-2 rounded-2 shadow-sm text-middle mb-5`,
      styles,
    ]),
  };

  return (
    <>
      <div className={css.default}>
        <CustomForm
          form={form}
          onSubmit={form.handleSubmit(onClickSearch)}
          flexRow
        >
          <CustomFormItem
            name='search'
            itemName='search'
            type='text'
            placeholder='PC 이름을 입력하세요.'
            form={form}
            validate={false}
            singleInput
            styles='flex-1 shrink-0'
          />
          <CustomFormItem
            name='mode'
            mode='dropdown'
            dropDownCode={dropdownCode}
            initValue={dropdownCode.at(0).code}
            validate={false}
            form={form}
          />
          <CustomButton type='submit' styles='!mt-0'>
            <Icon icon='ph:magnifying-glass-bold' className='text-[140%]' />
          </CustomButton>
        </CustomForm>
      </div>
    </>
  );
}
