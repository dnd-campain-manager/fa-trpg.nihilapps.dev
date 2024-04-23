'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateCampain, useGetCampains } from '@/src/hooks';
import {
  CampainItem,
  CampainSearch, CustomButton, CustomForm, CustomFormItem, LoadingCircle, PageTitle
} from '@/src/components';
import {
  Card,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/src/shadcn';
import { authStore } from '@/src/entities';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
  url: string;
}

export function CampainList({ styles, }: Props) {
  const [ sheetOpen, setSheetOpen, ] = useState(false);

  const session = authStore((state) => state.session);

  const formModel = object({
    name: string().required('이름을 입력하세요.'),
    url: string().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      url: '',
    },
  });

  const {
    data: campains,
    isLoading,
    isFetching,
  } = useGetCampains();

  const createCampain = useCreateCampain();
  const qc = useQueryClient();

  const onClickOpenSheet = useCallback(
    () => {
      setSheetOpen(true);
    },
    []
  );

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      createCampain.mutate({
        userId: session.userId,
        name: data.name,
        status: 'ready',
        url: data.url,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          setSheetOpen(false);
        },
      });
    },
    [ session, qc, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    title: twJoin([
      `mt-10 bg-primary border-primary text-center !font-900 !text-h4 text-white py-2`,
    ]),
  };

  if (isFetching || isLoading) {
    return <LoadingCircle />;
  }

  return (
    <>
      <PageTitle icon='mdi:archive'>
        캠페인 목록
      </PageTitle>

      <CampainSearch styles='mt-5 mb-2' />

      {session && (
        <CustomButton actions={onClickOpenSheet}>
          캠페인 생성하기
        </CustomButton>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader className='mb-5'>
            <SheetTitle className='!font-900 mb-2 !text-black-base'>
              <span className='text-h4'>캠페인 생성</span>
            </SheetTitle>
            <SheetDescription className='!text-black-base'>
              <span className='!text-middle text-justify'>
                캠페인 정보를 입력하고 <strong className='font-900'>생성하기</strong> 버튼을 클릭하세요.
              </span>
            </SheetDescription>
          </SheetHeader>

          <CustomForm
            form={form}
            onSubmit={form.handleSubmit(onSubmitForm)}
          >
            <CustomFormItem
              name='name'
              itemName='name'
              type='text'
              label='캠페인 이름'
              form={form}
              styles='mb-3'
            />

            <CustomFormItem
              name='url'
              itemName='url'
              label='카페글 주소'
              type='text'
              validate={false}
              form={form}
              styles='mb-3'
            />

            <div>
              <CustomButton type='submit' styles='w-full'>
                생성하기
              </CustomButton>
            </div>
          </CustomForm>
        </SheetContent>
      </Sheet>

      <div className='mt-5 flex flex-col gap-5'>
        {campains.data.length === 0 && (
          <h3 className='py-20 text-center text-h3 font-900 text-black-base my-20 select-none'>
            캠페인이 없습니다.
          </h3>
        )}
        {campains.data.map((item) => (
          <CampainItem key={item.id} campain={item} />
        ))}
      </div>
    </>
  );
}
