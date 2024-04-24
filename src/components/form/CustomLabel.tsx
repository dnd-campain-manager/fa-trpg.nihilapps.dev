'use client';

import React, { useMemo } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  name: string;
  children: React.ReactNode;
  form?: UseFormReturn;
  mode?: 'input' | 'radio' | 'checkbox' | 'select' | 'textarea';
  disabled?: boolean;
  validate?: boolean;
  fieldLabel?: boolean;
  itemName?: string;
  styles?: ClassNameValue;
}

export function CustomLabel({
  name, children, form, mode = 'input', disabled, validate, styles, fieldLabel, itemName,
}: Props) {
  const fName = useMemo(
    () => {
      return fieldLabel ? itemName : name;
    },
    [ fieldLabel, itemName, name, ]
  );

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
      `block text-normal text-black-base font-700 cursor-pointer`,
      invalidCond && `!text-red-500`,
      validCond && `!text-blue-500`,
      disabled && `!text-black-200`,
      (!fieldLabel && mode !== 'input') && `!text-middle !ml-2 !mt-0`,
      styles,
    ]),
  };

  return (
    <>
      <label
        htmlFor={fName}
        className={css.default}
      >
        {children}
        {(validate && fieldLabel) && (
          <span className='text-red-500'>
            *
            <span className='a11y-hidden'>필수 입력사항</span>
          </span>
        )}
      </label>
    </>
  );
}
