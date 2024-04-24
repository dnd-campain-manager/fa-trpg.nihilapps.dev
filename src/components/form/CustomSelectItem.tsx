'use client';

import React, { useCallback } from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';

interface Props<T extends string> {
  value: string;
  label: string;
  name: string;
  field: ControllerRenderProps<FieldValues, T>;
  form: UseFormReturn;
  disabled?: boolean;
  full?: boolean;
  invalidCond: boolean;
  validCond: boolean;
  styles?: ClassNameValue;
}

export function CustomSelectItem<T extends string>({
  value, label, name, field, form, disabled = false, invalidCond, validCond, full = false, styles,
}: Props<T>) {
  const onClickChange = useCallback(
    () => {
      if (field.value === value) {
        form.setValue(name, '', {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      } else {
        form.setValue(name, value, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true,
        });
      }
    },
    [ name, value, field.value, ]
  );

  const css = {
    default: twJoin([
      `shrink-0 w-1/3 !text-small bg-black-100 p-1 rounded-2 border-[2px] border-white transition-colors duration-200 text-center`,
      invalidCond && `bg-red-100`,
      validCond && `bg-blue-100`,
      full && `shrink-0 !w-full`,
      validCond && (field.value === value) && `!bg-blue-500 text-white`,
      invalidCond && (field.value === value) && `!bg-red-500 text-white`,
      disabled && (field.value === value) && `!bg-black-300 text-white`,
      (field.value === value) && `!bg-black-500 text-white`,
      styles,
    ]),
  };

  return (
    <>
      {disabled && (
        <div
          className={css.default}
        >
          {label}
        </div>
      )}

      {!disabled && (
        <button
          className={css.default}
          onClick={onClickChange}
          type='button'
        >
          {label}
        </button>
      )}
    </>
  );
}
