'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import {
  array, object, string
} from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Form, Card, CardContent, CardDescription, CardHeader
} from '@/src/shadcn';
import { CustomButton, CustomFormItem } from '@/src/components';
import { authStore } from '@/src/entities';
import { useSignIn } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
  password: string;
  isNameSave: string[];
}

export function SignInForm({ styles, }: Props) {
  const {
    session, updateSession, enableSaveName, disableSaveName, isNameSave, savedName,
  } = authStore();

  const formModel = object({
    name: string().required('아이디를 입력해주세요.'),
    password: string()
      .required('비밀번호를 입력해야합니다.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
    isNameSave: array()
      .of(string())
      .optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: isNameSave ? savedName : '',
      password: '',
      isNameSave: isNameSave ? [ 'yes', ] : [],
    },
  });

  const qc = useQueryClient();
  const signIn = useSignIn();

  const router = useRouter();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      signIn.mutate({
        name: data.name,
        password: data.password,
      }, {
        onSuccess(res) {
          qc.invalidateQueries();

          if (data.isNameSave.includes('yes')) {
            enableSaveName(data.name);
          } else {
            disableSaveName();
          }

          const { data: uSession, } = res;

          updateSession(uSession);

          router.push('/calendar');
        },
      });
    },
    [ session, ]
  );

  const css = {
    default: twJoin([
      `flex flex-col gap-5 rounded-1`,
      styles,
    ]),
    label: twJoin([
      `!text-middle`,
    ]),
    input: twJoin([
      `!text-middle border-black-300`,
    ]),
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardDescription className='!text-small text-black-base'>
            로그인하면 더 많은 기능을 이용할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className={css.default}>
              <CustomFormItem
                name='name'
                itemName='name'
                type='text'
                label='이름'
                form={form}
              />

              <CustomFormItem
                name='password'
                itemName='password'
                type='password'
                label='비밀번호'
                form={form}
              />

              <div className='bg-black-200 h-[2px]' />

              <CustomFormItem
                name='isNameSave'
                itemName='isNameSave'
                mode='checkbox'
                code='yes'
                codeLabel='이름 저장'
                validate={false}
                form={form}
              />

              <div className='mt-10'>
                <CustomButton full type='submit'>
                  로그인
                </CustomButton>
              </div>
            </form>
          </Form>

          <Link href='/auth/signup' className='block mt-5'>
            <CustomButton full alter>
              회원가입 하기
            </CustomButton>
          </Link>

          <Link href='/auth/reset' className='block mt-5'>
            <CustomButton full alter>
              비밀번호 재설정
            </CustomButton>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
