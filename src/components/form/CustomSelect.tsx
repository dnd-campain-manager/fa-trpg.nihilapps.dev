'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { CustomSelectItem } from '@/src/components';

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
  const codeArray = code ? code.split(',') : [];
  const labelArray = label ? label.split(',') : [];

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
      `border-2 border-black-base !text-middle !mt-1 !font-500 rounded-2 p-[2px] flex flex-row flex-wrap`,
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
      <div className={css.default}>
        <CustomSelectItem
          value='none'
          label='선택하세요'
          name={name}
          field={field}
          form={form}
          disabled={disabled}
          invalidCond={invalidCond}
          validCond={validCond}
          full
        />
        {codeArray.map((item, index) => (
          <CustomSelectItem
            key={item}
            value={item}
            label={labelArray[index]}
            name={name}
            field={field}
            form={form}
            disabled={disabled}
            invalidCond={invalidCond}
            validCond={validCond}
          />
        ))}
      </div>
    </>
  );
}
