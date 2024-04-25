'use client';

import React from 'react';
import { ClassNameValue, twJoin } from 'tailwind-merge';
import { ControllerRenderProps, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  Calendar, FormControl, Popover, PopoverContent, PopoverTrigger
} from '@/src/shadcn';
import { CustomButton } from '@/src/components';

interface Props<T extends string> {
  name: string;
  placeholder?: string;
  field: ControllerRenderProps<FieldValues, T>;
  form?: UseFormReturn;
  disabled?: boolean;
  styles?: ClassNameValue;
  validate?: boolean;
}

export function CustomDate<T extends string>({
  name, placeholder, disabled, validate, form, field, styles,
}: Props<T>) {
  const css = {
    default: twJoin([
      ``,
      styles,
    ]),
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <CustomButton type='button' styles='h-[40px] !w-full' alter>
              {field.value ? (
                field.value
              ) : (
                <span>날짜를 선택하세요.</span>
              )}
            </CustomButton>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent align='start'>
          <Calendar
            mode='single'
            selected={field.value}
            onSelect={field.onChange}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
