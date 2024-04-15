'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormField, FormItem,
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle
} from '@/src/shadcn';
import {
  CustomButton, CustomForm, CustomInput, CustomLabel
} from '@/src/components';
import { ExtendedCampain } from '@/src/entities';

interface Props {
  campain: ExtendedCampain;
  styles?: ClassNameValue;
}

interface Inputs {
  name: string;
}

export function AddSubMasterButton({ campain, styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const formModel = object({
    name: string().required('등록할 이름을 입력해주세요.'),
  });

  const form = useForm({
    mode: 'all',
    resolver: yupResolver(formModel),
    defaultValues: {
      name: '',
    },
  });

  const onClickOpen = useCallback(
    () => {
      setOpen(true);
    },
    []
  );

  const onClickAddSubMaster = useCallback(
    () => {

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
          <SheetHeader className='mb-5'>
            <SheetTitle className='!font-900 mb-2 !text-black-base'>
              <span className='text-h4'>서브마스터 등록</span>
            </SheetTitle>
            <SheetDescription className='!text-black-base'>
              <span className='!text-middle text-justify'>
                서브 마스터로 등록할 유저의 닉네임을 선택하세요.
              </span>
            </SheetDescription>
          </SheetHeader>

          <CustomForm form={form}>
            <form>
              <FormField
                render={({ field, }) => (
                  <FormItem>
                    <CustomLabel name='name'>이름</CustomLabel>
                    <CustomInput type='text' field={field} placeholder='이름을 입력하세요.' />
                  </FormItem>
                )}
                name='name'
              />
            </form>
          </CustomForm>
          <SheetFooter>
            <CustomButton styles='w-full' actions={onClickAddSubMaster}>
              등록
            </CustomButton>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
