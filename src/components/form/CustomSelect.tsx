'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { Nihil } from '@/src/utils';
import {
  FormControl, Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/src/shadcn';

interface Props<T extends string> {
  code: string;
  label: string;
  name: string;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
  validate?: boolean;
}

export function CustomSelect<T extends string>({
  code, label, name, field, form, disabled, styles, validate,
}: Props<T>) {
  const codeArray = code?.split(',');
  const labelArray = label?.split(',');

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
      `border-2 border-black-base !text-middle !mt-1 !font-500`,
      invalidCond && `text-red-500 border-red-500`,
      validCond && `text-blue-500 border-blue-500`,
      disabled && `text-black-200 !border-black-200 bg-black-50`,
      styles,
    ]),
    selectItem: twJoin([
      `!font-500 !text-middle !py-2`,
    ]),
  };

  return (
    <>
      <Select
        value={field.value}
        onValueChange={field.onChange}
        disabled={disabled}
        name={name}
      >
        <FormControl>
          <SelectTrigger className={css.default}>
            <SelectValue
              placeholder='선택하세요'
              id={name}
            />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {codeArray.map((item, index) => (
            <SelectItem key={Nihil.uuid()} value={item} className={css.selectItem}>
              {labelArray[index]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
