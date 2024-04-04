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
  Button,
  Form, FormField, FormItem, FormLabel, Input, Message
} from '@/src/shadcn';
import {
  Card, CardContent, CardDescription, CardHeader
} from '@/src/shadcn/ui/card';
import { useSignIn } from '@/src/common';
import { authStore } from '@/src/entities';

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
    password: string().required('비밀번호를 입력해주세요.'),
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

  const { updateSession, } = authStore();

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
    []
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
          <CardDescription className='!text-small'>
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
                    <FormLabel htmlFor='name' className={css.label}>이름</FormLabel>
                    <Input
                      id='name'
                      type='text'
                      value={field.value}
                      onChange={field.onChange}
                      className={css.input}
                    />
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
                    <FormLabel htmlFor='password' className={css.label}>비밀번호</FormLabel>
                    <Input
                      id='password'
                      type='password'
                      autoComplete='off'
                      value={field.value}
                      onChange={field.onChange}
                      className={css.input}
                    />
                    {errors.password && (
                      <Message color='red'>{errors.password.message}</Message>
                    )}
                  </FormItem>
                )}
                name='password'
              />

              <div className='mt-10'>
                <Button
                  type='submit'
                  className='w-full hover:bg-blue-500 hover:text-white hover:border-blue-500 !text-h6 py-6'
                >
                  로그인
                </Button>
              </div>
            </form>
          </Form>

          <div className='flex flex-row gap-3 mt-2 justify-end text-black-base text-middle'>
            <Link
              href='/auth/signup'
              className='underline hover:text-blue-500 transition-colors duration-200'
            >
              회원가입
            </Link>
            <Link
              href='/auth/password-reset'
              className='underline hover:text-blue-500 transition-colors duration-200'
            >
              비밀번호가 기억나지 않아요
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
