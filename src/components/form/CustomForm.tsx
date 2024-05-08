'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '@/src/shadcn';

interface Props {
  form: UseFormReturn;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  flexRow?: boolean;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function CustomForm({
  form, onSubmit, flexRow, children, styles,
}: Props) {
  const css = {
    default: twJoin([
      `flex flex-col gap-3`,
      flexRow && `!flex-row`,
      styles,
    ]),
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className={css.default}>
          {children}
        </form>
      </Form>
    </>
  );
}
