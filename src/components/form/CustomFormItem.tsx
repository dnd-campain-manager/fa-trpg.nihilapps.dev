'use client';

import React from 'react';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { CustomInput, CustomLabel } from '@/src/components';
import { Message } from '@/src/shadcn';

interface Props<T extends string> {
  name: string;
  label: string;
  type?: 'text' | 'password'| 'email' | 'number';
  placeholder?: string;
  disabled?: boolean;
  showMessage?: boolean;
  code?: string;
  mode?: 'input' | 'radio' | 'select' | 'checkbox';
  field: ControllerRenderProps<FieldValues, T>;
  form: UseFormReturn;
}

export function CustomFormItem<T extends string>({
  name, label, type = 'text', placeholder, disabled = false, showMessage = true, code, mode = 'input', field, form,
}: Props<T>) {
  return (
    <>
      {mode === 'input' && (
        <CustomLabel
          name={name}
          field={field}
          form={form}
        >
          {label}
        </CustomLabel>
      )}
      {mode === 'input' && (
        <CustomInput
          name={name}
          type={type}
          field={field}
          form={form}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
      {(showMessage && form.formState.errors[name]) && (
        <Message color='red'>
          {form.formState.errors[name].message as string}
        </Message>
      )}
    </>
  );
}
