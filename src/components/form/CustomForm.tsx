'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '@/src/shadcn';

interface Props {
  form: UseFormReturn;
  children: React.ReactNode;
  styles?: ClassNameValue;
}

export function CustomForm({ form, children, styles, }: Props) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <Form {...form}>
        {children}
      </Form>
    </>
  );
}
