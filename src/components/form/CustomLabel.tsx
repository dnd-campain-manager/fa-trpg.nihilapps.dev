'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props<T extends string> {
  name: string;
  children: React.ReactNode;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  styles?: ClassNameValue;
}

export function CustomLabel<T extends string>({
  name, children, field, form, styles,
}: Props<T>) {
  const css = {
    default: twJoin([
      `block text-normal text-black-base font-700`,
      form.formState.errors[name] && `text-red-500`,
      (field.value && !form.formState.errors[name]) && `text-blue-500`,
      styles,
    ]),
  };

  return (
    <>
      <label
        htmlFor={name}
        className={css.default}
      >
        {children}
      </label>
    </>
  );
}
