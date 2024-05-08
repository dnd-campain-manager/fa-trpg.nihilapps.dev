'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import {
  CustomButton, CustomForm, CustomFormItem, UserSyncButton
} from '@/src/components';
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle
} from '@/src/shadcn';
import { userData } from '@/src/data';
import { authStore } from '@/src/entities';
import { useCreateCampain } from '@/src/hooks';

// interface Props {
//
// }

interface Inputs {
  userId: string;
  name: string;
  url: string;
}

export function AddCampainButton() {
  const [ sheetOpen, setSheetOpen, ] = useState(false);

  const session = authStore((state) => state.session);

  const formModel = object({
    userId: string().optional(),
    name: string().required('이름을 입력해주세요.'),
    url: string().required('캠페인 소개 카페 게시글 주소를 입력해주세요.'),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      userId: '',
      name: '',
      url: '',
    },
  });

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
        userId: data.userId || session?.userId,
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

  useEffect(() => {
    form.setValue('userId', session?.userId);
  }, [ session, ]);

  return (
    <>
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
            {process.env.NODE_ENV === 'development' && (
              <>
                <UserSyncButton />

                <CustomFormItem
                  name='userId'
                  itemName='userId'
                  label='플레이어 선택'
                  mode='select'
                  code={userData.map((user) => user.id).join(',')}
                  codeLabel={userData.map((user) => user.name).join(',')}
                  form={form}
                />
              </>
            )}

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
    </>
  );
}
