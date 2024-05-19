'use client';

import React, {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { number, object, string } from 'yup';
import { SessionStatus } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import {
  CustomButton, CustomForm, CustomFormItem, CustomSheetHeader, LoadingCircle
} from '@/src/components';
import { Sheet, SheetContent } from '@/src/shadcn';
import { authStore, ExtendedCampain } from '@/src/entities';
import { useCreateSession, useGetMasterByCampainId } from '@/src/hooks';
import { Auth, Nihil } from '@/src/utils';
import { sessionsKeys } from '@/src/data';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

interface Inputs {
  masterId: string;
  number: number;
  status: SessionStatus;
  name: string;
  startTime: string;
  endTime: string;
  gameTime: string;
  playersNumber: number;
  content: string;
  note: string;
}

export function AddSessionButton({ campain, styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const { session, } = authStore();

  const isAdmin = Auth.isAdmin(session);

  const {
    data: masters,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetMasterByCampainId(campain?.id);

  const findMaster = useMemo(
    () => {
      return masters?.data.find((master) => master.User.id === session?.userId);
    },
    [ masters, session, ]
  );

  const masterDropdownData = useMemo(
    () => {
      return masters?.data.map((master) => ({
        code: master.id,
        label: master.User.name,
      }));
    },
    [ masters, ]
  );

  const formModel = object({
    masterId: string().notRequired(),
    number: number().notRequired(),
    status: string().required('세션 종류를 선택하세요.'),
    name: string().required('세션 이름을 입력하세요.'),
    startTime: string().required('세션 시작 시간을 입력하세요.'),
    endTime: string().required('세션 종료 시간을 입력하세요.'),
    gameTime: string().notRequired(),
    playersNumber: number().required('참여 인원을 입력하세요.'),
    content: string().required('세션의 설명을 입력하세요.'),
    note: string().notRequired(),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      number: 0,
      status: '',
      name: '',
      startTime: '',
      endTime: '',
      gameTime: '',
      playersNumber: 0,
      content: '',
      note: '',
    },
  });

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const qc = useQueryClient();
  const createSession = useCreateSession();

  const onSubmitForm: SubmitHandler<Inputs> = useCallback(
    (data) => {
      createSession.mutate({
        ...data,
        campainId: campain.id,
        masterId: data.masterId,
      }, {
        onSuccess() {
          qc.invalidateQueries({
            queryKey: sessionsKeys.getAll,
          });

          Nihil.toast({
            type: 'success',
            text: '세션이 생성되었습니다.',
          });
        },
      });
    },
    [ qc, ]
  );

  useEffect(() => {
    form.setValue('status', 'normal');
  }, []);

  const css = {
    default: twJoin([
      `overflow-y-scroll`,
      styles,
    ]),
  };

  return (
    <>
      <CustomButton h36 actions={onClickOpen}>
        세션 생성
      </CustomButton>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className={css.default}>
          <CustomSheetHeader
            title='세션 생성'
            description='생성할 세션 정보를 입력하세요.'
          />

          <CustomForm form={form} onSubmit={form.handleSubmit(onSubmitForm)}>
            {(isLoading || isFetching) && (
              <LoadingCircle />
            )}

            {isAdmin && isSuccess && (
              <>
                <CustomFormItem
                  name='masterId'
                  itemName='masterId'
                  label='마스터 선택'
                  mode='dropdown'
                  dropDownCode={masterDropdownData}
                  initValue={findMaster.id}
                  form={form}
                />
              </>
            )}

            <CustomFormItem
              name='status'
              itemName='status'
              label='종류'
              mode='select'
              code='normal,half,mini'
              codeLabel='일반 세션,하프 세션,미니 세션'
              form={form}
            />

            <CustomFormItem
              name='number'
              itemName='number'
              label='세션 번호'
              type='number'
              form={form}
            />

            <CustomFormItem
              name='name'
              itemName='name'
              label='세션 이름'
              form={form}
            />

            <CustomFormItem
              name='startTime'
              itemName='startTime'
              label='시작 시간'
              mode='date'
              time
              form={form}
            />

            <CustomFormItem
              name='endTime'
              itemName='endTime'
              label='종료 시간'
              mode='date'
              time
              form={form}
            />

            <CustomFormItem
              name='gameTime'
              itemName='gameTime'
              label='게임 시간'
              mode='date'
              validate={false}
              form={form}
            />

            <CustomFormItem
              name='playersNumber'
              itemName='playersNumber'
              label='참여 인원'
              type='number'
              form={form}
            />

            <CustomFormItem
              name='content'
              itemName='content'
              label='세션 설명'
              mode='textarea'
              form={form}
            />

            <CustomFormItem
              name='note'
              itemName='note'
              label='특이사항'
              mode='textarea'
              validate={false}
              form={form}
            />

            <CustomButton type='submit' styles='w-full'>
              세션 생성
            </CustomButton>
          </CustomForm>
        </SheetContent>
      </Sheet>
    </>
  );
}
