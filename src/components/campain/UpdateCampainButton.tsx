'use client';

import React, { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import { date, object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CampainStatus } from '@prisma/client';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader
} from '@/src/components';
import { authStore, ExtendedCampain } from '@/src/entities';
import { useGetUserById } from '@/src/hooks';
import { Sheet, SheetContent } from '@/src/shadcn';

interface Props {
  campain: ExtendedCampain;
}

interface Inputs {
  url: string;
  startTime: Date;
  endTime: Date;
  status: CampainStatus;
}

export function UpdateCampainButton({ campain, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const { session, } = authStore();

  const {
    data: user,
  } = useGetUserById(session?.userId);

  const formModel = object({
    url: string().required('캠페인 소개 카페글 주소를 입력해주세요.'),
    startTime: date().optional(),
    endTime: date().optional(),
    status: string()
      .required('변경할 상태를 선택해주세요.'),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      url: campain.url,
      startTime: campain.startTime,
      endTime: campain.endTime,
      status: campain.status,
    },
  });

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  return (
    <>
      <CustomButton h36 actions={onClickOpen}>
        <Icon icon='material-symbols:settings-rounded' />
      </CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <CustomSheetHeader title='캠페인 정보 수정' description='아래에서 캠페인의 정보를 수정하세요.' />

          <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
            <CustomFormItem
              name='url'
              itemName='url'
              label='카페글 주소'
              mode='input'
              type='text'
              form={form}
            />

            <CustomFormItem
              name='startTime'
              itemName='startTime'
              label='캠페인 시작일'
              mode='date'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='endTime'
              itemName='endTime'
              label='캠페인 종료일'
              mode='date'
              validate={false}
              form={form}
            />

            <CustomButton type='submit'>
              캠페인 정보 수정
            </CustomButton>
          </CustomForm>
        </SheetContent>
      </Sheet>
    </>
  );
}
