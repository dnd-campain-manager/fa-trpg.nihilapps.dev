'use client';

import React, { useCallback, useEffect } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { number, object, string } from 'yup';
import { PcClass } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useGetPcById, useUpdatePc } from '@/src/hooks';
import {
  CustomButton, CustomForm, CustomFormItem, LoadingCircle, PageTitle
} from '@/src/components';
import { classObj, pcsKeys, usersKeys } from '@/src/data';

interface Props {
  pcId: string;
  styles?: ClassNameValue;
}

interface Inputs {
  name?: string;
  age?: number;
  organization?: string;
  url?: string;
  class1?: PcClass;
  level1?: number;
  class2?: PcClass;
  level2?: number;
  exp?: number;
  story?: string;
}

export function PcUpdate({ pcId, styles, }: Props) {
  const {
    data: pc,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetPcById(pcId);

  const formModel = object({
    url: string().required('비욘드 주소는 필수로 입력해야합니다.'),
    name: string().required('이름은 필수로 입력해야합니다.'),
    age: number().optional(),
    organization: string().optional(),
    class1: string().optional(),
    level1: number()
      .optional()
      .min(1, '레벨은 1에서부터 20까지입니다.')
      .max(20, '레벨은 1에서부터 20까지입니다.'),
    class2: string().optional(),
    level2: number()
      .optional()
      .min(1, '레벨은 1에서부터 20까지입니다.')
      .max(20, '레벨은 1에서부터 20까지입니다.'),
    exp: number().optional(),
    story: string().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      url: '',
      name: '',
      age: 0,
      class1: 'none',
      class2: 'none',
      level1: 1,
      level2: 1,
      exp: 0,
      story: '',
    },
  });

  const qc = useQueryClient();
  const updatePc = useUpdatePc(pc?.data.id);
  const router = useRouter();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);

      updatePc.mutate({
        classId1: pc?.data.Class[0].id,
        classId2: pc?.data.Class[1] ? pc?.data.Class[1].id : undefined,
        name: data.name,
        age: data.age,
        url: data.url,
        className1: data.class1,
        level1: data.level1,
        className2: data.class2,
        level2: data.level2,
        exp: data.exp,
        story: data.story,
        organization: data.organization,
      }, {
        onSuccess(res) {
          console.log(res.data);

          qc.invalidateQueries({
            queryKey: pcsKeys.getById(pc?.data.id),
          });

          qc.invalidateQueries({
            queryKey: usersKeys.getById(pc?.data.userId),
          });

          router.push(`/pcs/${pc?.data.id}`);
        },
      });
    },
    [ qc, updatePc, pc, ]
  );

  useEffect(() => {
    if (pc) {
      form.setValue('url', pc.data.url);
      form.setValue('name', pc.data.name);
      form.setValue('age', pc.data.age);
      form.setValue('class1', pc.data.Class[0].className);
      form.setValue('level1', pc.data.Class[0].level);
      form.setValue('exp', pc.data.exp);
      form.setValue('story', pc.data.story);

      if (pc.data.Class[1]) {
        form.setValue('class2', pc.data.Class[1].className);
        form.setValue('level2', pc.data.Class[1].level);
      }
    }
  }, [ pc, ]);

  const classCodes = Object.keys(classObj);
  const classLabels = Object.values(classObj);

  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
    formBody: twJoin([
      `p-2 bg-white rounded-2`,
    ]),
  };

  if (isFetching || isLoading) {
    return <LoadingCircle />;
  }

  return (
    isSuccess && (
      <div className={css.default}>
        <PageTitle level='h2' icon='fluent:people-community-20-filled'>PC 정보 수정</PageTitle>

        <div className={css.formBody}>
          <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
            <PageTitle level='h3' styles='!mb-0'>기본 정보</PageTitle>

            <CustomFormItem
              name='url'
              itemName='name'
              label='비욘드 주소'
              form={form}
            />

            <CustomFormItem
              name='name'
              itemName='name'
              label='이름'
              form={form}
            />

            <CustomFormItem
              name='age'
              itemName='age'
              label='나이'
              type='number'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='class1'
              itemName='class1'
              label='클래스1'
              mode='select'
              code={classCodes.join(',')}
              codeLabel={classLabels.join(',')}
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='level1'
              itemName='level1'
              label='레벨1'
              type='number'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='class2'
              itemName='class2'
              label='클래스2'
              mode='select'
              code={classCodes.join(',')}
              codeLabel={classLabels.join(',')}
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='level2'
              itemName='level2'
              label='레벨2'
              type='number'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='exp'
              itemName='exp'
              label='경험치'
              type='number'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='story'
              itemName='story'
              label='배경 이야기'
              mode='textarea'
              form={form}
              longText
              validate={false}
            />

            <CustomButton type='submit' full styles='mt-5'>수정</CustomButton>
          </CustomForm>
        </div>
      </div>
    )
  );
}
