'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props<T extends string> {
  type: ('text' | 'password' | 'email' | 'number');
  name: string;
  placeholder?: string;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
}

export function CustomInput<T extends string>({
  type, name, placeholder, field, form, disabled = false, styles,
}: Props<T>) {
  const css = {
    default: twJoin([
      `block p-2 rounded-2 border-2 w-full border-black-base text-middle placeholder:text-middle text-black-base outline-none font-500`,
      form.formState.errors[name] && `text-red-500 border-red-500`,
      (field.value && !form.formState.errors[name]) && `text-blue-500 border-blue-500`,
      disabled && `text-black-100 !border-black-100 bg-black-50`,
      styles,
    ]),
  };

  return (
    <>
      {type === 'text' && (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={css.default}
          {...field}
        />
      )}
      {type === 'password' && (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={css.default}
          {...field}
        />
      )}
    </>
  );
}
