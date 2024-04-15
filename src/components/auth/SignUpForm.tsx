'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { useForm, SubmitHandler } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { UserRole, UserType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Message, RadioGroup, RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card, CardContent, CardDescription, CardHeader
} from '@/src/shadcn';

import { CustomButton, CustomFormItem, CustomLabel } from '@/src/components';
import { useSignUp } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
  password: string;
  userRole: UserRole;
  userType: UserType;
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
    userRole: string().optional(),
    userType: string().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
      password: '',
      userRole: 'normal',
      userType: 'player',
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
        userRole: data.userRole,
        userType: data.userType,
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
      `flex flex-col gap-5 rounded-1 text-black-base`,
      styles,
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
                      <CustomFormItem
                        name='name'
                        type='text'
                        label='이름'
                        field={field}
                        form={form}
                      />
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
                      <CustomFormItem
                        name='password'
                        type='password'
                        code='test1,test2,test3'
                        label='비밀번호'
                        field={field}
                        form={form}
                      />
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
                      {/*<CustomLabel target='role'>권한</CustomLabel>*/}
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder='일반회원'
                              id='role'
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='admin' className='!text-middle'>관리자</SelectItem>
                          <SelectItem value='normal' className='!text-middle'>일반회원</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }
                name='userRole'
              />
              <FormField
                control={form.control}
                render={
                  ({ field, }) => (
                    <FormItem className='!text-middle [&_span]:!text-middle'>
                      content
                      {/*<CustomLabel styles='!font-900'>*/}
                      {/*  설정자로 가입하시겠습니까?*/}
                      {/*</CustomLabel>*/}
                      {/*<RadioGroup*/}
                      {/*  defaultValue={field.value}*/}
                      {/*  onValueChange={field.onChange}*/}
                      {/*  className=''*/}
                      {/*>*/}
                      {/*  <FormItem className='flex flex-row gap-2 items-center'>*/}
                      {/*    <FormControl>*/}
                      {/*      <RadioGroupItem id='type-player' value='player' />*/}
                      {/*    </FormControl>*/}
                      {/*    <CustomLabel target='type-player'>*/}
                      {/*      일반 회원으로 가입합니다.*/}
                      {/*    </CustomLabel>*/}
                      {/*  </FormItem>*/}
                      {/*  <FormItem className='flex flex-row gap-2 items-center'>*/}
                      {/*    <FormControl>*/}
                      {/*      <RadioGroupItem id='type-creator' value='creator' />*/}
                      {/*    </FormControl>*/}
                      {/*    <CustomLabel target='type-creator'>*/}
                      {/*      설정자로 가입합니다.*/}
                      {/*    </CustomLabel>*/}
                      {/*  </FormItem>*/}
                      {/*</RadioGroup>*/}
                    </FormItem>
                  )
                }
                name='userType'
              />

              <CustomButton type='submit' full>회원가입</CustomButton>
            </form>
          </Form>

          <Link href='/auth/signin' className='mt-5 block'>
            <CustomButton full alter>로그인 하기</CustomButton>
          </Link>
        </CardContent>
      </Card>
    </>
  );
}
