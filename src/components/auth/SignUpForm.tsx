'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useForm, SubmitHandler } from 'react-hook-form';
import { boolean, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { UserRole } from '@prisma/client';
import { useRouter } from 'next/navigation';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Message,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/shadcn';
import {
  Card, CardContent, CardDescription, CardHeader
} from '@/src/shadcn/ui/card';
import { useSignUp } from '@/src/common';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
  password: string;
  role: string;
  admin: boolean;
  create: boolean;
}

export function SignUpForm({ styles, }: Props) {
  const formModel = object({
    name: string()
      .required('이름을 입력해야합니다.'),
    password: string()
      .required('비밀번호를 입력해야합니다.')
      .min(8, '비밀번호는 8~30자로 구성됩니다.')
      .max(30, '비밀번호는 8~30자로 구성됩니다.')
      .matches(/(?=.*\d)(?=.*[a-zA-Z])/, {
        message: '비밀번호는 숫자와 영문자를 조합해야 합니다.',
      }),
    role: string().optional(),
    admin: boolean().optional(),
    create: boolean().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      password: '',
      role: 'PLAYER',
      admin: false,
      create: false,
    },
  });

  const { formState: { errors, }, } = form;

  const qc = useQueryClient();
  const signUp = useSignUp();

  const router = useRouter();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      signUp.mutate({
        name: data.name,
        password: data.password,
        role: data.role as UserRole,
        admin: data.admin,
        create: data.create,
      }, {
        onSuccess() {
          qc.invalidateQueries();

          router.push('/auth/signin');
        },
      });
    },
    [ qc, ]
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
            회원가입을 통해 계정을 생성하세요. 로그인을 하면 더 많은 기능을 이용할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className={css.default}>
              <FormField
                control={form.control}
                render={
                  ({ field, }) => (
                    <FormItem>
                      <FormLabel htmlFor='name' className={css.label}>이름</FormLabel>
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
                  )
                }
                name='name'
              />
              <FormField
                control={form.control}
                render={
                  ({ field, }) => (
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
                  )
                }
                name='password'
              />
              <FormField
                control={form.control}
                render={
                  ({ field, }) => (
                    <FormItem className='!text-middle [&_span]:!text-middle'>
                      <FormLabel htmlFor='role' className={css.label}>역할</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled
                        defaultValue='PLAYER'
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder='플레이어'
                              id='role'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='PLAYER' className='!text-middle'>플레이어</SelectItem>
                          <SelectItem value='MASTER' className='!text-middle'>마스터</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }
                name='role'
              />
              <FormField
                control={form.control}
                render={
                  ({ field, }) => (
                    <FormItem className='flex flex-row gap-1 items-center space-y-0'>
                      <FormControl>
                        <Checkbox
                          id='create'
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='w-[25px] h-[25px]'
                        />
                      </FormControl>
                      <FormLabel htmlFor='create' className={css.label}>설정자로 가입합니다.</FormLabel>
                    </FormItem>
                  )
                }
                name='create'
              />

              <Button
                type='submit'
                className='w-full hover:bg-blue-500 hover:text-white hover:border-blue-500 !text-h6 py-6'
              >
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
