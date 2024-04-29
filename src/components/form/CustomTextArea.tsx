'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { FormControl, Textarea } from '@/src/shadcn';

interface Props<T extends string> {
  name: string;
  placeholder?: string;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
  validate?: boolean;
  longText?: boolean;
}

export function CustomTextArea<T extends string>({
  name, placeholder, field, form, disabled, validate, styles, longText,
}: Props<T>) {
  const invalidCond = validate
    && (
      (
        form.formState.isSubmitted
        || form.formState.touchedFields[name]
      )
      || form.formState.dirtyFields[name]
    )
    && form.formState.errors[name] !== undefined;

  const validCond = validate
    && (
      (
        form.formState.isSubmitted
        || form.formState.touchedFields[name]
      )
      || form.formState.dirtyFields[name]
    )
    && form.formState.errors[name] === undefined;

  const css = {
    default: twJoin([
      `block !p-2 rounded-2 border-2 w-full border-black-base !text-middle placeholder:text-middle text-black-base font-500 !mt-1`,
      longText && `!h-[150px]`,
      invalidCond && `text-red-500 border-red-500`,
      validCond && `text-blue-500 border-blue-500`,
      disabled && `text-black-200 !border-black-200 bg-black-50`,
      styles,
    ]),
  };

  return (
    <FormControl>
      <Textarea
        id={name}
        placeholder={placeholder}
        disabled={disabled}
        className={css.default}
        {...field}
      >
        <pre>
          {field.value}
        </pre>
      </Textarea>
    </FormControl>
  );
}
