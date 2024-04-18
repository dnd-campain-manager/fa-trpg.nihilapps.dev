'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { UseFormReturn } from 'react-hook-form';
import {
  Checkbox, FormControl, FormField, FormItem
} from '@/src/shadcn';
import { Nihil } from '@/src/utils';
import { CustomLabel } from '@/src/components';

interface Props {
  code: string;
  label: string;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
  validate?: boolean;
  itemName?: string;
}

export function CustomCheck({
  code, label, form, disabled = false, styles, validate, itemName,
}: Props) {
  const codeArray = code?.split(',');
  const labelArray = label?.split(',');

  const itemsArray = codeArray.map(
    (item, index) => {
      const value = item;
      const label = labelArray[index];

      return {
        id: value,
        label,
      };
    }
  );

  const invalidCond = validate
    && (
      form.formState.isSubmitted
      || form.formState.touchedFields[itemName]
    )
    && form.formState.errors[itemName] !== undefined;

  const validCond = validate
    && (
      form.formState.isSubmitted
      || form.formState.touchedFields[itemName]
    )
    && form.formState.errors[itemName] === undefined;

  const css = {
    default: twJoin([
      `flex flex-col text-middle !mt-1`,
      styles,
    ]),
    item: twJoin([
      `flex flex-row items-center !mt-0`,
    ]),
    check: twJoin([
      invalidCond && `data-[state=checked]:!bg-red-500`,
      validCond && `data-[state=checked]:!bg-blue-500`,
    ]),
  };

  return (
    <>
      {itemsArray.map((item) => (
        <FormField
          key={Nihil.uuid()}
          disabled={disabled}
          control={form.control}
          render={({ field, }) => (
            <FormItem
              key={item.id}
              className={css.item}
            >
              <FormControl>
                <Checkbox
                  id={item.id}
                  checked={field.value?.includes(item.id)}
                  className={css.check}
                  onCheckedChange={(checked) => {
                    return checked
                      ? (
                        field.onChange([ ...field.value, item.id, ])
                      )
                      : (
                        field.onChange(field.value?.filter(
                          (value: string) => value !== item.id
                        ))
                      );
                  }}
                />
              </FormControl>
              <CustomLabel
                name={item.id}
                itemName={itemName}
                form={form}
                validate={validate}
                mode='checkbox'
              >
                {item.label}
              </CustomLabel>
            </FormItem>
          )}
          name={itemName}
        />
      ))}
    </>
  );
}
