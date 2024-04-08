'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { FormLabel } from '@/src/shadcn';

interface Props {
  target?: string;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function CustomLabel({ target, children, styles, }: Props) {
  const css = {
    default: twJoin([
      `!text-xsmall mo-sm:!text-small mo-md:!text-middle !m-0`,
      styles,
    ]),
  };

  return (
    <>
      <FormLabel
        htmlFor={target}
        className={css.default}
      >
        {children}
      </FormLabel>
    </>
  );
}
