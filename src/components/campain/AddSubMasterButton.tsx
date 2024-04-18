'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import {
  Sheet, SheetContent
} from '@/src/shadcn';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader, LoadingCircle
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';
import { useCreateMaster, useGetUsers } from '@/src/hooks';
import { Nihil } from '@/src/utils';

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
    refetch: usersRefetch,
    isLoading,
    isFetching,
  } = useGetUsers();

  const usersArray = useMemo(
    () => {
      const filteredUsers = users?.data.filter((user) => {
        const master = user.Master
          .filter((master) => master.campainId === campain.id);

        return master.length === 0;
      }) || [];

      return {
        names: filteredUsers.map((user) => user.name),
        ids: filteredUsers.map((user) => user.id),
      };
    },
    [ users, ]
  );

  console.log(usersArray);

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

  const qc = useQueryClient();
  const createMaster = useCreateMaster();

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const onClickAddSubMaster: SubmitHandler<Inputs> = useCallback(
    (data) => {
      console.log(data);

      if (data.userId === 'none') {
        Nihil.toast({
          type: 'error',
          text: '잘못된 입력입니다.',
        });

        return;
      }

      createMaster.mutate({
        userId: data.userId,
        campainId: data.campainId,
        masterType: 'subMaster',
      }, {
        onSuccess({ data: master, }) {
          qc.invalidateQueries({
            type: 'all',
            queryKey: [ 'getCampainById', campain.id, ],
          });

          Nihil.toast({
            type: 'success',
            text: `${master.User.name}님이 서브 마스터로 등록되었습니다.`,
          });
        },
      });
    },
    [ qc, ]
  );

  return (
    <>
      <CustomButton actions={onClickOpen} h36>
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
                    code={usersArray.ids.join(',') || 'none'}
                    codeLabel={usersArray.names.join(',') || '- 선택하세요 -'}
                    placeholder='이름을 입력하세요.'
                    form={form}
                    styles='mb-3'
                  />

                  <CustomFormItem
                    name='campainId'
                    itemName='campainId'
                    label='캠페인'
                    mode='input'
                    disabled
                    form={form}
                    validate={false}
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
