'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, ref, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader
} from '@/src/components';
import { ApiError, authStore } from '@/src/entities';
import { useResetPassword, useUserCheck } from '@/src/hooks';
import { Message, Sheet, SheetContent } from '@/src/shadcn';
import { Nihil } from '@/src/utils';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs1 {
  password: string;
}

interface Inputs2 {
  newPassword: string;
  newPasswordConfirm: string;
}

export function PasswordChangeButton({ styles, }: Props) {
  const [ open, setOpen, ] = useState(false);
  const [ step2, setStep2, ] = useState(false);
  const [ errorMessage, setErrorMessage, ] = useState('');

  const session = authStore((state) => state.session);
  const userCheck = useUserCheck();
  const resetPassword = useResetPassword();

  const formModel1 = object().shape({
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

  const formModel2 = object().shape({
    newPassword: string().required('새로운 비밀번호를 입력해주세요.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
    newPasswordConfirm: string()
      .oneOf(
        [ ref('newPassword'), ],
        '비밀번호가 일치하지 않습니다.'
      )
      .required('비밀번호를 다시 입력해주세요.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
  });

  const form2 = useForm({
    mode: 'all',
    resolver: yupResolver(formModel2),
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
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
              text: '이제 비밀번호를 재설정해주세요.',
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

  const onSubmitResetPassword: SubmitHandler<Inputs2> = useCallback(
    (data) => {
      resetPassword.mutate({
        userId: session.userId,
        signInId: session.signInId,
        newPassword: data.newPassword,
      }, {
        onSuccess(res) {
          if (res.message === 'ok') {
            Nihil.toast({
              type: 'success',
              text: '비밀번호가 변경되었습니다.',
            });

            setOpen(false);
          }
        },
      });
    },
    [ session, ]
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <CustomButton
        full
        actions={() => {
          setOpen(true);
        }}
        icon='material-symbols:password'
      >
        비밀번호 재설정
      </CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <CustomSheetHeader
            title='비밀번호 재설정'
            description='비밀번호를 변경하고 싶으실 경우 비밀번호를 재설정할 수 있습니다.'
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
              onSubmit={form2.handleSubmit(onSubmitResetPassword)}
            >
              <CustomFormItem
                name='newPassword'
                itemName='newPassword'
                mode='input'
                type='password'
                label='새로운 비밀번호'
                form={form2}
              />

              <CustomFormItem
                name='newPasswordConfirm'
                itemName='newPasswordConfirm'
                mode='input'
                type='password'
                label='비밀번호 확인'
                form={form2}
              />

              <CustomButton type='submit' styles='w-full'>
                비밀번호 변경
              </CustomButton>
            </CustomForm>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
