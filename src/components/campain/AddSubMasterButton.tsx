'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { array, object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormField, FormItem,
  Sheet, SheetContent
} from '@/src/shadcn';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader, LoadingCircle
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';
import { useGetUsers } from '@/src/hooks';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

interface Inputs {
  userId: string;
  campainId: string;
}

export function AddSubMasterButton({ campain, styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetUsers();

  const usersArray = useMemo(
    () => {
      return {
        names: users?.data.map((user) => user.name),
        ids: users?.data.map((user) => user.id),
      };
    },
    [ users, ]
  );

  const formModel = object({
    userId: string()
      .required('목록에서 이름을 선택해주세요.'),
    campainId: string().optional(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      userId: '',
      campainId: campain.id,
    },
  });

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const onClickAddSubMaster: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);
    },
    []
  );

  return (
    <>
      <CustomButton actions={onClickOpen}>
        서브 마스터 등록
      </CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <CustomSheetHeader
            title='서브 마스터 등록'
            description='서브 마스터로 등록할 유저의 닉네임을 선택하세요.'
          />

          {(isLoading || isFetching) && (
            <LoadingCircle />
          )}

          {users?.data && (
            <>
              <CustomForm form={form}>
                <form onSubmit={form.handleSubmit(onClickAddSubMaster)}>
                  <CustomFormItem
                    name='userId'
                    itemName='userId'
                    label='이름'
                    mode='select'
                    code={usersArray.ids.join(',')}
                    codeLabel={usersArray.names.join(',')}
                    placeholder='이름을 입력하세요.'
                    form={form}
                    styles='mb-3'
                  />

                  <CustomButton styles='w-full mt-5' type='submit'>
                    등록
                  </CustomButton>
                </form>
              </CustomForm>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
