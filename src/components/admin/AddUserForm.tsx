'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRole, UserType } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import {
  CustomButton, CustomForm, CustomFormItem, WhiteBlock
} from '@/src/components';
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

export function AddUserForm({ styles, }: Props) {
  const formModel = object({
    name: string(),
    password: string(),
    userRole: string(),
    userType: string(),
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

  const qc = useQueryClient();
  const signUp = useSignUp();

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

          form.reset();
        },
      });
    },
    []
  );

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <WhiteBlock>
      <Link href='/admin/users' className='block !mb-5'>
        <CustomButton icon='mdi:user' full>
          유저 목록
        </CustomButton>
      </Link>

      <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
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

        <CustomFormItem
          name='userRole'
          itemName='userRole'
          label='권한'
          mode='select'
          validate={false}
          code='admin,normal'
          codeLabel='관리자,일반회원'
          form={form}
        />

        <CustomFormItem
          name='userType'
          itemName='userType'
          mode='radio'
          label='회원 유형'
          code='player,creator'
          codeLabel={'일반회원으로 추가.,'
            + '설정자로 추가.'}
          validate={false}
          form={form}
        />

        <CustomButton type='submit' full>유저 추가</CustomButton>
      </CustomForm>
    </WhiteBlock>
  );
}
