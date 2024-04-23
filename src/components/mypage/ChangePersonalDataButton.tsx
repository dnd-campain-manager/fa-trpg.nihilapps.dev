'use client';

import React, { useCallback, useState } from 'react';
// import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useQueryClient } from '@tanstack/react-query';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader, LoadingCircle
} from '@/src/components';
import { Message, Sheet, SheetContent } from '@/src/shadcn';
import {
  UseChangePersonalData, useGetUserById, useUser, useUserCheck
} from '@/src/hooks';
import { ApiError, authStore, ExtendedUser } from '@/src/entities';
import { Nihil } from '@/src/utils';

interface Props {
  userData: ExtendedUser;
  // styles?: ClassNameValue;
}

interface Inputs1 {
  password: string;
}

interface Inputs2 {
  newName: string;
  newEmail: string;
}

export function ChangePersonalDataButton({ userData, }: Props) {
  const [ open, setOpen, ] = useState(false);
  const [ step2, setStep2, ] = useState(false);
  const [ errorMessage, setErrorMessage, ] = useState('');

  const {
    session,
    updateSession,
  } = authStore();

  const qc = useQueryClient();
  const userCheck = useUserCheck();
  const changePersonalData = UseChangePersonalData(
    session?.userId
  );

  const formModel1 = object({
    password: string().required('현재 비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
  });

  const form1 = useForm({
    mode: 'all',
    resolver: yupResolver(formModel1),
    defaultValues: {
      password: '',
    },
  });

  const formModel2 = object({
    newName: string().required('새로 변경할 이름을 입력해주세요.'),
    newEmail: string()
      .email('이메일 형식이 아닙니다.')
      .optional(),
  });

  const form2 = useForm({
    mode: 'all',
    resolver: yupResolver(formModel2),
    defaultValues: {
      newName: session ? userData.name : '',
      newEmail: session ? userData.email : '',
    },
  });

  const onSubmitCheck: SubmitHandler<Inputs1> = useCallback(
    (data) => {
      userCheck.mutate({
        userId: session.userId,
        signInId: session.signInId,
        password: data.password,
      }, {
        onSuccess(res) {
          if (res.message === 'ok') {
            Nihil.toast({
              type: 'success',
              text: '이제 개인정보를 변경할 수 있습니다.',
            });

            setStep2(true);
            setErrorMessage('');
          }
        },
        onError(res: AxiosError<ApiError>) {
          setErrorMessage(res.response.data.message);
        },
      });
    },
    [ session, ]
  );

  const onSubmitChangeData: SubmitHandler<Inputs2> = useCallback(
    (data) => {
      changePersonalData.mutate({
        userId: session.userId,
        signInId: session.signInId,
        newName: data.newName,
        newEmail: data.newEmail,
      }, {
        onSuccess(res) {
          if (res.message === 'ok') {
            Nihil.toast({
              type: 'success',
              text: '개인정보가 변경되었습니다.',
            });

            setOpen(false);
            setErrorMessage('');
          }
        },
        onError(error: AxiosError<ApiError>) {
          setErrorMessage(error.response.data.message);
        },
      });
    },
    [ session, ]
  );

  return (
    <>
      <CustomButton
        full
        actions={() => {
          setOpen(true);
        }}
        icon='bx:data'
      >
        개인정보 변경
      </CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <CustomSheetHeader
            title='개인정보 변경'
            description='변경하고 싶은 개인 정보를 변경하세요.'
          />

          {!step2 && (
            <CustomForm
              form={form1}
              onSubmit={form1.handleSubmit(onSubmitCheck)}
            >
              <CustomFormItem
                name='password'
                itemName='password'
                mode='input'
                type='password'
                label='현재 비밀번호'
                form={form1}
              />

              {errorMessage && (
                <Message color='red'>
                  {errorMessage}
                </Message>
              )}

              <CustomButton type='submit' styles='w-full mt-3'>
                비밀번호 체크
              </CustomButton>
            </CustomForm>
          )}

          {step2 && (
            <CustomForm
              form={form2}
              onSubmit={form2.handleSubmit(onSubmitChangeData)}
            >
              <CustomFormItem
                name='newName'
                itemName='newName'
                mode='input'
                type='text'
                label='이름'
                form={form2}
              />

              <CustomFormItem
                name='newEmail'
                itemName='newEmail'
                mode='input'
                type='email'
                label='이메일'
                form={form2}
              />

              {errorMessage && (
                <Message color='red'>
                  {errorMessage}
                </Message>
              )}

              <CustomButton type='submit' styles='w-full'>
                개인정보 변경
              </CustomButton>
            </CustomForm>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
