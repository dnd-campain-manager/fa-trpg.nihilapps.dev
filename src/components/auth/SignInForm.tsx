'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Form, FormControl, FormField, FormItem, Input, Message,
  Card, CardContent, CardDescription, CardHeader
} from '@/src/shadcn';
import { CustomButton, CustomLabel } from '@/src/components';
import { authStore } from '@/src/entities';
import { useSignIn } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
  password: string;
}

export function SignInForm({ styles, }: Props) {
  const formModel = object({
    name: string().required('아이디를 입력해주세요.'),
    password: string()
      .required('비밀번호를 입력해야합니다.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const { formState: { errors, }, } = form;

  const qc = useQueryClient();
  const signIn = useSignIn();

  const { session, updateSession, } = authStore();

  const router = useRouter();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      signIn.mutate({
        name: data.name,
        password: data.password,
      }, {
        onSuccess(res) {
          qc.invalidateQueries();

          const { data, } = res;

          updateSession(data);

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
              <FormField
                control={form.control}
                render={({ field, }) => (
                  <FormItem>
                    <CustomLabel target='name'>이름</CustomLabel>
                    <FormControl>
                      <Input
                        id='name'
                        type='text'
                        value={field.value}
                        onChange={field.onChange}
                        className={css.input}
                      />
                    </FormControl>
                    {errors.name && (
                      <Message color='red'>{errors.name.message}</Message>
                    )}
                  </FormItem>
                )}
                name='name'
              />

              <FormField
                control={form.control}
                render={({ field, }) => (
                  <FormItem>
                    <CustomLabel target='password'>비밀번호</CustomLabel>
                    <FormControl>
                      <Input
                        id='password'
                        type='password'
                        autoComplete='off'
                        value={field.value}
                        onChange={field.onChange}
                        className={css.input}
                      />
                    </FormControl>
                    {errors.password && (
                      <Message color='red'>{errors.password.message}</Message>
                    )}
                  </FormItem>
                )}
                name='password'
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
