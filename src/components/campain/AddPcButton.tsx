'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  number, object, string
} from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PcClass } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader
} from '@/src/components';
import { Sheet, SheetContent } from '@/src/shadcn';
import { classObj, pcsKeys, usersKeys } from '@/src/data';
import { useCreatePc } from '@/src/hooks';
import { authStore, ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

interface Inputs {
  userId: string;
  campainId: string;
  name: string;
  age?: number;
  organization?: string;
  story?: string;
  url: string;
  exp?: number;
  className1: PcClass;
  level1: number;
  className2?: PcClass;
  level2?: number;
}

export function AddPcButton({ campain, styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const { session, } = authStore();

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const formModel = object({
    name: string().required('캐릭터 이름을 입력해주세요.'),
    age: number().optional(),
    organization: string().optional(),
    story: string().optional(),
    url: string().required('비욘드 캐릭터 시트 주소를 입력해주세요.'),
    className1: string().required('클래스를 선택하세요.'),
    level1: number()
      .required('레벨을 입력해주세요.')
      .min(1, '레벨은 1부터 20까지입니다.')
      .max(20, '레벨은 1부터 20까지입니다.'),
    className2: string().optional(),
    level2: number().optional()
      .min(0, '레벨은 1부터 20까지입니다.')
      .max(20, '레벨은 1부터 20까지입니다.'),
    exp: number().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      age: 0,
      organization: '',
      story: '',
      url: '',
      className1: 'none',
      level1: 1,
      className2: 'none',
      level2: 0,
      exp: 0,
    },
  });

  const qc = useQueryClient();
  const createPc = useCreatePc();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      createPc.mutate({
        userId: session?.userId,
        campainId: campain.id,
        ...data,
      }, {
        onSuccess(res) {
          console.log(res);

          qc.invalidateQueries({
            queryKey: pcsKeys.getAll,
          });

          qc.invalidateQueries({
            queryKey: usersKeys.getById(session?.userId),
          });

          setOpen(false);
        },
      });
    },
    [ qc, ]
  );

  const classCodes = Object.keys(classObj);
  const classLabels = Object.values(classObj);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <CustomButton h36 actions={onClickOpen}>캐릭터 등록</CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className='overflow-y-scroll'>
          <CustomSheetHeader
            title='캐릭터 등록'
            description='이 캠페인에 참여하려면 캐릭터를 생성하세요. 클래스와 시작 레벨을 입력해주세요.'
          />

          <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
            <CustomFormItem
              name='url'
              itemName='url'
              label='비욘드 주소'
              form={form}
            />
            <CustomFormItem
              name='name'
              itemName='name'
              label='이름'
              form={form}
            />
            <CustomFormItem
              name='className1'
              itemName='className1'
              label='클래스1'
              mode='select'
              code={classCodes.join(',')}
              codeLabel={classLabels.join(',')}
              form={form}
            />
            <CustomFormItem
              name='level1'
              itemName='level1'
              label='레벨1'
              type='number'
              form={form}
            />
            <CustomFormItem
              name='className2'
              itemName='className2'
              label='클래스2'
              mode='select'
              code={classCodes.join(',')}
              codeLabel={classLabels.join(',')}
              validate={false}
              form={form}
            />
            <CustomFormItem
              name='level2'
              itemName='level2'
              label='레벨2'
              type='number'
              validate={false}
              form={form}
            />
            <CustomFormItem
              name='exp'
              itemName='exp'
              label='경험치'
              type='number'
              validate={false}
              form={form}
            />
            <CustomFormItem
              name='age'
              itemName='age'
              label='나이'
              type='number'
              validate={false}
              form={form}
            />
            <CustomFormItem
              name='organization'
              itemName='organization'
              label='소속'
              validate={false}
              form={form}
            />
            <CustomFormItem
              name='story'
              itemName='story'
              label='배경 이야기'
              mode='textarea'
              validate={false}
              form={form}
            />

            <CustomButton type='submit' styles='w-full'>캐릭터 등록</CustomButton>
          </CustomForm>
        </SheetContent>
      </Sheet>
    </>
  );
}
