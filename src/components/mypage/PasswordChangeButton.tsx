'use client';

import React, { useCallback, useState } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { CustomButton } from '@/src/components';
import { authStore } from '@/src/entities';
import { useUserCheck } from '@/src/hooks';

interface Props {
  styles?: ClassNameValue;
}

export function PasswordChangeButton({ styles, }: Props) {
  const [ open, setOpen, ] = useState(false);

  const session = authStore((state) => state.session);
  const userCheck = useUserCheck();

  const onClickOpen = useCallback(
    () => {

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
    <>
      <CustomButton full>비밀번호 변경</CustomButton>
    </>
  );
}
