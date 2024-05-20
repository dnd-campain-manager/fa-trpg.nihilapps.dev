'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CampainStatus } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';
import { Sheet, SheetContent } from '@/src/shadcn';
import { useUpdateCampain } from '@/src/hooks';
import { Nihil } from '@/src/utils';
import { campainsKeys } from '@/src/data';

interface Props {
  campain: ExtendedCampain;
}

interface Inputs {
  name: string;
  url: string;
  startTime: string;
  endTime: string;
  status: CampainStatus;
}

export function UpdateCampainButton({ campain, }: Props) {
  const [ open, setOpen, ] = useState(false);
  const [ startTimeDate, setStartTimeDate, ] = useState('');
  const [ endTimeDate, setEndTimeDate, ] = useState('');

  const formModel = object({
    name: string().required('이름을 입력해주세요.'),
    url: string().required('캠페인 소개 카페글 주소를 입력해주세요.'),
    startTime: string()
      .matches(
        /^\d{4}-\d{1,2}-\d{1,2}$/,
        {
          message: '년월일을 전부 선택해주세요.',
        }
      ),
    endTime: string()
      .nullable()
      .notRequired(),
    status: string()
      .required('변경할 상태를 선택해주세요.'),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      url: '',
      startTime: '',
      endTime: '',
      status: '',
    },
  });

  useEffect(() => {
    form.setValue('name', campain.name);
    form.setValue('url', campain.url);
    form.setValue('startTime', campain.startTime);
    form.setValue('endTime', campain.endTime);
    form.setValue('status', campain.status);
  }, [ campain, ]);

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const qc = useQueryClient();
  const updateCampain = useUpdateCampain(campain.id);

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      updateCampain.mutate({
        url: data.url,
        startTime: Nihil.UTCString(data.startTime),
        endTime: data.endTime === 'none-none-none'
          ? data.endTime
          : Nihil.UTCString(data.endTime),
        status: data.status,
      }, {
        onSuccess() {
          Nihil.toast({
            type: 'success',
            text: '캠페인 정보가 수정되었습니다.',
          });

          qc.invalidateQueries({
            queryKey: campainsKeys.getById(campain.id),
          });
        },
      });
    },
    [ qc, ]
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
              name='name'
              itemName='name'
              label='캠페인 이름'
              mode='input'
              type='text'
              form={form}
            />

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
              form={form}
              initDate={campain.startTime}
              validate={false}
              date={startTimeDate}
              setDate={setStartTimeDate}
            />

            <CustomFormItem
              name='endTime'
              itemName='endTime'
              label='캠페인 종료일'
              mode='date'
              form={form}
              initDate={campain.endTime}
              disabled={campain.status !== 'close'}
              validate={campain.status === 'close'}
              date={endTimeDate}
              setDate={setEndTimeDate}
            />

            <CustomFormItem
              name='status'
              itemName='status'
              label='상태'
              mode='radio'
              code='ready,open,close'
              codeLabel='준비중,진행중,종료'
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
