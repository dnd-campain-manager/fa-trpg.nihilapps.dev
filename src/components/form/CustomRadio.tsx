'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  FormControl, FormItem, RadioGroup, RadioGroupItem
} from '@/src/shadcn';
import { CustomLabel } from '@/src/components';
import { Nihil } from '@/src/utils';

interface Props<T extends string> {
  code: string;
  label: string;
  name: string;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
  validate?: boolean;
  itemName?: string;
}

export function CustomRadio<T extends string>({
  code, label, name, field, form, disabled = false, styles, validate, itemName,
}: Props<T>) {
  const codeArray = code?.split(',');
  const labelArray = label?.split(',');

  const invalidCond = validate
    && (
      (
        form.formState.isSubmitted
        || form.formState.touchedFields[itemName]
      )
      || form.formState.dirtyFields[itemName]
    )
    && form.formState.errors[itemName] !== undefined;

  const validCond = validate
    && (
      (
        form.formState.isSubmitted
        || form.formState.touchedFields[itemName]
      )
      || form.formState.dirtyFields[itemName]
    )
    && form.formState.errors[itemName] === undefined;

  const css = {
    default: twJoin([
      `!mt-1 !gap-1 text-middle text-black-base`,
      invalidCond && `!text-red-500`,
      validCond && `!text-blue-500`,
      styles,
    ]),
    item: twJoin([
      `flex flex-row items-center`,
    ]),
    symbol: twJoin([
      ``,
    ]),
  };

  return (
    <>
      <RadioGroup
        defaultValue={field.value}
        onValueChange={field.onChange}
        disabled={disabled}
        className={css.default}
        name={name}
      >
        {codeArray.map((item, index) => (
          <FormItem key={Nihil.uuid()} className={css.item}>
            <FormControl>
              <RadioGroupItem value={item} id={item} className={css.symbol} />
            </FormControl>
            <CustomLabel
              name={item}
              itemName={itemName}
              form={form}
              mode='radio'
              validate={validate}
            >
              {labelArray[index]}
            </CustomLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </>
  );
}
